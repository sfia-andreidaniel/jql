/* description: Parses and executes mathematical expressions. */

/* -- JavaScript code -- */
%{

    var JQLParser = {

        OP: {
            statement:             'statement',
            table_reference:       'table_reference',
            expression:            'expression',
            fields_list:           'fields_list',
            field:                 'field',
            update_field:          'update_field',
            delayed_option:        'delayed_option',
            limit_option:          'limit_option',
            order_by_option:       'order_by_option',
            order_by_expression:   'order_by_expression'
        },

        id: 0,

        createAlias( prefix ) {
            JQLParser.id++;
            return ( prefix || 'field_' ) + JQLParser.id;
        },

        unescapeIdentifier: function( escapedIdentifier ) {
            return String( escapedIdentifier || '' ).replace( /^`([\S]+)`$/, '$1' );
        },

        unescapeBindingName: function( bindingName ) {
            return String( bindingName || '' ).replace( /^\:/, '' );
        },

        parseBoolean: function( input ) {

            return String(input || '').toLowerCase() === 'true';

        },

        parseNumber: function( input ) {
            return Number( input );
        },

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

[0-9]+\.[0-9]*|[0-9]*\.[0-9]+\b     return 'NUMBER';
[0-9]+                              return 'NUMBER';
true|false                          return 'BOOLEAN';
null                                return 'NULL';

'"'("\\"["]|[^"])*'"'               return 'STRING';
"'"('\\'[']|[^'])*"'"               return 'STRING';

"select"                            return 'SELECT';
"update"                            return 'UPDATE';
"insert"                            return 'INSERT';
"delete"                            return 'DELETE';

"from"                              return 'FROM';
"where"                             return 'WHERE';
"limit"                             return 'LIMIT';
"union"                             return 'UNION';
"as"                                return 'AS';
"set"                               return 'SET';
"delayed"                           return 'DELAYED';

"order"                             return 'ORDER';
"by"                                return 'BY';
"random"                            return 'RANDOM';
"asc"                               return 'ASC';
"ascending"                         return 'ASC';
"desc"                              return 'DESC';
"descending"                        return 'DESC';
"ignore"                            return 'IGNORE';
"into"                              return 'INTO';

"("                                 return '(';
")"                                 return ')';

"*"                                 return '*';
"/"                                 return '/';
"+"                                 return '+';
"-"                                 return '-';

"!"                                 return '!';
"<>"                                return '!=';
"<="                                return '<=';
"<"                                 return '<';
">="                                return '>=';
">"                                 return '>';
"=="                                return '==';
"="                                 return '=';
"!="                                return '!=';
"~="                                return '~=';
"&&"                                return '&&';
"and"                               return '&&';
"||"                                return '||';
"or"                                return '||';


","                                 return ',';

[A-Za-z_\$][A-Za-z0-9_]*            return 'IDENTIFIER';
\`[A-Za-z_\$][A-Za-z0-9_]*\`        return 'ESCAPED_IDENTIFIER';
\:[A-Za-z_\$][A-Za-z0-9_]*          return 'BINDING';

<<EOF>>                             return 'EOF'
.                                   return 'INVALID'

/lex

/* operator associations and precedence */

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

/* unary operators */
%right UMINUS UPLUS '!'

/* function call */
%left '(' ')'

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

SelectSingleRowStatement
    : "SELECT" SelectFieldsList                                  { $$ = { 
                                                                        op: JQLParser.OP.statement,
                                                                        type: "select",
                                                                        fields: $2
                                                                    };
                                                               }
    ;

SelectFromTableStatement
    : SelectSingleRowStatement 
      "FROM" TableReference                                 {  $$ = $1;
                                                                  $$.table = $3
                                                               }
    ;

SelectWithOptionalWHEREClause
    : SelectFromTableStatement "WHERE" Expression              { $$ = $1; 
                                                                 $$.where = $3;
                                                               }
    | SelectFromTableStatement                                 { $$ = $1; }
    ;

SelectWithOptionalORDERClause
    : SelectWithOptionalWHEREClause "ORDER" "BY" OrderByClause { $$ = $1; 
                                                                 $$.orderBy = $4;
                                                               }
    | SelectWithOptionalWHEREClause                            { $$ = $1; }
    ;

SelectWithOptionalLIMITClause
    : SelectWithOptionalORDERClause "LIMIT" LimitClause        { $$ = $1;
                                                                 $$.limit = $3;
                                                               }
    | SelectWithOptionalORDERClause                            { $$ = $1; }
    ;

SelectStatementWithoutUnion
    : SelectWithOptionalLIMITClause                            { $$ = $1; }
    | SelectSingleRowStatement                                 { $$ = $1; }
    ;

SelectStatement
    : SelectStatementWithoutUnion                              { $$ = $1; }
    | SelectStatement "UNION" SelectStatementWithoutUnion      { $$ = $1;
                                                                 $$.union = $3;
                                                               }
    ;


UpdateStatementBegin
    : "UPDATE" DelayedClause                                  { $$ = {
                                                                        op: JQLParser.OP.statement,
                                                                        type: "update",
                                                                        delayed: $2
                                                                     };
                                                              }
    | "UPDATE"                                                { $$ = {
                                                                        op: JQLParser.OP.statement,
                                                                        type: "update"
                                                                     };
                                                              }
    ;

DelayedClause
    : "DELAYED" "NUMBER"                                      { $$ = { op: JQLParser.OP.delayed_option, timer: $2 }; }
    | "DELAYED"                                               { $$ = { op: JQLParser.OP.delayed_option, timer: null }; }
    ;

UpdateAllRowsStatement
    : UpdateStatementBegin TableReference 
      "SET" UpdateFieldsList                                  { $$ = $1;
                                                                $$.table = $2;
                                                                $$.fields = $4;
                                                              }
    ;

UpdateWithOptionalWHEREStatement
    : UpdateAllRowsStatement "WHERE" Expression                { $$ = $1; 
                                                                 $$.where = $3;
                                                               }
    | UpdateAllRowsStatement                                   { $$ = $1; }
    ;

UpdateWithOptionalORDERStatement
    : UpdateWithOptionalWHEREStatement 
      "ORDER" "BY" OrderByClause                               { $$ = $1;
                                                                 $$.orderBy = $4;
                                                               }
    | UpdateWithOptionalWHEREStatement
    ;

UpdateWithOptionalLIMITStatement
    : UpdateWithOptionalORDERStatement "LIMIT" LimitClause     { $$ = $1;
                                                                 $$.limit = $3;
                                                               }
    | UpdateWithOptionalORDERStatement                         { $$ = $1; }
    ;

UpdateStatement
    : UpdateWithOptionalLIMITStatement                         { $$ = $1; }
    ;

InsertStatementBegin
    : "INSERT" "IGNORE"                                        { $$ = { 
                                                                    op: JQLParser.OP.statement, 
                                                                    type: "insert",
                                                                    ignoreDuplicates: true
                                                                 }; 
                                                               }
    | "INSERT"                                                 { $$ = {
                                                                    op: JQLParser.OP.statement, 
                                                                    type: "insert"
                                                                 }; 
                                                               }
    ;

InsertStatement
    : InsertStatementBegin "INTO" TableReference
      "SET" UpdateFieldsList                                   { $$ = $1;
                                                                 $$.table = $3;
                                                                 $$.fields = $5; 
                                                               }
    ;

DeleteAllRowsStatement
    : "DELETE" "FROM" TableReference                           { $$ = {
                                                                    op: JQLParser.OP.statement,
                                                                    type: "delete",
                                                                    table: $3
                                                                 };
                                                               }
    ;

DeleteWithOptionalWHEREClauseStatement
    : DeleteAllRowsStatement "WHERE" Expression                { $$ = $1;
                                                                 $$.where = $3;
                                                               }
    | DeleteAllRowsStatement                                   { $$ = $1;
                                                               }
    ;

DeleteWithOptionalORDERClauseStatement
    : DeleteWithOptionalWHEREClauseStatement
      "ORDER" "BY" OrderByClause                               { $$ = $1;
                                                                 $$.orderBy = $4;
                                                               }
    | DeleteWithOptionalWHEREStatement                         { $$ = $1; }
    ;

DeleteWithOptionalLIMITClauseStatement
    : DeleteWithOptionalORDERClauseStatement
      "LIMIT" LimitClause                                      { $$ = $1;
                                                                 $$.limit = $3;
                                                               }
    | DeleteWithOptionalORDERClauseStatement                   { $$ = $1; }
    ;

DeleteStatement
    : DeleteWithOptionalLIMITClauseStatement                   { $$ = $1; }
    ;

TableReference
    : "IDENTIFIER"                                             { $$ = { op: JQLParser.OP.table_reference, name: $1 }; }
    | "ESCAPED_IDENTIFIER"                                     { $$ = { op: JQLParser.OP.table_reference, name: JQLParser.unescapeIdentifier( $1 ) }; }
    ;

SelectFieldsList
    : "*"                                                      { $$ = { op: JQLParser.OP.fields_list, "type": "all" }; }
    | SelectFieldEnumeration                                   { $$ = { op: JQLParser.OP.fields_list, "type": "enumeration", "fields": $1 }; }
    ;

SelectFieldEnumeration
    : SelectField                                              { $$ = [ $1 ]; }
    | SelectFieldEnumeration "," SelectField                   { $$ = $1.concat($3); }
    ;

SelectField
    : Expression                                               { $$ = { op: JQLParser.OP.field,                                                expression: $1 }; }
    | Expression "AS" "IDENTIFIER"                             { $$ = { op: JQLParser.OP.field, literal: $3,                                   expression: $1 }; }
    | Expression "AS" "ESCAPED_IDENTIFIER"                     { $$ = { op: JQLParser.OP.field, literal: JQLParser.unescapeIdentifier($3),     expression: $1 }; }
    ;

UpdateFieldsList
    : UpdateField                                              { $$ = [ $1 ]; }
    | UpdateFieldsList "SET" UpdateField                       { $$ = $1.concat($3); }
    | UpdateFieldsList "," UpdateField                         { $$ = $1.concat($3); }
    ;

UpdateField
    : "IDENTIFIER" "=" Expression                              { $$ = { op: JQLParser.OP.update_field, name: $1, expression: $3 }; }
    | "ESCAPED_IDENTIFIER" "=" Expression                      { $$ = { op: JQLParser.OP.update_field, name: JQLParser.unescapeIdentifier($1), expression: $3 }; }
    ;

Expression
    : "NUMBER"                                                 { $$ = { op: JQLParser.OP.expression, type: "number",     value: JQLParser.parseNumber( $1 )                }; }
    | "BOOLEAN"                                                { $$ = { op: JQLParser.OP.expression, type: "boolean",    value: JQLParser.parseBoolean( $1 )               }; }
    | "NULL"                                                   { $$ = { op: JQLParser.OP.expression, type: "null"                                                          }; }
    | "STRING"                                                 { $$ = { op: JQLParser.OP.expression, type: "string",     value: JQLParser.parseString( $1 )                }; }
    
    | "!" Expression                                           { $$ = { op: JQLParser.OP.expression, type: "unary",      operand: "!",  left: $2                           }; }
    | "-" Expression                                           { $$ = { op: JQLParser.OP.expression, type: "unary",      operand: "-",  left: $2                           }; }
    
    | Expression "||" Expression                               { $$ = { op: JQLParser.OP.expression, type: "logical",    operand: "||", left: $1, right: $3                }; }
    | Expression "&&" Expression                               { $$ = { op: JQLParser.OP.expression, type: "logical",    operand: "&&", left: $1, right: $3                }; }

    | Expression "==" Expression                               { $$ = { op: JQLParser.OP.expression, type: "logical",    operand: "==", left: $1, right: $3                }; }
    | Expression "~=" Expression                               { $$ = { op: JQLParser.OP.expression, type: "logical",    operand: "~=", left: $1, right: $3                }; }
    | Expression "<=" Expression                               { $$ = { op: JQLParser.OP.expression, type: "logical",    operand: "<=", left: $1, right: $3                }; }
    | Expression "<"  Expression                               { $$ = { op: JQLParser.OP.expression, type: "logical",    operand: "<",  left: $1, right: $3                }; }
    | Expression ">=" Expression                               { $$ = { op: JQLParser.OP.expression, type: "logical",    operand: ">=",  left: $1, right: $3               }; }
    | Expression ">"  Expression                               { $$ = { op: JQLParser.OP.expression, type: "logical",    operand: ">",  left: $1, right: $3                }; }

    | Expression "*"  Expression                               { $$ = { op: JQLParser.OP.expression, type: "math",       operand: "*",  left: $1, right: $3                }; }
    | Expression "/"  Expression                               { $$ = { op: JQLParser.OP.expression, type: "math",       operand: "/",  left: $1, right: $3                }; }
    | Expression "+"  Expression                               { $$ = { op: JQLParser.OP.expression, type: "math",       operand: "+",  left: $1, right: $3                }; }
    | Expression "-"  Expression                               { $$ = { op: JQLParser.OP.expression, type: "math",       operand: "-",  left: $1, right: $3                }; }
    | FunctionCall                                             { $$ = $1;                                                                                                     }
    | "(" Expression ")"                                       { $$ = { op: JQLParser.OP.expression, type: "group",      value: $2                                         }; }
    | "IDENTIFIER"                                             { $$ = { op: JQLParser.OP.expression, type: "identifier", name:  $1                                         }; }
    | "ESCAPED_IDENTIFIER"                                     { $$ = { op: JQLParser.OP.expression, type: "identifier", name:  JQLParser.unescapeIdentifier($1)           }; }
    | "BINDING"                                                { $$ = { op: JQLParser.OP.expression, type: "binding",    name:  JQLParser.unescapeBindingName($1)          }; }
    ;

FunctionCall
    : "IDENTIFIER" "(" ")"                                     { $$ = { op: JQLParser.OP.expression, type: "function_call", function_name: $1, arguments: []               }; }
    | "IDENTIFIER" "(" FunctionCallArgumentsList ")"           { $$ = { op: JQLParser.OP.expression, type: "function_call", function_name: $1, arguments: $3               }; }
    ;

FunctionCallArgumentsList
    : Expression                                               { $$ = [ $1 ]; }
    | FunctionCallArgumentsList "," Expression                 { $$ = $1.concat($3); }
    ;

OrderByClause
    : "RANDOM"                                                 { $$ = { op: JQLParser.OP.order_by_option, type: "random" } }
    | OrderByClauseFieldsList                                  { $$ = { op: JQLParser.OP.order_by_option, type: "by_fields", fields: $1 } }
    ;

OrderByClauseFieldsList
    : OrderByField                                             { $$ = [ $1 ]; }
    | OrderByClauseFieldsList "," OrderByField                 { $$ = $1.concat($3); }
    ;

OrderByField
    : Expression "ASC"                                         { $$ = { op: JQLParser.OP.order_by_expression, expression: $1, direction: 'asc' }; }
    | Expression "DESC"                                        { $$ = { op: JQLParser.OP.order_by_expression, expression: $1, direction: 'desc' }; }
    | Expression                                               { $$ = { op: JQLParser.OP.order_by_expression, expression: $1, direction: 'asc' }; }
    ;

LimitClause
    : "NUMBER"                                                 { $$ = { op: JQLParser.OP.limit_option, limit: JQLParser.parseNumber( $1 ), skip: 0                                }; }
    | "NUMBER" "," "NUMBER"                                    { $$ = { op: JQLParser.OP.limit_option, limit: JQLParser.parseNumber( $3 ), skip: JQLParser.parseNumber( $1 )      }; }
    ;