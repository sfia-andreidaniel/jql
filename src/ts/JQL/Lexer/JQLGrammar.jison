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

<<EOF>>                             return 'EOF';
.                                   return 'INVALID';

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
                                                                    //js
                                                                    $$ = $2;
                                                                    $$.remote = true;
                                                                    return $$;
                                                                    //php JQL_AST::trace(302);
                                                               }
    | Statement EOF                                            {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.remote = false;
                                                                    return $$;
                                                                    //php JQL_AST::trace(309);
                                                               }
    ;

Statement
    : SelectStatement                                          {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php JQL_AST::trace(317);
                                                               }
    | UpdateStatement                                          {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php JQL_AST::trace(322);
                                                               }
    | InsertStatement                                          {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php JQL_AST::trace(327);
                                                               }
    | DeleteStatement                                          {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php JQL_AST::trace(332);
                                                               }
    ;

SelectSingleRowStatement
    : "SELECT" SelectFieldsList                                {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.STATEMENT,
                                                                        type:         JQL_AST.STATEMENT_TYPES.SELECT,
                                                                        fields:       $2
                                                                    };
                                                                    //php JQL_AST::trace(344);
                                                               }
    ;

SelectFromTableStatement
    : SelectSingleRowStatement 
      "FROM" TableReference                                    {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.table = $3
                                                                    //php JQL_AST::trace(354);
                                                               }
    ;

SelectWithOptionalWHEREClause
    : SelectFromTableStatement "WHERE" Expression              {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.where = $3;
                                                                    //php JQL_AST::trace(363);
                                                               }
    | SelectFromTableStatement                                 {
                                                                    $$ = $1;
                                                                    //php JQL_AST::trace(367);
                                                               }
    ;

SelectWithOptionalORDERClause
    : SelectWithOptionalWHEREClause "ORDER" "BY" OrderByClause {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.orderBy = $4;
                                                                    //php JQL_AST::trace(376);
                                                               }
    | SelectWithOptionalWHEREClause                            {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php JQL_AST::trace(381);
                                                               }
    ;

SelectWithOptionalLIMITClause
    : SelectWithOptionalORDERClause "LIMIT" LimitClause        {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.limit = $3;
                                                                    //php JQL_AST::trace(390);
                                                               }
    | SelectWithOptionalORDERClause                            {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php JQL_AST::trace(395);
                                                               }
    ;

SelectStatementWithoutUnion
    : SelectWithOptionalLIMITClause                            {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php JQL_AST::trace(403);
                                                               }
    | SelectSingleRowStatement                                 {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php JQL_AST::trace(408);
                                                               }
    ;

SelectStatement
    : SelectStatementWithoutUnion                              {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php JQL_AST::trace(416);
                                                               }
    | SelectStatement "UNION" SelectStatementWithoutUnion      {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.union = $3;
                                                                    //php JQL_AST::trace(422);
                                                               }
    ;


UpdateStatementBegin
    : "UPDATE" DelayedClause                                   {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.STATEMENT,
                                                                        type:         JQL_AST.STATEMENT_TYPES.UPDATE,
                                                                        delayed: $2
                                                                    };
                                                                    //php JQL_AST::trace(435);
                                                               }
    | "UPDATE"                                                 {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.STATEMENT,
                                                                        type:         JQL_AST.STATEMENT_TYPES.UPDATE
                                                                    };//php JQL_AST::trace(442);
                                                               }
    ;

DelayedClause
    : "DELAYED" "NUMBER"                                       {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.OPTION_DELAYED,
                                                                        timer:        JQL_AST.parseNumber($2)
                                                                    };
                                                                    //php JQL_AST::trace(453);
                                                               }
    | "DELAYED"                                                {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.OPTION_DELAYED,
                                                                        timer:        null
                                                                    };
                                                                    //php JQL_AST::trace(461);
                                                               }
    ;

UpdateAllRowsStatement
    : UpdateStatementBegin TableReference 
      "SET" UpdateFieldsList                                   {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.table = $2;
                                                                    $$.fields = $4;
                                                                    //php JQL_AST::trace(472);
                                                               }
    ;

UpdateWithOptionalWHEREStatement
    : UpdateAllRowsStatement "WHERE" Expression                {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.where = $3;
                                                                    //php JQL_AST::trace(481);
                                                               }
    | UpdateAllRowsStatement                                   {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php JQL_AST::trace(486);
                                                               }
    ;

UpdateWithOptionalORDERStatement
    : UpdateWithOptionalWHEREStatement 
      "ORDER" "BY" OrderByClause                               {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.orderBy = $4;
                                                                    //php JQL_AST::trace(496);
                                                               }
    | UpdateWithOptionalWHEREStatement
    ;

UpdateWithOptionalLIMITStatement
    : UpdateWithOptionalORDERStatement "LIMIT" LimitClause     {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.limit = $3;
                                                                    //php JQL_AST::trace(506);
                                                               }
    | UpdateWithOptionalORDERStatement                         {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php JQL_AST::trace(511);
                                                               }
    ;

UpdateStatement
    : UpdateWithOptionalLIMITStatement                         {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php JQL_AST::trace(519);
                                                               }
    ;

InsertStatementBegin
    : "INSERT" "IGNORE"                                        {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.STATEMENT,
                                                                        type:         JQL_AST.STATEMENT_TYPES.INSERT,
                                                                        ignoreDuplicates: true
                                                                    };
                                                                    //php JQL_AST::trace(531);
                                                               }
    | "INSERT"                                                 {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.STATEMENT,
                                                                        type:         JQL_AST.STATEMENT_TYPES.INSERT
                                                                    };
                                                                    //php JQL_AST::trace(539);
                                                               }
    ;

InsertStatement
    : InsertStatementBegin "INTO" TableReference
      "SET" UpdateFieldsList                                   {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.table = $3;
                                                                    $$.fields = $5;
                                                                    //php JQL_AST::trace(550);
                                                               }
    ;

DeleteAllRowsStatement
    : "DELETE" "FROM" TableReference                           {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.STATEMENT,
                                                                        type:         JQL_AST.STATEMENT_TYPES.DELETE,
                                                                        table:        $3
                                                                    };
                                                                    //php JQL_AST::trace(562);
                                                               }
    ;

DeleteWithOptionalWHEREClauseStatement
    : DeleteAllRowsStatement "WHERE" Expression                {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.where = $3;
                                                                    //php JQL_AST::trace(571);
                                                               }
    | DeleteAllRowsStatement                                   {
                                                                    $$ = $1;
                                                                    //php JQL_AST::trace(575);
                                                               }
    ;

DeleteWithOptionalORDERClauseStatement
    : DeleteWithOptionalWHEREClauseStatement
      "ORDER" "BY" OrderByClause                               {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.orderBy = $4;
                                                                    //php JQL_AST::trace(585);
                                                               }
    | DeleteWithOptionalWHEREClauseStatement                   {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php JQL_AST::trace(590);
                                                               }
    ;

DeleteWithOptionalLIMITClauseStatement
    : DeleteWithOptionalORDERClauseStatement
      "LIMIT" LimitClause                                      {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.limit = $3;
                                                                    //php JQL_AST::trace(600);
                                                               }
    | DeleteWithOptionalORDERClauseStatement                   {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php JQL_AST::trace(605);
                                                               }
    ;

DeleteStatement
    : DeleteWithOptionalLIMITClauseStatement                   {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php JQL_AST::trace(613);
                                                               }
    ;

TableReference
    : "IDENTIFIER"                                             {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.TABLE_REFERENCE,
                                                                        name:         $1
                                                                    };
                                                                    //php JQL_AST::trace(624);
                                                               }
    | "ESCAPED_IDENTIFIER"                                     {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.TABLE_REFERENCE,
                                                                        name:         JQL_AST.unescapeIdentifier( $1 )
                                                                    };
                                                                    //php JQL_AST::trace(632);
                                                               }
    ;

SelectFieldsList
    : "*"                                                      {
                                                                    //js
                                                                    $$ = {
                                                                         op:          JQL_AST.TOKEN_TYPES.FIELDS_LIST,
                                                                         type:        JQL_AST.FIELD_TYPES.ALL_FIELDS
                                                                    };
                                                                    //php JQL_AST::trace(643);
                                                               }
    | SelectFieldEnumeration                                   {
                                                                    //js
                                                                    $$ = { op:        JQL_AST.TOKEN_TYPES.FIELDS_LIST,
                                                                        type:         JQL_AST.FIELD_TYPES.SPECIFIC_FIELDS,
                                                                        fields:       $1
                                                                    };
                                                                    //php JQL_AST::trace(651);
                                                               }
    ;

SelectFieldEnumeration
    : SelectField                                              {
                                                                    //js
                                                                    $$ = [ $1 ];
                                                                    //php JQL_AST::trace(659);
                                                               }
    | SelectFieldEnumeration "," SelectField                   {
                                                                    //js
                                                                    $$ = $1.concat($3);
                                                                    //php JQL_AST::trace(664);
                                                               }
    ;

SelectField
    : Expression                                               {
                                                                    //js
                                                                    $$ = {
                                                                         op:          JQL_AST.TOKEN_TYPES.FIELD,
                                                                         literal:     JQL_AST.createFieldAliasFromExpression($1),
                                                                         expression:  $1
                                                                     };
                                                                    //php JQL_AST::trace(676);
                                                               }
    | Expression "AS" "IDENTIFIER"                             {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.FIELD,
                                                                        literal:      $3,
                                                                        expression:   $1
                                                                    };
                                                                    //php JQL_AST::trace(685);
                                                               }
    | Expression "AS" "ESCAPED_IDENTIFIER"                     {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.FIELD,
                                                                        literal:      JQL_AST.unescapeIdentifier($3),
                                                                        expression:   $1
                                                                    };
                                                                    //php JQL_AST::trace(694);
                                                               }
    ;

UpdateFieldsList
    : UpdateField                                              {
                                                                    //js
                                                                    $$ = [ $1 ];
                                                                    //php JQL_AST::trace(702);
                                                               }
    | UpdateFieldsList "SET" UpdateField                       {
                                                                    //js
                                                                    $$ = $1.concat($3);
                                                                    //php JQL_AST::trace(707);
                                                               }
    | UpdateFieldsList "," UpdateField                         {
                                                                    //js
                                                                    $$ = $1.concat($3);
                                                                    //php JQL_AST::trace(712);
                                                               }
    ;

UpdateField
    : "IDENTIFIER" "=" Expression                              {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.UPDATE_FIELD,
                                                                        name:         $1,
                                                                        expression:   $3
                                                                    };
                                                                    //php JQL_AST::trace(724);
                                                               }
    | "ESCAPED_IDENTIFIER" "=" Expression                      {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.UPDATE_FIELD,
                                                                        name:         JQL_AST.unescapeIdentifier($1),
                                                                        expression:   $3
                                                                    };
                                                                    //php JQL_AST::trace(733);
                                                               }
    ;

Expression
    : "NUMBER"                                                 {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.NUMBER,
                                                                        value:        JQL_AST.parseNumber( $1 )
                                                                    };
                                                                    //php JQL_AST::trace(745);
                                                               }
    | "BOOLEAN"                                                {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.BOOLEAN,
                                                                        value:        JQL_AST.parseBoolean( $1 )
                                                                    };
                                                                    //php JQL_AST::trace(754);
                                                               }
    | "NULL"                                                   {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.NULL
                                                                    };
                                                                    //php JQL_AST::trace(762);
                                                               }
    | "STRING"                                                 {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.STRING,
                                                                        value:        JQL_AST.parseString( $1 )
                                                                    };
                                                                    //php JQL_AST::trace(771);
                                                               }
    
    | "!" Expression                                           {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.UNARY,
                                                                        operator:     JQL_AST.OPERATOR.NOT,
                                                                        left:         $2
                                                                    };
                                                                    //php JQL_AST::trace(782);
                                                               }
    | "-" Expression                                           {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.UNARY,
                                                                        operator:     JQL_AST.OPERATOR.INVERT,
                                                                        left:         $2
                                                                    };
                                                                    //php JQL_AST::trace(792);
                                                               }
    
    | Expression "||" Expression                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.LOGICAL,
                                                                        operator:     JQL_AST.OPERATOR.OR,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                                    //php JQL_AST::trace(804);
                                                               }
    | Expression "&&" Expression                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.LOGICAL,
                                                                        operator:     JQL_AST.OPERATOR.AND,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                                    //php JQL_AST::trace(815);
                                                               }

    | Expression "==" Expression                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.LOGICAL,
                                                                        operator:     JQL_AST.OPERATOR.EQUALS,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                                    //php JQL_AST::trace(827);
                                                               }
    | Expression "~=" Expression                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.LOGICAL,
                                                                        operator:     JQL_AST.OPERATOR.LIKE,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                                    //php JQL_AST::trace(838);
                                                               }
    | Expression "<=" Expression                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.LOGICAL,
                                                                        operator:     JQL_AST.OPERATOR.LTE,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                                    //php JQL_AST::trace(849);
                                                               }
    | Expression "<"  Expression                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.LOGICAL,
                                                                        operator:     JQL_AST.OPERATOR.LT,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                                    //php JQL_AST::trace(860);
                                                               }
    | Expression ">=" Expression                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.LOGICAL,
                                                                        operator:     JQL_AST.OPERATOR.GTE,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                                    //php JQL_AST::trace(871);
                                                               }
    | Expression ">"  Expression                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.LOGICAL,
                                                                        operator:     JQL_AST.OPERATOR.GT,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                                    //php JQL_AST::trace(882);
                                                               }

    | Expression "*"  Expression                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.MATH,
                                                                        operator:     JQL_AST.OPERATOR.MULTIPLY,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                                    //php JQL_AST::trace(894);
                                                               }
    | Expression "/"  Expression                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.MATH,
                                                                        operand:      JQL_AST.OPERATOR.DIVISION,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                                    //php JQL_AST::trace(905);
                                                               }
    | Expression "+"  Expression                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.MATH,
                                                                        operator:     JQL_AST.OPERATOR.ADDITION,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                                    //php JQL_AST::trace(916);
                                                               }
    | Expression "-"  Expression                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.MATH,
                                                                        operator:     JQL_AST.OPERATOR.DIFFERENCE,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                                    //php JQL_AST::trace(927);
                                                               }
    | FunctionCall                                             {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php JQL_AST::trace(932);
                                                               }
    | "(" Expression ")"                                       {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.GROUP,
                                                                        expression:   $2
                                                                    };
                                                                    //php JQL_AST::trace(941);
                                                               }
    | "IDENTIFIER"                                             {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.IDENTIFIER,
                                                                        name:         $1
                                                                    };
                                                                    //php JQL_AST::trace(950);
                                                               }
    | "ESCAPED_IDENTIFIER"                                     {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.IDENTIFIER,
                                                                        name:         JQL_AST.unescapeIdentifier($1)
                                                                    };
                                                                    //php JQL_AST::trace(959);
                                                               }
    | "BINDING"                                                {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.BINDING,
                                                                        name:         JQL_AST.unescapeBindingName($1)
                                                                    };
                                                                    //php JQL_AST::trace(968);
                                                               }
    ;

FunctionCall
    : "IDENTIFIER" "(" ")"                                     {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.FUNCTION_CALL,
                                                                        function_name: $1,
                                                                        arguments:    []
                                                                    };
                                                                    //php JQL_AST::trace(981);
                                                               }
    | "IDENTIFIER" "(" FunctionCallArgumentsList ")"           {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         JQL_AST.EXPRESSION.FUNCTION_CALL,
                                                                        function_name: $1,
                                                                        arguments:    $3
                                                                    };
                                                                    //php JQL_AST::trace(991);
                                                               }
    ;

FunctionCallArgumentsList
    : Expression                                               {
                                                                    //js
                                                                    $$ = [ $1 ];
                                                                    //php JQL_AST::trace(999);
                                                               }
    | FunctionCallArgumentsList "," Expression                 {
                                                                    //js
                                                                    $$ = $1.concat($3);
                                                                    //php JQL_AST::trace(1004);
                                                               }
    ;

OrderByClause
    : "RANDOM"                                                 {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.OPTION_ORDERING,
                                                                        type:         JQL_AST.ORDERING_STRATEGY.RANDOM
                                                                    };
                                                                    //php JQL_AST::trace(1015);
                                                               }
    | OrderByClauseFieldsList                                  {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.OPTION_ORDERING,
                                                                        type:         JQL_AST.ORDERING_STRATEGY.ORDERED,
                                                                        fields:       $1
                                                                    };
                                                                    //php JQL_AST::trace(1024);
                                                               }
    ;

OrderByClauseFieldsList
    : OrderByField                                             {
                                                                    //js
                                                                    $$ = [ $1 ];
                                                                    //php JQL_AST::trace(1032);
                                                               }
    | OrderByClauseFieldsList "," OrderByField                 {
                                                                    //js
                                                                    $$ = $1.concat($3);
                                                                    //php JQL_AST::trace(1037);
                                                               }
    ;

OrderByField
    : Expression "ASC"                                         {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.ORDER_EXPRESSION,
                                                                        expression:   $1,
                                                                        direction:    JQL_AST.ORDER_DIRECTION.ASCENDING
                                                                    };
                                                                    //php JQL_AST::trace(1049);
                                                               }
    }
    | Expression "DESC"                                        {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.ORDER_EXPRESSION,
                                                                        expression:   $1,
                                                                        direction:    JQL_AST.ORDER_DIRECTION.DESCENDING
                                                                    };
                                                                    //php JQL_AST::trace(1059);
                                                               }
    | Expression                                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.ORDER_EXPRESSION,
                                                                        expression:   $1,
                                                                        direction:    JQL_AST.ORDER_DIRECTION.ASCENDING
                                                                    };
                                                                    //php JQL_AST::trace(1068);
                                                               }
    ;

LimitClause
    : "NUMBER"                                                 {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.OPTION_LIMIT,
                                                                        limit:        JQL_AST.parseNumber( $1 ),
                                                                        skip:         0
                                                                    };
                                                                    //php JQL_AST::trace(1080);
                                                               }
    | "NUMBER" "," "NUMBER"                                    {
                                                                    //js
                                                                    $$ = {
                                                                        op:           JQL_AST.TOKEN_TYPES.OPTION_LIMIT,
                                                                        limit:        JQL_AST.parseNumber( $3 ),
                                                                        skip:         JQL_AST.parseNumber( $1 )
                                                                    };
                                                                    //php JQL_AST::trace(1089);
                                                               }
    ;