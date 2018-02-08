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
    EJQL_LEXER_OPERATOR_COMPARISION_TYPE["EQUALS"] = "=";
    EJQL_LEXER_OPERATOR_COMPARISION_TYPE["DIFFERENT"] = "<>";
    EJQL_LEXER_OPERATOR_COMPARISION_TYPE["LIKE"] = "like";
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
var EJQLBackendTableColumnType;
(function (EJQLBackendTableColumnType) {
    EJQLBackendTableColumnType["STRING"] = "string";
    EJQLBackendTableColumnType["INT"] = "int";
    EJQLBackendTableColumnType["FLOAT"] = "float";
    EJQLBackendTableColumnType["BOOLEAN"] = "boolean";
})(EJQLBackendTableColumnType || (EJQLBackendTableColumnType = {}));
var EJQLTableStorageEngine;
(function (EJQLTableStorageEngine) {
    EJQLTableStorageEngine["IN_MEMORY"] = "memory";
    EJQLTableStorageEngine["REMOTE"] = "remote";
})(EJQLTableStorageEngine || (EJQLTableStorageEngine = {}));
var EJQLTableAccessMode;
(function (EJQLTableAccessMode) {
    EJQLTableAccessMode["READ"] = "r";
    EJQLTableAccessMode["WRITE"] = "w";
    EJQLTableAccessMode["READ_WRITE"] = "rw";
})(EJQLTableAccessMode || (EJQLTableAccessMode = {}));
var EJQLTableNamespace;
(function (EJQLTableNamespace) {
    EJQLTableNamespace["FORM"] = "private";
    EJQLTableNamespace["GLOBAL"] = "global";
})(EJQLTableNamespace || (EJQLTableNamespace = {}));
var EFormRuleEventType;
(function (EFormRuleEventType) {
    EFormRuleEventType[EFormRuleEventType["INIT"] = 0] = "INIT";
    EFormRuleEventType[EFormRuleEventType["CHANGE"] = 1] = "CHANGE";
    EFormRuleEventType[EFormRuleEventType["CHECK"] = 2] = "CHECK";
    EFormRuleEventType[EFormRuleEventType["UNCHECK"] = 3] = "UNCHECK";
    EFormRuleEventType[EFormRuleEventType["TEXT_INPUT"] = 4] = "TEXT_INPUT";
    EFormRuleEventType[EFormRuleEventType["ALL_EVENTS"] = 5] = "ALL_EVENTS";
    EFormRuleEventType[EFormRuleEventType["REINITIALIZE"] = 6] = "REINITIALIZE";
    EFormRuleEventType[EFormRuleEventType["APPROVED"] = 7] = "APPROVED";
    EFormRuleEventType[EFormRuleEventType["SUBMITTED"] = 8] = "SUBMITTED";
})(EFormRuleEventType || (EFormRuleEventType = {}));
var EventEmitter = (function () {
    function EventEmitter() {
    }
    EventEmitter.prototype.isEventTriggeringEnabled = function () {
        return !!!this.disableEventTriggering;
    };
    EventEmitter.prototype.on = function (eventName, callback) {
        if (this.events === undefined) {
            this.events = {};
        }
        if (this.events[eventName] === undefined) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
        return this;
    };
    EventEmitter.prototype.off = function (eventName, callback) {
        if (this.events === undefined) {
            return this;
        }
        if (this.events[eventName] === undefined) {
            return this;
        }
        if (callback === undefined) {
            delete this.events[eventName];
        }
        else {
            for (var i = 0, len = this.events[eventName].length; i < len; i++) {
                if (this.events[eventName][i] === callback) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            }
            if (this.events[eventName].length === 0) {
                delete this.events[eventName];
            }
        }
        return this;
    };
    EventEmitter.prototype.disableEvents = function () {
        this.disableEventTriggering = true;
        return this;
    };
    EventEmitter.prototype.enableEvents = function () {
        this.disableEventTriggering = undefined;
        return this;
    };
    EventEmitter.prototype.enableSyncMode = function () {
        this.syncMode = true;
        return this;
    };
    EventEmitter.prototype.disableSyncMode = function () {
        this.syncMode = undefined;
        return this;
    };
    EventEmitter.prototype.trigger = function (eventName) {
        var eventArgs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            eventArgs[_i - 1] = arguments[_i];
        }
        if (!this.disableEventTriggering && this.events !== undefined) {
            if (this.events[eventName] !== undefined) {
                (function (self) {
                    for (var i = 0, len = self.events[eventName].length; i < len; i++) {
                        if (self.syncMode) {
                            self.events[eventName][i].apply(self, eventArgs);
                        }
                        else {
                            (function (callback) {
                                setTimeout(function () {
                                    callback.apply(self, eventArgs);
                                }, 0);
                            })(self.events[eventName][i]);
                        }
                    }
                })(this);
            }
        }
        return this;
    };
    return EventEmitter;
}());
var JQLValidatorV1Configuration = (function () {
    function JQLValidatorV1Configuration() {
    }
    JQLValidatorV1Configuration.assertJQLV1ConfigurationStructure = function (structure) {
        if (!(structure instanceof Object)) {
            throw new Error("Object expected!");
        }
        if (undefined === structure.controlId) {
            throw new Error("Missing property \"controlId\"");
        }
        if ("string" !== typeof structure.controlId) {
            throw new Error("Property \"controlId\" type should be string");
        }
        if (undefined === structure.eventType) {
            throw new Error("Missing property \"eventType\"");
        }
        if ("number" !== typeof structure.eventType) {
            throw new Error("Property \"eventType\" type should be number");
        }
        if (!Array.isArray(structure.actions)) {
            throw new Error("Missing property \"actions\"");
        }
        if (undefined !== structure.isRule) {
            if ("boolean" !== typeof structure.isRule) {
                throw new Error("Property \"isRule\" type should be boolean|undefined");
            }
        }
        for (var i = 0, len = structure.actions.length; i < len; i++) {
            this.assertJQLV1EventActionStructure(structure.actions[i]);
        }
    };
    JQLValidatorV1Configuration.assertJQLV1EventActionStructure = function (action) {
        if (!(action instanceof Object)) {
            throw new Error("Action object expected!");
        }
        if (undefined === action.controlId) {
            throw new Error("Action property \"controlId\" type should be string");
        }
        if ("string" !== typeof action.controlId) {
            throw new Error("Action property \"controlId\" should be string");
        }
        if (undefined === action.jql) {
            throw new Error("Action property \"jql\" should be string");
        }
        if ("string" !== typeof action.jql) {
            throw new Error("Action property \"jql\" should be string");
        }
    };
    return JQLValidatorV1Configuration;
}());
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
                        throw new Error("Cannot create statement from token: " + JSON.stringify(lexerToken));
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
                                throw new Error("Cannot create unary expression from token: " + JSON.stringify(lexerToken));
                        }
                    case EJQL_LEXER_EXPRESSION_TYPES.LOGICAL:
                        switch (lexerToken.operator) {
                            case EJQL_LEXER_OPERATOR_LOGICAL_TYPE.AND:
                                return new JQLExpressionLogicalAnd(lexerToken);
                            case EJQL_LEXER_OPERATOR_LOGICAL_TYPE.OR:
                                return new JQLExpressionLogicalOr(lexerToken);
                            case EJQL_LEXER_OPERATOR_COMPARISION_TYPE.EQUALS:
                                return new JQLExpressionLogicalEquals(lexerToken);
                            case EJQL_LEXER_OPERATOR_COMPARISION_TYPE.DIFFERENT:
                                return new JQLExpressionLogicalDifferent(lexerToken);
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
                                throw new Error("Cannot create logical expression from token: " + JSON.stringify(lexerToken));
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
                                throw new Error("Cannot create math expression from token: " + JSON.stringify(lexerToken));
                        }
                    case EJQL_LEXER_EXPRESSION_TYPES.GROUP:
                        return new JQLExpressionGroup(lexerToken);
                    case EJQL_LEXER_EXPRESSION_TYPES.IDENTIFIER:
                        return new JQLExpressionIdentifier(lexerToken);
                    case EJQL_LEXER_EXPRESSION_TYPES.BINDING:
                        return new JQLExpressionBinding(lexerToken);
                    case EJQL_LEXER_EXPRESSION_TYPES.FUNCTION_CALL:
                        return new JQLExpressionFunctionCall(lexerToken);
                    default:
                        throw new Error("Unknown expression type: " + JSON.stringify(lexerToken));
                }
            case EJQL_LEXER_OPCODE_TYPES.FIELDS_LIST:
                switch (lexerToken.type) {
                    case EJQL_LEXER_FIELD_TYPES.ALL_FIELDS:
                        return new JQLStatementSelectFieldsListAll(lexerToken);
                    case EJQL_LEXER_FIELD_TYPES.SPECIFIC_FIELDS:
                        return new JQLStatementSelectFieldsListSpecific(lexerToken);
                    default:
                        throw new Error("Invalid lexer token select fields type: " + JSON.stringify(lexerToken));
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
                        throw new Error("Invalid lexer token ORDER BY: " + JSON.stringify(lexerToken));
                }
            case EJQL_LEXER_OPCODE_TYPES.ORDER_BY_EXPRESSION:
                return new JQLSorterExpression(lexerToken);
            default:
                throw new Error("Invalid lexer token opcode type: " + JSON.stringify(lexerToken.op));
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
                if (t === "number") {
                    if (isFinite(variable)) {
                        return EJQLTableColumnType.NUMBER;
                    }
                    else {
                        return null;
                    }
                }
                else {
                    if (t === "boolean") {
                        return EJQLTableColumnType.BOOLEAN;
                    }
                    else {
                        if (t === "string") {
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
                if (s !== "-" && s !== "+") {
                    return /^([\-+])?(0|[1-9]([0-9]+)?)?(\.[0-9]+)?/.test(s);
                }
            }
        }
        return false;
    };
    JQLUtils.getColumnDefinitions = function (o) {
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
                    name: k,
                });
            }
        }
        return result;
    };
    JQLUtils.isReservedKeyword = function (k) {
        return this.RESERVED_KEYWORDS.indexOf(String(k || "")) > -1;
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
                        aToString = "";
                    }
                    else {
                        aToString = a
                            ? "1"
                            : "0";
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
                        bToString = "";
                    }
                    else {
                        bToString = b
                            ? "1"
                            : "0";
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
    JQLUtils.parseString = function (s) {
        var result = "", ch, ch1;
        for (var i = 0, len = s.length; i < len; i++) {
            ch = s.charAt(i);
            if (ch === "\\") {
                ch1 = s.charAt(i + 1);
                i++;
                switch (ch1) {
                    case "r":
                        result += "\r";
                        break;
                    case "n":
                        result += "\n";
                        break;
                    case "t":
                        result += "\t";
                        break;
                    case "\\":
                        result += "\\";
                        break;
                    case "":
                        result += "\\";
                        break;
                    default:
                        result += ch1;
                }
            }
            else {
                result = result + ch;
            }
        }
        return result;
    };
    JQLUtils.castToString = function (primitive) {
        if (true === primitive) {
            return "1";
        }
        else if (false === primitive) {
            return "0";
        }
        else {
            return String(primitive || "");
        }
    };
    JQLUtils.compareAsStrings = function (a, b) {
        var aString = this.castToString(a).toLowerCase(), bString = this.castToString(b).toLowerCase();
        return aString === bString
            ? 0
            : (aString > bString
                ? -1
                : 1);
    };
    JQLUtils.RESERVED_KEYWORDS = [
        "select",
        "from",
        "where",
        "in",
        "limit",
        "order",
        "by",
        "asc",
        "update",
        "table",
        "set",
        "insert",
        "into",
        "values",
        "delete",
        "like",
    ];
    return JQLUtils;
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
var JQLDatabase = (function (_super) {
    __extends(JQLDatabase, _super);
    function JQLDatabase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.functions = {};
        _this.tables = {};
        _this.bindingProviders = [];
        return _this;
    }
    JQLDatabase.prototype.withJQuery = function (jq) {
        this.jq = jq;
        this.planner = new JQLDatabaseQueryPlanner(this);
        return this;
    };
    JQLDatabase.prototype.getJQuery = function () {
        return this.jq;
    };
    JQLDatabase.prototype.withAuthorizationToken = function (authorizationToken) {
        this.authorizationToken = authorizationToken;
        return this;
    };
    JQLDatabase.prototype.getAuthorizationToken = function () {
        return this.authorizationToken;
    };
    JQLDatabase.prototype.withRPCEndpointName = function (rpcEndpointName) {
        this.rpcEndpointName = rpcEndpointName;
        return this;
    };
    JQLDatabase.prototype.getRPCEndpointName = function () {
        return this.rpcEndpointName;
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
    JQLDatabase.prototype.withTablesList = function (tables) {
        for (var i = 0, len = tables.length; i < len; i++) {
            this.withTable(tables[i].name, new UnfetchedTable(tables[i], this));
        }
        if (tables && tables.length) {
            this.trigger("schema-changed");
        }
        return this;
    };
    JQLDatabase.prototype.hasTable = function (tableName) {
        return "string" === typeof tableName && undefined !== this.tables[tableName] && this.tables.hasOwnProperty(tableName);
    };
    JQLDatabase.prototype.enumerateTables = function () {
        var result = [];
        for (var tableName in this.tables) {
            if (this.tables.hasOwnProperty(tableName)) {
                result.push({
                    name: tableName,
                    instance: this.tables[tableName],
                });
            }
        }
        return result;
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
        if (!statement || "string" !== typeof statement) {
            throw new Error("Invalid argument: statement: string expected!");
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
        try {
            statement.bind(bindings || {}, this);
            return this.planner.scheduleStatement(statement, this.createExecutionStrategy(statement));
        }
        catch (e) {
            return this.jq.Deferred(function (deferred) {
                deferred.reject(e);
            }).promise();
        }
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
                    throw new Error("Failed to create execution strategy: Uknown statement type!");
            }
        }
        else {
            return (new JQLDatabaseStatementExecutorRemoteStatement(statement, this)).execute();
        }
    };
    JQLDatabase.prototype.createTableFromCSVFile = function (request) {
        var data = new FormData();
        data.append("action", "create-table-from-csv");
        data.append("auth", this.authorizationToken);
        data.append("csvFile", request.csvFile || "");
        data.append("setting", btoa(JSON.stringify({
            table: {
                name: request.tableName,
                namespace: request.tableNamespace,
                accessMode: request.tableAccessMode,
                storageEngine: request.tableStorageEngine,
            },
            csvParser: {
                enclosure: JQLUtils.parseString(request.csvFieldEnclosure),
                encloseAllFields: request.csvEncloseAllFields,
                delimiter: JQLUtils.parseString(request.csvFieldDelimiter),
                escapeCharacter: JQLUtils.parseString(request.csvEscapeCharacter),
                autoTrim: request.csvAutoTrim,
                lineTerminator: JQLUtils.parseString(request.csvLineTerminator),
            },
        })));
        return (function ($, self) {
            return $.Deferred(function (defer) {
                $.ajax({
                    url: self.rpcEndpointName,
                    data: data,
                    type: "POST",
                    dataType: "json",
                    processData: false,
                    contentType: false,
                }).then(function (response) {
                    self.withTablesList([response]);
                    defer.resolve(response);
                }).fail(function (e) {
                    defer.reject(e);
                });
            }).promise();
        })(this.jq, this);
    };
    JQLDatabase.prototype.dropTable = function (tableName) {
        return (function ($, self) {
            return $.Deferred(function (defer) {
                if (!self.hasTable(tableName)) {
                    defer.reject(new Error("Table " + JSON.stringify(tableName) + " not found!"));
                    return;
                }
                $.ajax({
                    url: self.rpcEndpointName,
                    data: {
                        action: "drop-table",
                        auth: self.authorizationToken,
                        name: tableName,
                    },
                    type: "POST",
                    dataType: "json",
                }).then(function (response) {
                    delete self.tables[tableName];
                    self.trigger("schema-changed");
                    defer.resolve(response);
                }).fail(function (e) {
                    defer.reject(e);
                });
            }).promise();
        })(this.jq, this);
    };
    JQLDatabase.prototype.alterTableIndexes = function (tableName, indexes) {
        return (function ($, self) {
            return $.Deferred(function (defer) {
                if (!self.hasTable(tableName)) {
                    defer.reject(new Error("Table " + JSON.stringify(tableName) + " not found!"));
                    return;
                }
                $.ajax({
                    url: self.rpcEndpointName,
                    data: {
                        action: "alter-table-indexes",
                        auth: self.authorizationToken,
                        name: tableName,
                        indexes: btoa(JSON.stringify(indexes || null)),
                    },
                    type: "POST",
                    dataType: "json",
                }).then(function (response) {
                    defer.resolve(response);
                    self.trigger("schema-changed");
                }).fail(function (e) {
                    defer.reject(e);
                });
            }).promise();
        })(this.jq, this);
    };
    JQLDatabase.prototype.autoBind = function (bindingName, jqlExpressionBinding) {
        for (var i = 0, len = this.bindingProviders.length; i < len; i++) {
            if (this.bindingProviders[i].canBind(bindingName)) {
                jqlExpressionBinding.bind(this.bindingProviders[i].getBindedValue(bindingName));
                return true;
            }
        }
        return false;
    };
    JQLDatabase.prototype.withAutoBindingProvider = function (provider) {
        this.bindingProviders.push(provider);
        return this;
    };
    JQLDatabase.prototype.saveJQLFormConfiguration = function (configuration) {
        var _this = this;
        try {
            if (!Array.isArray(configuration)) {
                throw new Error("Array of IJQLv1FormEventConfiguration expected");
            }
            for (var i = 0, len = configuration.length; i < len; i++) {
                JQLValidatorV1Configuration.assertJQLV1ConfigurationStructure(configuration[i]);
            }
            var jqlV2Config_1 = JSON.parse(JSON.stringify(configuration));
            for (var i = 0, len = configuration.length; i < len; i++) {
                for (var j = 0, n = configuration[i].actions.length; j < n; j++) {
                    jqlV2Config_1[i].actions[j].statement = JQLGrammar.parse(configuration[i].actions[j].jql);
                }
            }
            return (function ($) {
                return $.Deferred(function (defer) {
                    $.ajax({
                        url: _this.rpcEndpointName,
                        data: {
                            action: "save-jql-configuration",
                            auth: _this.authorizationToken,
                            configuration: btoa(JSON.stringify(jqlV2Config_1)),
                        },
                        type: "POST",
                        dataType: "json",
                    }).then(function (response) {
                        defer.resolve(configuration);
                    }).fail(function (e) {
                        defer.reject(e);
                    });
                }).promise();
            })(this.jq);
        }
        catch (e) {
            return this.jq.Deferred(function (defer) {
                defer.reject(e);
            }).promise();
        }
    };
    return JQLDatabase;
}(EventEmitter));
var JQLDatabaseStatementExecutorSelect = (function () {
    function JQLDatabaseStatementExecutorSelect(statement, db) {
        this.statement = statement;
        this.db = db;
    }
    JQLDatabaseStatementExecutorSelect.prototype.execute = function () {
        var _this = this;
        return function () {
            return _this.db.getJQuery().Deferred(function (defer) {
                var rows;
                if (_this.statement.getTable()) {
                    _this.db.getTable(_this.statement.getTable().getName())
                        .fetch()
                        .then(function (table) {
                        try {
                            rows = _this.applyLimit(_this.applySorting(_this.getStatementCandidateRows(table)));
                            var result_1 = (new JQLStatementResultSelect()).addRows(rows);
                            if (_this.statement.getUnion()) {
                                (new JQLDatabaseStatementExecutorSelect(_this.statement.getUnion(), _this.db)).execute()().then(function (unionResult) {
                                    result_1.addRows(unionResult.getRows());
                                    defer.resolve(result_1);
                                }).fail(function (e) {
                                    defer.reject(e);
                                });
                            }
                            else {
                                defer.resolve(result_1);
                            }
                        }
                        catch (e) {
                            console.error(e);
                            defer.reject(new Error("Failed to execute INSERT statement!"));
                        }
                    })
                        .fail(function (e) {
                        console.error(e);
                        defer.reject(new Error("Failed to fetch table from server!"));
                    });
                }
                else {
                    try {
                        rows = [_this.createSingleStatementRow()];
                        var result_2 = (new JQLStatementResultSelect()).addRows(rows);
                        if (_this.statement.getUnion()) {
                            (new JQLDatabaseStatementExecutorSelect(_this.statement.getUnion(), _this.db)).execute()().then(function (unionResult) {
                                result_2.addRows(unionResult.getRows());
                                defer.resolve(result_2);
                            }).fail(function (e) {
                                defer.reject(e);
                            });
                        }
                        else {
                            defer.resolve(result_2);
                        }
                    }
                    catch (e) {
                        console.error(e);
                        defer.reject(new Error("Failed to execute INSERT statement!"));
                    }
                }
            }).promise();
        };
    };
    JQLDatabaseStatementExecutorSelect.prototype.createSingleStatementRow = function () {
        var result = Object.create(null), context = new JQLRow([], [], 0), fields = this.statement.getFields(), exprResult, fieldName;
        if (fields.isSelectingAllFields()) {
            return result;
        }
        for (var i = 0, fieldsList = fields, specificFields = fieldsList.getFields(), len = specificFields.length; i < len; i++) {
            fieldName = specificFields[i].getLiteral();
            exprResult = specificFields[i].getExpression().compute(context);
            if (null === fieldName) {
                fieldName = specificFields[i].getExpression().getLiteral();
            }
            result[fieldName] = exprResult;
        }
        return result;
    };
    JQLDatabaseStatementExecutorSelect.prototype.getStatementCandidateRows = function (table) {
        var iterator = table.createIterator(), row, result = [], tableFieldsList = table.describe(), statementFieldsList = this.statement.getFields(), isAllFields = statementFieldsList.isSelectingAllFields(), specificFieldsList = statementFieldsList, specificFieldsListCollection, o, exprResult, fieldName, addRow, where = this.statement.getFilter();
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
                    o = Object.create(null);
                    for (var i = 0, len = specificFieldsListCollection.length; i < len; i++) {
                        fieldName = specificFieldsListCollection[i].getLiteral();
                        exprResult = specificFieldsListCollection[i].getExpression().compute(row);
                        if (null === fieldName) {
                            fieldName = specificFieldsListCollection[i].getExpression().getLiteral();
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
                _this.db.getTable(_this.statement.getTable().getName())
                    .fetch()
                    .then(function (table) {
                    if (table.isTransactional()) {
                        table.startTransaction();
                    }
                    try {
                        _this.markedRowsForUpdate = [];
                        var iterator = table.createIterator(), row = void 0, addRow = void 0, where = _this.statement.getFilter();
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
                            if (table.isTransactional()) {
                                table.commitTransaction();
                            }
                            defer.resolve(new JQLStatementResult().withAffectedRows(0));
                            return;
                        }
                        _this.applySorting();
                        _this.applyLimits();
                        if (!_this.markedRowsForUpdate.length) {
                            if (table.isTransactional()) {
                                table.commitTransaction();
                            }
                            defer.resolve(new JQLStatementResult().withAffectedRows(0));
                            return;
                        }
                        var result = new JQLStatementResult().withAffectedRows(_this.markedRowsForUpdate.length), updateRow = JQLRow.createFromTable(table), updateExpressions = _this.statement.getFields(), numFields = updateExpressions.length, fieldName = void 0, newValue = void 0;
                        for (var i = 0, len = _this.markedRowsForUpdate.length; i < len; i++) {
                            updateRow.withIndex(_this.markedRowsForUpdate[i].rowIndex).withRowData(_this.markedRowsForUpdate[i].values);
                            for (var j = 0; j < numFields; j++) {
                                fieldName = updateExpressions[j].getFieldName();
                                newValue = updateExpressions[j].getExpression().compute(updateRow);
                                updateRow.setColumnValue(fieldName, newValue);
                            }
                            table.replace(_this.markedRowsForUpdate[i].rowIndex, updateRow.getDataAsArray());
                        }
                        table.reIndex();
                        if (table.isTransactional()) {
                            table.commitTransaction();
                        }
                        defer.resolve(result);
                    }
                    catch (e) {
                        console.error(e);
                        if (table.isTransactional()) {
                            table.rollbackTransaction();
                        }
                        defer.reject(new Error("Failed to execute UPDATE statement!"));
                    }
                })
                    .fail(function (e) {
                    console.error(e);
                    defer.reject(new Error("Failed to fetch table from server!"));
                });
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
                _this.db.getTable(_this.statement.getTable().getName())
                    .fetch()
                    .then(function (table) {
                    if (table.isTransactional()) {
                        table.startTransaction();
                    }
                    try {
                        var row = JQLRow.createFromTable(table);
                        for (var i = 0, fields = _this.statement.getFields(), len = fields.length; i < len; i++) {
                            row.setColumnValue(fields[i].getFieldName(), fields[i].getExpression().compute(row));
                        }
                        table.insertRow(row.getDataAsArray());
                        table.reIndex();
                        table.commitTransaction();
                        defer.resolve((new JQLStatementResult()).withAffectedRows(1));
                    }
                    catch (e) {
                        if (table.isTransactional()) {
                            table.rollbackTransaction();
                        }
                        console.error(e);
                        defer.reject(new Error('Failed to execute INSERT statement'));
                    }
                })
                    .fail(function (e) {
                    console.error(e);
                    defer.reject(new Error('Failed to fetch table from server!'));
                });
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
                _this.db.getTable(_this.statement.getTable().getName())
                    .fetch()
                    .then(function (table) {
                    if (table.isTransactional()) {
                        table.startTransaction();
                    }
                    try {
                        _this.markedRowsForDelete = [];
                        var iterator = table.createIterator(), row = void 0, addRow = void 0, where = _this.statement.getFilter();
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
                            if (table.isTransactional()) {
                                table.commitTransaction();
                            }
                            defer.resolve(new JQLStatementResult().withAffectedRows(0));
                            return;
                        }
                        _this.applySorting();
                        _this.applyLimits();
                        if (!_this.markedRowsForDelete.length) {
                            if (table.isTransactional()) {
                                table.commitTransaction();
                            }
                            defer.resolve(new JQLStatementResult().withAffectedRows(0));
                            return;
                        }
                        for (var i = 0, len = _this.markedRowsForDelete.length; i < len; i++) {
                            table.deleteRow(_this.markedRowsForDelete[i].rowIndex);
                        }
                        table.compact();
                        if (table.isTransactional()) {
                            table.commitTransaction();
                        }
                        defer.resolve(new JQLStatementResult().withAffectedRows(_this.markedRowsForDelete.length));
                    }
                    catch (e) {
                        console.error(e);
                        if (table.isTransactional()) {
                            table.rollbackTransaction();
                        }
                        defer.reject(new Error('Failed to execute DELETE statement!'));
                    }
                })
                    .fail(function (e) {
                    console.error(e);
                    defer.reject(new Error('Failed to fetch table from server!'));
                });
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
                var rpcEndpointName = _this.db.getRPCEndpointName(), query = {
                    "auth": _this.db.getAuthorizationToken(),
                    "query": btoa(JSON.stringify(_this.statement.getTokenizedStatement())),
                    "bindings": btoa(JSON.stringify(_this.statement.getBindingData())),
                };
                _this.db.getJQuery().ajax({
                    url: _this.db.getRPCEndpointName() + "?action=query",
                    type: "POST",
                    dataType: "json",
                    data: query,
                }).then(function (result) {
                    defer.resolve(_this.createStatementResult(result));
                }).fail(function (e) {
                    console.error("args: ", arguments);
                    defer.reject(e);
                });
            }).promise();
        };
    };
    JQLDatabaseStatementExecutorRemoteStatement.prototype.createStatementResult = function (serverResponse) {
        if (!(serverResponse instanceof Object)) {
            throw new Error("Object expected!");
        }
        if (undefined === serverResponse.resultType) {
            throw new Error("Property \"resultType\" expected!");
        }
        switch (serverResponse.resultType) {
            case EJQL_LEXER_STATEMENT_TYPES.SELECT:
                var selectResult = new JQLStatementResultSelect();
                selectResult.addRows(serverResponse.rows);
                return selectResult;
            case EJQL_LEXER_STATEMENT_TYPES.UPDATE:
                var updateResult = new JQLStatementResult();
                updateResult.withAffectedRows(parseInt(serverResponse.affectedRows) || 0);
                return updateResult;
            case EJQL_LEXER_STATEMENT_TYPES.INSERT:
                var insertResult = new JQLStatementResultInsert();
                insertResult.withLastInsertId(parseInt(serverResponse.lastInsertId) || 0);
                insertResult.withAffectedRows(1);
                return insertResult;
            case EJQL_LEXER_STATEMENT_TYPES.DELETE:
                var deleteResult = new JQLStatementResult();
                deleteResult.withAffectedRows(parseInt(serverResponse.affectedRows) || 0);
                return deleteResult;
            default:
                throw new Error("Invalid server response resultType: " + JSON.stringify(serverResponse.resultType));
        }
    };
    return JQLDatabaseStatementExecutorRemoteStatement;
}());
var JQLTable = (function () {
    function JQLTable(identifiers) {
        this.identifiers = [];
        this.emptyRow = [];
        this.indexes = [];
        this.autoIncrementColumnIndex = null;
        this.autoIncrementValue = 1;
        for (var i = 0, idtf = identifiers || [], len = idtf.length; i < len; i++) {
            this.identifiers.push(idtf[i]);
            if (undefined !== idtf[i].default) {
                this.emptyRow.push(idtf[i].default);
            }
            else {
                switch (identifiers[i].type) {
                    case EJQLTableColumnType.NULL:
                        this.emptyRow.push(null);
                        break;
                    case EJQLTableColumnType.NUMBER:
                        this.emptyRow.push(0);
                        break;
                    case EJQLTableColumnType.STRING:
                        this.emptyRow.push("");
                        break;
                    case EJQLTableColumnType.BOOLEAN:
                        this.emptyRow.push(false);
                        break;
                    default:
                        this.emptyRow.push(null);
                }
            }
        }
    }
    JQLTable.prototype.withSingleColumnIndex = function (indexDescriptor) {
        var index, numberOfAutoIncrementIndexes = 0;
        if (this.indexes) {
            for (var i = 0, len = this.indexes.length; i < len; i++) {
                if (this.indexes[i].isAutoIncrement()) {
                    numberOfAutoIncrementIndexes++;
                }
            }
        }
        if ((undefined !== indexDescriptor.unique && indexDescriptor.unique) || (undefined !== indexDescriptor.autoIncrement && indexDescriptor.autoIncrement)) {
            index = JQLTableIndex.createFromIndexDescriptor(this, indexDescriptor);
            if (index.isAutoIncrement()) {
                numberOfAutoIncrementIndexes++;
                if (index.getDescriptors().length > 1) {
                    throw new Error("Auto-increment indexes must refer to a single column only!");
                }
                if (numberOfAutoIncrementIndexes > 1) {
                    throw new Error("There can be only a single auto-increment index!");
                }
                if (!index.isUnique()) {
                    throw new Error("Auto-increment indexes must be unique!");
                }
                var autoIncrementColumnFound = false;
                for (var i = 0, len = this.identifiers.length; i < len; i++) {
                    if (this.identifiers[i].name === indexDescriptor.name) {
                        this.autoIncrementColumnIndex = i;
                        autoIncrementColumnFound = true;
                        if (this.identifiers[i].type !== EJQLTableColumnType.NUMBER) {
                            throw new Error("Auto-increment index column type must be NUMBER!");
                        }
                        break;
                    }
                }
                if (!autoIncrementColumnFound) {
                    throw new Error("Cannot add a index on a non-existing column!");
                }
            }
            this.indexes.push(index);
        }
        return this;
    };
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
    JQLTable.createVirtualTable = function (columnDefinitions) {
        return new JQLTableStorageEngineInMemoryVirtualTable(columnDefinitions);
    };
    JQLTable.createFromInMemoryArrayOfObjects = function (rows, columnDefinitions, indexes) {
        var identifiers = undefined === columnDefinitions
            ? JQLUtils.getColumnDefinitions(rows)
            : columnDefinitions, schema = [], ncols = identifiers.length, row, v, vType;
        if (!identifiers.length) {
            throw new Error("No valid columns were detected in \"in-memory\" array!");
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
            schema.push(row);
        }
        return new JQLTableStorageEngineInMemory(identifiers, schema, indexes);
    };
    JQLTable.createFromRemoteTableDefinition = function (columns, indexes) {
        return new JQLTableStorageEngineRemote(columns, indexes);
    };
    JQLTable.prototype.createEmptyRow = function () {
        return this.emptyRow.slice(0);
    };
    JQLTable.prototype.getIndexes = function () {
        return this.indexes;
    };
    JQLTable.prototype.reIndex = function () {
        for (var i = 0, len = this.indexes.length; i < len; i++) {
            this.indexes[i].index();
            if (this.indexes[i].isAutoIncrement()) {
                this.setNextAutoIncrementValue(this.indexes[i].getNextAutoIncrementValue());
            }
        }
    };
    JQLTable.prototype.fetch = function () {
        var _this = this;
        return jQuery.Deferred(function (defer) {
            defer.resolve(_this);
        }).promise();
    };
    return JQLTable;
}());
var UnfetchedTable = (function () {
    function UnfetchedTable(definitions, db) {
        this.identifiers = [];
        this.indexes = [];
        this.deferredTable = null;
        this.db = db;
        this.name = definitions.name;
        this.remote = definitions.storageEngine === EJQLTableStorageEngine.REMOTE;
        this.storageEngine = definitions.storageEngine;
        this.computeIdentifiers(definitions.schema);
        this.computeIndexDescriptors(definitions.indexes);
    }
    UnfetchedTable.prototype.describe = function () {
        return this.identifiers;
    };
    UnfetchedTable.prototype.hasIdentifier = function (identifierName) {
        for (var i = 0, len = this.identifiers.length; i < len; i++) {
            if (this.identifiers[i].name === identifierName) {
                return true;
            }
        }
        return false;
    };
    UnfetchedTable.prototype.isRemote = function () {
        return this.remote;
    };
    UnfetchedTable.prototype.fetch = function () {
        var _this = this;
        if (this.table) {
            return this.table;
        }
        if (!this.isRemote()) {
            this.table = (function ($, db) {
                return $.Deferred(function (defer) {
                    var fetchTableRequest = {
                        "action": "fetch-table",
                        "auth": db.getAuthorizationToken(),
                        "name": _this.name,
                    };
                    $.ajax({
                        type: "POST",
                        url: db.getRPCEndpointName(),
                        data: fetchTableRequest,
                    }).then(function (result) {
                        _this.deferredTable = JQLTable.createFromInMemoryArrayOfObjects(result, _this.identifiers, _this.indexes);
                        defer.resolve(_this.deferredTable);
                    }).fail(function (e) {
                        defer.reject(e);
                    });
                }).promise();
            })(this.db.getJQuery(), this.db);
        }
        else {
            this.table = (function ($) {
                return $.Deferred(function (defer) {
                    _this.deferredTable = JQLTable.createFromRemoteTableDefinition(_this.describe(), _this.indexes);
                    defer.resolve(_this.deferredTable);
                }).promise();
            })(this.db.getJQuery());
        }
        return this.table;
    };
    UnfetchedTable.prototype.getStorageEngine = function () {
        return this.storageEngine;
    };
    UnfetchedTable.prototype.computeIdentifiers = function (schema) {
        for (var identifierName in schema) {
            if (schema.hasOwnProperty(identifierName)) {
                this.identifiers.push({
                    name: identifierName,
                    type: UnfetchedTable.castBackendDataTypeToFrontendDataType(schema[identifierName]),
                    default: null,
                });
            }
        }
    };
    UnfetchedTable.prototype.computeIndexDescriptors = function (indexes) {
        if (indexes) {
            if (!Array.isArray(indexes)) {
                throw new Error("Invalid argument: indexes: array expected!");
            }
            for (var i = 0, len = indexes.length; i < len; i++) {
                this.indexes.push(indexes[i]);
            }
        }
    };
    UnfetchedTable.castBackendDataTypeToFrontendDataType = function (dataType) {
        switch (dataType) {
            case EJQLBackendTableColumnType.BOOLEAN:
                return EJQLTableColumnType.BOOLEAN;
            case EJQLBackendTableColumnType.FLOAT:
            case EJQLBackendTableColumnType.INT:
                return EJQLTableColumnType.NUMBER;
            case EJQLBackendTableColumnType.STRING:
                return EJQLTableColumnType.STRING;
            default:
                return EJQLTableColumnType.NULL;
        }
    };
    UnfetchedTable.prototype.getIndexes = function () {
        if (this.deferredTable) {
            return this.deferredTable.getIndexes();
        }
        var result = [];
        for (var i = 0, len = (this.indexes || []).length; i < len; i++) {
            result.push(JQLTableIndex.createFromIndexDescriptor(this, this.indexes[i]));
        }
        return result;
    };
    UnfetchedTable.prototype.alterIndexes = function (indexes) {
        var _this = this;
        return (function ($) {
            return $.Deferred(function (defer) {
                _this.db.alterTableIndexes(_this.name, indexes).then(function (tableModel) {
                    _this.deferredTable = null;
                    _this.indexes = tableModel.indexes;
                    defer.resolve(true);
                }).fail(function (e) {
                    defer.reject(e);
                });
            }).promise();
        })(this.db.getJQuery());
    };
    UnfetchedTable.prototype.isIndexable = function () {
        if (this.deferredTable) {
            return this.deferredTable.isIndexable();
        }
        return true;
    };
    UnfetchedTable.prototype.isVirtual = function () {
        if (this.deferredTable) {
            return this.deferredTable.isVirtual();
        }
        return false;
    };
    UnfetchedTable.prototype.isTransactional = function () {
        if (this.deferredTable) {
            return this.deferredTable.isTransactional();
        }
        return true;
    };
    return UnfetchedTable;
}());
var JQLTableIndex = (function () {
    function JQLTableIndex(table, descriptors) {
        this.table = table;
        this.descriptors = (descriptors || []).slice(0);
    }
    JQLTableIndex.prototype.getDescriptors = function () {
        return this.descriptors;
    };
    JQLTableIndex.prototype.getTable = function () {
        return this.table;
    };
    JQLTableIndex.createFromIndexDescriptor = function (table, indexDescriptor) {
        if (table.getStorageEngine() === EJQLTableStorageEngine.IN_MEMORY) {
            return new JQLTableIndexSingleColumn(table, indexDescriptor);
        }
        else {
            return new JQLTableIndexBackend(table, indexDescriptor);
        }
    };
    return JQLTableIndex;
}());
var JQLTableIndexSingleColumn = (function (_super) {
    __extends(JQLTableIndexSingleColumn, _super);
    function JQLTableIndexSingleColumn(table, indexDescriptor) {
        var _this = _super.call(this, table, [indexDescriptor]) || this;
        _this.maxAutoIncrement = 0;
        _this.unique = !!indexDescriptor.unique;
        _this.autoIncrement = !!indexDescriptor.autoIncrement;
        return _this;
    }
    JQLTableIndexSingleColumn.prototype.isUnique = function () {
        return this.unique;
    };
    JQLTableIndexSingleColumn.prototype.isAutoIncrement = function () {
        return this.autoIncrement;
    };
    JQLTableIndexSingleColumn.prototype.getNextAutoIncrementValue = function () {
        if (this.autoIncrement) {
            return this.maxAutoIncrement + 1;
        }
        else {
            throw new Error('Index is not auto-increment!');
        }
    };
    JQLTableIndexSingleColumn.prototype.index = function () {
        this.values = [];
        var row, iterator = this.table.createIterator(), value;
        this.maxAutoIncrement = 0;
        while (row = iterator.next()) {
            var rowIndexedValue = String(row.getColumnValue(this.descriptors[0].name)).toLowerCase();
            if (this.values.indexOf(value = rowIndexedValue) > -1) {
                throw new Error('Duplicate key ' + JSON.stringify(this.descriptors[0].name) + ' found with value ' + JSON.stringify(value) + ' found!');
            }
            else {
                this.values.push(value);
                if (this.autoIncrement) {
                    this.maxAutoIncrement = Math.max(this.maxAutoIncrement, Number(value));
                }
            }
        }
    };
    return JQLTableIndexSingleColumn;
}(JQLTableIndex));
var JQLTableIndexBackend = (function (_super) {
    __extends(JQLTableIndexBackend, _super);
    function JQLTableIndexBackend(table, indexDescriptor) {
        return _super.call(this, table, [indexDescriptor]) || this;
    }
    JQLTableIndexBackend.prototype.isUnique = function () {
        return true;
    };
    JQLTableIndexBackend.prototype.isAutoIncrement = function () {
        return null;
    };
    JQLTableIndexBackend.prototype.getNextAutoIncrementValue = function () {
        return null;
    };
    JQLTableIndexBackend.prototype.index = function () {
    };
    return JQLTableIndexBackend;
}(JQLTableIndex));
var JQLTableStorageEngineInMemory = (function (_super) {
    __extends(JQLTableStorageEngineInMemory, _super);
    function JQLTableStorageEngineInMemory(identifiers, rows, indexes) {
        var _this = _super.call(this, identifiers) || this;
        _this.rows = [];
        for (var i = 0, len = rows.length; i < len; i++) {
            _this.rows.push(rows[i]);
        }
        if (indexes) {
            if (!Array.isArray(indexes)) {
                throw new Error("Invalid class constructor argument: indexes: Expected array!");
            }
            for (var i = 0, len = indexes.length; i < len; i++) {
                _this.withSingleColumnIndex(indexes[i]);
            }
            _this.reIndex();
        }
        return _this;
    }
    JQLTableStorageEngineInMemory.prototype.isRemote = function () {
        return false;
    };
    JQLTableStorageEngineInMemory.prototype.getStorageEngine = function () {
        return EJQLTableStorageEngine.IN_MEMORY;
    };
    JQLTableStorageEngineInMemory.prototype.getRowAt = function (rowIndex) {
        return this.rows[rowIndex] || null;
    };
    JQLTableStorageEngineInMemory.prototype.createIterator = function () {
        return new JQLTableUtilsIterator(this);
    };
    JQLTableStorageEngineInMemory.prototype.replace = function (index, newRow) {
        if (this.rows[index]) {
            for (var i = 0, len = this.rows[index].length; i < len; i++) {
                this.rows[index][i] = newRow[i];
            }
        }
        else {
            throw new Error("Undefined table index: " + JSON.stringify(index));
        }
    };
    JQLTableStorageEngineInMemory.prototype.deleteRow = function (rowIndex) {
        if (this.rows[rowIndex]) {
            this.rows[rowIndex] = null;
        }
    };
    JQLTableStorageEngineInMemory.prototype.insertRow = function (row) {
        if (!row || undefined === row.length) {
            throw new Error("Invalid argument row: array expected!");
        }
        if (row.length !== this.identifiers.length) {
            throw new Error("Row mismatch: Expected " + this.identifiers.length + " values, got " + row.length + " values!");
        }
        if (this.autoIncrementColumnIndex !== null) {
            if (null === row[this.autoIncrementColumnIndex]) {
                row[this.autoIncrementColumnIndex] = this.autoIncrementValue;
                this.autoIncrementValue++;
            }
        }
        this.rows.push(row);
    };
    JQLTableStorageEngineInMemory.prototype.compact = function () {
        for (var i = this.rows.length - 1; i >= 0; i--) {
            if (null === this.rows[i]) {
                this.rows.splice(i, 1);
            }
        }
    };
    JQLTableStorageEngineInMemory.prototype.isTransactional = function () {
        return true;
    };
    JQLTableStorageEngineInMemory.prototype.startTransaction = function () {
        this.lastTransactionSnapshot = JSON.stringify(this.rows);
    };
    JQLTableStorageEngineInMemory.prototype.commitTransaction = function () {
        if (this.lastTransactionSnapshot !== undefined) {
            this.lastTransactionSnapshot = undefined;
        }
        else {
            throw new Error("No transaction started before!\"");
        }
    };
    JQLTableStorageEngineInMemory.prototype.rollbackTransaction = function () {
        if (this.lastTransactionSnapshot !== undefined) {
            this.rows = JSON.parse(this.lastTransactionSnapshot);
        }
        else {
            throw new Error("Failed to rollback transaction: No transaction started before!");
        }
    };
    JQLTableStorageEngineInMemory.prototype.getNextAutoIncrementValue = function () {
        return this.autoIncrementValue + 1;
    };
    JQLTableStorageEngineInMemory.prototype.setNextAutoIncrementValue = function (value) {
        if ("number" !== typeof value || !isFinite(value)) {
            throw new Error("Value is not finite!");
        }
        if (value % 1 !== 0) {
            throw new Error("Value must be integer!");
        }
        if (value < 1) {
            throw new Error("Value must be greater than 0!");
        }
        this.autoIncrementValue = value;
    };
    JQLTableStorageEngineInMemory.prototype.alterIndexes = function (indexes) {
        return null;
    };
    JQLTableStorageEngineInMemory.prototype.isIndexable = function () {
        return true;
    };
    JQLTableStorageEngineInMemory.prototype.isVirtual = function () {
        return false;
    };
    return JQLTableStorageEngineInMemory;
}(JQLTable));
var JQLTableStorageEngineInMemoryVirtualTable = (function (_super) {
    __extends(JQLTableStorageEngineInMemoryVirtualTable, _super);
    function JQLTableStorageEngineInMemoryVirtualTable(identifiers) {
        return _super.call(this, identifiers, [], undefined) || this;
    }
    JQLTableStorageEngineInMemoryVirtualTable.prototype.createRow = function () {
        var result = new JQLTableStorageEngineInMemoryVirtualRow(this);
        this.rows.push(result);
        return result;
    };
    JQLTableStorageEngineInMemoryVirtualTable.prototype.withSingleColumnIndex = function (indexDescriptor) {
        throw new Error("Cannot add indexes on virtual tables!");
    };
    JQLTableStorageEngineInMemoryVirtualTable.prototype.replace = function (index, newRow) {
        throw new Error("Cannot replace rows on virtual tables!");
    };
    JQLTableStorageEngineInMemoryVirtualTable.prototype.insertRow = function (row) {
        throw new Error("Cannot insert rows on virtual tables!");
    };
    JQLTableStorageEngineInMemoryVirtualTable.prototype.deleteRow = function (rowIndex) {
        throw new Error("Cannot delete rows from virtual tables!");
    };
    JQLTableStorageEngineInMemoryVirtualTable.prototype.isTransactional = function () {
        return false;
    };
    JQLTableStorageEngineInMemoryVirtualTable.prototype.startTransaction = function () {
        throw new Error("Transactions are not supported on virtual tables!");
    };
    JQLTableStorageEngineInMemoryVirtualTable.prototype.commitTransaction = function () {
        throw new Error("Transactions are not supported on virtual tables!");
    };
    JQLTableStorageEngineInMemoryVirtualTable.prototype.rollbackTransaction = function () {
        throw new Error("Transactions are not supported on virtual tables!");
    };
    JQLTableStorageEngineInMemoryVirtualTable.prototype.getNextAutoIncrementValue = function () {
        return 1;
    };
    JQLTableStorageEngineInMemoryVirtualTable.prototype.isIndexable = function () {
        return false;
    };
    JQLTableStorageEngineInMemoryVirtualTable.prototype.isVirtual = function () {
        return true;
    };
    return JQLTableStorageEngineInMemoryVirtualTable;
}(JQLTableStorageEngineInMemory));
var JQLTableStorageEngineInMemoryVirtualRow = (function () {
    function JQLTableStorageEngineInMemoryVirtualRow(table) {
        this.table = table;
        this.data = Object.create(null);
        for (var i = 0, identifiers = this.table.describe(), len = identifiers.length; i < len; i++) {
            (function (identifierIndex, identifierName, self) {
                Object.defineProperty(self, String(identifierIndex), {
                    get: function () {
                        return (undefined === self.data[identifierName] || undefined === self.data[identifierName].get)
                            ? undefined
                            : self.data[identifierName].get();
                    },
                    set: function (value) {
                        if (undefined === self.data[identifierName] || undefined === self.data[identifierName].set) {
                            throw new Error("Value \"" + identifierName + "\" is read-only!");
                        }
                        else {
                            self.data[identifierName].set(value);
                        }
                    },
                    enumerable: true,
                    configurable: false,
                });
            })(i, identifiers[i].name, this);
            this.cols = i + 1;
        }
    }
    Object.defineProperty(JQLTableStorageEngineInMemoryVirtualRow.prototype, "length", {
        get: function () {
            return this.cols;
        },
        enumerable: true,
        configurable: true
    });
    JQLTableStorageEngineInMemoryVirtualRow.prototype.withPropertySetter = function (propertyName, setter) {
        if (this.table.hasIdentifier(propertyName)) {
            this.data[propertyName] = this.data[propertyName] || Object.create(null);
            this.data[propertyName].set = setter;
        }
        else {
            throw new Error("Property \"" + propertyName + "\" is not allowed!");
        }
        return this;
    };
    JQLTableStorageEngineInMemoryVirtualRow.prototype.withPropertyGetter = function (propertyName, getter) {
        if (this.table.hasIdentifier(propertyName)) {
            this.data[propertyName] = this.data[propertyName] || Object.create(null);
            this.data[propertyName].get = getter;
        }
        else {
            throw new Error("Property \"" + propertyName + "\" is not allowed!");
        }
        return this;
    };
    return JQLTableStorageEngineInMemoryVirtualRow;
}());
var JQLTableStorageEngineRemote = (function (_super) {
    __extends(JQLTableStorageEngineRemote, _super);
    function JQLTableStorageEngineRemote(identifiers, indexes) {
        var _this = _super.call(this, identifiers) || this;
        if (indexes) {
            if (!Array.isArray(indexes)) {
                throw new Error("Invalid class constructor argument: indexes: Expected array!");
            }
            for (var i = 0, len = indexes.length; i < len; i++) {
                _this.withSingleColumnIndex(indexes[i]);
            }
        }
        return _this;
    }
    JQLTableStorageEngineRemote.prototype.isRemote = function () {
        return true;
    };
    JQLTableStorageEngineRemote.prototype.getStorageEngine = function () {
        return EJQLTableStorageEngine.REMOTE;
    };
    JQLTableStorageEngineRemote.prototype.isTransactional = function () {
        return false;
    };
    JQLTableStorageEngineRemote.prototype.startTransaction = function () {
        throw new Error('Operation handled by backend!');
    };
    JQLTableStorageEngineRemote.prototype.commitTransaction = function () {
        throw new Error('Operation handled by backend!');
    };
    JQLTableStorageEngineRemote.prototype.rollbackTransaction = function () {
        throw new Error('Operation handled by backend!');
    };
    JQLTableStorageEngineRemote.prototype.getNextAutoIncrementValue = function () {
        throw new Error('Operation handled by backend!');
    };
    JQLTableStorageEngineRemote.prototype.setNextAutoIncrementValue = function (nextAutoIncrementValue) {
        throw new Error('Operation handled by backend!');
    };
    JQLTableStorageEngineRemote.prototype.alterIndexes = function (indexes) {
        return null;
    };
    JQLTableStorageEngineRemote.prototype.isIndexable = function () {
        return true;
    };
    JQLTableStorageEngineRemote.prototype.isVirtual = function () {
        return false;
    };
    return JQLTableStorageEngineRemote;
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
        return new JQLRow(table.describe(), table.createEmptyRow(), undefined);
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
        _this.statement = token;
        return _this;
    }
    JQLStatement.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.STATEMENT;
    };
    JQLStatement.prototype.isRemote = function () {
        return this.remote;
    };
    JQLStatement.prototype.bind = function (data, db) {
        this.binded = false;
        var bindings = this.getBindings(), numBindings = bindings.length, bindingName;
        for (var i = 0; i < numBindings; i++) {
            bindings[i].unbind();
        }
        for (var i = 0; i < numBindings; i++) {
            bindingName = bindings[i].getBindingName();
            if (undefined === data[bindingName]) {
                if (!db || !db.autoBind(bindingName, bindings[i])) {
                    throw new Error("Failed to bind statement: Binding " + JSON.stringify(bindingName) + " is not defined in bind object, and is also not auto bindable!");
                }
            }
            else {
                bindings[i].bind(data[bindingName]);
            }
        }
        this.binded = true;
        return this;
    };
    JQLStatement.prototype.getBindingData = function () {
        var bindData = {}, bindings = this.getBindings(), bindingName;
        for (var i = 0, len = bindings.length; i < len; i++) {
            if (undefined === bindData[bindingName = bindings[i].getBindingName()]) {
                bindData[bindingName] = bindings[i].getBindedValue();
            }
        }
        return bindData;
    };
    JQLStatement.prototype.isBinded = function () {
        return this.binded;
    };
    JQLStatement.prototype.getTokenizedStatement = function () {
        return JSON.parse(JSON.stringify(this.statement));
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
    JQLExpression.prototype.getLiteral = function () {
        if (undefined !== this.literal) {
            return this.literal;
        }
        this.literal = this.toString().replace(/["']+/g, '').trim();
        return this.literal;
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
    JQLExpressionBinding.prototype.getExpressionType = function () {
        return EJQL_LEXER_EXPRESSION_TYPES.BINDING;
    };
    JQLExpressionBinding.prototype.getBindingName = function () {
        return this.bindingName;
    };
    JQLExpressionBinding.prototype.getBindedValue = function () {
        if (undefined === this.bindingValue) {
            throw new Error("Binding " + JSON.stringify(this.bindingName) + " is not binded!");
        }
        return this.bindingValue;
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
            throw new Error("Failed to compute binding: Binding " + this.bindingName + " is not binded!");
        }
    };
    JQLExpressionBinding.prototype.toString = function () {
        return ":" + this.bindingName;
    };
    return JQLExpressionBinding;
}(JQLExpression));
var JQLExpressionBoolean = (function (_super) {
    __extends(JQLExpressionBoolean, _super);
    function JQLExpressionBoolean(token) {
        var _this = _super.call(this) || this;
        _this.value = token.value;
        return _this;
    }
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
    JQLExpressionBoolean.prototype.toString = function () {
        return String(this.value);
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
    JQLExpressionFunctionCall.prototype.toString = function () {
        var result = this.functionName + '(';
        for (var i = 0, len = this.arguments.length; i < len; i++) {
            result += (i === 0 ? '' : ', ') + this.arguments[i].toString();
        }
        return result + ')';
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
    JQLExpressionGroup.prototype.toString = function () {
        return '(' + this.expression.toString() + ')';
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
    JQLExpressionIdentifier.prototype.toString = function () {
        return this.identifierName;
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
        return !!(this.left.compute(context) || this.right.compute(context));
    };
    JQLExpressionLogicalOr.prototype.toString = function () {
        return this.left.toString() + " or " + this.right.toString();
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
        return !!(this.left.compute(context) && this.right.compute(context));
    };
    JQLExpressionLogicalAnd.prototype.toString = function () {
        return this.left.toString() + " and " + this.right.toString();
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
        var computedLeft = this.left.compute(context), computedRight = this.right.compute(context);
        if ((computedLeft === null || computedRight === null)) {
            return null;
        }
        if (!isNaN(computedLeft) && !isNaN(computedRight)) {
            return Number(computedLeft) != Number(computedRight);
        }
        return computedLeft == computedRight || JQLUtils.compareAsStrings(computedLeft, computedRight) === 0;
    };
    JQLExpressionLogicalEquals.prototype.toString = function () {
        return this.left.toString() + " = " + this.right.toString();
    };
    return JQLExpressionLogicalEquals;
}(JQLExpressionLogical));
var JQLExpressionLogicalDifferent = (function (_super) {
    __extends(JQLExpressionLogicalDifferent, _super);
    function JQLExpressionLogicalDifferent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JQLExpressionLogicalDifferent.prototype.getOperator = function () {
        return EJQL_LEXER_OPERATOR_COMPARISION_TYPE.EQUALS;
    };
    JQLExpressionLogicalDifferent.prototype.compute = function (context) {
        var computedLeft = this.left.compute(context), computedRight = this.right.compute(context);
        if ((computedLeft === null || computedRight === null)) {
            return null;
        }
        if (!isNaN(computedLeft) && !isNaN(computedRight)) {
            return Number(computedLeft) != Number(computedRight);
        }
        return computedLeft != computedRight || JQLUtils.compareAsStrings(computedLeft, computedRight) !== 0;
    };
    JQLExpressionLogicalDifferent.prototype.toString = function () {
        return this.left.toString() + " <> " + this.right.toString();
    };
    return JQLExpressionLogicalDifferent;
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
        return this.like(this.left.compute(context), this.right.compute(context));
    };
    JQLExpressionLogicalLike.prototype.like = function (left, right) {
        if (null === left || null === right) {
            return null;
        }
        var leftStr = JQLUtils.castToString(left), rightStr = JQLUtils.castToString(right), regExp = this.buildRegularExpression(rightStr);
        return regExp.test(leftStr);
    };
    JQLExpressionLogicalLike.prototype.buildRegularExpression = function (str) {
        var regExpStr = "^", ch = "";
        for (var i = 0, len = str.length; i < len; i++) {
            ch = str.charAt(i);
            switch (ch) {
                case "%":
                    regExpStr += "(.*)";
                    break;
                case "\n":
                    regExpStr += "\\n";
                    break;
                case "\r":
                    regExpStr += "\\r";
                    break;
                case "\t":
                    regExpStr += "\\t";
                    break;
                case ".":
                case "-":
                case "[":
                case "]":
                case "(":
                case ")":
                case "?":
                case "!":
                case "^":
                case "$":
                case "\\":
                case "/":
                    regExpStr += ("\\" + ch);
                    break;
                default:
                    regExpStr += ch;
                    break;
            }
        }
        return new RegExp(regExpStr + "$", "i");
    };
    JQLExpressionLogicalLike.prototype.toString = function () {
        return this.left.toString() + " LIKE " + this.right.toString();
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
        var computedLeft = this.left.compute(context), computedRight = this.right.compute(context);
        if ((computedLeft === null || computedRight === null)) {
            return null;
        }
        if (!isNaN(computedLeft) && !isNaN(computedRight)) {
            return Number(computedLeft) < Number(computedRight);
        }
        return computedLeft < computedRight || JQLUtils.compareAsStrings(computedLeft, computedRight) > 0;
    };
    JQLExpressionLogicalLowerThen.prototype.toString = function () {
        return this.left.toString() + " < " + this.right.toString();
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
        var computedLeft = this.left.compute(context), computedRight = this.right.compute(context);
        if ((computedLeft === null || computedRight === null)) {
            return null;
        }
        if (!isNaN(computedLeft) && !isNaN(computedRight)) {
            return Number(computedLeft) < Number(computedRight);
        }
        return computedLeft <= computedRight || JQLUtils.compareAsStrings(computedLeft, computedRight) >= 0;
    };
    JQLExpressionLogicalLowerThenEquals.prototype.toString = function () {
        return this.left.toString() + " <= " + this.right.toString();
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
        var computedLeft = this.left.compute(context), computedRight = this.right.compute(context);
        if ((computedLeft === null || computedRight === null)) {
            return null;
        }
        if (!isNaN(computedLeft) && !isNaN(computedRight)) {
            return Number(computedLeft) > Number(computedRight);
        }
        return computedLeft > computedRight || JQLUtils.compareAsStrings(computedLeft, computedRight) < 0;
    };
    JQLExpressionLogicalGreaterThen.prototype.toString = function () {
        return this.left.toString() + " > " + this.right.toString();
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
        var computedLeft = this.left.compute(context), computedRight = this.right.compute(context);
        if ((computedLeft === null || computedRight === null)) {
            return null;
        }
        if (!isNaN(computedLeft) && !isNaN(computedRight)) {
            return Number(computedLeft) > Number(computedRight);
        }
        return computedLeft >= computedRight || JQLUtils.compareAsStrings(computedLeft, computedRight) <= 0;
    };
    JQLExpressionLogicalGreaterThenEquals.prototype.toString = function () {
        return this.left.toString() + " >= " + this.right.toString();
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
    JQLExpressionMathAddition.prototype.toString = function () {
        return this.left.toString() + " + " + this.right.toString();
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
    JQLExpressionMathDifference.prototype.toString = function () {
        return this.left.toString() + " - " + this.right.toString();
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
    JQLExpressionMathDivision.prototype.toString = function () {
        return this.left.toString() + " / " + this.right.toString();
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
    JQLExpressionMathMultiply.prototype.toString = function () {
        return this.left.toString() + " * " + this.right.toString();
    };
    return JQLExpressionMathMultiply;
}(JQLExpressionMath));
var JQLExpressionNull = (function (_super) {
    __extends(JQLExpressionNull, _super);
    function JQLExpressionNull() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    JQLExpressionNull.prototype.toString = function () {
        return 'null';
    };
    return JQLExpressionNull;
}(JQLExpression));
var JQLExpressionNumber = (function (_super) {
    __extends(JQLExpressionNumber, _super);
    function JQLExpressionNumber(token) {
        var _this = _super.call(this) || this;
        _this.value = token.value;
        return _this;
    }
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
    JQLExpressionNumber.prototype.toString = function () {
        return String(this.value);
    };
    return JQLExpressionNumber;
}(JQLExpression));
var JQLExpressionString = (function (_super) {
    __extends(JQLExpressionString, _super);
    function JQLExpressionString(token) {
        var _this = _super.call(this) || this;
        _this.value = token.value;
        return _this;
    }
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
    JQLExpressionString.prototype.toString = function () {
        return JSON.stringify(this.value);
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
        return EJQL_LEXER_OPERATOR_UNARY_TYPE.INVERT;
    };
    JQLExpressionUnaryInvert.prototype.compute = function (context) {
        var computedOperand = this.operand.compute(context);
        if (computedOperand === null) {
            return null;
        }
        else if (computedOperand === true) {
            return -1;
        }
        else if (computedOperand === false) {
            return 0;
        }
        else if (isNaN(computedOperand)) {
            return -computedOperand;
        }
        else {
            return 0;
        }
    };
    JQLExpressionUnaryInvert.prototype.toString = function () {
        return "-" + this.operand.toString();
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
    JQLExpressionUnaryNot.prototype.toString = function () {
        return '!' + this.operand.toString();
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
        this.affectingRows = false;
    }
    JQLStatementResult.prototype.getAffectedRows = function () {
        return this.affectedRows;
    };
    JQLStatementResult.prototype.withAffectedRows = function (affectedRowsCount) {
        this.affectedRows = ~~affectedRowsCount;
        return this;
    };
    JQLStatementResult.prototype.hasRows = function () {
        return false;
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
    JQLStatementResultSelect.prototype.hasRows = function () {
        return true;
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
var JQLStatementResultInsert = (function (_super) {
    __extends(JQLStatementResultInsert, _super);
    function JQLStatementResultInsert() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JQLStatementResultInsert.prototype.getLastInsertId = function () {
        return this.lastInsertId;
    };
    JQLStatementResultInsert.prototype.withLastInsertId = function (lastInsertId) {
        this.lastInsertId = lastInsertId;
        return this;
    };
    return JQLStatementResultInsert;
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
    function JQLStatementSelectFieldsListSpecific(token) {
        var _this = _super.call(this) || this;
        _this.fields = [];
        for (var i = 0, len = token.fields.length; i < len; i++) {
            _this.fields.push(JQLLexerFactory.create(token.fields[i]));
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
    function JQLStatementInsert(token) {
        var _this = _super.call(this, token) || this;
        _this.fields = [];
        _this.table = JQLLexerFactory.create(token.table);
        for (var i = 0, len = token.fields.length; i < len; i++) {
            _this.fields.push(JQLLexerFactory.create(token.fields[i]));
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
    function JQLStatementUpdate(token) {
        var _this = _super.call(this, token) || this;
        _this.fields = [];
        _this.filter = null;
        _this.limit = null;
        _this.sorter = null;
        _this.timer = null;
        _this.table = JQLLexerFactory.create(token.table);
        if (!!token.delayed) {
            _this.timer = JQLLexerFactory.create(token.delayed);
        }
        for (var i = 0, len = token.fields.length; i < len; i++) {
            _this.fields.push(JQLLexerFactory.create(token.fields[i]));
        }
        if (!!token.where) {
            _this.filter = JQLLexerFactory.create(token.where);
        }
        if (!!token.limit) {
            _this.limit = JQLLexerFactory.create(token.limit);
        }
        if (!!token.orderBy) {
            _this.sorter = JQLLexerFactory.create(token.orderBy);
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
    function JQLStatementDelete(token) {
        var _this = _super.call(this, token) || this;
        _this.filter = null;
        _this.sorter = null;
        _this.limit = null;
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
var JQLV1ConfigurationDemoProvider = (function () {
    function JQLV1ConfigurationDemoProvider() {
    }
    JQLV1ConfigurationDemoProvider.getConfig = function () {
        return [
            {
                eventType: EFormRuleEventType.ALL_EVENTS,
                controlId: "control_12322311",
                actions: [
                    {
                        controlId: "control_123312",
                        jql: "REMOTE SELECT * FROM persons2 LIMIT 3",
                    },
                    {
                        controlId: "control_2213",
                        jql: "SELECT * FROM persons LIMIT 1",
                    },
                ],
                isRule: false,
            },
        ];
    };
    return JQLV1ConfigurationDemoProvider;
}());
var JQLVirtualTableDemo = (function () {
    function JQLVirtualTableDemo() {
    }
    JQLVirtualTableDemo.create = function (db) {
        var table = JQLTable.createVirtualTable([
            {
                name: "id",
                type: EJQLTableColumnType.NUMBER,
                default: 0,
            },
            {
                name: "name",
                type: EJQLTableColumnType.STRING,
                default: "",
            },
        ]);
        table.createRow()
            .withPropertyGetter("id", function () {
            return 1;
        })
            .withPropertyGetter("name", function () {
            return "Jack";
        });
        table.createRow()
            .withPropertyGetter("id", function () {
            return 2;
        })
            .withPropertyGetter("name", function () {
            return "John";
        });
        return table;
    };
    return JQLVirtualTableDemo;
}());
var DummyAutoDatabaseBinder = (function () {
    function DummyAutoDatabaseBinder() {
    }
    DummyAutoDatabaseBinder.prototype.canBind = function (bindingName) {
        return /^binding_test_[\d]+$/.test(bindingName);
    };
    DummyAutoDatabaseBinder.prototype.getBindedValue = function (bindingName) {
        return bindingName;
    };
    return DummyAutoDatabaseBinder;
}());
(function ($) {
    $(function () {
        db
            .withAutoBindingProvider(new DummyAutoDatabaseBinder())
            .withTable("virtual_table", JQLVirtualTableDemo.create(db));
        var refreshTablesInAdminTableForm = function () {
            var tables = db.enumerateTables();
            $("#admin-table [name=table-list]").each(function () {
                var previousValue = this.value;
                while (this.options.length > 0) {
                    this.remove(0);
                }
                var blankOption = document.createElement("option");
                blankOption.text = "<select table>";
                blankOption.value = "";
                this.add(blankOption);
                for (var i = 0, len = tables.length; i < len; i++) {
                    var opt = document.createElement("option");
                    opt.text = opt.value = tables[i].name;
                    this.add(opt);
                }
                this.value = previousValue;
                if (this.selectedIndex === -1) {
                    this.value = "";
                }
            });
        };
        db.on("schema-changed", function () {
            console.warn("schema-changed");
            refreshTablesInAdminTableForm();
        });
        $("#create-table").on("submit", function (e) {
            e.preventDefault();
            e.stopPropagation();
            var request = {
                csvFile: $(this).find("[name=file]").get(0)["files"][0] || null,
                tableName: $(this).find("[name=name]").val().trim(),
                tableNamespace: $(this).find("[name=namespace]").val(),
                tableAccessMode: $(this).find("[name=access-mode]").val(),
                tableStorageEngine: $(this).find("[name=storage-engine]").val(),
                csvFieldDelimiter: $(this).find("[name=field-delimiter]").val(),
                csvFieldEnclosure: $(this).find("[name=field-enclosure]").val(),
                csvEncloseAllFields: $(this).find("[name=enclose-all-fields]").is(":checked"),
                csvEscapeCharacter: $(this).find("[name=escape-character]").val(),
                csvAutoTrim: $(this).find("[name=auto-trim]").is(":checked"),
                csvLineTerminator: $(this).find("[name=line-terminator]").val(),
            };
            db.createTableFromCSVFile(request).then(function (t) {
                alert(JSON.stringify(t));
            }).fail(function (e) {
                console.error(e);
            });
        });
        var dropTable = function (tableName) {
            if (!confirm("Are you sure you want to delete table " + JSON.stringify(tableName) + "?")) {
                return;
            }
            db.dropTable(tableName)
                .then(function () {
                alert("Table " + JSON.stringify(tableName) + " has been deleted!");
            })
                .fail(function (e) {
                console.error(e);
                alert("Failed to delete table " + JSON.stringify(tableName) + ": " + e.toString());
            });
        };
        var describeTable = function (tableName) {
            if (tableName) {
                try {
                    var table = db.getTable(tableName), columns = table.describe(), indexes = table.getIndexes() || [], buffer = "";
                    buffer += "<p><b>Table name:</b> " + tableName + "</p>";
                    buffer += "<p><b>Storage engine:</b> " + table.getStorageEngine() + "</p>";
                    buffer += "<table width=\"100%\"><thead><tr><td>Column</td><td>Type</td><td>Index</td></tr></thead><tbody>";
                    for (var i = 0, len = columns.length; i < len; i++) {
                        buffer += "<tr><td>" + columns[i].name + "</td><td>" + columns[i].type + "</td>";
                        var indexText = "", indexFound = false;
                        for (var j = 0, n = indexes.length; j < n; j++) {
                            if (indexes[j].getDescriptors()[0].name !== columns[i].name) {
                                continue;
                            }
                            indexFound = true;
                            if (table.isIndexable()) {
                                indexText += "<label>UNI: <input type=checkbox name=\"uniq_" + columns[i].name + "\" " + (indexes[j].isUnique()
                                    ? "checked"
                                    : "") + "/></label>";
                                if (columns[i].type === EJQLTableColumnType.NUMBER) {
                                    indexText += "<label>AUTO: <input type=radio name=\"autoincrement\" value=\"" + columns[i].name + "\" " + (indexes[j].isAutoIncrement()
                                        ? "checked"
                                        : "") + "/></label>";
                                }
                            }
                        }
                        if (!indexFound) {
                            if (table.isIndexable()) {
                                indexText += "<label>UNI: <input type=checkbox name=\"uniq_" + columns[i].name + "\" /></label>";
                                if (columns[i].type === EJQLTableColumnType.NUMBER) {
                                    indexText += "<label>AUTO: <input type=radio name=\"autoincrement\" value=\"" + columns[i].name + "\" /></label>";
                                }
                            }
                        }
                        if (table.isIndexable()) {
                            indexText += "<a data-role=\"drop-index\" href=\"javascript:;\">x</a>";
                        }
                        else {
                            indexText = 'Not Supported';
                        }
                        buffer += "<td>" + indexText + "</td></tr>";
                    }
                    buffer += "<tr class=\"footer\"><td colspan=\"2\">&nbsp;</td><td><button data-role=\"apply-indexes\">Apply Indexes</button></td></tr>";
                    buffer += "</tbody></table>";
                    $("#describe-table").html(buffer);
                }
                catch (e) {
                    $("#describe-table").text(e.toString);
                    console.error(e);
                }
            }
            else {
                $("#describe-table").text("");
            }
        };
        var applyTableIndexModifications = function () {
            var indexes = [], tableName = $("#admin-table select[name=table-list]").val();
            if (!tableName) {
                return;
            }
            $("#admin-table table").each(function () {
                var _this = this;
                $(this).find("tr").each(function () {
                    var indexName = null, isUnique = null, isAutoIncrement = false;
                    $(this).find("input[type=checkbox][name^=\"uniq_\"]").each(function () {
                        indexName = $(this).attr("name").substr(5);
                        isUnique = this.checked;
                    });
                    if (null === indexName) {
                        return;
                    }
                    $(this).find("input[type=radio][name=autoincrement]").each(function () {
                        isAutoIncrement = this.checked;
                    });
                    if (!isUnique && !isAutoIncrement) {
                        return;
                    }
                    if (isAutoIncrement) {
                        isUnique = true;
                    }
                    indexes.push({
                        name: indexName,
                        autoIncrement: isAutoIncrement,
                        unique: isUnique,
                    });
                });
                indexes = indexes.length
                    ? indexes
                    : null;
                db.getTable(tableName).alterIndexes(indexes).then(function () {
                    $(_this).find("tr.footer > td:first-child").html("<span class=success>SUCCESS</span>");
                }).fail(function (e) {
                    $(_this).find("tr.footer > td:first-child").html("<span class=error>FAILED</span>");
                });
            });
        };
        $("#admin-table").each(function () {
            $(this)
                .on("submit", function (e) {
                e.preventDefault();
                e.stopPropagation();
            })
                .on("click", "button[data-role]", function (e) {
                var buttonRole = this.getAttribute("data-role"), selectedTableName = $(this).closest("form").find("[name=table-list]").val();
                if (!selectedTableName) {
                    return;
                }
                switch (buttonRole) {
                    case "drop-table":
                        dropTable(selectedTableName);
                        break;
                    case "apply-indexes":
                        applyTableIndexModifications();
                        break;
                }
            })
                .on("click", "table input[type=radio], table input[type=checkbox]", function () {
                $(this).closest("table").addClass("modified");
            })
                .on("click", "a[data-role=drop-index]", function () {
                $(this).closest("td").find("input:checked").each(function () {
                    this.checked = false;
                });
                $(this).closest("table").addClass("modified");
            });
        });
        $("body").on("change", "#admin-table [name=table-list]", function () {
            describeTable(this.value);
        });
        var nl2br = function (s) {
            return String(s || "")
                .replace(/[\r\n]+/g, "\n")
                .split("\n").join("<br />");
        };
        var htmlentities = (function () {
            var escaper = document.createElement("div");
            return function (s) {
                escaper.textContent = String(s || "");
                return escaper.innerHTML;
            };
        })();
        var castColumnToString = function (col) {
            if (null === col) {
                return "<NULL>";
            }
            else if (true === col) {
                return "TRUE";
            }
            else if (false === col) {
                return "FALSE";
            }
            else if ("string" === typeof col) {
                return col;
            }
            else {
                return String(col);
            }
        };
        var dumpSQLResult = function (result) {
            var buffer = "<table style=\"width: 100%\"><thead><tr>", rows = result.getRows(), cols = [];
            if (!rows.length) {
                return "0 rows";
            }
            var firstRow = rows[0];
            for (var colName in firstRow) {
                buffer += "<td>" + htmlentities(colName) + "</td>";
                cols.push(colName);
            }
            buffer += "</tr></thead><tbody>";
            for (var i = 0, len = rows.length; i < len; i++) {
                buffer += "<tr>";
                for (var j = 0, n = cols.length; j < n; j++) {
                    buffer += "<td>" + htmlentities(castColumnToString(rows[i][cols[j]])) + "</td>";
                }
                buffer += "</tr>";
            }
            buffer += "</tbody></table>";
            return buffer;
        };
        $("#query").each(function () {
            $(this).on("submit", function (e) {
                e.preventDefault();
                e.stopPropagation();
                $("#sql-result").html("");
                var statement;
                try {
                    statement = db.createStatement($(this).find("[name=jql]").val());
                }
                catch (e) {
                    console.error(e);
                    $("#sql-result").html("<div class=error>" + nl2br(e.toString()) + "</div>");
                    return;
                }
                $("#sql-result").html("executing...");
                var queryStartTime = +new Date;
                db.executeStatement(statement).then(function (result) {
                    $("#sql-result").html("<div class=success>Completed in " + ((+new Date - queryStartTime)) + " milliseconds");
                    if (!result.hasRows()) {
                        $("#sql-result").append(result.getAffectedRows() + " rows affected");
                    }
                    else {
                        $("#sql-result").append(dumpSQLResult(result));
                    }
                }).fail(function (e) {
                    $("#sql-result").html("<div class=error>" + nl2br(e instanceof Error
                        ? e.toString()
                        : JSON.stringify(e)) + "</div>");
                });
            });
        });
        $("#config").each(function () {
            $(this).on("submit", function (e) {
                e.preventDefault();
                e.stopPropagation();
                try {
                    var config = JSON.parse($(this).find("[name=config]").val());
                    db.saveJQLFormConfiguration(config).then(function () {
                        $("#save-result").html("<span class=success>SAVED</span>");
                    }).fail(function (e) {
                        $("#save-result").html("<span class=error>" + e.toString() + "</span>");
                    });
                }
                catch (e) {
                    $(this).find("#save-result").html("<span class=error>" + e.toString() + "</span>");
                }
            });
            $(this).find("[name=config]").val(JSON.stringify(JQLV1ConfigurationDemoProvider.getConfig(), undefined, 4));
            $(this).find("#allowed-queries").each(function () {
            });
        });
    });
})(jQuery);
