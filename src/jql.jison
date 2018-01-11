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

"select"                            return 'SELECT';
"update"                            return 'UPDATE';
"insert"                            return 'INSERT';
"delete"                            return 'DELETE';

"from"                              return 'FROM';
"where"                             return 'WHERE';
"limit"                             return 'LIMIT';

<<EOF>>                             return 'EOF'
.                                   return 'INVALID'

/lex

/* operator associations and precedence */

%left UMINUS

/* list element separator */

%start JQL

%% /* language grammar */

JQL
    : StatementsList EOF                                       { return $1; }
    ;

StatementsList
    : SelectStatement                                          { $$ = $1; }
    | UpdateStatement                                          { $$ = $1; }
    | InsertStatement                                          { $$ = $1; }
    | DeleteStatement                                          { $$ = $1; }
    ;

SelectStatement
    : "SELECT" "FROM" "WHERE" "LIMIT"                          { $$ = { op: "statement", type: "select", from: true, where: true, limit: true }; }
    | "SELECT"                                                 { $$ = { op: "statement", type: "select", from: null, where: null, limit: null }; }
    | "SELECT" "FROM"                                          { $$ = { op: "statement", type: "select", from: true, where: null, limit: null }; }
    | "SELECT" "FROM" "LIMIT"                                  { $$ = { op: "statement", type: "select", from: true, where: null, limit: true }; }
    ;

UpdateStatement
    : "UPDATE"                                                 { $$ = { op: "statement", type: "update" }; }
    ;

InsertStatement
    : "INSERT"                                                 { $$ = { op: "statement", type: "insert" }; }
    ;

DeleteStatement
    : "DELETE"                                                 { $$ = { op: "statement", type: "delete" }; }
    ;