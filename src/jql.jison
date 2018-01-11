/* description: Parses and executes mathematical expressions. */

/* -- JavaScript code -- */
%{

    var JQLParser = {

        parseString: function( input ) {

            if ( 'string' !== typeof input ) {
                throw new Error('Invalid argument: string expected!');
            }

            var strlen = input.length,
                startch = input.charAt(0),
                endch   = input.charAt( strlen - 1 ),
                ch,
                nextch,
                result = '';

            if ( strlen < 2 || startch != endch || ( startch !== "'" && startch !== '"' ) ) {
                throw new Error('Failed to parse string! Please report this bug!');
            }

            for ( var i=1; i < strlen - 1; i++ ) {

                ch = input.charAt(i);

                if ( '\\' === ch ) {

                     nextch = input.charAt(i + 1);

                     switch (nextch) {
                        case "r": // "r"
                            result += "\r";
                            break;
                        case "t": // "t"
                            result += "\t";
                            break;
                        case "n": // "n"
                            result += "\n";
                            break;
                        case "\\": // "\"
                            result += "\\";
                            break;
                        case '':
                            throw new Error('Unexpected string termination!');
                            break;
                        default:
                            result += nextch;
                            break;
                     }

                     i++;

                } else {

                    result += ch;

                }
            }

            return result;
        }

    }

%}

/* lexical grammar */
%lex
%options case-insensitive

%%


\s+                       /* skip whitespace */
[0-9]+("."[0-9]+)?\b      return 'NUMBER'
true|false                return 'BOOLEAN'
'"'("\\"["]|[^"])*'"'     return 'STRING'
"'"('\\'[']|[^'])*"'"     return 'STRING'
[A-Za-z_\$][A-Za-z0-9_]+  return 'IDENTIFIER'
"*"                       return '*'
"/"                       return '/'
"-"                       return '-'
"not"                     return 'not'
"+"                       return '+'
"&&"                      return '&&'
"and"                     return '&&'
"||"                      return '||'
"or"                      return '||'
"("                       return '('
")"                       return ')'
<<EOF>>                   return 'EOF'
.                         return 'INVALID'

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '||'
%left '&&'
%left UMINUS

%start jql

%% /* language grammar */

jql
    : e EOF
        { return $1; }
    ;

e
    : e '+' e
        {$$ = { op: "operation", "operator": "+", "left": $1, "right": $3 }; }
    | e '-' e
        {$$ = { op: "operation", "operator": "-", "left": $1, "right": $3 }; }
    | e '*' e
        {$$ = { op: "operation", "operator": "*", "left": $1, "right": $3 }; }
    | e '/' e
        {$$ = { op: "operation", "operator": "/", "left": $1, "right": $3 }; }
    | e '&&' e
        {$$ = { op: "operation", "operator": "and", "left": $1, "right": $3 }; }
    | e '||' e
        {$$ = { op: "operation", "operator": "or", "left": $1, "right": $3 }; }
    | '-' e %prec UMINUS
        {$$ = -$2;}
    | 'not' e %prec UMINUS
        {$$ = { op: "operation", "operator": "not", "left": $2 }; }
    | '(' e ')'
        {$$ = $2;}
    | NUMBER
        {$$ =  { op: "value", value: Number(yytext), type: "number" }; }
    | BOOLEAN
        { $$ = {
            op: "value",
            value: String(yytext || '').toLowerCase() === 'true'
                ? true
                : false,
            type: "boolean"
          };
        }
    | STRING
        { $$ = { op: "value", value: JQLParser.parseString(yytext), type: "string" }; }
    | IDENTIFIER
        { $$ = { op: "value", value: yytext, "type": "identifier" }; }
    ;

