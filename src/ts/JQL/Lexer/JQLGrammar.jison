/* description: Parses and Tokenize JQL language. */

/*
 * -- PARSER JavaScript code --
 */
%{

    // JQL Abstract Syntax Tree
    var AST = {

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
            AST.id++;
            return ( prefix || 'field_' ) + AST.id;
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
                                                                    //php AST::init($$, $2);
                                                                    //php AST::setKey($$, 'remote', true);
                                                                    //php return $$;
                                                               }
    | Statement EOF                                            {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.remote = false;
                                                                    return $$;
                                                                    //php AST::init($$, $1);
                                                                    //php AST::setKey($$, 'remote', false);
                                                                    //php return $$;
                                                               }
    ;

Statement
    : SelectStatement                                          {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php AST::init($$, $1);
                                                               }
    | UpdateStatement                                          {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php AST::init($$, $1);
                                                               }
    | InsertStatement                                          {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php AST::init($$, $1);
                                                               }
    | DeleteStatement                                          {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php AST::init($$, $1);
                                                               }
    ;

SelectSingleRowStatement
    : "SELECT" SelectFieldsList                                {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.STATEMENT,
                                                                        type:         AST.STATEMENT_TYPES.SELECT,
                                                                        fields:       $2
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['STATEMENT']);
                                                                    //php AST::setKey($$, 'type', AST::$STATEMENT_TYPES['SELECT']);
                                                                    //php AST::setKey($$, 'fields', $2);
                                                               }
    ;

SelectFromTableStatement
    : SelectSingleRowStatement
      "FROM" TableReference                                    {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.table = $3
                                                                    //php AST::init($$, $1);
                                                                    //php AST::setKey($$, 'table', $3);
                                                               }
    ;

SelectWithOptionalWHEREClause
    : SelectFromTableStatement "WHERE" Expression              {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.where = $3;
                                                                    //php AST::init($$, $1);
                                                                    //php AST::setKey($$, 'where', $3);
                                                               }
    | SelectFromTableStatement                                 {
                                                                    $$ = $1;
                                                                    //php AST::init($$, $1);
                                                               }
    ;

SelectWithOptionalORDERClause
    : SelectWithOptionalWHEREClause "ORDER" "BY" OrderByClause {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.orderBy = $4;
                                                                    //php AST::init($$, $1);
                                                                    //php AST::setKey($$, 'orderBy', $4);
                                                               }
    | SelectWithOptionalWHEREClause                            {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php AST::init($$, $1);
                                                               }
    ;

SelectWithOptionalLIMITClause
    : SelectWithOptionalORDERClause "LIMIT" LimitClause        {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.limit = $3;
                                                                    //php AST::init($$, $1);
                                                                    //php AST::setKey($$, limit, $3);
                                                               }
    | SelectWithOptionalORDERClause                            {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php AST::init($$, $1);
                                                               }
    ;

SelectStatementWithoutUnion
    : SelectWithOptionalLIMITClause                            {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php AST::init($$, $1);
                                                               }
    | SelectSingleRowStatement                                 {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php AST::init($$, $1);
                                                               }
    ;

SelectStatement
    : SelectStatementWithoutUnion                              {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php AST::init($$, $1);
                                                               }
    | SelectStatement "UNION" SelectStatementWithoutUnion      {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.union = $3;
                                                                    //php AST::init($$, $1);
                                                                    //php AST::setKey($$, 'union', $3);
                                                               }
    ;


UpdateStatementBegin
    : "UPDATE" DelayedClause                                   {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.STATEMENT,
                                                                        type:         AST.STATEMENT_TYPES.UPDATE,
                                                                        delayed: $2
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['STATEMENT']);
                                                                    //php AST::setKey($$, 'type', AST::$STATEMENT_TYPES['UPDATE']);
                                                                    //php AST::setKey($$, 'delayed', $2);
                                                               }
    | "UPDATE"                                                 {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.STATEMENT,
                                                                        type:         AST.STATEMENT_TYPES.UPDATE
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['STATEMENT']);
                                                                    //php AST::setKey($$, 'type', AST::$STATEMENT_TYPES['UPDATE']);
                                                               }
    ;

DelayedClause
    : "DELAYED" "NUMBER"                                       {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.OPTION_DELAYED,
                                                                        timer:        AST.parseNumber($2)
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op',  AST::$TOKEN_TYPES['OPTION_DELAYED']);
                                                                    //php AST::setKey($$, 'timer', AST::parseNumber($2));
                                                               }
    | "DELAYED"                                                {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.OPTION_DELAYED,
                                                                        timer:        null
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['OPTION_DELAYED']);
                                                                    //php AST::setKey($$, 'timer', null);
                                                               }
    ;

UpdateAllRowsStatement
    : UpdateStatementBegin TableReference
      "SET" UpdateFieldsList                                   {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.table = $2;
                                                                    $$.fields = $4;
                                                                    //php AST::init($$, $1);
                                                                    //php AST::setKey($$, 'table', $2);
                                                                    //php AST::setKey($$, 'fields', $4);
                                                               }
    ;

UpdateWithOptionalWHEREStatement
    : UpdateAllRowsStatement "WHERE" Expression                {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.where = $3;
                                                                    //php AST::init($$, $1);
                                                                    //php AST::setKey($$, 'where', $3);
                                                               }
    | UpdateAllRowsStatement                                   {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php AST::init($$, $1);
                                                               }
    ;

UpdateWithOptionalORDERStatement
    : UpdateWithOptionalWHEREStatement
      "ORDER" "BY" OrderByClause                               {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.orderBy = $4;
                                                                    //php AST::init($$, $1);
                                                                    //php AST::setKey($$, 'orderBy', $4);
                                                               }
    | UpdateWithOptionalWHEREStatement
    ;

UpdateWithOptionalLIMITStatement
    : UpdateWithOptionalORDERStatement "LIMIT" LimitClause     {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.limit = $3;
                                                                    //php AST::init($$, $1);
                                                                    //php AST::setKey($$, 'limit', $3);
                                                               }
    | UpdateWithOptionalORDERStatement                         {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php AST::init($$, $1);
                                                               }
    ;

UpdateStatement
    : UpdateWithOptionalLIMITStatement                         {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php AST::init($$, $1);
                                                               }
    ;

InsertStatementBegin
    : "INSERT" "IGNORE"                                        {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.STATEMENT,
                                                                        type:         AST.STATEMENT_TYPES.INSERT,
                                                                        ignoreDuplicates: true
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['STATEMENT']);
                                                                    //php AST::setKey($$, 'type', AST::$STATEMENT_TYPES['INSERT']);
                                                                    //php AST::setKey($$, 'ignoreDuplicates', true);
                                                               }
    | "INSERT"                                                 {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.STATEMENT,
                                                                        type:         AST.STATEMENT_TYPES.INSERT
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['STATEMENT']);
                                                                    //php AST::setKey($$, 'type', AST::$STATEMENT_TYPES['INSERT']);
                                                               }
    ;

InsertStatement
    : InsertStatementBegin "INTO" TableReference
      "SET" UpdateFieldsList                                   {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.table = $3;
                                                                    $$.fields = $5;
                                                                    //php AST::init($$, $1);
                                                                    //php AST::setKey($$, 'table', $3);
                                                                    //php AST::setKey($$, 'fields', $5);
                                                               }
    ;

DeleteAllRowsStatement
    : "DELETE" "FROM" TableReference                           {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.STATEMENT,
                                                                        type:         AST.STATEMENT_TYPES.DELETE,
                                                                        table:        $3
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['STATEMENT']);
                                                                    //php AST::setKey($$, 'type', AST::$STATEMENT_TYPES['DELETE']);
                                                                    //php AST::setKey($$, 'table', $3);
                                                               }
    ;

DeleteWithOptionalWHEREClauseStatement
    : DeleteAllRowsStatement "WHERE" Expression                {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.where = $3;
                                                                    //php AST::init($$, $1);
                                                                    //php AST::setKey($$, 'where', $3);
                                                               }
    | DeleteAllRowsStatement                                   {
                                                                    $$ = $1;
                                                                    //php AST::init($$, $1);
                                                               }
    ;

DeleteWithOptionalORDERClauseStatement
    : DeleteWithOptionalWHEREClauseStatement
      "ORDER" "BY" OrderByClause                               {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.orderBy = $4;
                                                                    //php AST::init($$, $1);
                                                                    //php AST::setKey($$, 'orderBy', $4);
                                                               }
    | DeleteWithOptionalWHEREClauseStatement                   {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php AST::init($$, $1);
                                                               }
    ;

DeleteWithOptionalLIMITClauseStatement
    : DeleteWithOptionalORDERClauseStatement
      "LIMIT" LimitClause                                      {
                                                                    //js
                                                                    $$ = $1;
                                                                    $$.limit = $3;
                                                                    //php AST::init($$, $1);
                                                                    //php AST::setKey($$, 'limit', $3);
                                                               }
    | DeleteWithOptionalORDERClauseStatement                   {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php AST::init($$, $1);
                                                               }
    ;

DeleteStatement
    : DeleteWithOptionalLIMITClauseStatement                   {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php AST::init($$, $1);
                                                               }
    ;

TableReference
    : "IDENTIFIER"                                             {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.TABLE_REFERENCE,
                                                                        name:         $1
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['TABLE_REFERENCE']);
                                                                    //php AST::setKey($$, 'name', $1);
                                                               }
    | "ESCAPED_IDENTIFIER"                                     {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.TABLE_REFERENCE,
                                                                        name:         AST.unescapeIdentifier( $1 )
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['TABLE_REFERENCE']);
                                                                    //php AST::setKey($$, 'name', AST::unescapeIdentifier($1));
                                                               }
    ;

SelectFieldsList
    : "*"                                                      {
                                                                    //js
                                                                    $$ = {
                                                                         op:          AST.TOKEN_TYPES.FIELDS_LIST,
                                                                         type:        AST.FIELD_TYPES.ALL_FIELDS
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['FIELDS_LIST']);
                                                                    //php AST::setKey($$, 'type', AST::$FIELD_TYPES['ALL_FIELDS']);
                                                               }
    | SelectFieldEnumeration                                   {
                                                                    //js
                                                                    $$ = { op:        AST.TOKEN_TYPES.FIELDS_LIST,
                                                                        type:         AST.FIELD_TYPES.SPECIFIC_FIELDS,
                                                                        fields:       $1
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['FIELDS_LIST']);
                                                                    //php AST::setKey($$, 'type', AST::$FIELD_TYPES['SPECIFIC_FIELDS']);
                                                                    //php AST::setKey($$, 'fields', $1);
                                                               }
    ;

SelectFieldEnumeration
    : SelectField                                              {
                                                                    //js
                                                                    $$ = [ $1 ];
                                                                    //php AST::init($$, []);
                                                                    //php AST::push($$, $1);
                                                               }
    | SelectFieldEnumeration "," SelectField                   {
                                                                    //js
                                                                    $$ = $1.concat($3);
                                                                    //php AST::push($1, $3);
                                                               }
    ;

SelectField
    : Expression                                               {
                                                                    //js
                                                                    $$ = {
                                                                         op:          AST.TOKEN_TYPES.FIELD,
                                                                         literal:     AST.createFieldAliasFromExpression($1),
                                                                         expression:  $1
                                                                     };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['FIELD']);
                                                                    //php AST::setKey($$, 'literal', AST::createFieldAliasFromExpression($1));
                                                                    //php AST::setKey($$, 'expression', $1);
                                                               }
    | Expression "AS" "IDENTIFIER"                             {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.FIELD,
                                                                        literal:      $3,
                                                                        expression:   $1
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['FIELD']);
                                                                    //php AST::setKey($$, 'literal', $3);
                                                                    //php AST::setKey($$, 'expression', $1);
                                                               }
    | Expression "AS" "ESCAPED_IDENTIFIER"                     {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.FIELD,
                                                                        literal:      AST.unescapeIdentifier($3),
                                                                        expression:   $1
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['FIELD']);
                                                                    //php AST::setKey($$, 'literal', AST::unescapeIdentifier($3));
                                                                    //php AST::setKey($$, 'expression', $1);
                                                               }
    ;

UpdateFieldsList
    : UpdateField                                              {
                                                                    //js
                                                                    $$ = [ $1 ];
                                                                    //php AST::init($$, []);
                                                                    //php AST::push($$, $1);
                                                               }
    | UpdateFieldsList "SET" UpdateField                       {
                                                                    //js
                                                                    $$ = $1.concat($3);
                                                                    //php AST::push($1, $3);
                                                                    //php AST::init($$, $1);
                                                               }
    | UpdateFieldsList "," UpdateField                         {
                                                                    //js
                                                                    $$ = $1.concat($3);
                                                                    //php AST::push($1, $3);
                                                                    //php AST::init($$, $1);
                                                               }
    ;

UpdateField
    : "IDENTIFIER" "=" Expression                              {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.UPDATE_FIELD,
                                                                        name:         $1,
                                                                        expression:   $3
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['UPDATE_FIELD']);
                                                                    //php AST::setKey($$, 'name', $1);
                                                                    //php AST::setKey($$, 'expression', $3);
                                                               }
    | "ESCAPED_IDENTIFIER" "=" Expression                      {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.UPDATE_FIELD,
                                                                        name:         AST.unescapeIdentifier($1),
                                                                        expression:   $3
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['UPDATE_FIELD']);
                                                                    //php AST::setKey($$, 'name', AST::unescapeIdentifier($1));
                                                                    //php AST::setKey($$, 'expression', $3);
                                                               }
    ;

Expression
    : "NUMBER"                                                 {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         AST.EXPRESSION.NUMBER,
                                                                        value:        AST.parseNumber( $1 )
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['EXPRESSION']);
                                                                    //php AST::setKey($$, 'type', AST::$EXPRESSION['NUMBER']);
                                                                    //php AST::setKey($$, 'value', AST::parseNumber($1));
                                                               }
    | "BOOLEAN"                                                {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         AST.EXPRESSION.BOOLEAN,
                                                                        value:        AST.parseBoolean( $1 )
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['EXPRESSION']);
                                                                    //php AST::setKey($$, 'type', AST::$EXPRESSION['BOOLEAN']);
                                                                    //php AST::setKey($$, 'value', AST::parseBoolean( $1 ));
                                                               }
    | "NULL"                                                   {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         AST.EXPRESSION.NULL
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['EXPRESSION']);
                                                                    //php AST::setKey($$, 'type', AST::$EXPRESSION['NULL']);
                                                               }
    | "STRING"                                                 {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         AST.EXPRESSION.STRING,
                                                                        value:        AST.parseString( $1 )
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['EXPRESSION']);
                                                                    //php AST::setKey($$, 'type', AST::$EXPRESSION['STRING']);
                                                                    //php AST::setKey($$, 'value', AST::parseString($1));
                                                               }

    | "!" Expression                                           {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         AST.EXPRESSION.UNARY,
                                                                        operator:     AST.OPERATOR.NOT,
                                                                        left:         $2
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['EXPRESSION']);
                                                                    //php AST::setKey($$, 'type', AST::$EXPRESSION['UNARY']);
                                                                    //php AST::setKey($$, 'operator', AST::$OPERATOR['NOT']);
                                                                    //php AST::setKey($$, 'left', $2);
                                                               }
    | "-" Expression                                           {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         AST.EXPRESSION.UNARY,
                                                                        operator:     AST.OPERATOR.INVERT,
                                                                        left:         $2
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['EXPRESSION']);
                                                                    //php AST::setKey($$, 'type', AST::$EXPRESSION['UNARY']);
                                                                    //php AST::setKey($$, 'operator', AST::$OPERATOR['INVERT']);
                                                                    //php AST::setKey($$, 'left', $2);
                                                               }

    | Expression "||" Expression                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         AST.EXPRESSION.LOGICAL,
                                                                        operator:     AST.OPERATOR.OR,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['EXPRESSION']);
                                                                    //php AST::setKey($$, 'type', AST::$EXPRESSION['LOGICAL']);
                                                                    //php AST::setKey($$, 'operator', AST::$OPERATOR['OR']);
                                                                    //php AST::setKey($$, 'left', $1);
                                                                    //php AST::setKey($$, 'right', $3);
                                                               }
    | Expression "&&" Expression                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         AST.EXPRESSION.LOGICAL,
                                                                        operator:     AST.OPERATOR.AND,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['EXPRESSION']);
                                                                    //php AST::setKey($$, 'type', AST::$EXPRESSION['LOGICAL']);
                                                                    //php AST::setKey($$, 'operator', AST::$OPERATOR['AND']);
                                                                    //php AST::setKey($$, 'left', $1);
                                                                    //php AST::setKey($$, 'right', $3);
                                                               }

    | Expression "==" Expression                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         AST.EXPRESSION.LOGICAL,
                                                                        operator:     AST.OPERATOR.EQUALS,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['EXPRESSION']);
                                                                    //php AST::setKey($$, 'type', AST::$EXPRESSION['LOGICAL']);
                                                                    //php AST::setKey($$, 'operator', AST::$OPERATOR['EQUALS']);
                                                                    //php AST::setKey($$, 'left', $1);
                                                                    //php AST::setKey($$, 'right', $3);
                                                               }
    | Expression "~=" Expression                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         AST.EXPRESSION.LOGICAL,
                                                                        operator:     AST.OPERATOR.LIKE,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['EXPRESSION']);
                                                                    //php AST::setKey($$, 'type', AST::$EXPRESSION['LOGICAL']);
                                                                    //php AST::setKey($$, 'operator', AST::$OPERATOR['LIKE']);
                                                                    //php AST::setKey($$, 'left', $1);
                                                                    //php AST::setKey($$, 'right', $3);
                                                               }
    | Expression "<=" Expression                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         AST.EXPRESSION.LOGICAL,
                                                                        operator:     AST.OPERATOR.LTE,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['EXPRESSION']);
                                                                    //php AST::setKey($$, 'type', AST::$EXPRESSION['LOGICAL']);
                                                                    //php AST::setKey($$, 'operator',  AST::$OPERATOR['type']);
                                                                    //php AST::setKey($$, 'left', $1);
                                                                    //php AST::setKey($$, 'right', $3);
                                                               }
    | Expression "<"  Expression                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         AST.EXPRESSION.LOGICAL,
                                                                        operator:     AST.OPERATOR.LT,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['EXPRESSION']);
                                                                    //php AST::setKey($$, 'type', AST::$EXPRESSION['LOGICAL']);
                                                                    //php AST::setKey($$, 'operator', AST::$OPERATOR['LT']);
                                                                    //php AST::setKey($$, 'left', $1);
                                                                    //php AST::setKey($$, 'right', $3);
                                                               }
    | Expression ">=" Expression                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         AST.EXPRESSION.LOGICAL,
                                                                        operator:     AST.OPERATOR.GTE,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['EXPRESSION']);
                                                                    //php AST::setKey($$, 'type', AST::$EXPRESSION['LOGICAL']);
                                                                    //php AST::setKey($$, 'operator', AST::$OPERATOR['GTE']);
                                                                    //php AST::setKey($$, 'left', $1);
                                                                    //php AST::setKey($$, 'right', $3);
                                                               }
    | Expression ">"  Expression                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         AST.EXPRESSION.LOGICAL,
                                                                        operator:     AST.OPERATOR.GT,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['EXPRESSION']);
                                                                    //php AST::setKey($$, 'type', AST::$EXPRESSION['LOGICAL']);
                                                                    //php AST::setKey($$, 'operator', AST::$OPERATOR['GT']);
                                                                    //php AST::setKey($$, 'left', $1);
                                                                    //php AST::setKey($$, 'right', $3);
                                                               }

    | Expression "*"  Expression                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         AST.EXPRESSION.MATH,
                                                                        operator:     AST.OPERATOR.MULTIPLY,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['EXPRESSION']);
                                                                    //php AST::setKey($$, 'type', AST::$EXPRESSION['MATH']);
                                                                    //php AST::setKey($$, 'operator', AST::$OPERATOR['MULTIPLY']);
                                                                    //php AST::setKey($$, 'left', $1);
                                                                    //php AST::setKey($$, 'right', $3);
                                                               }
    | Expression "/"  Expression                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         AST.EXPRESSION.MATH,
                                                                        operand:      AST.OPERATOR.DIVISION,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['EXPRESSION']);
                                                                    //php AST::setKey($$, 'type', AST::$EXPRESSION['MATH']);
                                                                    //php AST::setKey($$, 'operator', AST::$OPERATOR['DIVISION']);
                                                                    //php AST::setKey($$, 'left', $1);
                                                                    //php AST::setKey($$, 'right', $3);
                                                               }
    | Expression "+"  Expression                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         AST.EXPRESSION.MATH,
                                                                        operator:     AST.OPERATOR.ADDITION,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['EXPRESSION']);
                                                                    //php AST::setKey($$, 'type', AST::$EXPRESSION['MATH']);
                                                                    //php AST::setKey($$, 'operator', AST::$OPERATOR['ADDITION']);
                                                                    //php AST::setKey($$, 'left', $1);
                                                                    //php AST::setKey($$, 'right', $3);
                                                               }
    | Expression "-"  Expression                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         AST.EXPRESSION.MATH,
                                                                        operator:     AST.OPERATOR.DIFFERENCE,
                                                                        left:         $1,
                                                                        right:        $3
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['EXPRESSION']);
                                                                    //php AST::setKey($$, 'type', AST::$EXPRESSION['MATH']);
                                                                    //php AST::setKey($$, 'operator', AST::$OPERATOR['DIFFERENCE']);
                                                                    //php AST::setKey($$, 'left', $1);
                                                                    //php AST::setKey($$, 'right', $3);
                                                               }
    | FunctionCall                                             {
                                                                    //js
                                                                    $$ = $1;
                                                                    //php AST::init($$, $1);
                                                               }
    | "(" Expression ")"                                       {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         AST.EXPRESSION.GROUP,
                                                                        expression:   $2
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['EXPRESSION']);
                                                                    //php AST::setKey($$, 'type', AST::$EXPRESSION['GROUP']);
                                                                    //php AST::setKey($$, 'expression', $2);
                                                               }
    | "IDENTIFIER"                                             {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         AST.EXPRESSION.IDENTIFIER,
                                                                        name:         $1
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['EXPRESSION']);
                                                                    //php AST::setKey($$, 'type', AST::$EXPRESSION['IDENTIFIER']);
                                                                    //php AST::setKey($$, 'name', $1);
                                                               }
    | "ESCAPED_IDENTIFIER"                                     {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         AST.EXPRESSION.IDENTIFIER,
                                                                        name:         AST.unescapeIdentifier($1)
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['EXPRESSION']);
                                                                    //php AST::setKey($$, 'type', AST::$EXPRESSION['IDENTIFIER']);
                                                                    //php AST::setKey($$, 'name', AST::unescapeIdentifier($1));
                                                               }
    | "BINDING"                                                {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         AST.EXPRESSION.BINDING,
                                                                        name:         AST.unescapeBindingName($1)
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['EXPRESSION']);
                                                                    //php AST::setKey($$, 'type', AST::$EXPRESSION['BINDING']);
                                                                    //php AST::setKey($$, 'name', AST::unescapeBindingName($1));
                                                               }
    ;

FunctionCall
    : "IDENTIFIER" "(" ")"                                     {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         AST.EXPRESSION.FUNCTION_CALL,
                                                                        function_name: $1,
                                                                        arguments:    []
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['EXPRESSION']);
                                                                    //php AST::setKey($$, 'type', AST::$EXPRESSION['FUNCTION_CALL']);
                                                                    //php AST::setKey($$, 'function_name', $1);
                                                                    //php AST::setKey($$, 'arguments', []);
                                                               }
    | "IDENTIFIER" "(" FunctionCallArgumentsList ")"           {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.EXPRESSION,
                                                                        type:         AST.EXPRESSION.FUNCTION_CALL,
                                                                        function_name: $1,
                                                                        arguments:    $3
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['EXPRESSION']);
                                                                    //php AST::setKey($$, 'type', AST::$EXPRESSION['FUNCTION_CALL']);
                                                                    //php AST::setKey($$, 'function_name', $1);
                                                                    //php AST::setKey($$, 'arguments', $3);
                                                               }
    ;

FunctionCallArgumentsList
    : Expression                                               {
                                                                    //js
                                                                    $$ = [ $1 ];
                                                                    //php AST::init($$, []);
                                                                    //php AST::push($$, $1);
                                                               }
    | FunctionCallArgumentsList "," Expression                 {
                                                                    //js
                                                                    $$ = $1.concat($3);
                                                                    //php AST::push($1, $3 );
                                                                    //php AST::init($$, $1);
                                                               }
    ;

OrderByClause
    : "RANDOM"                                                 {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.OPTION_ORDERING,
                                                                        type:         AST.ORDERING_STRATEGY.RANDOM
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['OPTION_ORDERING']);
                                                                    //php AST::setKey($$, 'type', AST::$ORDERING_STRATEGY['RANDOM']);
                                                               }
    | OrderByClauseFieldsList                                  {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.OPTION_ORDERING,
                                                                        type:         AST.ORDERING_STRATEGY.ORDERED,
                                                                        fields:       $1
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['OPTION_ORDERING']);
                                                                    //php AST::setKey($$, 'type', AST::$ORDERING_STRATEGY['ORDERED']);
                                                                    //php AST::setKey($$, 'fields', $1);
                                                               }
    ;

OrderByClauseFieldsList
    : OrderByField                                             {
                                                                    //js
                                                                    $$ = [ $1 ];
                                                                    //php AST::init($$, []);
                                                                    //php AST::push($$, $1 );
                                                               }
    | OrderByClauseFieldsList "," OrderByField                 {
                                                                    //js
                                                                    $$ = $1.concat($3);
                                                                    //php AST::push($1, $3);
                                                                    //php AST::init($$, $1);
                                                               }
    ;

OrderByField
    : Expression "ASC"                                         {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.ORDER_EXPRESSION,
                                                                        expression:   $1,
                                                                        direction:    AST.ORDER_DIRECTION.ASCENDING
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['ORDER_EXPRESSION']);
                                                                    //php AST::setKey($$, 'expression', $1);
                                                                    //php AST::setKey($$, 'direction', AST::$ORDER_DIRECTION['ASCENDING']);
                                                               }
    }
    | Expression "DESC"                                        {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.ORDER_EXPRESSION,
                                                                        expression:   $1,
                                                                        direction:    AST.ORDER_DIRECTION.DESCENDING
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['ORDER_EXPRESSION']);
                                                                    //php AST::setKey($$, 'expression', $1);
                                                                    //php AST::setKey($$, 'direction', AST::$ORDER_DIRECTION['DESCENDING']);
                                                               }
    | Expression                                               {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.ORDER_EXPRESSION,
                                                                        expression:   $1,
                                                                        direction:    AST.ORDER_DIRECTION.ASCENDING
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['ORDER_EXPRESSION']);
                                                                    //php AST::setKey($$, 'expression', $1);
                                                                    //php AST::setKey($$, 'direction', AST::$ORDER_DIRECTION['ASCENDING']);
                                                               }
    ;

LimitClause
    : "NUMBER"                                                 {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.OPTION_LIMIT,
                                                                        limit:        AST.parseNumber( $1 ),
                                                                        skip:         0
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['OPTION_LIMIT']);
                                                                    //php AST::setKey($$, 'limit', AST::parseNumber($1));
                                                                    //php AST::setKey($$, 'skip', 0);
                                                               }
    | "NUMBER" "," "NUMBER"                                    {
                                                                    //js
                                                                    $$ = {
                                                                        op:           AST.TOKEN_TYPES.OPTION_LIMIT,
                                                                        limit:        AST.parseNumber( $3 ),
                                                                        skip:         AST.parseNumber( $1 )
                                                                    };
                                                                    //php AST::init($$, []);
                                                                    //php AST::setKey($$, 'op', AST::$TOKEN_TYPES['OPTION_LIMIT']);
                                                                    //php AST::setKey($$, 'limit', AST::parseNumber( $3 ));
                                                                    //php AST::setKey($$, 'skip', AST::parseNumber($1));
                                                               }
    ;