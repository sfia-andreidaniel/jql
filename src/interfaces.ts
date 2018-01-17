/**
 * WHAT THE LEXER CAN PARSE
 */

interface IJQL_LEXER_OPCODE {
    op: EJQL_LEXER_OPCODE_TYPES,
}

enum EJQL_LEXER_OPCODE_TYPES {
    STATEMENT           = "statement",
    TABLE               = "table_reference",
    EXPRESSION          = "expression",
    FIELDS_LIST         = "fields_list",
    FIELD               = "field",
    UPDATE_FIELD        = "update_field",
    DELAYED_OPTION      = "delayed_option",
    LIMIT_OPTION        = "limit_option",
    ORDER_BY_OPTION     = "order_by_option",
    ORDER_BY_EXPRESSION = "order_by_expression",
}

enum EJQL_LEXER_STATEMENT_TYPES {
    SELECT = "select",
    UPDATE = "update",
    INSERT = "insert",
    DELETE = "delete",
}

enum EJQL_LEXER_FIELD_TYPES {
    ALL_FIELDS      = "all",
    SPECIFIC_FIELDS = "enumeration",
}

enum EJQL_LEXER_EXPRESSION_TYPES {
    NUMBER        = "number",
    BOOLEAN       = "boolean",
    NULL          = "null",
    STRING        = "string",
    UNARY         = "unary",
    LOGICAL       = "logical",
    MATH          = "math",
    GROUP         = "group",
    IDENTIFIER    = "identifier",
    BINDING       = "binding",
    FUNCTION_CALL = "function_call",
}

enum EJQL_LEXER_ORDERING_STRATEGY {
    RANDOM  = "random",
    ORDERED = "ordered",
}

enum EJQL_LEXER_ORDER_DIRECTION {
    ASCENDING  = "asc",
    DESCENDING = "desc",
}

enum EJQL_LEXER_OPERATOR_UNARY_TYPE {
    NOT    = "!",
    INVERT = "-",
}

enum EJQL_LEXER_OPERATOR_LOGICAL_TYPE {
    OR  = "||",
    AND = "&&",
}

enum EJQL_LEXER_OPERATOR_COMPARISION_TYPE {
    EQUALS = "==",
    LIKE   = "~=",

    LTE    = "<=",
    LT     = "<",
    GTE    = ">=",
    GT     = ">",
}

enum EJQL_LEXER_OPERATOR_MATH_TYPE {
    MULTIPLY   = "*",
    DIVISION   = "/",

    ADDITION   = "+",
    DIFFERENCE = "-",

}

type EJQL_LEXER_OPERATOR_TYPE
    = EJQL_LEXER_OPERATOR_UNARY_TYPE
    | EJQL_LEXER_OPERATOR_LOGICAL_TYPE
    | EJQL_LEXER_OPERATOR_COMPARISION_TYPE
    | EJQL_LEXER_OPERATOR_MATH_TYPE
    ;

interface IJQL_LEXER_EXPRESSSION_ABSTRACT extends IJQL_LEXER_OPCODE {
    type: EJQL_LEXER_EXPRESSION_TYPES;
}

interface IJQL_LEXER_EXPRESSION_NUMBER extends IJQL_LEXER_EXPRESSSION_ABSTRACT {
    value: number;
}

interface IJQL_LEXER_EXPRESSION_BOOLEAN extends IJQL_LEXER_EXPRESSSION_ABSTRACT {
    value: boolean;
}

interface IJQL_LEXER_EXPRESSION_NULL extends IJQL_LEXER_EXPRESSSION_ABSTRACT {
    /* value: null; */
}

interface IJQL_LEXER_EXPRESSION_STRING extends IJQL_LEXER_EXPRESSSION_ABSTRACT {
    value: string;
}

interface IJQL_LEXER_EXPRESSION_UNARY extends IJQL_LEXER_EXPRESSSION_ABSTRACT {
    /** NOT, INVERT **/
    operator: EJQL_LEXER_OPERATOR_UNARY_TYPE,
    left: IJQL_LEXER_EXPRESSION,
}

interface IJQL_LEXER_EXPRESSION_LOGICAL extends IJQL_LEXER_EXPRESSSION_ABSTRACT {
    /** AND, OR **/
    operator: EJQL_LEXER_OPERATOR_LOGICAL_TYPE | EJQL_LEXER_OPERATOR_COMPARISION_TYPE,
    left: IJQL_LEXER_EXPRESSION,
    right: IJQL_LEXER_EXPRESSION,
}

interface IJQL_LEXER_EXPRESSION_MATH extends IJQL_LEXER_EXPRESSSION_ABSTRACT {
    /** ADDITION, DIFFERENCE, MULTIPLY, DIVISION **/
    operator: EJQL_LEXER_OPERATOR_MATH_TYPE;
    left: IJQL_LEXER_EXPRESSION,
    right: IJQL_LEXER_EXPRESSION,
}

interface IJQL_LEXER_EXPRESSION_GROUP extends IJQL_LEXER_EXPRESSSION_ABSTRACT {
    expression: IJQL_LEXER_EXPRESSION;
}

interface IJQL_LEXER_EXPRESSION_IDENTIFIER extends IJQL_LEXER_EXPRESSSION_ABSTRACT {
    name: string;
}

interface IJQL_LEXER_EXPRESSION_BINDING extends IJQL_LEXER_EXPRESSSION_ABSTRACT {
    name: string;
}

interface IJQL_LEXER_EXPRESSION_FUNCTION_CALL extends IJQL_LEXER_EXPRESSSION_ABSTRACT {
    function_name: string;
    arguments: IJQL_LEXER_EXPRESSION[];
}

type IJQL_LEXER_EXPRESSION
    = IJQL_LEXER_EXPRESSION_NUMBER
    | IJQL_LEXER_EXPRESSION_BOOLEAN
    | IJQL_LEXER_EXPRESSION_NULL
    | IJQL_LEXER_EXPRESSION_STRING
    | IJQL_LEXER_EXPRESSION_STRING
    | IJQL_LEXER_EXPRESSION_UNARY
    | IJQL_LEXER_EXPRESSION_LOGICAL
    | IJQL_LEXER_EXPRESSION_MATH
    | IJQL_LEXER_EXPRESSION_GROUP
    | IJQL_LEXER_EXPRESSION_IDENTIFIER
    | IJQL_LEXER_EXPRESSION_BINDING
    | IJQL_LEXER_EXPRESSION_FUNCTION_CALL
    ;

interface IJQL_LEXER_PARSED_STATEMENT extends IJQL_LEXER_OPCODE {
    type: EJQL_LEXER_STATEMENT_TYPES;
    remote: boolean;
}

interface IJQL_LEXER_SELECT_ALL_FIELDS_LIST extends IJQL_LEXER_OPCODE {
    type: EJQL_LEXER_FIELD_TYPES;
    /** = ALL_FIELDS **/
}

interface IJQL_LEXER_SELECT_FIELD extends IJQL_LEXER_OPCODE {
    literal: string;
    expression: IJQL_LEXER_EXPRESSION;
}

interface IJQL_LEXER_SELECT_SPECIFIC_FIELDS_LIST extends IJQL_LEXER_OPCODE {
    type: EJQL_LEXER_FIELD_TYPES;
    /** = SPECIFIC_FIELDS**/
    fields: IJQL_LEXER_SELECT_FIELD[];
}

type IJQL_LEXER_SELECT_FIELDS_LIST
    = IJQL_LEXER_SELECT_ALL_FIELDS_LIST
    | IJQL_LEXER_SELECT_SPECIFIC_FIELDS_LIST
    ;

interface IJQL_LEXER_TABLE_REFERENCE extends IJQL_LEXER_OPCODE {
    // op = EJQL_LEXER_OPCODE_TYPES.TABLE
    name: string;
}

interface IJQL_LEXER_LIMIT_CLAUSE extends IJQL_LEXER_OPCODE {
    // op = EJQL_LEXER_OPCODE_TYPES.LIMIT_OPTION
    limit: number;
    skip: number;
}

interface IJQL_LEXER_ORDER_BY_RANDOM_CLAUSE extends IJQL_LEXER_OPCODE {
    // op = EJQL_LEXER_OPCODE_TYPES.ORDER_BY_OPTION
    type: EJQL_LEXER_ORDERING_STRATEGY;
    /** = EJQL_LEXER_ORDERING_STRATEGY.RANDOM **/
}

interface IJQL_LEXER_FIELD_ORDER extends IJQL_LEXER_OPCODE {
    // op = EJQL_LEXER_OPCODE_TYPES.ORDER_BY_EXPRESSION
    expression: IJQL_LEXER_EXPRESSION;
    direction: EJQL_LEXER_ORDER_DIRECTION;
}

interface IJQL_LEXER_ORDER_BY_FIELDS_CLAUSE extends IJQL_LEXER_OPCODE {
    // op = EJQL_LEXER_OPCODE_TYPES.ORDER_BY_OPTION
    type: EJQL_LEXER_ORDERING_STRATEGY;
    /** = EJQL_LEXER_ORDERING_STRATEGY.ORDERED **/
    fields?: IJQL_LEXER_FIELD_ORDER[];
}

type IJQL_LEXER_ODER_BY_CLAUSE
    = IJQL_LEXER_ORDER_BY_RANDOM_CLAUSE
    | IJQL_LEXER_ORDER_BY_FIELDS_CLAUSE
    ;

interface IJQL_LEXER_PARSED_SELECT_STATEMENT extends IJQL_LEXER_PARSED_STATEMENT {
    // op:    EJQL_LEXER_OPCODE_TYPES = EJQL_LEXER_OPCODE_TYPES.STATEMENT
    // type:  EJQL_LEXER_STATEMENT_TYPES = EJQL_LEXER_STATEMENT_TYPES.SELECT
    fields: IJQL_LEXER_SELECT_FIELDS_LIST;
    table?: IJQL_LEXER_TABLE_REFERENCE;
    where?: IJQL_LEXER_EXPRESSION;
    orderBy?: IJQL_LEXER_ODER_BY_CLAUSE;
    limit?: IJQL_LEXER_LIMIT_CLAUSE;
    union?: IJQL_LEXER_PARSED_SELECT_STATEMENT;
}

interface IJQL_LEXER_UPDATE_FIELD extends IJQL_LEXER_OPCODE {
    // op = EJQL_LEXER_OPCODE_TYPES.UPDATE_FIELD
    name: string;
    expression: IJQL_LEXER_EXPRESSION,
}

interface IJQL_LEXER_PARSED_UPDATE_STATEMENT extends IJQL_LEXER_PARSED_STATEMENT {
    // op:   EJQL_LEXER_OPCODE_TYPES = EJQL_LEXER_OPCODE_TYPES.STATEMENT
    // type: EJQL_LEXER_STATEMENT_TYPES = EJQL_LEXER_STATEMENT_TYPES.UPDATE
    delayed?: IJQL_LEXER_DELAYED_OPTION;
    table: IJQL_LEXER_TABLE_REFERENCE;
    fields: IJQL_LEXER_UPDATE_FIELD[];
    where?: IJQL_LEXER_EXPRESSION;
    orderBy?: IJQL_LEXER_ODER_BY_CLAUSE;
    limit?: IJQL_LEXER_LIMIT_CLAUSE;
}

interface IJQL_LEXER_PARSED_INSERT_STATEMENT extends IJQL_LEXER_PARSED_STATEMENT {
    // op:   EJQL_LEXER_OPCODE_TYPES = EJQL_LEXER_OPCODE_TYPES.STATEMENT
    // type: EJQL_LEXER_STATEMENT_TYPES = EJQL_LEXER_STATEMENT_TYPES.INSERT
    table: IJQL_LEXER_TABLE_REFERENCE;
    fields: IJQL_LEXER_UPDATE_FIELD[];
}

interface IJQL_LEXER_PARSED_DELETE_STATEMENT extends IJQL_LEXER_PARSED_STATEMENT {
    // op:   EJQL_LEXER_OPCODE_TYPES = EJQL_LEXER_OPCODE_TYPES.STATEMENT
    // type: EJQL_LEXER_STATEMENT_TYPES = EJQL_LEXER_STATEMENT_TYPES.DELETE
    table: IJQL_LEXER_TABLE_REFERENCE;
    where?: IJQL_LEXER_EXPRESSION;
    orderBy?: IJQL_LEXER_ODER_BY_CLAUSE;
    limit?: IJQL_LEXER_LIMIT_CLAUSE;
}

interface IJQL_LEXER_DELAYED_OPTION extends IJQL_LEXER_OPCODE {
    timer: number | null;
}

type IJQL_LEXER_TOKENIZED_STATEMENT
    = IJQL_LEXER_PARSED_SELECT_STATEMENT
    | IJQL_LEXER_PARSED_UPDATE_STATEMENT
    | IJQL_LEXER_PARSED_INSERT_STATEMENT
    | IJQL_LEXER_PARSED_DELETE_STATEMENT
    ;

type JQLPrimitive
    = string
    | number
    | boolean
    | null;

interface IJQLBindData {
    [ bindingName: string ]: JQLPrimitive;
}

interface IJQLTableRow {
    getColumnValue(columnName: string): JQLPrimitive;
}

interface IJQLDatabaseFunction {
    (...args: JQLPrimitive[]): JQLPrimitive;
}

interface IJQLFunctionHashMap {
    [ functionName: string ]: IJQLDatabaseFunction;
}

enum EJQLTableColumnType {
    STRING  = "string",
    NUMBER  = "number",
    BOOLEAN = "boolean",
    NULL    = "null",
}

interface IJQLTableColumn {
    name: string;
    type: EJQLTableColumnType;
    default?: JQLPrimitive;
    unique?: boolean;
    autoIncrement?: boolean;
}

interface IJQLTableIndex {
    columns: string[];
}

enum EJQLTableStorageEngine {
    IN_MEMORY = 'memory',
}

interface IJQLTable {

    describe(): IJQLTableColumn[];

    hasIdentifier( identifierName: string ): boolean;

    isRemote(): boolean;

    getStorageEngine(): EJQLTableStorageEngine;

}

interface IJQLTableHashMap {
    [ tableName: string ]: IJQLTable;
}

interface IJQLDatabase {

    hasFunction(functionName: string): boolean;

    callFunction(functionName: string, functionArgs: JQLPrimitive[]): JQLPrimitive;

    getFunction(functionName: string): IJQLDatabaseFunction;

    withFunction(functionName: string, func: IJQLDatabaseFunction): this;

    withTable(tableName: string, table: IJQLTable): this;

    hasTable(tableName: string): boolean;

}

interface JQLSelectStatementResult {

}

interface JQLInsertStatementResult {

}

interface JQLDeleteStatementResult {

}

interface JQLUpdateStatementResult {

}

interface IJQLQueryExecuteStrategy {
    (): JQueryDeferred<JQLStatementResult>;
}

interface IDatabaseStatementExecutor {

    execute(): IJQLQueryExecuteStrategy;

}

interface IJQLMarkedRowForUpdate {
    rowIndex: number,
    values: JQLPrimitive[]
}

interface IJQLPlannerQueueEntry {
    queryId: number;
    strategy: IJQLQueryExecuteStrategy;
    statement: JQLStatement;
    defer: JQueryDeferred<JQLStatementResult>;
}

