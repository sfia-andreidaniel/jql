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


\s+                                 /* ignore whitespace */

[0-9]+\.[0-9]*|[0-9]*\.[0-9]+\b     return 'NUMBER'
[0-9]+                              return 'NUMBER'

'"'("\\"["]|[^"])*'"'				return 'STRING';
"'"('\\'[']|[^'])*"'"				return 'STRING';

"/*"(.|\n|\r)*?"*/"                 /* ignore multiline comment */


"("                                 return '('
")"                                 return ')'
"!"                                 return '!'
"^"                                 return '^'
"*"                                 return '*'
"/"                                 return '/'
"%"                                 return '%'
"+"                                 return '+'
"-"                                 return '-'
"<="                                return '<='
"<"                                 return '<'
">="                                return '>='
">"                                 return '>'
"=="                                return '=='
"~="                                return '~='
"!="                                return '!='
"&&"                                return '&&'
"||"                                return '||'
"="                                 return '='
","                                 return ','
<<EOF>>                             return 'EOF'
[A-Za-z_\$][A-Za-z0-9_]+            return 'IDENTIFIER'
.                                   return 'INVALID'

/lex

/* operator associations and precedence */

%nonassoc EMPTY
%nonassoc ATTRLST

/* list element separator */
%left ','

/* assignment */
%right '='

/* conditional */
%right '?' ':'

/* logical or */
%left '||'

/* logical and */
%left '&&'

/* equality */
%left '==' '~=' '!='

/* relational */
%left '<=' '<' '>=' '>'

/* addition arithmetic */
%left '+' '-'

/* multiplication arithmetic */
%left '*' '/'

%right '%'

/* exponentiation */
%right '^'

/* unary operators */
%right UMINUS UPLUS '!'

/* function call */
%left '(' ')'

%start JQL

%% /* language grammar */

JQL
    : SelectStatement EOF                                      { return $1 }
    | UpdateStatement EOF                                      { return $1 }
    | InsertStatement EOF                                      { return $1 }
    ;

SelectStatement
    : "SELECT"                                                 { return { opcode: "statement", type: "insert" }; }
    ;

UpdateStatement
    : "UPDATE"                                                 { return { opcode: "statement", type: "update" }; }
    ;

InsertStatement
    : "INSERT"                                                 { return { opcode: "statement", type: "insert    " }; }
    ;