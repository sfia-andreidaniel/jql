var EJQL_LEXER_OPCODE_TYPES;
(function (EJQL_LEXER_OPCODE_TYPES) {
    EJQL_LEXER_OPCODE_TYPES["STATEMENT"] = "statement";
    EJQL_LEXER_OPCODE_TYPES["TABLE"] = "table_reference";
    EJQL_LEXER_OPCODE_TYPES["EXPRESSION"] = "expression";
    EJQL_LEXER_OPCODE_TYPES["FIELDS_LIST"] = "fields_list";
    EJQL_LEXER_OPCODE_TYPES["FIELD"] = "field";
    EJQL_LEXER_OPCODE_TYPES["UPDATE_FIELD"] = "update_field";
    EJQL_LEXER_OPCODE_TYPES["DELAYED_OPTION"] = "delayed_option";
    EJQL_LEXER_OPCODE_TYPES["LIMIT_OPTION"] = "limit_option";
    EJQL_LEXER_OPCODE_TYPES["ORDER_BY_OPTION"] = "order_by_option";
    EJQL_LEXER_OPCODE_TYPES["ORDER_BY_EXPRESSION"] = "order_by_expression";
})(EJQL_LEXER_OPCODE_TYPES || (EJQL_LEXER_OPCODE_TYPES = {}));
var EJQL_LEXER_STATEMENT_TYPES;
(function (EJQL_LEXER_STATEMENT_TYPES) {
    EJQL_LEXER_STATEMENT_TYPES["SELECT"] = "select";
    EJQL_LEXER_STATEMENT_TYPES["UPDATE"] = "update";
    EJQL_LEXER_STATEMENT_TYPES["INSERT"] = "insert";
    EJQL_LEXER_STATEMENT_TYPES["DELETE"] = "delete";
})(EJQL_LEXER_STATEMENT_TYPES || (EJQL_LEXER_STATEMENT_TYPES = {}));
var EJQL_LEXER_FIELD_TYPES;
(function (EJQL_LEXER_FIELD_TYPES) {
    EJQL_LEXER_FIELD_TYPES["ALL_FIELDS"] = "all";
    EJQL_LEXER_FIELD_TYPES["SPECIFIC_FIELDS"] = "enumeration";
})(EJQL_LEXER_FIELD_TYPES || (EJQL_LEXER_FIELD_TYPES = {}));
var EJQL_LEXER_EXPRESSION_TYPES;
(function (EJQL_LEXER_EXPRESSION_TYPES) {
    EJQL_LEXER_EXPRESSION_TYPES["NUMBER"] = "number";
    EJQL_LEXER_EXPRESSION_TYPES["BOOLEAN"] = "boolean";
    EJQL_LEXER_EXPRESSION_TYPES["NULL"] = "null";
    EJQL_LEXER_EXPRESSION_TYPES["STRING"] = "string";
    EJQL_LEXER_EXPRESSION_TYPES["UNARY"] = "unary";
    EJQL_LEXER_EXPRESSION_TYPES["LOGICAL"] = "logical";
    EJQL_LEXER_EXPRESSION_TYPES["MATH"] = "math";
    EJQL_LEXER_EXPRESSION_TYPES["GROUP"] = "group";
    EJQL_LEXER_EXPRESSION_TYPES["IDENTIFIER"] = "identifier";
    EJQL_LEXER_EXPRESSION_TYPES["BINDING"] = "binding";
    EJQL_LEXER_EXPRESSION_TYPES["FUNCTION_CALL"] = "function_call";
})(EJQL_LEXER_EXPRESSION_TYPES || (EJQL_LEXER_EXPRESSION_TYPES = {}));
var EJQL_LEXER_ORDERING_STRATEGY;
(function (EJQL_LEXER_ORDERING_STRATEGY) {
    EJQL_LEXER_ORDERING_STRATEGY["RANDOM"] = "random";
    EJQL_LEXER_ORDERING_STRATEGY["ORDERED"] = "ordered";
})(EJQL_LEXER_ORDERING_STRATEGY || (EJQL_LEXER_ORDERING_STRATEGY = {}));
var EJQL_LEXER_ORDER_DIRECTION;
(function (EJQL_LEXER_ORDER_DIRECTION) {
    EJQL_LEXER_ORDER_DIRECTION["ASCENDING"] = "asc";
    EJQL_LEXER_ORDER_DIRECTION["DESCENDING"] = "desc";
})(EJQL_LEXER_ORDER_DIRECTION || (EJQL_LEXER_ORDER_DIRECTION = {}));
var EJQL_LEXER_OPERATOR_UNARY_TYPE;
(function (EJQL_LEXER_OPERATOR_UNARY_TYPE) {
    EJQL_LEXER_OPERATOR_UNARY_TYPE["NOT"] = "!";
    EJQL_LEXER_OPERATOR_UNARY_TYPE["INVERT"] = "-";
})(EJQL_LEXER_OPERATOR_UNARY_TYPE || (EJQL_LEXER_OPERATOR_UNARY_TYPE = {}));
var EJQL_LEXER_OPERATOR_LOGICAL_TYPE;
(function (EJQL_LEXER_OPERATOR_LOGICAL_TYPE) {
    EJQL_LEXER_OPERATOR_LOGICAL_TYPE["OR"] = "||";
    EJQL_LEXER_OPERATOR_LOGICAL_TYPE["AND"] = "&&";
})(EJQL_LEXER_OPERATOR_LOGICAL_TYPE || (EJQL_LEXER_OPERATOR_LOGICAL_TYPE = {}));
var EJQL_LEXER_OPERATOR_COMPARISION_TYPE;
(function (EJQL_LEXER_OPERATOR_COMPARISION_TYPE) {
    EJQL_LEXER_OPERATOR_COMPARISION_TYPE["EQUALS"] = "==";
    EJQL_LEXER_OPERATOR_COMPARISION_TYPE["LIKE"] = "~=";
    EJQL_LEXER_OPERATOR_COMPARISION_TYPE["LTE"] = "<=";
    EJQL_LEXER_OPERATOR_COMPARISION_TYPE["LT"] = "<";
    EJQL_LEXER_OPERATOR_COMPARISION_TYPE["GTE"] = ">=";
    EJQL_LEXER_OPERATOR_COMPARISION_TYPE["GT"] = ">";
})(EJQL_LEXER_OPERATOR_COMPARISION_TYPE || (EJQL_LEXER_OPERATOR_COMPARISION_TYPE = {}));
var EJQL_LEXER_OPERATOR_MATH_TYPE;
(function (EJQL_LEXER_OPERATOR_MATH_TYPE) {
    EJQL_LEXER_OPERATOR_MATH_TYPE["MULTIPLY"] = "*";
    EJQL_LEXER_OPERATOR_MATH_TYPE["DIVISION"] = "/";
    EJQL_LEXER_OPERATOR_MATH_TYPE["ADDITION"] = "+";
    EJQL_LEXER_OPERATOR_MATH_TYPE["DIFFERENCE"] = "-";
})(EJQL_LEXER_OPERATOR_MATH_TYPE || (EJQL_LEXER_OPERATOR_MATH_TYPE = {}));
var EJQLTableColumnType;
(function (EJQLTableColumnType) {
    EJQLTableColumnType["STRING"] = "string";
    EJQLTableColumnType["NUMBER"] = "number";
    EJQLTableColumnType["BOOLEAN"] = "boolean";
    EJQLTableColumnType["NULL"] = "null";
})(EJQLTableColumnType || (EJQLTableColumnType = {}));
var EJQLTableStorageEngine;
(function (EJQLTableStorageEngine) {
    EJQLTableStorageEngine["IN_MEMORY"] = "memory";
})(EJQLTableStorageEngine || (EJQLTableStorageEngine = {}));
var JQLLexerFactory = (function () {
    function JQLLexerFactory() {
    }
    JQLLexerFactory.create = function (lexerToken) {
        switch (lexerToken.op) {
            case EJQL_LEXER_OPCODE_TYPES.STATEMENT:
                switch (lexerToken.type) {
                    case EJQL_LEXER_STATEMENT_TYPES.SELECT:
                        return new JQLStatementSelect(lexerToken);
                    case EJQL_LEXER_STATEMENT_TYPES.INSERT:
                        return new JQLStatementInsert(lexerToken);
                    case EJQL_LEXER_STATEMENT_TYPES.UPDATE:
                        return new JQLStatementUpdate(lexerToken);
                    case EJQL_LEXER_STATEMENT_TYPES.DELETE:
                        return new JQLStatementDelete(lexerToken);
                    default:
                        throw new Error('Cannot create statement from token: ' + JSON.stringify(lexerToken));
                }
            case EJQL_LEXER_OPCODE_TYPES.TABLE:
                return new JQLTableReference(lexerToken);
            case EJQL_LEXER_OPCODE_TYPES.EXPRESSION:
                switch (lexerToken.type) {
                    case EJQL_LEXER_EXPRESSION_TYPES.NUMBER:
                        return new JQLExpressionNumber(lexerToken);
                    case EJQL_LEXER_EXPRESSION_TYPES.BOOLEAN:
                        return new JQLExpressionBoolean(lexerToken);
                    case EJQL_LEXER_EXPRESSION_TYPES.NULL:
                        return new JQLExpressionNull();
                    case EJQL_LEXER_EXPRESSION_TYPES.STRING:
                        return new JQLExpressionString(lexerToken);
                    case EJQL_LEXER_EXPRESSION_TYPES.UNARY:
                        switch (lexerToken.operator) {
                            case EJQL_LEXER_OPERATOR_UNARY_TYPE.INVERT:
                                return new JQLExpressionUnaryInvert(lexerToken);
                            case EJQL_LEXER_OPERATOR_UNARY_TYPE.NOT:
                                return new JQLExpressionUnaryNot(lexerToken);
                            default:
                                throw new Error('Cannot create unary expression from token: ' + JSON.stringify(lexerToken));
                        }
                    case EJQL_LEXER_EXPRESSION_TYPES.LOGICAL:
                        switch (lexerToken.operator) {
                            case EJQL_LEXER_OPERATOR_LOGICAL_TYPE.AND:
                                return new JQLExpressionLogicalAnd(lexerToken);
                            case EJQL_LEXER_OPERATOR_LOGICAL_TYPE.OR:
                                return new JQLExpressionLogicalOr(lexerToken);
                            case EJQL_LEXER_OPERATOR_COMPARISION_TYPE.EQUALS:
                                return new JQLExpressionLogicalEquals(lexerToken);
                            case EJQL_LEXER_OPERATOR_COMPARISION_TYPE.GT:
                                return new JQLExpressionLogicalGreaterThen(lexerToken);
                            case EJQL_LEXER_OPERATOR_COMPARISION_TYPE.GTE:
                                return new JQLExpressionLogicalGreaterThenEquals(lexerToken);
                            case EJQL_LEXER_OPERATOR_COMPARISION_TYPE.LT:
                                return new JQLExpressionLogicalLowerThen(lexerToken);
                            case EJQL_LEXER_OPERATOR_COMPARISION_TYPE.LTE:
                                return new JQLExpressionLogicalLowerThenEquals(lexerToken);
                            case EJQL_LEXER_OPERATOR_COMPARISION_TYPE.LIKE:
                                return new JQLExpressionLogicalLike(lexerToken);
                            default:
                                throw new Error('Cannot create logical expression from token: ' + JSON.stringify(lexerToken));
                        }
                    case EJQL_LEXER_EXPRESSION_TYPES.MATH:
                        switch (lexerToken.operator) {
                            case EJQL_LEXER_OPERATOR_MATH_TYPE.ADDITION:
                                return new JQLExpressionMathAddition(lexerToken);
                            case EJQL_LEXER_OPERATOR_MATH_TYPE.DIFFERENCE:
                                return new JQLExpressionMathDifference(lexerToken);
                            case EJQL_LEXER_OPERATOR_MATH_TYPE.DIVISION:
                                return new JQLExpressionMathDivision(lexerToken);
                            case EJQL_LEXER_OPERATOR_MATH_TYPE.MULTIPLY:
                                return new JQLExpressionMathMultiply(lexerToken);
                            default:
                                throw new Error('Cannot create math expression from token: ' + JSON.stringify(lexerToken));
                        }
                    case EJQL_LEXER_EXPRESSION_TYPES.GROUP:
                        return new JQLExpressionGroup(lexerToken);
                    case EJQL_LEXER_EXPRESSION_TYPES.IDENTIFIER:
                        return new JQLExpressionIdentifier(lexerToken);
                    case EJQL_LEXER_EXPRESSION_TYPES.BINDING:
                        return new JQLExpressionBinding(lexerToken);
                    case EJQL_LEXER_EXPRESSION_TYPES.FUNCTION_CALL:
                        return new JQLExpressionFunctionCall(lexerToken);
                }
                break;
            case EJQL_LEXER_OPCODE_TYPES.FIELDS_LIST:
                switch (lexerToken.type) {
                    case EJQL_LEXER_FIELD_TYPES.ALL_FIELDS:
                        return new JQLStatementSelectFieldsListAll(lexerToken);
                    case EJQL_LEXER_FIELD_TYPES.SPECIFIC_FIELDS:
                        return new JQLStatementSelectFieldsListSpecific(lexerToken);
                    default:
                        throw new Error('Invalid lexer token select fields type: ' + JSON.stringify(lexerToken));
                }
            case EJQL_LEXER_OPCODE_TYPES.FIELD:
                return new JQLStatementSelectField(lexerToken);
            case EJQL_LEXER_OPCODE_TYPES.UPDATE_FIELD:
                return new JQLStatementUpdateField(lexerToken);
            case EJQL_LEXER_OPCODE_TYPES.DELAYED_OPTION:
                return new JQLStatementUpdateDelayedOption(lexerToken);
            case EJQL_LEXER_OPCODE_TYPES.LIMIT_OPTION:
                return new JQLLimit(lexerToken);
            case EJQL_LEXER_OPCODE_TYPES.ORDER_BY_OPTION:
                switch (lexerToken.type) {
                    case EJQL_LEXER_ORDERING_STRATEGY.RANDOM:
                        return new JQLSorterStrategyRandom(lexerToken);
                    case EJQL_LEXER_ORDERING_STRATEGY.ORDERED:
                        return new JQLSorterStrategyByExpression(lexerToken);
                    default:
                        throw new Error('Invalid lexer token ORDER BY: ' + JSON.stringify(lexerToken));
                }
            case EJQL_LEXER_OPCODE_TYPES.ORDER_BY_EXPRESSION:
                return new JQLSorterExpression(lexerToken);
            default:
                throw new Error('Invalid lexer token opcode type: ' + JSON.stringify(lexerToken.op));
        }
    };
    return JQLLexerFactory;
}());
var JQLUtils = (function () {
    function JQLUtils() {
    }
    JQLUtils.getType = function (variable) {
        if (undefined === variable) {
            return null;
        }
        else {
            if (null === variable) {
                return EJQLTableColumnType.NULL;
            }
            else {
                var t = typeof variable;
                if (t === 'number') {
                    if (isFinite(variable)) {
                        return EJQLTableColumnType.NUMBER;
                    }
                    else {
                        return null;
                    }
                }
                else {
                    if (t === 'boolean') {
                        return EJQLTableColumnType.BOOLEAN;
                    }
                    else {
                        if (t === 'string') {
                            return EJQLTableColumnType.STRING;
                        }
                        else {
                            return null;
                        }
                    }
                }
            }
        }
    };
    JQLUtils.isNumeric = function (s) {
        var t = this.getType(s);
        if (t === EJQLTableColumnType.NUMBER) {
            return true;
        }
        else {
            if (t === EJQLTableColumnType.STRING) {
                if (s !== '-' && s !== '+') {
                    return /^([\-+])?(0|[1-9]([0-9]+)?)?(\.[0-9]+)?/.test(s);
                }
            }
        }
        return false;
    };
    JQLUtils.getIdentifiers = function (o) {
        var mappings = Object.create(null), type;
        for (var y = 0, n = (o || []).length; y < n; y++) {
            if (y === 0) {
                for (var k in o[y]) {
                    if (o[y].hasOwnProperty(k)) {
                        type = this.getType(o[y][k]);
                        mappings[k] = type;
                    }
                }
            }
            else {
                break;
            }
        }
        var result = [];
        for (var k in mappings) {
            if (null !== mappings[k]) {
                result.push({
                    type: mappings[k],
                    name: k
                });
            }
        }
        return result;
    };
    JQLUtils.isReservedKeyword = function (k) {
        return this.RESERVED_KEYWORDS.indexOf(String(k || '')) > -1;
    };
    JQLUtils.shuffleArray = function (a) {
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [a[j], a[i]], a[i] = _a[0], a[j] = _a[1];
        }
        return a;
        var _a;
    };
    JQLUtils.compare = function (a, b) {
        var aType = this.getType(a), bType = this.getType(b);
        if (aType === null && bType === null) {
            return 0;
        }
        if (aType === null || bType === null) {
            if (aType === null) {
                return -1;
            }
            else {
                return 1;
            }
        }
        var aToString, bToString;
        if (aType === bType) {
            switch (aType) {
                case EJQLTableColumnType.BOOLEAN:
                case EJQLTableColumnType.NUMBER:
                case EJQLTableColumnType.NULL:
                    if (a == b) {
                        return 0;
                    }
                    else {
                        if (a < b) {
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    }
                case EJQLTableColumnType.STRING:
                    aToString = String(a).toLowerCase();
                    bToString = String(b).toLowerCase();
            }
        }
        else {
            if (aType !== EJQLTableColumnType.STRING) {
                if (aType === EJQLTableColumnType.NUMBER) {
                    aToString = String(a);
                }
                else {
                    if (aType === EJQLTableColumnType.NULL) {
                        aToString = '';
                    }
                    else {
                        aToString = a ? '1' : '0';
                    }
                }
            }
            else {
                aToString = String(a).toLowerCase();
            }
            if (bType !== EJQLTableColumnType.STRING) {
                if (bType === EJQLTableColumnType.NUMBER) {
                    bToString = String(b);
                }
                else {
                    if (bType === EJQLTableColumnType.NULL) {
                        bToString = '';
                    }
                    else {
                        bToString = b ? '1' : '0';
                    }
                }
            }
            else {
                bToString = String(a).toLowerCase();
            }
        }
        if (aToString === bToString) {
            return 0;
        }
        else {
            if (aToString < bToString) {
                return -1;
            }
            else {
                return 1;
            }
        }
    };
    JQLUtils.RESERVED_KEYWORDS = [
        'select',
        'from',
        'where',
        'in',
        'limit',
        'order',
        'by',
        'asc',
        'update',
        'table',
        'set',
        'insert',
        'into',
        'values',
        'delete',
    ];
    return JQLUtils;
}());
var JQLDatabase = (function () {
    function JQLDatabase() {
        this.functions = {};
        this.tables = {};
    }
    JQLDatabase.prototype.withJQuery = function (jq) {
        this.jq = jq;
        this.planner = new JQLDatabaseQueryPlanner(this);
        return this;
    };
    JQLDatabase.prototype.getJQuery = function () {
        return this.jq;
    };
    JQLDatabase.prototype.isValidIdentifierName = function (identifier) {
        return "string" === typeof identifier && /^[a-zA-Z$_][a-zA-Z0-9_$]+$/.test(identifier);
    };
    JQLDatabase.prototype.withFunction = function (functionName, func) {
        if (!this.isValidIdentifierName(functionName)) {
            throw new Error(JSON.stringify(functionName) + " is not a valid function name!");
        }
        functionName = functionName.toLowerCase();
        if (JQLUtils.isReservedKeyword(functionName)) {
            throw new Error(JSON.stringify(functionName) + " is a reserved keyword and cannot be used as a function name!");
        }
        if (undefined !== this.functions[functionName]) {
            throw new Error("Function " + JSON.stringify(functionName) + " already registered in database!");
        }
        this.functions[functionName] = func;
        return this;
    };
    JQLDatabase.prototype.hasFunction = function (functionName) {
        if ("string" === typeof functionName) {
            functionName = functionName.toLowerCase();
            if (undefined !== this.functions[functionName] && this.functions.hasOwnProperty(functionName)) {
                return true;
            }
        }
        return false;
    };
    JQLDatabase.prototype.callFunction = function (functionName, functionArgs) {
        if (this.hasFunction(functionName)) {
            return this.functions[functionName.toLowerCase()].apply(this, functionArgs);
        }
        else {
            throw new Error("Failed to call function " + JSON.stringify(functionName) + ": Function not defined!");
        }
    };
    JQLDatabase.prototype.getFunction = function (functionName) {
        if (this.hasFunction(functionName)) {
            return this.functions[functionName];
        }
        else {
            throw new Error("Failed to get function " + JSON.stringify(functionName) + ": Function not defined!");
        }
    };
    JQLDatabase.prototype.withTable = function (tableName, table) {
        if (!this.isValidIdentifierName(tableName)) {
            throw new Error(JSON.stringify(tableName) + " is not a valid table name!");
        }
        if (undefined !== this.tables[tableName]) {
            throw new Error("Table " + JSON.stringify(tableName) + " already created!");
        }
        this.tables[tableName] = table;
        return this;
    };
    JQLDatabase.prototype.hasTable = function (tableName) {
        return "string" === typeof tableName && undefined !== this.tables[tableName] && this.tables.hasOwnProperty(tableName);
    };
    JQLDatabase.prototype.getTable = function (tableName) {
        if (this.hasTable(tableName)) {
            return this.tables[tableName];
        }
        else {
            throw new Error("Table " + JSON.stringify(tableName) + " does not exist!");
        }
    };
    JQLDatabase.prototype.createStatement = function (statement) {
        if (!statement || 'string' !== typeof statement) {
            throw new Error('Invalid argument: statement: string expected!');
        }
        var stmt = JQLLexerFactory.create(JQLGrammar.parse(statement));
        var tableReference = stmt.getTable();
        if (tableReference) {
            if (!this.hasTable(tableReference.getName())) {
                throw new Error("Failed to create statement: Table " + JSON.stringify(tableReference.getName()) + " does not exist!");
            }
            var table = this.getTable(tableReference.getName()), statementIdentifiers = stmt.getIdentifiers();
            for (var i = 0, len = statementIdentifiers.length; i < len; i++) {
                if (!table.hasIdentifier(statementIdentifiers[i].getIdentifierName())) {
                    throw new Error("Unknown table identifier " + JSON.stringify(statementIdentifiers[i].getIdentifierName()));
                }
            }
            if (table.isRemote() !== stmt.isRemote()) {
                if (stmt.isRemote()) {
                    throw new Error("Cannot create remote statement affecting in-memory table!");
                }
                else {
                    throw new Error("Cannot create in-memory statement affecting remote table!");
                }
            }
        }
        else {
            if (stmt.getIdentifiers().length) {
                throw new Error("A statement which does not affect a table cannot have identifiers!");
            }
        }
        var statementFunctions = stmt.getFunctions();
        for (var i = 0, len = statementFunctions.length; i < len; i++) {
            if (!this.hasFunction(statementFunctions[i].getFunctionName())) {
                throw new Error("Failed to create statement: Function " + JSON.stringify(statementFunctions[i].getFunctionName()) + " is not declared!");
            }
            else {
                statementFunctions[i].withDatabase(this);
            }
        }
        return stmt;
    };
    JQLDatabase.prototype.executeStatement = function (statement, bindings) {
        statement.bind(bindings);
        return this.planner.scheduleStatement(statement, this.createExecutionStrategy(statement));
    };
    JQLDatabase.prototype.createExecutionStrategy = function (statement) {
        if (!statement.isRemote()) {
            switch (statement.getStatementType()) {
                case EJQL_LEXER_STATEMENT_TYPES.SELECT:
                    return (new JQLDatabaseStatementExecutorSelect(statement, this)).execute();
                case EJQL_LEXER_STATEMENT_TYPES.INSERT:
                    return (new JQLDatabaseStatementExecutorInsert(statement, this)).execute();
                case EJQL_LEXER_STATEMENT_TYPES.UPDATE:
                    return (new JQLDatabaseStatementExecutorUpdate(statement, this)).execute();
                case EJQL_LEXER_STATEMENT_TYPES.DELETE:
                    return (new JQLDatabaseStatementExecutorDelete(statement, this)).execute();
                default:
                    throw new Error('Failed to create execution strategy: Uknown statement type!');
            }
        }
        else {
            return (new JQLDatabaseStatementExecutorRemoteStatement(statement, this)).execute();
        }
    };
    return JQLDatabase;
}());
var JQLDatabaseStatementExecutorSelect = (function () {
    function JQLDatabaseStatementExecutorSelect(statement, db) {
        this.nullAliasIndex = 0;
        this.statement = statement;
        this.db = db;
    }
    JQLDatabaseStatementExecutorSelect.prototype.execute = function () {
        var _this = this;
        return function () {
            return _this.db.getJQuery().Deferred(function (defer) {
                var rows;
                if (!_this.statement.getTable()) {
                    rows = [_this.createSingleStatementRow()];
                }
                else {
                    rows = _this.applyLimit(_this.applySorting(_this.getStatementCandidateRows()));
                }
                var result = (new JQLStatementResultSelect()).addRows(rows);
                if (_this.statement.getUnion()) {
                    (new JQLDatabaseStatementExecutorSelect(_this.statement.getUnion(), _this.db)).execute()().then(function (unionResult) {
                        result.addRows(unionResult.getRows());
                        defer.resolve(result);
                    }).fail(function (e) {
                        defer.reject(e);
                    });
                }
                else {
                    defer.resolve(result);
                }
            }).promise();
        };
    };
    JQLDatabaseStatementExecutorSelect.prototype.createSingleStatementRow = function () {
        var result = Object.create(null), context = new JQLRow([], [], 0), fields = this.statement.getFields(), exprResult, fieldName;
        if (fields.isSelectingAllFields()) {
            return result;
        }
        this.nullAliasIndex = 0;
        for (var i = 0, fieldsList = fields, specificFields = fieldsList.getFields(), len = specificFields.length; i < len; i++) {
            fieldName = specificFields[i].getLiteral();
            exprResult = specificFields[i].getExpression().compute(context);
            if (null === fieldName) {
                this.nullAliasIndex++;
                fieldName = 'col_' + this.nullAliasIndex;
            }
            result[fieldName] = exprResult;
        }
        return result;
    };
    JQLDatabaseStatementExecutorSelect.prototype.getStatementCandidateRows = function () {
        var table = this.db.getTable(this.statement.getTable().getName()), iterator = table.createIterator(), row, result = [], tableFieldsList = table.describe(), statementFieldsList = this.statement.getFields(), isAllFields = statementFieldsList.isSelectingAllFields(), specificFieldsList = statementFieldsList, specificFieldsListCollection, o, exprResult, fieldName, addRow, where = this.statement.getFilter();
        if (!isAllFields) {
            specificFieldsListCollection = specificFieldsList.getFields();
        }
        while (row = iterator.next()) {
            if (!where) {
                addRow = true;
            }
            else {
                addRow = !!where.compute(row);
            }
            if (addRow) {
                if (isAllFields) {
                    result.push(row.toObject());
                }
                else {
                    this.nullAliasIndex = 0;
                    o = Object.create(null);
                    for (var i = 0, len = specificFieldsListCollection.length; i < len; i++) {
                        fieldName = specificFieldsListCollection[i].getLiteral();
                        exprResult = specificFieldsListCollection[i].getExpression().compute(row);
                        if (null === fieldName) {
                            this.nullAliasIndex++;
                            fieldName = 'col_' + this.nullAliasIndex;
                        }
                        o[fieldName] = exprResult;
                    }
                    result.push(o);
                }
            }
        }
        return result;
    };
    JQLDatabaseStatementExecutorSelect.prototype.applySorting = function (rows) {
        var sorter = this.statement.getSorter();
        if (!sorter || rows.length < 2) {
            return rows;
        }
        if (sorter.isRandom()) {
            return JQLUtils.shuffleArray(rows);
        }
        var expressions = sorter.getSortExpressions(), numExpressions = expressions.length;
        var sortFunction = (function () {
            var walkers = [];
            for (var i = 0; i < numExpressions; i++) {
                if (i === numExpressions - 1) {
                    walkers.push((function (i) {
                        return function (a, b) {
                            var exprA = expressions[i].getExpression().compute(a), exprB = expressions[i].getExpression().compute(b), result = JQLUtils.compare(exprA, exprB);
                            if (expressions[i].getDirection() === EJQL_LEXER_ORDER_DIRECTION.DESCENDING) {
                                result = -result;
                            }
                            return result;
                        };
                    })(i));
                }
                else {
                    walkers.push((function (i) {
                        return function (a, b) {
                            var exprA = expressions[i].getExpression().compute(a), exprB = expressions[i].getExpression().compute(b), result = JQLUtils.compare(exprA, exprB);
                            if (expressions[i].getDirection() === EJQL_LEXER_ORDER_DIRECTION.DESCENDING) {
                                result = -result;
                            }
                            if (0 === result) {
                                return walkers[i + 1](a, b);
                            }
                            else {
                                return result;
                            }
                        };
                    })(i));
                }
            }
            return function (a, b) {
                return walkers[0](JQLRow.createFromObject(a), JQLRow.createFromObject(b));
            };
        })();
        return rows.sort(sortFunction);
    };
    JQLDatabaseStatementExecutorSelect.prototype.applyLimit = function (rows) {
        var limit = this.statement.getLimit();
        if (!limit) {
            return rows;
        }
        return rows.slice(limit.getSkip(), limit.getSkip() + limit.getLimit());
    };
    return JQLDatabaseStatementExecutorSelect;
}());
var JQLDatabaseStatementExecutorUpdate = (function () {
    function JQLDatabaseStatementExecutorUpdate(statement, db) {
        this.statement = statement;
        this.db = db;
    }
    JQLDatabaseStatementExecutorUpdate.prototype.execute = function () {
        var _this = this;
        return function () {
            return _this.db.getJQuery().Deferred(function (defer) {
                _this.markedRowsForUpdate = [];
                var table = _this.db.getTable(_this.statement.getTable().getName()), iterator = table.createIterator(), row, addRow, where = _this.statement.getFilter();
                while (row = iterator.next()) {
                    if (null === where) {
                        addRow = true;
                    }
                    else {
                        addRow = !!where.compute(row);
                    }
                    if (addRow) {
                        _this.markedRowsForUpdate.push({
                            rowIndex: row.getRowIndex(),
                            values: row.getDataAsArray(),
                        });
                    }
                }
                if (!_this.markedRowsForUpdate.length) {
                    defer.resolve(new JQLStatementResult().withAffectedRows(0));
                    return;
                }
                _this.applySorting();
                _this.applyLimits();
                if (!_this.markedRowsForUpdate.length) {
                    defer.resolve(new JQLStatementResult().withAffectedRows(0));
                    return;
                }
                var result = new JQLStatementResult().withAffectedRows(_this.markedRowsForUpdate.length), updateRow = JQLRow.createFromTable(table), updateExpressions = _this.statement.getFields(), numFields = updateExpressions.length, fieldName, newValue;
                for (var i = 0, len = _this.markedRowsForUpdate.length; i < len; i++) {
                    updateRow.withIndex(_this.markedRowsForUpdate[i].rowIndex).withRowData(_this.markedRowsForUpdate[i].values);
                    for (var j = 0; j < numFields; j++) {
                        fieldName = updateExpressions[j].getFieldName();
                        newValue = updateExpressions[j].getExpression().compute(updateRow);
                        updateRow.setColumnValue(fieldName, newValue);
                    }
                    table.replace(_this.markedRowsForUpdate[i].rowIndex, updateRow.getDataAsArray());
                }
                defer.resolve(result);
            }).promise();
        };
    };
    JQLDatabaseStatementExecutorUpdate.prototype.applySorting = function () {
        var sorter = this.statement.getSorter(), table = this.db.getTable(this.statement.getTable().getName());
        if (!sorter || this.markedRowsForUpdate.length < 2) {
            return;
        }
        if (sorter.isRandom()) {
            return JQLUtils.shuffleArray(this.markedRowsForUpdate);
        }
        var expressions = sorter.getSortExpressions(), numExpressions = expressions.length;
        var sortFunction = (function () {
            var walkers = [];
            for (var i = 0; i < numExpressions; i++) {
                if (i === numExpressions - 1) {
                    walkers.push((function (i) {
                        return function (a, b) {
                            var exprA = expressions[i].getExpression().compute(a), exprB = expressions[i].getExpression().compute(b), result = JQLUtils.compare(exprA, exprB);
                            if (expressions[i].getDirection() === EJQL_LEXER_ORDER_DIRECTION.DESCENDING) {
                                result = -result;
                            }
                            return result;
                        };
                    })(i));
                }
                else {
                    walkers.push((function (i) {
                        return function (a, b) {
                            var exprA = expressions[i].getExpression().compute(a), exprB = expressions[i].getExpression().compute(b), result = JQLUtils.compare(exprA, exprB);
                            if (expressions[i].getDirection() === EJQL_LEXER_ORDER_DIRECTION.DESCENDING) {
                                result = -result;
                            }
                            if (0 === result) {
                                return walkers[i + 1](a, b);
                            }
                            else {
                                return result;
                            }
                        };
                    })(i));
                }
            }
            return function (a, b) {
                return walkers[0](JQLRow.createFromTable(table).withRowData(a.values).withIndex(-1), JQLRow.createFromTable(table).withRowData(b.values).withIndex(-1));
            };
        })();
        this.markedRowsForUpdate.sort(sortFunction);
    };
    JQLDatabaseStatementExecutorUpdate.prototype.applyLimits = function () {
        var limit = this.statement.getLimit();
        if (!limit) {
            return;
        }
        this.markedRowsForUpdate = this.markedRowsForUpdate.slice(limit.getSkip(), limit.getSkip() + limit.getLimit());
    };
    return JQLDatabaseStatementExecutorUpdate;
}());
var JQLDatabaseStatementExecutorInsert = (function () {
    function JQLDatabaseStatementExecutorInsert(statement, db) {
        this.statement = statement;
        this.db = db;
    }
    JQLDatabaseStatementExecutorInsert.prototype.execute = function () {
        var _this = this;
        return function () {
            return _this.db.getJQuery().Deferred(function (defer) {
                defer.reject(new Error('INSERT statements not implemented!'));
            }).promise();
        };
    };
    return JQLDatabaseStatementExecutorInsert;
}());
var JQLDatabaseStatementExecutorDelete = (function () {
    function JQLDatabaseStatementExecutorDelete(statement, db) {
        this.statement = statement;
        this.db = db;
    }
    JQLDatabaseStatementExecutorDelete.prototype.execute = function () {
        var _this = this;
        return function () {
            return _this.db.getJQuery().Deferred(function (defer) {
                _this.markedRowsForDelete = [];
                var table = _this.db.getTable(_this.statement.getTable().getName()), iterator = table.createIterator(), row, addRow, where = _this.statement.getFilter();
                while (row = iterator.next()) {
                    if (null === where) {
                        addRow = true;
                    }
                    else {
                        addRow = !!where.compute(row);
                    }
                    if (addRow) {
                        _this.markedRowsForDelete.push({
                            rowIndex: row.getRowIndex(),
                            values: row.getDataAsArray(),
                        });
                    }
                }
                if (!_this.markedRowsForDelete.length) {
                    defer.resolve(new JQLStatementResult().withAffectedRows(0));
                    return;
                }
                _this.applySorting();
                _this.applyLimits();
                if (!_this.markedRowsForDelete.length) {
                    defer.resolve(new JQLStatementResult().withAffectedRows(0));
                    return;
                }
                for (var i = 0, len = _this.markedRowsForDelete.length; i < len; i++) {
                    table.deleteRow(_this.markedRowsForDelete[i].rowIndex);
                }
                table.compact();
                defer.resolve(new JQLStatementResult().withAffectedRows(_this.markedRowsForDelete.length));
            }).promise();
        };
    };
    JQLDatabaseStatementExecutorDelete.prototype.applySorting = function () {
        var sorter = this.statement.getSorter(), table = this.db.getTable(this.statement.getTable().getName());
        if (!sorter || this.markedRowsForDelete.length < 2) {
            return;
        }
        if (sorter.isRandom()) {
            return JQLUtils.shuffleArray(this.markedRowsForDelete);
        }
        var expressions = sorter.getSortExpressions(), numExpressions = expressions.length;
        var sortFunction = (function () {
            var walkers = [];
            for (var i = 0; i < numExpressions; i++) {
                if (i === numExpressions - 1) {
                    walkers.push((function (i) {
                        return function (a, b) {
                            var exprA = expressions[i].getExpression().compute(a), exprB = expressions[i].getExpression().compute(b), result = JQLUtils.compare(exprA, exprB);
                            if (expressions[i].getDirection() === EJQL_LEXER_ORDER_DIRECTION.DESCENDING) {
                                result = -result;
                            }
                            return result;
                        };
                    })(i));
                }
                else {
                    walkers.push((function (i) {
                        return function (a, b) {
                            var exprA = expressions[i].getExpression().compute(a), exprB = expressions[i].getExpression().compute(b), result = JQLUtils.compare(exprA, exprB);
                            if (expressions[i].getDirection() === EJQL_LEXER_ORDER_DIRECTION.DESCENDING) {
                                result = -result;
                            }
                            if (0 === result) {
                                return walkers[i + 1](a, b);
                            }
                            else {
                                return result;
                            }
                        };
                    })(i));
                }
            }
            return function (a, b) {
                return walkers[0](JQLRow.createFromTable(table).withRowData(a.values).withIndex(-1), JQLRow.createFromTable(table).withRowData(b.values).withIndex(-1));
            };
        })();
        this.markedRowsForDelete.sort(sortFunction);
    };
    JQLDatabaseStatementExecutorDelete.prototype.applyLimits = function () {
        var limit = this.statement.getLimit();
        if (!limit) {
            return;
        }
        this.markedRowsForDelete = this.markedRowsForDelete.slice(limit.getSkip(), limit.getSkip() + limit.getLimit());
    };
    return JQLDatabaseStatementExecutorDelete;
}());
var JQLDatabaseStatementExecutorRemoteStatement = (function () {
    function JQLDatabaseStatementExecutorRemoteStatement(statement, db) {
        this.statement = statement;
        this.db = db;
    }
    JQLDatabaseStatementExecutorRemoteStatement.prototype.execute = function () {
        var _this = this;
        return function () {
            return _this.db.getJQuery().Deferred(function (defer) {
                if (_this.statement.getStatementType() !== EJQL_LEXER_STATEMENT_TYPES.SELECT) {
                    defer.reject(new Error('Only select statements can be sent to backend!'));
                    return;
                }
                defer.reject(new Error('REMOTE statements not implemented!'));
            }).promise();
        };
    };
    return JQLDatabaseStatementExecutorRemoteStatement;
}());
var JQLTable = (function () {
    function JQLTable(identifiers) {
        this.identifiers = [];
        for (var i = 0, idtf = identifiers || [], len = idtf.length; i < len; i++) {
            this.identifiers.push(idtf[i]);
        }
    }
    JQLTable.prototype.describe = function () {
        return this.identifiers.slice(0);
    };
    JQLTable.prototype.hasIdentifier = function (identifierName) {
        for (var i = 0, len = this.identifiers.length; i < len; i++) {
            if (this.identifiers[i].name === identifierName) {
                return true;
            }
        }
        return false;
    };
    JQLTable.createFromInMemoryArrayOfObjects = function (rows) {
        var identifiers = JQLUtils.getIdentifiers(rows), result = [], ncols = identifiers.length, row, v, vType;
        if (!identifiers.length) {
            throw new Error('No valid columns were detected in "in-memory" array!');
        }
        for (var i = 0, len = rows.length; i < len; i++) {
            row = [];
            for (var col = 0; col < ncols; col++) {
                v = rows[i][identifiers[col].name];
                vType = JQLUtils.getType(v);
                if (vType === null || vType !== identifiers[col].type) {
                    v = null;
                }
                row.push(v);
            }
            result.push(row);
        }
        return new JQLTableInMemory(identifiers, result);
    };
    return JQLTable;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var JQLTableInMemory = (function (_super) {
    __extends(JQLTableInMemory, _super);
    function JQLTableInMemory(identifiers, rows) {
        var _this = _super.call(this, identifiers) || this;
        _this.rows = [];
        for (var i = 0, len = rows.length; i < len; i++) {
            _this.rows.push(rows[i]);
        }
        return _this;
    }
    JQLTableInMemory.prototype.isRemote = function () {
        return false;
    };
    JQLTableInMemory.prototype.getStorageEngine = function () {
        return EJQLTableStorageEngine.IN_MEMORY;
    };
    JQLTableInMemory.prototype.getRowAt = function (rowIndex) {
        return this.rows[rowIndex] || null;
    };
    JQLTableInMemory.prototype.createIterator = function () {
        return new JQLTableUtilsIterator(this);
    };
    JQLTableInMemory.prototype.replace = function (index, newRow) {
        if (this.rows[index]) {
            for (var i = 0, len = this.rows[index].length; i < len; i++) {
                this.rows[index][i] = newRow[i];
            }
        }
        else {
            throw new Error('Undefined table index: ' + JSON.stringify(index));
        }
    };
    JQLTableInMemory.prototype.deleteRow = function (rowIndex) {
        if (this.rows[rowIndex]) {
            this.rows[rowIndex] = null;
        }
    };
    JQLTableInMemory.prototype.compact = function () {
        for (var i = this.rows.length - 1; i >= 0; i--) {
            if (null === this.rows[i]) {
                this.rows.splice(i, 1);
            }
        }
    };
    return JQLTableInMemory;
}(JQLTable));
var JQLTableUtilsIterator = (function () {
    function JQLTableUtilsIterator(table) {
        this.index = 0;
        this.table = table;
        this.row = new JQLRow(table.describe(), null, null);
    }
    JQLTableUtilsIterator.prototype.next = function () {
        var data = this.table.getRowAt(this.index);
        if (null === data) {
            return null;
        }
        this.row.withIndex(this.index);
        this.row.withRowData(data);
        this.index++;
        return this.row;
    };
    return JQLTableUtilsIterator;
}());
var JQLRow = (function () {
    function JQLRow(columns, data, index) {
        this.columns = {};
        this.data = [];
        this.numColumns = columns.length;
        for (var i = 0; i < this.numColumns; i++) {
            this.columns[columns[i].name] = { type: columns[i].type, index: i };
        }
        this.data = data;
        this.rowIndex = index;
    }
    JQLRow.prototype.withIndex = function (index) {
        this.rowIndex = index;
        return this;
    };
    JQLRow.prototype.withRowData = function (data) {
        this.data = data;
        return this;
    };
    JQLRow.prototype.getDataAsArray = function () {
        return this.data;
    };
    JQLRow.prototype.getColumnValue = function (columnName) {
        return this.data[this.columns[columnName].index];
    };
    JQLRow.prototype.setColumnValue = function (columnName, columnValue) {
        this.data[this.columns[columnName].index] = columnValue;
    };
    JQLRow.prototype.toObject = function () {
        var result = Object.create(null), v;
        for (var columnName in this.columns) {
            v = this.data[this.columns[columnName].index];
            if (v === undefined) {
                v = null;
            }
            result[columnName] = v;
        }
        return result;
    };
    JQLRow.prototype.getRowIndex = function () {
        return this.rowIndex;
    };
    JQLRow.createFromObject = function (o) {
        var columns = [], values = [];
        for (var k in o) {
            columns.push({
                type: EJQLTableColumnType.NULL,
                name: k
            });
            values.push(o[k]);
        }
        return new JQLRow(columns, values, 0);
    };
    JQLRow.createFromTable = function (table) {
        return new JQLRow(table.describe(), table.getRowAt(0), undefined);
    };
    return JQLRow;
}());
var JQLDatabaseQueryPlanner = (function () {
    function JQLDatabaseQueryPlanner(database) {
        this.queryId = 0;
        this.queue = [];
        this.running = false;
        this.database = database;
    }
    JQLDatabaseQueryPlanner.prototype.scheduleStatement = function (statement, strategy) {
        return (function (self, $) {
            return $.Deferred(function (defer) {
                self.queryId++;
                self.queue.push({
                    queryId: self.queryId,
                    statement: statement,
                    strategy: strategy,
                    defer: defer,
                });
                if (1 === self.queue.length && !self.running) {
                    self.next();
                }
            }).promise();
        })(this, this.database.getJQuery());
    };
    JQLDatabaseQueryPlanner.prototype.next = function () {
        var _this = this;
        if (this.running) {
            return;
        }
        var item = this.queue.shift();
        if (undefined === item) {
            return;
        }
        this.running = true;
        item.strategy().then(function (result) {
            item.defer.resolve(result);
        }).fail(function (e) {
            item.defer.reject(e);
        }).always(function () {
            _this.running = false;
            if (0 !== _this.queue.length) {
                _this.next();
            }
        });
    };
    return JQLDatabaseQueryPlanner;
}());
var JQLOpcode = (function () {
    function JQLOpcode() {
    }
    return JQLOpcode;
}());
var JQLStatement = (function (_super) {
    __extends(JQLStatement, _super);
    function JQLStatement(token) {
        var _this = _super.call(this) || this;
        _this.remote = token.remote;
        return _this;
    }
    JQLStatement.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.STATEMENT;
    };
    JQLStatement.prototype.isRemote = function () {
        return this.remote;
    };
    JQLStatement.prototype.bind = function (data) {
        this.binded = false;
        var bindings = this.getBindings(), numBindings = bindings.length, bindingName;
        for (var i = 0; i < numBindings; i++) {
            bindings[i].unbind();
        }
        for (var i = 0; i < numBindings; i++) {
            bindingName = bindings[i].getBindingName();
            if (undefined === data[bindingName]) {
                throw new Error("Failed to bind statement: Binding " + JSON.stringify(bindingName) + " is not defined in bind object!");
            }
            else {
                bindings[i].bind(data[bindingName]);
            }
        }
        this.binded = true;
        return this;
    };
    JQLStatement.prototype.isBinded = function () {
        return this.binded;
    };
    return JQLStatement;
}(JQLOpcode));
var JQLTableReference = (function (_super) {
    __extends(JQLTableReference, _super);
    function JQLTableReference(opcode) {
        var _this = _super.call(this) || this;
        _this.name = opcode.name;
        return _this;
    }
    JQLTableReference.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.TABLE;
    };
    JQLTableReference.prototype.getName = function () {
        return this.name;
    };
    return JQLTableReference;
}(JQLOpcode));
var JQLExpression = (function (_super) {
    __extends(JQLExpression, _super);
    function JQLExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JQLExpression.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.EXPRESSION;
    };
    return JQLExpression;
}(JQLOpcode));
var JQLExpressionBinding = (function (_super) {
    __extends(JQLExpressionBinding, _super);
    function JQLExpressionBinding(token) {
        var _this = _super.call(this) || this;
        _this.bindingName = token.name;
        return _this;
    }
    JQLExpressionBinding.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.EXPRESSION;
    };
    JQLExpressionBinding.prototype.getExpressionType = function () {
        return EJQL_LEXER_EXPRESSION_TYPES.BINDING;
    };
    JQLExpressionBinding.prototype.getBindingName = function () {
        return this.bindingName;
    };
    JQLExpressionBinding.prototype.getBindings = function () {
        return [this];
    };
    JQLExpressionBinding.prototype.getFunctions = function () {
        return [];
    };
    JQLExpressionBinding.prototype.getIdentifiers = function () {
        return [];
    };
    JQLExpressionBinding.prototype.bind = function (value) {
        this.bindingValue = value;
        return this;
    };
    JQLExpressionBinding.prototype.unbind = function () {
        this.bindingValue = undefined;
        return this;
    };
    JQLExpressionBinding.prototype.compute = function (context) {
        if (undefined !== this.bindingValue) {
            return this.bindingValue;
        }
        else {
            throw new Error('Failed to compute binding: Binding ' + this.bindingName + ' is not binded!');
        }
    };
    return JQLExpressionBinding;
}(JQLExpression));
var JQLExpressionBoolean = (function (_super) {
    __extends(JQLExpressionBoolean, _super);
    function JQLExpressionBoolean(lexerToken) {
        var _this = _super.call(this) || this;
        _this.value = lexerToken.value;
        return _this;
    }
    JQLExpressionBoolean.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.EXPRESSION;
    };
    JQLExpressionBoolean.prototype.getExpressionType = function () {
        return EJQL_LEXER_EXPRESSION_TYPES.BOOLEAN;
    };
    JQLExpressionBoolean.prototype.getBindings = function () {
        return [];
    };
    JQLExpressionBoolean.prototype.getIdentifiers = function () {
        return [];
    };
    JQLExpressionBoolean.prototype.getFunctions = function () {
        return [];
    };
    JQLExpressionBoolean.prototype.compute = function (context) {
        return this.value;
    };
    return JQLExpressionBoolean;
}(JQLExpression));
var JQLExpressionFunctionCall = (function (_super) {
    __extends(JQLExpressionFunctionCall, _super);
    function JQLExpressionFunctionCall(token) {
        var _this = _super.call(this) || this;
        _this.arguments = [];
        _this.database = null;
        _this.functionName = token.function_name;
        for (var i = 0, len = token.arguments.length; i < len; i++) {
            _this.arguments.push(JQLLexerFactory.create(token.arguments[i]));
        }
        return _this;
    }
    JQLExpressionFunctionCall.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.EXPRESSION;
    };
    JQLExpressionFunctionCall.prototype.getExpressionType = function () {
        return EJQL_LEXER_EXPRESSION_TYPES.FUNCTION_CALL;
    };
    JQLExpressionFunctionCall.prototype.getFunctionName = function () {
        return this.functionName;
    };
    JQLExpressionFunctionCall.prototype.getArguments = function () {
        return this.arguments;
    };
    JQLExpressionFunctionCall.prototype.getBindings = function () {
        var result = [];
        for (var argI = 0, numArgs = this.arguments.length; argI < numArgs; argI++) {
            for (var i = 0, bindings = this.arguments[argI].getBindings(), len = bindings.length; i < len; i++) {
                result.push(bindings[i]);
            }
        }
        return result;
    };
    JQLExpressionFunctionCall.prototype.getFunctions = function () {
        var result = [this];
        for (var argI = 0, numArgs = this.arguments.length; argI < numArgs; argI++) {
            for (var i = 0, functions = this.arguments[argI].getFunctions(), len = functions.length; i < len; i++) {
                result.push(functions[i]);
            }
        }
        return result;
    };
    JQLExpressionFunctionCall.prototype.getIdentifiers = function () {
        var result = [];
        for (var argI = 0, numArgs = this.arguments.length; argI < numArgs; argI++) {
            for (var i = 0, identifiers = this.arguments[argI].getIdentifiers(), len = identifiers.length; i < len; i++) {
                result.push(identifiers[i]);
            }
        }
        return result;
    };
    JQLExpressionFunctionCall.prototype.withDatabase = function (database) {
        this.database = database || null;
        return this;
    };
    JQLExpressionFunctionCall.prototype.compute = function (context) {
        if (this.database) {
            var computedArgs = [];
            for (var i = 0, len = this.arguments.length; i < len; i++) {
                computedArgs.push(this.arguments[i].compute(context));
            }
            return this.database.callFunction(this.functionName, computedArgs);
        }
        else {
            throw new Error("Failed to call function " + JSON.stringify(this.functionName) + ": Database not binded to function!");
        }
    };
    return JQLExpressionFunctionCall;
}(JQLExpression));
var JQLExpressionGroup = (function (_super) {
    __extends(JQLExpressionGroup, _super);
    function JQLExpressionGroup(token) {
        var _this = _super.call(this) || this;
        _this.expression = JQLLexerFactory.create(token.expression);
        return _this;
    }
    JQLExpressionGroup.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.EXPRESSION;
    };
    JQLExpressionGroup.prototype.getExpressionType = function () {
        return EJQL_LEXER_EXPRESSION_TYPES.GROUP;
    };
    JQLExpressionGroup.prototype.getBindings = function () {
        return this.expression.getBindings();
    };
    JQLExpressionGroup.prototype.getFunctions = function () {
        return this.expression.getFunctions();
    };
    JQLExpressionGroup.prototype.getIdentifiers = function () {
        return this.expression.getIdentifiers();
    };
    JQLExpressionGroup.prototype.compute = function (context) {
        return this.expression.compute(context);
    };
    return JQLExpressionGroup;
}(JQLExpression));
var JQLExpressionIdentifier = (function (_super) {
    __extends(JQLExpressionIdentifier, _super);
    function JQLExpressionIdentifier(token) {
        var _this = _super.call(this) || this;
        _this.identifierName = token.name;
        return _this;
    }
    JQLExpressionIdentifier.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.EXPRESSION;
    };
    JQLExpressionIdentifier.prototype.getExpressionType = function () {
        return EJQL_LEXER_EXPRESSION_TYPES.IDENTIFIER;
    };
    JQLExpressionIdentifier.prototype.getIdentifierName = function () {
        return this.identifierName;
    };
    JQLExpressionIdentifier.prototype.getBindings = function () {
        return [];
    };
    JQLExpressionIdentifier.prototype.getFunctions = function () {
        return [];
    };
    JQLExpressionIdentifier.prototype.getIdentifiers = function () {
        return [this];
    };
    JQLExpressionIdentifier.prototype.compute = function (context) {
        return context.getColumnValue(this.identifierName);
    };
    return JQLExpressionIdentifier;
}(JQLExpression));
var JQLExpressionLogical = (function (_super) {
    __extends(JQLExpressionLogical, _super);
    function JQLExpressionLogical(token) {
        var _this = _super.call(this) || this;
        _this.left = JQLLexerFactory.create(token.left);
        _this.right = JQLLexerFactory.create(token.right);
        return _this;
    }
    JQLExpressionLogical.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.EXPRESSION;
    };
    JQLExpressionLogical.prototype.getExpressionType = function () {
        return EJQL_LEXER_EXPRESSION_TYPES.LOGICAL;
    };
    JQLExpressionLogical.prototype.getLeftOperand = function () {
        return this.left;
    };
    JQLExpressionLogical.prototype.getRightOperand = function () {
        return this.right;
    };
    JQLExpressionLogical.prototype.getBindings = function () {
        var result = [];
        for (var i = 0, bindings = this.left.getBindings(), len = bindings.length; i < len; i++) {
            result.push(bindings[i]);
        }
        for (var i = 0, bindings = this.right.getBindings(), len = bindings.length; i < len; i++) {
            result.push(bindings[i]);
        }
        return result;
    };
    JQLExpressionLogical.prototype.getFunctions = function () {
        var result = [];
        for (var i = 0, functions = this.left.getFunctions(), len = functions.length; i < len; i++) {
            result.push(functions[i]);
        }
        for (var i = 0, functions = this.right.getFunctions(), len = functions.length; i < len; i++) {
            result.push(functions[i]);
        }
        return result;
    };
    JQLExpressionLogical.prototype.getIdentifiers = function () {
        var result = [];
        for (var i = 0, identifiers = this.left.getIdentifiers(), len = identifiers.length; i < len; i++) {
            result.push(identifiers[i]);
        }
        for (var i = 0, identifiers = this.right.getIdentifiers(), len = identifiers.length; i < len; i++) {
            result.push(identifiers[i]);
        }
        return result;
    };
    return JQLExpressionLogical;
}(JQLExpression));
var JQLExpressionLogicalOr = (function (_super) {
    __extends(JQLExpressionLogicalOr, _super);
    function JQLExpressionLogicalOr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JQLExpressionLogicalOr.prototype.getOperator = function () {
        return EJQL_LEXER_OPERATOR_LOGICAL_TYPE.OR;
    };
    JQLExpressionLogicalOr.prototype.compute = function (context) {
        console.warn('TODO: Properly implement "Logical ||" operator');
        return this.left.compute(context) || this.right.compute(context);
    };
    return JQLExpressionLogicalOr;
}(JQLExpressionLogical));
var JQLExpressionLogicalAnd = (function (_super) {
    __extends(JQLExpressionLogicalAnd, _super);
    function JQLExpressionLogicalAnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JQLExpressionLogicalAnd.prototype.getOperator = function () {
        return EJQL_LEXER_OPERATOR_LOGICAL_TYPE.AND;
    };
    JQLExpressionLogicalAnd.prototype.compute = function (context) {
        console.warn('TODO: Properly implement "Logical &&" operator');
        return this.left.compute(context) || this.right.compute(context);
    };
    return JQLExpressionLogicalAnd;
}(JQLExpressionLogical));
var JQLExpressionLogicalEquals = (function (_super) {
    __extends(JQLExpressionLogicalEquals, _super);
    function JQLExpressionLogicalEquals() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JQLExpressionLogicalEquals.prototype.getOperator = function () {
        return EJQL_LEXER_OPERATOR_COMPARISION_TYPE.EQUALS;
    };
    JQLExpressionLogicalEquals.prototype.compute = function (context) {
        console.warn('TODO: Properly implement "Logical ==" operator');
        return this.left.compute(context) == this.right.compute(context);
    };
    return JQLExpressionLogicalEquals;
}(JQLExpressionLogical));
var JQLExpressionLogicalLike = (function (_super) {
    __extends(JQLExpressionLogicalLike, _super);
    function JQLExpressionLogicalLike() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JQLExpressionLogicalLike.prototype.getOperator = function () {
        return EJQL_LEXER_OPERATOR_COMPARISION_TYPE.LIKE;
    };
    JQLExpressionLogicalLike.prototype.compute = function (context) {
        console.warn('TODO: Properly implement "Logical ~=" operator');
        return this.like(this.left.compute(context), this.right.compute(context));
    };
    JQLExpressionLogicalLike.prototype.like = function (left, right) {
        console.warn("TODO: JQLExpressionLogicalLike.like(left, right): implement");
        return true;
    };
    return JQLExpressionLogicalLike;
}(JQLExpressionLogical));
var JQLExpressionLogicalLowerThen = (function (_super) {
    __extends(JQLExpressionLogicalLowerThen, _super);
    function JQLExpressionLogicalLowerThen() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JQLExpressionLogicalLowerThen.prototype.getOperator = function () {
        return EJQL_LEXER_OPERATOR_COMPARISION_TYPE.LT;
    };
    JQLExpressionLogicalLowerThen.prototype.compute = function (context) {
        console.warn('TODO: Properly implement "Logical <" operator');
        return this.left.compute(context) < this.right.compute(context);
    };
    return JQLExpressionLogicalLowerThen;
}(JQLExpressionLogical));
var JQLExpressionLogicalLowerThenEquals = (function (_super) {
    __extends(JQLExpressionLogicalLowerThenEquals, _super);
    function JQLExpressionLogicalLowerThenEquals() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JQLExpressionLogicalLowerThenEquals.prototype.getOperator = function () {
        return EJQL_LEXER_OPERATOR_COMPARISION_TYPE.LTE;
    };
    JQLExpressionLogicalLowerThenEquals.prototype.compute = function (context) {
        console.warn('TODO: Properly implement "Logical <=" operator');
        return this.left.compute(context) <= this.right.compute(context);
    };
    return JQLExpressionLogicalLowerThenEquals;
}(JQLExpressionLogical));
var JQLExpressionLogicalGreaterThen = (function (_super) {
    __extends(JQLExpressionLogicalGreaterThen, _super);
    function JQLExpressionLogicalGreaterThen() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JQLExpressionLogicalGreaterThen.prototype.getOperator = function () {
        return EJQL_LEXER_OPERATOR_COMPARISION_TYPE.GT;
    };
    JQLExpressionLogicalGreaterThen.prototype.compute = function (context) {
        console.warn('TODO: Properly implement "Logical >" operator');
        return this.left.compute(context) > this.right.compute(context);
    };
    return JQLExpressionLogicalGreaterThen;
}(JQLExpressionLogical));
var JQLExpressionLogicalGreaterThenEquals = (function (_super) {
    __extends(JQLExpressionLogicalGreaterThenEquals, _super);
    function JQLExpressionLogicalGreaterThenEquals() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JQLExpressionLogicalGreaterThenEquals.prototype.getOperator = function () {
        return EJQL_LEXER_OPERATOR_COMPARISION_TYPE.GTE;
    };
    JQLExpressionLogicalGreaterThenEquals.prototype.compute = function (context) {
        console.warn('TODO: Properly implement "Logical >=" operator');
        return this.left.compute(context) >= this.right.compute(context);
    };
    return JQLExpressionLogicalGreaterThenEquals;
}(JQLExpressionLogical));
var JQLExpressionMath = (function (_super) {
    __extends(JQLExpressionMath, _super);
    function JQLExpressionMath(token) {
        var _this = _super.call(this) || this;
        _this.left = JQLLexerFactory.create(token.left);
        _this.right = JQLLexerFactory.create(token.right);
        return _this;
    }
    JQLExpressionMath.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.EXPRESSION;
    };
    JQLExpressionMath.prototype.getExpressionType = function () {
        return EJQL_LEXER_EXPRESSION_TYPES.MATH;
    };
    JQLExpressionMath.prototype.getLeftOperand = function () {
        return this.left;
    };
    JQLExpressionMath.prototype.getRightOperand = function () {
        return this.right;
    };
    JQLExpressionMath.prototype.getBindings = function () {
        var result = [];
        for (var i = 0, bindings = this.left.getBindings(), len = bindings.length; i < len; i++) {
            result.push(bindings[i]);
        }
        for (var i = 0, bindings = this.right.getBindings(), len = bindings.length; i < len; i++) {
            result.push(bindings[i]);
        }
        return result;
    };
    JQLExpressionMath.prototype.getFunctions = function () {
        var result = [];
        for (var i = 0, functions = this.left.getFunctions(), len = functions.length; i < len; i++) {
            result.push(functions[i]);
        }
        for (var i = 0, functions = this.right.getFunctions(), len = functions.length; i < len; i++) {
            result.push(functions[i]);
        }
        return result;
    };
    JQLExpressionMath.prototype.getIdentifiers = function () {
        var result = [];
        for (var i = 0, identifiers = this.left.getIdentifiers(), len = identifiers.length; i < len; i++) {
            result.push(identifiers[i]);
        }
        for (var i = 0, identifiers = this.right.getIdentifiers(), len = identifiers.length; i < len; i++) {
            result.push(identifiers[i]);
        }
        return result;
    };
    return JQLExpressionMath;
}(JQLExpression));
var JQLExpressionMathAddition = (function (_super) {
    __extends(JQLExpressionMathAddition, _super);
    function JQLExpressionMathAddition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JQLExpressionMathAddition.prototype.getOperator = function () {
        return EJQL_LEXER_OPERATOR_MATH_TYPE.ADDITION;
    };
    JQLExpressionMathAddition.prototype.compute = function (context) {
        console.warn('TODO: Properly implement "+" operator');
        return Number(this.left.compute(context)) + Number(this.right.compute(context));
    };
    return JQLExpressionMathAddition;
}(JQLExpressionMath));
var JQLExpressionMathDifference = (function (_super) {
    __extends(JQLExpressionMathDifference, _super);
    function JQLExpressionMathDifference() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JQLExpressionMathDifference.prototype.getOperator = function () {
        return EJQL_LEXER_OPERATOR_MATH_TYPE.DIFFERENCE;
    };
    JQLExpressionMathDifference.prototype.compute = function (context) {
        console.warn('TODO: Properly implement "-" operator');
        return Number(this.left.compute(context)) - Number(this.right.compute(context));
    };
    return JQLExpressionMathDifference;
}(JQLExpressionMath));
var JQLExpressionMathDivision = (function (_super) {
    __extends(JQLExpressionMathDivision, _super);
    function JQLExpressionMathDivision() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JQLExpressionMathDivision.prototype.getOperator = function () {
        return EJQL_LEXER_OPERATOR_MATH_TYPE.DIVISION;
    };
    JQLExpressionMathDivision.prototype.compute = function (context) {
        console.warn('TODO: properly implement "/" operator');
        return Number(this.left.compute(context)) / Number(this.right.compute(context));
    };
    return JQLExpressionMathDivision;
}(JQLExpressionMath));
var JQLExpressionMathMultiply = (function (_super) {
    __extends(JQLExpressionMathMultiply, _super);
    function JQLExpressionMathMultiply() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JQLExpressionMathMultiply.prototype.getOperator = function () {
        return EJQL_LEXER_OPERATOR_MATH_TYPE.MULTIPLY;
    };
    JQLExpressionMathMultiply.prototype.compute = function (context) {
        console.warn('TODO: Properly implement "*" operator');
        return Number(this.left.compute(context)) * Number(this.right.compute(context));
    };
    return JQLExpressionMathMultiply;
}(JQLExpressionMath));
var JQLExpressionNull = (function (_super) {
    __extends(JQLExpressionNull, _super);
    function JQLExpressionNull() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JQLExpressionNull.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.EXPRESSION;
    };
    JQLExpressionNull.prototype.getExpressionType = function () {
        return EJQL_LEXER_EXPRESSION_TYPES.NULL;
    };
    JQLExpressionNull.prototype.getBindings = function () {
        return [];
    };
    JQLExpressionNull.prototype.getFunctions = function () {
        return [];
    };
    JQLExpressionNull.prototype.getIdentifiers = function () {
        return [];
    };
    JQLExpressionNull.prototype.compute = function (context) {
        return null;
    };
    return JQLExpressionNull;
}(JQLExpression));
var JQLExpressionNumber = (function (_super) {
    __extends(JQLExpressionNumber, _super);
    function JQLExpressionNumber(opcode) {
        var _this = _super.call(this) || this;
        _this.value = opcode.value;
        return _this;
    }
    JQLExpressionNumber.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.EXPRESSION;
    };
    JQLExpressionNumber.prototype.getExpressionType = function () {
        return EJQL_LEXER_EXPRESSION_TYPES.NUMBER;
    };
    JQLExpressionNumber.prototype.getBindings = function () {
        return [];
    };
    JQLExpressionNumber.prototype.getFunctions = function () {
        return [];
    };
    JQLExpressionNumber.prototype.getIdentifiers = function () {
        return [];
    };
    JQLExpressionNumber.prototype.compute = function (context) {
        return this.value;
    };
    return JQLExpressionNumber;
}(JQLExpression));
var JQLExpressionString = (function (_super) {
    __extends(JQLExpressionString, _super);
    function JQLExpressionString(opcode) {
        var _this = _super.call(this) || this;
        _this.value = opcode.value;
        return _this;
    }
    JQLExpressionString.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.EXPRESSION;
    };
    JQLExpressionString.prototype.getExpressionType = function () {
        return EJQL_LEXER_EXPRESSION_TYPES.STRING;
    };
    JQLExpressionString.prototype.getBindings = function () {
        return [];
    };
    JQLExpressionString.prototype.getFunctions = function () {
        return [];
    };
    JQLExpressionString.prototype.getIdentifiers = function () {
        return [];
    };
    JQLExpressionString.prototype.compute = function (context) {
        return this.value;
    };
    return JQLExpressionString;
}(JQLExpression));
var JQLExpressionUnary = (function (_super) {
    __extends(JQLExpressionUnary, _super);
    function JQLExpressionUnary(token) {
        var _this = _super.call(this) || this;
        _this.operand = JQLLexerFactory.create(token.left);
        return _this;
    }
    JQLExpressionUnary.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.EXPRESSION;
    };
    JQLExpressionUnary.prototype.getExpressionType = function () {
        return EJQL_LEXER_EXPRESSION_TYPES.UNARY;
    };
    JQLExpressionUnary.prototype.getOperand = function () {
        return this.operand;
    };
    JQLExpressionUnary.prototype.getBindings = function () {
        return this.operand.getBindings();
    };
    JQLExpressionUnary.prototype.getFunctions = function () {
        return this.operand.getFunctions();
    };
    JQLExpressionUnary.prototype.getIdentifiers = function () {
        return this.operand.getIdentifiers();
    };
    return JQLExpressionUnary;
}(JQLExpression));
var JQLExpressionUnaryInvert = (function (_super) {
    __extends(JQLExpressionUnaryInvert, _super);
    function JQLExpressionUnaryInvert() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JQLExpressionUnaryInvert.prototype.getOperator = function () {
        console.warn('TODO: Properly implement "Unary -" operator');
        return EJQL_LEXER_OPERATOR_UNARY_TYPE.INVERT;
    };
    JQLExpressionUnaryInvert.prototype.compute = function (context) {
        console.warn('TODO: Properly implement "Unary -" operator');
        return -this.operand.compute(context);
    };
    return JQLExpressionUnaryInvert;
}(JQLExpressionUnary));
var JQLExpressionUnaryNot = (function (_super) {
    __extends(JQLExpressionUnaryNot, _super);
    function JQLExpressionUnaryNot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JQLExpressionUnaryNot.prototype.getOperator = function () {
        return EJQL_LEXER_OPERATOR_UNARY_TYPE.NOT;
    };
    JQLExpressionUnaryNot.prototype.compute = function (context) {
        console.warn('TODO: Properly implement "Unary !" operator');
        return !this.operand.compute(context);
    };
    return JQLExpressionUnaryNot;
}(JQLExpressionUnary));
var JQLSorterStrategy = (function (_super) {
    __extends(JQLSorterStrategy, _super);
    function JQLSorterStrategy(token) {
        var _this = _super.call(this) || this;
        _this.strategy = token.type;
        return _this;
    }
    JQLSorterStrategy.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.ORDER_BY_OPTION;
    };
    return JQLSorterStrategy;
}(JQLOpcode));
var JQLSorterStrategyByExpression = (function (_super) {
    __extends(JQLSorterStrategyByExpression, _super);
    function JQLSorterStrategyByExpression(token) {
        var _this = _super.call(this, token) || this;
        _this.expressions = [];
        for (var i = 0, len = token.fields.length; i < len; i++) {
            _this.expressions.push(JQLLexerFactory.create(token.fields[i]));
        }
        return _this;
    }
    JQLSorterStrategyByExpression.prototype.getSortExpressions = function () {
        return this.expressions;
    };
    JQLSorterStrategyByExpression.prototype.isRandom = function () {
        return false;
    };
    return JQLSorterStrategyByExpression;
}(JQLSorterStrategy));
var JQLSorterStrategyRandom = (function (_super) {
    __extends(JQLSorterStrategyRandom, _super);
    function JQLSorterStrategyRandom(token) {
        return _super.call(this, token) || this;
    }
    JQLSorterStrategyRandom.prototype.isRandom = function () {
        return true;
    };
    return JQLSorterStrategyRandom;
}(JQLSorterStrategy));
var JQLSorterExpression = (function (_super) {
    __extends(JQLSorterExpression, _super);
    function JQLSorterExpression(token) {
        var _this = _super.call(this) || this;
        _this.direction = token.direction;
        _this.expression = JQLLexerFactory.create(token.expression);
        return _this;
    }
    JQLSorterExpression.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.ORDER_BY_EXPRESSION;
    };
    JQLSorterExpression.prototype.getDirection = function () {
        return this.direction;
    };
    JQLSorterExpression.prototype.getExpression = function () {
        return this.expression;
    };
    return JQLSorterExpression;
}(JQLOpcode));
var JQLLimit = (function (_super) {
    __extends(JQLLimit, _super);
    function JQLLimit(token) {
        var _this = _super.call(this) || this;
        _this.limit = token.limit;
        _this.skip = token.skip;
        return _this;
    }
    JQLLimit.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.LIMIT_OPTION;
    };
    JQLLimit.prototype.getLimit = function () {
        return this.limit;
    };
    JQLLimit.prototype.getSkip = function () {
        return this.skip;
    };
    return JQLLimit;
}(JQLOpcode));
var JQLStatementResult = (function () {
    function JQLStatementResult() {
    }
    JQLStatementResult.prototype.getAffectedRows = function () {
        return this.affectedRows;
    };
    JQLStatementResult.prototype.withAffectedRows = function (affectedRowsCount) {
        this.affectedRows = ~~affectedRowsCount;
        return this;
    };
    return JQLStatementResult;
}());
var JQLStatementResultSelect = (function (_super) {
    __extends(JQLStatementResultSelect, _super);
    function JQLStatementResultSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rows = [];
        return _this;
    }
    JQLStatementResultSelect.prototype.addRows = function (rows) {
        if (rows && rows.length) {
            for (var i = 0, len = rows.length; i < len; i++) {
                this.rows.push(rows[i]);
            }
        }
        return this;
    };
    JQLStatementResultSelect.prototype.getAffectedRows = function () {
        return this.rows.length;
    };
    JQLStatementResultSelect.prototype.getRows = function () {
        return this.rows;
    };
    JQLStatementResultSelect.prototype.getRowsAsArray = function () {
        if (!this.rows || !this.rows.length) {
            return [];
        }
        var result = [], keys, numKeys, row, v;
        for (var i = 0, len = this.rows.length; i < len; i++) {
            row = [];
            keys = Object.keys(this.rows[i]);
            numKeys = keys.length;
            for (var j = 0; j < numKeys; j++) {
                v = this.rows[i][keys[j]];
                if (undefined === v) {
                    v = null;
                }
                row.push(v);
            }
            result.push(row);
        }
        return result;
    };
    return JQLStatementResultSelect;
}(JQLStatementResult));
var JQLStatementSelect = (function (_super) {
    __extends(JQLStatementSelect, _super);
    function JQLStatementSelect(token) {
        var _this = _super.call(this, token) || this;
        _this.table = null;
        _this.filter = null;
        _this.sorter = null;
        _this.limit = null;
        _this.union = null;
        _this.previous = null;
        _this.fields = JQLLexerFactory.create(token.fields);
        if (!!token.table) {
            _this.table = JQLLexerFactory.create(token.table);
            if (!!token.where) {
                _this.filter = JQLLexerFactory.create(token.where);
            }
            if (!!token.orderBy) {
                _this.sorter = JQLLexerFactory.create(token.orderBy);
            }
            if (!!token.limit) {
                _this.limit = JQLLexerFactory.create(token.limit);
            }
        }
        if (!!token.union) {
            _this.union = JQLLexerFactory.create(token.union).withPreviousStatement(_this);
        }
        return _this;
    }
    JQLStatementSelect.prototype.isRemote = function () {
        if (this.previous) {
            return this.previous.isRemote();
        }
        else {
            return _super.prototype.isRemote.call(this);
        }
    };
    JQLStatementSelect.prototype.getStatementType = function () {
        return EJQL_LEXER_STATEMENT_TYPES.SELECT;
    };
    JQLStatementSelect.prototype.getFields = function () {
        return this.fields;
    };
    JQLStatementSelect.prototype.getTable = function () {
        return this.table;
    };
    JQLStatementSelect.prototype.getFilter = function () {
        return this.filter;
    };
    JQLStatementSelect.prototype.getSorter = function () {
        return this.sorter;
    };
    JQLStatementSelect.prototype.getLimit = function () {
        return this.limit;
    };
    JQLStatementSelect.prototype.getUnion = function () {
        return this.union;
    };
    JQLStatementSelect.prototype.withPreviousStatement = function (statement) {
        this.previous = statement || null;
        return this;
    };
    JQLStatementSelect.prototype.getBindings = function () {
        var result = [];
        if (null !== this.fields) {
            if (!this.fields.isSelectingAllFields()) {
                for (var specificFields = this.fields, i = 0, fields = specificFields.getFields(), len = fields.length; i < len; i++) {
                    for (var j = 0, bindings = fields[i].getExpression().getBindings(), n = bindings.length; j < n; j++) {
                        result.push(bindings[j]);
                    }
                }
            }
        }
        if (null !== this.filter) {
            for (var bindings = this.filter.getBindings(), i = 0, len = bindings.length; i < len; i++) {
                result.push(bindings[i]);
            }
        }
        if (null !== this.sorter) {
            if (!this.sorter.isRandom()) {
                for (var sorterByExpression = this.sorter, i = 0, expressions = sorterByExpression.getSortExpressions(), len = expressions.length; i < len; i++) {
                    for (var j = 0, bindings = expressions[i].getExpression().getBindings(), n = bindings.length; j < n; j++) {
                        result.push(bindings[i]);
                    }
                }
            }
        }
        return result;
    };
    JQLStatementSelect.prototype.getFunctions = function () {
        var result = [];
        if (null !== this.fields) {
            if (!this.fields.isSelectingAllFields()) {
                for (var specificFields = this.fields, i = 0, fields = specificFields.getFields(), len = fields.length; i < len; i++) {
                    for (var j = 0, functions = fields[i].getExpression().getFunctions(), n = functions.length; j < n; j++) {
                        result.push(functions[j]);
                    }
                }
            }
        }
        if (null !== this.filter) {
            for (var functions = this.filter.getFunctions(), i = 0, len = functions.length; i < len; i++) {
                result.push(functions[i]);
            }
        }
        if (null !== this.sorter) {
            if (!this.sorter.isRandom()) {
                for (var sorterByExpression = this.sorter, i = 0, expressions = sorterByExpression.getSortExpressions(), len = expressions.length; i < len; i++) {
                    for (var j = 0, functions = expressions[i].getExpression().getFunctions(), n = functions.length; j < n; j++) {
                        result.push(functions[i]);
                    }
                }
            }
        }
        return result;
    };
    JQLStatementSelect.prototype.getIdentifiers = function () {
        var result = [];
        if (null !== this.fields) {
            if (!this.fields.isSelectingAllFields()) {
                for (var specificFields = this.fields, i = 0, fields = specificFields.getFields(), len = fields.length; i < len; i++) {
                    for (var j = 0, identifiers = fields[i].getExpression().getIdentifiers(), n = identifiers.length; j < n; j++) {
                        result.push(identifiers[j]);
                    }
                }
            }
        }
        if (null !== this.filter) {
            for (var identifiers = this.filter.getIdentifiers(), i = 0, len = identifiers.length; i < len; i++) {
                result.push(identifiers[i]);
            }
        }
        if (null !== this.sorter) {
            if (!this.sorter.isRandom()) {
                for (var sorterByExpression = this.sorter, i = 0, expressions = sorterByExpression.getSortExpressions(), len = expressions.length; i < len; i++) {
                    for (var j = 0, identifiers = expressions[i].getExpression().getIdentifiers(), n = identifiers.length; j < n; j++) {
                        result.push(identifiers[j]);
                    }
                }
            }
        }
        return result;
    };
    return JQLStatementSelect;
}(JQLStatement));
var JQLStatementSelectField = (function (_super) {
    __extends(JQLStatementSelectField, _super);
    function JQLStatementSelectField(token) {
        var _this = _super.call(this) || this;
        _this.literal = null;
        _this.literal = token.literal;
        _this.expression = JQLLexerFactory.create(token.expression);
        return _this;
    }
    JQLStatementSelectField.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.FIELD;
    };
    JQLStatementSelectField.prototype.getLiteral = function () {
        return this.literal;
    };
    JQLStatementSelectField.prototype.getExpression = function () {
        return this.expression;
    };
    return JQLStatementSelectField;
}(JQLOpcode));
var JQLStatementSelectFieldsList = (function (_super) {
    __extends(JQLStatementSelectFieldsList, _super);
    function JQLStatementSelectFieldsList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JQLStatementSelectFieldsList.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.FIELDS_LIST;
    };
    return JQLStatementSelectFieldsList;
}(JQLOpcode));
var JQLStatementSelectFieldsListAll = (function (_super) {
    __extends(JQLStatementSelectFieldsListAll, _super);
    function JQLStatementSelectFieldsListAll(lexerToken) {
        return _super.call(this) || this;
    }
    JQLStatementSelectFieldsListAll.prototype.isSelectingAllFields = function () {
        return true;
    };
    return JQLStatementSelectFieldsListAll;
}(JQLStatementSelectFieldsList));
var JQLStatementSelectFieldsListSpecific = (function (_super) {
    __extends(JQLStatementSelectFieldsListSpecific, _super);
    function JQLStatementSelectFieldsListSpecific(lexerToken) {
        var _this = _super.call(this) || this;
        _this.fields = [];
        for (var i = 0, len = lexerToken.fields.length; i < len; i++) {
            _this.fields.push(JQLLexerFactory.create(lexerToken.fields[i]));
        }
        return _this;
    }
    JQLStatementSelectFieldsListSpecific.prototype.getFields = function () {
        return this.fields;
    };
    JQLStatementSelectFieldsListSpecific.prototype.isSelectingAllFields = function () {
        return false;
    };
    return JQLStatementSelectFieldsListSpecific;
}(JQLStatementSelectFieldsList));
var JQLStatementInsert = (function (_super) {
    __extends(JQLStatementInsert, _super);
    function JQLStatementInsert(statement) {
        var _this = _super.call(this, statement) || this;
        _this.fields = [];
        _this.table = JQLLexerFactory.create(statement.table);
        for (var i = 0, len = statement.fields.length; i < len; i++) {
            _this.fields.push(JQLLexerFactory.create(statement.fields[i]));
        }
        return _this;
    }
    JQLStatementInsert.prototype.getStatementType = function () {
        return EJQL_LEXER_STATEMENT_TYPES.INSERT;
    };
    JQLStatementInsert.prototype.getTable = function () {
        return this.table;
    };
    JQLStatementInsert.prototype.getFields = function () {
        return this.fields;
    };
    JQLStatementInsert.prototype.getBindings = function () {
        var result = [];
        for (var i = 0, len = this.fields.length; i < len; i++) {
            for (var j = 0, bindings = this.fields[i].getExpression().getBindings(), n = bindings.length; j < n; j++) {
                result.push(bindings[j]);
            }
        }
        return result;
    };
    JQLStatementInsert.prototype.getFunctions = function () {
        var result = [];
        for (var i = 0, len = this.fields.length; i < len; i++) {
            for (var j = 0, functions = this.fields[i].getExpression().getFunctions(), n = functions.length; j < n; j++) {
                result.push(functions[j]);
            }
        }
        return result;
    };
    JQLStatementInsert.prototype.getIdentifiers = function () {
        var result = [];
        for (var i = 0, len = this.fields.length; i < len; i++) {
            for (var j = 0, identifiers = this.fields[i].getExpression().getIdentifiers(), n = identifiers.length; j < n; j++) {
                result.push(identifiers[j]);
            }
        }
        return result;
    };
    return JQLStatementInsert;
}(JQLStatement));
var JQLStatementUpdate = (function (_super) {
    __extends(JQLStatementUpdate, _super);
    function JQLStatementUpdate(statement) {
        var _this = _super.call(this, statement) || this;
        _this.fields = [];
        _this.filter = null;
        _this.limit = null;
        _this.sorter = null;
        _this.timer = null;
        _this.table = JQLLexerFactory.create(statement.table);
        if (!!statement.delayed) {
            _this.timer = JQLLexerFactory.create(statement.delayed);
        }
        for (var i = 0, len = statement.fields.length; i < len; i++) {
            _this.fields.push(JQLLexerFactory.create(statement.fields[i]));
        }
        if (!!statement.where) {
            _this.filter = JQLLexerFactory.create(statement.where);
        }
        if (!!statement.limit) {
            _this.limit = JQLLexerFactory.create(statement.limit);
        }
        if (!!statement.orderBy) {
            _this.sorter = JQLLexerFactory.create(statement.orderBy);
        }
        return _this;
    }
    JQLStatementUpdate.prototype.getStatementType = function () {
        return EJQL_LEXER_STATEMENT_TYPES.UPDATE;
    };
    JQLStatementUpdate.prototype.getTimer = function () {
        return this.timer;
    };
    JQLStatementUpdate.prototype.getTable = function () {
        return this.table;
    };
    JQLStatementUpdate.prototype.getFields = function () {
        return this.fields;
    };
    JQLStatementUpdate.prototype.getFilter = function () {
        return this.filter;
    };
    JQLStatementUpdate.prototype.getSorter = function () {
        return this.sorter;
    };
    JQLStatementUpdate.prototype.getLimit = function () {
        return this.limit;
    };
    JQLStatementUpdate.prototype.getBindings = function () {
        var result = [];
        for (var i = 0, len = this.fields.length; i < len; i++) {
            for (var j = 0, bindings = this.fields[i].getExpression().getBindings(), n = bindings.length; j < n; j++) {
                result.push(bindings[j]);
            }
        }
        if (!!this.filter) {
            for (var i = 0, bindings = this.filter.getBindings(), len = bindings.length; i < len; i++) {
                result.push(bindings[i]);
            }
        }
        if (!!this.sorter) {
            if (!this.sorter.isRandom()) {
                for (var sorterByExpression = this.sorter, i = 0, expressions = sorterByExpression.getSortExpressions(), len = expressions.length; i < len; i++) {
                    for (var j = 0, bindings = expressions[i].getExpression().getBindings(), n = bindings.length; j < n; j++) {
                        result.push(bindings[i]);
                    }
                }
            }
        }
        return result;
    };
    JQLStatementUpdate.prototype.getFunctions = function () {
        var result = [];
        for (var i = 0, len = this.fields.length; i < len; i++) {
            for (var j = 0, functions = this.fields[i].getExpression().getFunctions(), n = functions.length; j < n; j++) {
                result.push(functions[j]);
            }
        }
        if (!!this.filter) {
            for (var i = 0, functions = this.filter.getFunctions(), len = functions.length; i < len; i++) {
                result.push(functions[i]);
            }
        }
        if (!!this.sorter) {
            if (!this.sorter.isRandom()) {
                for (var sorterByExpression = this.sorter, i = 0, expressions = sorterByExpression.getSortExpressions(), len = expressions.length; i < len; i++) {
                    for (var j = 0, functions = expressions[i].getExpression().getFunctions(), n = functions.length; j < n; j++) {
                        result.push(functions[i]);
                    }
                }
            }
        }
        return result;
    };
    JQLStatementUpdate.prototype.getIdentifiers = function () {
        var result = [];
        for (var i = 0, len = this.fields.length; i < len; i++) {
            for (var j = 0, identifiers = this.fields[i].getExpression().getIdentifiers(), n = identifiers.length; j < n; j++) {
                result.push(identifiers[j]);
            }
        }
        if (!!this.filter) {
            for (var i = 0, identifiers = this.filter.getIdentifiers(), len = identifiers.length; i < len; i++) {
                result.push(identifiers[i]);
            }
        }
        if (null !== this.sorter) {
            if (!this.sorter.isRandom()) {
                for (var sorterByExpression = this.sorter, i = 0, expressions = sorterByExpression.getSortExpressions(), len = expressions.length; i < len; i++) {
                    for (var j = 0, identifiers = expressions[i].getExpression().getIdentifiers(), n = identifiers.length; j < n; j++) {
                        result.push(identifiers[j]);
                    }
                }
            }
        }
        return result;
    };
    return JQLStatementUpdate;
}(JQLStatement));
var JQLStatementUpdateField = (function (_super) {
    __extends(JQLStatementUpdateField, _super);
    function JQLStatementUpdateField(token) {
        var _this = _super.call(this) || this;
        _this.name = token.name;
        _this.expression = JQLLexerFactory.create(token.expression);
        return _this;
    }
    JQLStatementUpdateField.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.UPDATE_FIELD;
    };
    JQLStatementUpdateField.prototype.getFieldName = function () {
        return this.name;
    };
    JQLStatementUpdateField.prototype.getExpression = function () {
        return this.expression;
    };
    return JQLStatementUpdateField;
}(JQLOpcode));
var JQLStatementUpdateDelayedOption = (function (_super) {
    __extends(JQLStatementUpdateDelayedOption, _super);
    function JQLStatementUpdateDelayedOption(token) {
        var _this = _super.call(this) || this;
        _this.timer = 'number' === typeof token.timer
            ? token.timer
            : null;
        return _this;
    }
    JQLStatementUpdateDelayedOption.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.DELAYED_OPTION;
    };
    JQLStatementUpdateDelayedOption.prototype.getTimerValueInMilliseconds = function () {
        return this.timer;
    };
    return JQLStatementUpdateDelayedOption;
}(JQLOpcode));
var JQLStatementDelete = (function (_super) {
    __extends(JQLStatementDelete, _super);
    function JQLStatementDelete(statement) {
        var _this = _super.call(this, statement) || this;
        _this.filter = null;
        _this.sorter = null;
        _this.limit = null;
        _this.table = JQLLexerFactory.create(statement.table);
        if (!!statement.where) {
            _this.filter = JQLLexerFactory.create(statement.where);
        }
        if (!!statement.orderBy) {
            _this.sorter = JQLLexerFactory.create(statement.orderBy);
        }
        if (!!statement.limit) {
            _this.limit = JQLLexerFactory.create(statement.limit);
        }
        return _this;
    }
    JQLStatementDelete.prototype.getStatementType = function () {
        return EJQL_LEXER_STATEMENT_TYPES.DELETE;
    };
    JQLStatementDelete.prototype.getTable = function () {
        return this.table;
    };
    JQLStatementDelete.prototype.getFilter = function () {
        return this.filter;
    };
    JQLStatementDelete.prototype.getSorter = function () {
        return this.sorter;
    };
    JQLStatementDelete.prototype.getLimit = function () {
        return this.limit;
    };
    JQLStatementDelete.prototype.getBindings = function () {
        var result = [];
        if (!!this.filter) {
            for (var bindings = this.filter.getBindings(), i = 0, len = bindings.length; i < len; i++) {
                result.push(bindings[i]);
            }
        }
        if (!!this.sorter) {
            if (!this.sorter.isRandom()) {
                for (var sorterByExpression = this.sorter, i = 0, expressions = sorterByExpression.getSortExpressions(), len = expressions.length; i < len; i++) {
                    for (var j = 0, bindings = expressions[i].getExpression().getBindings(), n = bindings.length; j < n; j++) {
                        result.push(bindings[i]);
                    }
                }
            }
        }
        return result;
    };
    JQLStatementDelete.prototype.getFunctions = function () {
        var result = [];
        if (null !== this.filter) {
            for (var functions = this.filter.getFunctions(), i = 0, len = functions.length; i < len; i++) {
                result.push(functions[i]);
            }
        }
        if (null !== this.sorter) {
            if (!this.sorter.isRandom()) {
                for (var sorterByExpression = this.sorter, i = 0, expressions = sorterByExpression.getSortExpressions(), len = expressions.length; i < len; i++) {
                    for (var j = 0, functions = expressions[i].getExpression().getFunctions(), n = functions.length; j < n; j++) {
                        result.push(functions[i]);
                    }
                }
            }
        }
        return result;
    };
    JQLStatementDelete.prototype.getIdentifiers = function () {
        var result = [];
        if (null !== this.filter) {
            for (var identifiers = this.filter.getIdentifiers(), i = 0, len = identifiers.length; i < len; i++) {
                result.push(identifiers[i]);
            }
        }
        if (null !== this.sorter) {
            if (!this.sorter.isRandom()) {
                for (var sorterByExpression = this.sorter, i = 0, expressions = sorterByExpression.getSortExpressions(), len = expressions.length; i < len; i++) {
                    for (var j = 0, identifiers = expressions[i].getExpression().getIdentifiers(), n = identifiers.length; j < n; j++) {
                        result.push(identifiers[j]);
                    }
                }
            }
        }
        return result;
    };
    return JQLStatementDelete;
}(JQLStatement));
var db = (new JQLDatabase()).withJQuery(jQuery.noConflict());
db.withTable('persons', JQLTable.createFromInMemoryArrayOfObjects([
    {
        id: 1,
        name: "Jack",
        age: 12,
    },
    {
        id: 2,
        name: "Jill",
        age: 14,
    },
    {
        id: 3,
        name: "Betty",
        age: 32
    },
]));
db.withTable('products', JQLTable.createFromInMemoryArrayOfObjects([
    {
        id: 1,
        name: "VGA Card",
        ownerId: 1,
    },
    {
        id: 2,
        name: "CPU",
        ownerId: 1,
    },
    {
        id: 4,
        name: "Computer keyboard",
        ownerId: 3,
    }
]));
db.withFunction('sum', function (a, b) {
    return a + b;
});
