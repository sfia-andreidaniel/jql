/* description: Parses and Tokenize JQL language. */

/*
 * -- PARSER JavaScript code --
 */
%{

    // JQL Abstract Syntax Tree
    var JQL_AST = {

        STATEMENT_TYPES: {
            SELECT:                'select',
            UPDATE:                'update',
            INSERT:                'insert',
            DELETE:                'delete'
        },

        TOKEN_TYPES: {
            STATEMENT:             'statement',
            TABLE_REFERENCE:       'table_reference',
            EXPRESSION:            'expression',
            FIELDS_LIST:           'fields_list',
            FIELD:                 'field',
            UPDATE_FIELD:          'update_field',
            OPTION_DELAYED:        'delayed_option',
            OPTION_LIMIT:          'limit_option',
            OPTION_ORDERING:       'order_by_option',
            ORDER_EXPRESSION:      'order_by_expression'
        },

        EXPRESSION: {
            NUMBER:                'number',        // 0, 2.123, 2, 231231
            BOOLEAN:               'boolean',       // true, false
            NULL:                  'null',          // null
            STRING:                'string',        // "mumu"
            UNARY:                 'unary',         // !foo, -a
            LOGICAL:               'logical',       // a && b, 2 || true
            MATH:                  'math',          // foo + 3, 2 / 4
            GROUP:                 'group',         // ( 2 + 3 * 6 + sum( '2', 3 ) )
            IDENTIFIER:            'identifier',    // foo
            BINDING:               'binding',       // :foo
            FUNCTION_CALL:         'function_call'  // foo(2, 3, mar(bar + 2) )
        },

        OPERATOR: {

            NOT:                   '!',             // !true, !1, !asd, !"1"
            INVERT:                '-',             // -3, -true, -"asd",

            OR:                    '||',            // a or b, a || b
            AND:                   '&&',            // a && b, a and b

            EQUALS:                '==',            // a == b, 1 == 2
            LIKE:                  '~=',            // a ~= '%foo'

            LTE:                   '<=',            // 3 <= 4
            LT:                    '<',             // 3 <  4
            GTE:                   '>=',            // 4 >= 3
            GT:                    '>',             // 4 > 3

            MULTIPLY:              '*',             // 3 * 4
            DIVISION:              '/',             // 3 / 4

            ADDITION:              '+',             // 3 + 4
            DIFFERENCE:            '-',             // 4 - 3

        },

        ORDERING_STRATEGY: {
            RANDOM:                'random',
            ORDERED:               'ordered'
        },

        ORDER_DIRECTION: {
            ASCENDING:             'asc',
            DESCENDING:            'desc'
        },

        FIELD_TYPES: {
            ALL_FIELDS:            'all',
            SPECIFIC_FIELDS:       'enumeration'
        },

        id: 0,

        createAlias: function( prefix ) {
            JQL_AST.id++;
            return ( prefix || 'field_' ) + JQL_AST.id;
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
        },

        createFieldAliasFromExpression: function( expression ) {
            switch ( expression.type ) {
                case 'string':
                case 'boolean':
                case 'number':
                    return String( expression.value );
                case 'null':
                    return 'null';
                default:
                    return null;
            }
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

"remote"                            return 'REMOTE';
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

/**
 * START JQL LANGUAGE DEFINITION
 */
%start JQL

%% /* language grammar */

JQL
    : "REMOTE" Statement EOF                                   {
                                                                    $$ = $2;
                                                                    $$.remote = true;
                                                                    return $$;
                                                               }
    | Statement EOF                                            {
                                                                    $$ = $1;
                                                                    $$.remote = false;
                                                                    return $$;
                                                               }
    ;

Statement
    : SelectStatement                                          {
                                                                    $$ = $1;
                                                               }
    | UpdateStatement                                          {
                                                                    $$ = $1;
                                                               }
    | InsertStatement                                          {
                                                                    $$ = $1;
                                                               }
    | DeleteStatement                                          {
                                                                    $$ = $1;
                                                               }
    ;

SelectSingleRowStatement
    : "SELECT" SelectFieldsList                                {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.STATEMENT,
                                                                        type:         JQL_AST.STATEMENT_TYPES.SELECT,
                                                                        fields:       $2
                                                                    };
                                                               }
    ;

SelectFromTableStatement
    : SelectSingleRowStatement 
      "FROM" TableReference                                    {
                                                                    $$ = $1;
                                                                    $$.table = $3
                                                               }
    ;

SelectWithOptionalWHEREClause
    : SelectFromTableStatement "WHERE" Expression              {
                                                                    $$ = $1;
                                                                    $$.where = $3;
                                                               }
    | SelectFromTableStatement                                 {
                                                                    $$ = $1;
                                                               }
    ;

SelectWithOptionalORDERClause
    : SelectWithOptionalWHEREClause "ORDER" "BY" OrderByClause {
                                                                    $$ = $1;
                                                                    $$.orderBy = $4;
                                                               }
    | SelectWithOptionalWHEREClause                            {
                                                                    $$ = $1;
                                                               }
    ;

SelectWithOptionalLIMITClause
    : SelectWithOptionalORDERClause "LIMIT" LimitClause        {
                                                                    $$ = $1;
                                                                    $$.limit = $3;
                                                               }
    | SelectWithOptionalORDERClause                            {
                                                                    $$ = $1;
                                                               }
    ;

SelectStatementWithoutUnion
    : SelectWithOptionalLIMITClause                            {
                                                                    $$ = $1;
                                                               }
    | SelectSingleRowStatement                                 {
                                                                    $$ = $1;
                                                               }
    ;

SelectStatement
    : SelectStatementWithoutUnion                              {
                                                                    $$ = $1;
                                                               }
    | SelectStatement "UNION" SelectStatementWithoutUnion      {
                                                                    $$ = $1;
                                                                    $$.union = $3;
                                                               }
    ;


UpdateStatementBegin
    : "UPDATE" DelayedClause                                   {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.STATEMENT,
                                                                        type:         JQL_AST.STATEMENT_TYPES.UPDATE,
                                                                        delayed: $2
                                                                    };
                                                               }
    | "UPDATE"                                                 {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.STATEMENT,
                                                                        type:         JQL_AST.STATEMENT_TYPES.UPDATE
                                                                    };
                                                               }
    ;

DelayedClause
    : "DELAYED" "NUMBER"                                       {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.OPTION_DELAYED,
                                                                        timer:        JQL_AST.parseNumber($2)
                                                                    };
                                                               }
    | "DELAYED"                                                {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.OPTION_DELAYED,
                                                                        timer:        null
                                                                    };
                                                               }
    ;

UpdateAllRowsStatement
    : UpdateStatementBegin TableReference 
      "SET" UpdateFieldsList                                   {
                                                                    $$ = $1;
                                                                    $$.table = $2;
                                                                    $$.fields = $4;
                                                               }
    ;

UpdateWithOptionalWHEREStatement
    : UpdateAllRowsStatement "WHERE" Expression                {
                                                                    $$ = $1;
                                                                    $$.where = $3;
                                                               }
    | UpdateAllRowsStatement                                   {
                                                                    $$ = $1;
                                                               }
    ;

UpdateWithOptionalORDERStatement
    : UpdateWithOptionalWHEREStatement 
      "ORDER" "BY" OrderByClause                               {
                                                                    $$ = $1;
                                                                    $$.orderBy = $4;
                                                               }
    | UpdateWithOptionalWHEREStatement
    ;

UpdateWithOptionalLIMITStatement
    : UpdateWithOptionalORDERStatement "LIMIT" LimitClause     {
                                                                    $$ = $1;
                                                                    $$.limit = $3;
                                                               }
    | UpdateWithOptionalORDERStatement                         {
                                                                    $$ = $1;
                                                               }
    ;

UpdateStatement
    : UpdateWithOptionalLIMITStatement                         {
                                                                    $$ = $1;
                                                               }
    ;

InsertStatementBegin
    : "INSERT" "IGNORE"                                        {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.STATEMENT,
                                                                        type:         JQL_AST.STATEMENT_TYPES.INSERT,
                                                                        ignoreDuplicates: true
                                                                    };
                                                               }
    | "INSERT"                                                 {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.STATEMENT,
                                                                        type:         JQL_AST.STATEMENT_TYPES.INSERT
                                                                    };
                                                               }
    ;

InsertStatement
    : InsertStatementBegin "INTO" TableReference
      "SET" UpdateFieldsList                                   {
                                                                    $$ = $1;
                                                                    $$.table = $3;
                                                                    $$.fields = $5;
                                                               }
    ;

DeleteAllRowsStatement
    : "DELETE" "FROM" TableReference                           {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.STATEMENT,
                                                                        type:         JQL_AST.STATEMENT_TYPES.DELETE,
                                                                        table:        $3
                                                                    };
                                                               }
    ;

DeleteWithOptionalWHEREClauseStatement
    : DeleteAllRowsStatement "WHERE" Expression                {
                                                                    $$ = $1;
                                                                    $$.where = $3;
                                                               }
    | DeleteAllRowsStatement                                   {
                                                                    $$ = $1;
                                                               }
    ;

DeleteWithOptionalORDERClauseStatement
    : DeleteWithOptionalWHEREClauseStatement
      "ORDER" "BY" OrderByClause                               {
                                                                    $$ = $1;
                                                                    $$.orderBy = $4;
                                                               }
    | DeleteWithOptionalWHEREClauseStatement                   {
                                                                    $$ = $1;
                                                               }
    ;

DeleteWithOptionalLIMITClauseStatement
    : DeleteWithOptionalORDERClauseStatement
      "LIMIT" LimitClause                                      {
                                                                    $$ = $1;
                                                                    $$.limit = $3;
                                                               }
    | DeleteWithOptionalORDERClauseStatement                   {
                                                                    $$ = $1;
                                                               }
    ;

DeleteStatement
    : DeleteWithOptionalLIMITClauseStatement                   {
                                                                    $$ = $1;
                                                               }
    ;

TableReference
    : "IDENTIFIER"                                             {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.TABLE_REFERENCE,
                                                                        name:         $1
                                                                    };
                                                               }
    | "ESCAPED_IDENTIFIER"                                     {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.TABLE_REFERENCE,
                                                                        name:         JQL_AST.unescapeIdentifier( $1 )
                                                                    };
                                                               }
    ;

SelectFieldsList
    : "*"                                                      {
                                                                    $$ = {
                                                                         op:          JQL_AST.TOKEN_TYPES.FIELDS_LIST,
                                                                         type:        JQL_AST.FIELD_TYPES.ALL_FIELDS
                                                                    };
                                                               }
    | SelectFieldEnumeration                                   {
                                                                    $$ = { op:        JQL_AST.TOKEN_TYPES.FIELDS_LIST,
                                                                        type:         JQL_AST.FIELD_TYPES.SPECIFIC_FIELDS,
                                                                        fields:       $1
                                                                    };
                                                               }
    ;

SelectFieldEnumeration
    : SelectField                                              {
                                                                    $$ = [
                                                                        $1
                                                                    ];
                                                               }
    | SelectFieldEnumeration "," SelectField                   {
                                                                    $$ = $1.concat($3);
                                                               }
    ;

SelectField
    : Expression                                               {
                                                                    $$ = {
                                                                         op:          JQL_AST.TOKEN_TYPES.FIELD,
                                                                         literal:     JQL_AST.createFieldAliasFromExpression($1),
                                                                         expression:  $1
                                                                     };
                                                               }
    | Expression "AS" "IDENTIFIER"                             {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.FIELD,
                                                                        literal:      $3,
                                                                        expression:   $1
                                                                    };
                                                               }
    | Expression "AS" "ESCAPED_IDENTIFIER"                     {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.FIELD,
                                                                        literal:      JQL_AST.unescapeIdentifier($3),
                                                                        expression:   $1
                                                                    };
                                                               }
    ;

UpdateFieldsList
    : UpdateField                                              {
                                                                    $$ = [
                                                                        $1
                                                                    ];
                                                               }
    | UpdateFieldsList "SET" UpdateField                       {
                                                                    $$ = $1.concat($3);
                                                               }
    | UpdateFieldsList "," UpdateField                         {
                                                                    $$ = $1.concat($3);
                                                               }
    ;

UpdateField
    : "IDENTIFIER" "=" Expression                              {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.UPDATE_FIELD,
                                                                        name:         $1,
                                                                        expression:   $3
                                                                    };
                                                               }
    | "ESCAPED_IDENTIFIER" "=" Expression                      {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.UPDATE_FIELD,
                                                                        name:         JQL_AST.unescapeIdentifier($1),
                                                                        expression:   $3
                                                                    };
                                                               }
    ;

Expression
    : "NUMBER"                                                 {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.NUMBER,
                                                                        value:        JQL_AST.parseNumber( $1 )
                                                                    };
                                                               }
    | "BOOLEAN"                                                {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.BOOLEAN,
                                                                        value:        JQL_AST.parseBoolean( $1 )
                                                                    };
                                                               }
    | "NULL"                                                   {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.NULL
                                                                    };
                                                               }
    | "STRING"                                                 {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.STRING,
                                                                        value:        JQL_AST.parseString( $1 )
                                                                    };
                                                               }
    
    | "!" Expression                                           {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.UNARY,
                                                                        operator:     JQL_AST.OPERATOR.NOT,
                                                                        left:         $2
                                                                    };
                                                               }
    | "-" Expression                                           {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.UNARY,
                                                                        operator:     JQL_AST.OPERATOR.INVERT,
                                                                        left:         $2
                                                                    };
                                                               }
    
    | Expression "||" Expression                               {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.LOGICAL,
                                                                        operator:     JQL_AST.OPERATOR.OR,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                               }
    | Expression "&&" Expression                               {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.LOGICAL,
                                                                        operator:     JQL_AST.OPERATOR.AND,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                               }

    | Expression "==" Expression                               {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.LOGICAL,
                                                                        operator:     JQL_AST.OPERATOR.EQUALS,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                               }
    | Expression "~=" Expression                               {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.LOGICAL,
                                                                        operator:     JQL_AST.OPERATOR.LIKE,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                               }
    | Expression "<=" Expression                               {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.LOGICAL,
                                                                        operator:     JQL_AST.OPERATOR.LTE,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                               }
    | Expression "<"  Expression                               {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.LOGICAL,
                                                                        operator:     JQL_AST.OPERATOR.LT,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                               }
    | Expression ">=" Expression                               {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.LOGICAL,
                                                                        operator:     JQL_AST.OPERATOR.GTE,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                               }
    | Expression ">"  Expression                               {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.LOGICAL,
                                                                        operator:     JQL_AST.OPERATOR.GT,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                               }

    | Expression "*"  Expression                               {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.MATH,
                                                                        operator:     JQL_AST.OPERATOR.MULTIPLY,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                               }
    | Expression "/"  Expression                               {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.MATH,
                                                                        operand:      JQL_AST.OPERATOR.DIVISION,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                               }
    | Expression "+"  Expression                               {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.MATH,
                                                                        operator:     JQL_AST.OPERATOR.ADDITION,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                               }
    | Expression "-"  Expression                               {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.MATH,
                                                                        operator:     JQL_AST.OPERATOR.DIFFERENCE,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                               }
    | FunctionCall                                             {
                                                                    $$ = $1;
                                                               }
    | "(" Expression ")"                                       {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.GROUP,
                                                                        expression:   $2
                                                                    };
                                                               }
    | "IDENTIFIER"                                             {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.IDENTIFIER,
                                                                        name:         $1
                                                                    };
                                                               }
    | "ESCAPED_IDENTIFIER"                                     {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.IDENTIFIER,
                                                                        name:         JQL_AST.unescapeIdentifier($1)
                                                                    };
                                                               }
    | "BINDING"                                                {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.BINDING,
                                                                        name:         JQL_AST.unescapeBindingName($1)
                                                                    };
                                                               }
    ;

FunctionCall
    : "IDENTIFIER" "(" ")"                                     {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.FUNCTION_CALL,
                                                                        function_name: $1,
                                                                        arguments:    []
                                                                    };
                                                               }
    | "IDENTIFIER" "(" FunctionCallArgumentsList ")"           {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.FUNCTION_CALL,
                                                                        function_name: $1,
                                                                        arguments:    $3
                                                                    };
                                                               }
    ;

FunctionCallArgumentsList
    : Expression                                               {
                                                                    $$ = [
                                                                        $1
                                                                    ];
                                                               }
    | FunctionCallArgumentsList "," Expression                 {
                                                                    $$ = $1.concat($3);
                                                               }
    ;

OrderByClause
    : "RANDOM"                                                 {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.OPTION_ORDERING,
                                                                        type:         JQL_AST.ORDERING_STRATEGY.RANDOM
                                                                    };
                                                               }
    | OrderByClauseFieldsList                                  {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.OPTION_ORDERING,
                                                                        type:         JQL_AST.ORDERING_STRATEGY.ORDERED,
                                                                        fields:       $1
                                                                    };
                                                               }
    ;

OrderByClauseFieldsList
    : OrderByField                                             {
                                                                    $$ = [
                                                                        $1
                                                                    ];
                                                               }
    | OrderByClauseFieldsList "," OrderByField                 {
                                                                    $$ = $1.concat($3);
                                                               }
    ;

OrderByField
    : Expression "ASC"                                         {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.ORDER_EXPRESSION,
                                                                        expression:   $1,
                                                                        direction:    JQL_AST.ORDER_DIRECTION.ASCENDING
                                                                    };
                                                               }
    }
    | Expression "DESC"                                        {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.ORDER_EXPRESSION,
                                                                        expression:   $1,
                                                                        direction:    JQL_AST.ORDER_DIRECTION.DESCENDING
                                                                    };
                                                               }
    | Expression                                               {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.ORDER_EXPRESSION,
                                                                        expression:   $1,
                                                                        direction:    JQL_AST.ORDER_DIRECTION.ASCENDING
                                                                    };
                                                               }
    ;

LimitClause
    : "NUMBER"                                                 {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.OPTION_LIMIT,
                                                                        limit:        JQL_AST.parseNumber( $1 ),
                                                                        skip:         0
                                                                    };
                                                               }
    | "NUMBER" "," "NUMBER"                                    {
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.OPTION_LIMIT,
                                                                        limit:        JQL_AST.parseNumber( $3 ),
                                                                        skip:         JQL_AST.parseNumber( $1 )
                                                                    };
                                                               }
    ;