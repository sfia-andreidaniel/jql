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
                return new JQLTable(lexerToken);
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
var JQLOpcode = (function () {
    function JQLOpcode() {
    }
    return JQLOpcode;
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
    return JQLStatement;
}(JQLOpcode));
var JQLTable = (function (_super) {
    __extends(JQLTable, _super);
    function JQLTable(opcode) {
        var _this = _super.call(this) || this;
        _this.name = opcode.name;
        return _this;
    }
    JQLTable.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.TABLE;
    };
    JQLTable.prototype.getName = function () {
        return this.name;
    };
    return JQLTable;
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
    return JQLExpressionBoolean;
}(JQLOpcode));
var JQLExpressionFunctionCall = (function (_super) {
    __extends(JQLExpressionFunctionCall, _super);
    function JQLExpressionFunctionCall(token) {
        var _this = _super.call(this) || this;
        _this.arguments = [];
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
    return JQLExpressionFunctionCall;
}(JQLOpcode));
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
    return JQLExpressionGroup;
}(JQLOpcode));
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
    return JQLExpressionIdentifier;
}(JQLOpcode));
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
    return JQLExpressionLogical;
}(JQLOpcode));
var JQLExpressionLogicalOr = (function (_super) {
    __extends(JQLExpressionLogicalOr, _super);
    function JQLExpressionLogicalOr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JQLExpressionLogicalOr.prototype.getOperator = function () {
        return EJQL_LEXER_OPERATOR_LOGICAL_TYPE.OR;
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
    return JQLExpressionMath;
}(JQLOpcode));
var JQLExpressionMathAddition = (function (_super) {
    __extends(JQLExpressionMathAddition, _super);
    function JQLExpressionMathAddition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JQLExpressionMathAddition.prototype.getOperator = function () {
        return EJQL_LEXER_OPERATOR_MATH_TYPE.ADDITION;
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
    return JQLExpressionMathMultiply;
}(JQLExpressionMath));
var JQLExpressionNull = (function (_super) {
    __extends(JQLExpressionNull, _super);
    function JQLExpressionNull() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = null;
        return _this;
    }
    JQLExpressionNull.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.EXPRESSION;
    };
    JQLExpressionNull.prototype.getExpressionType = function () {
        return EJQL_LEXER_EXPRESSION_TYPES.NULL;
    };
    return JQLExpressionNull;
}(JQLOpcode));
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
    return JQLExpressionNumber;
}(JQLOpcode));
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
    return JQLExpressionString;
}(JQLOpcode));
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
    return JQLExpressionUnary;
}(JQLOpcode));
var JQLExpressionUnaryInvert = (function (_super) {
    __extends(JQLExpressionUnaryInvert, _super);
    function JQLExpressionUnaryInvert() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JQLExpressionUnaryInvert.prototype.getOperator = function () {
        return EJQL_LEXER_OPERATOR_UNARY_TYPE.INVERT;
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
    return JQLExpressionUnaryNot;
}(JQLExpressionUnary));
var JQLSorter = (function (_super) {
    __extends(JQLSorter, _super);
    function JQLSorter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JQLSorter.prototype.getOpcodeType = function () {
        return EJQL_LEXER_OPCODE_TYPES.ORDER_BY_OPTION;
    };
    return JQLSorter;
}(JQLOpcode));
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
}(JQLSorter));
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
    return JQLSorterStrategyByExpression;
}(JQLSorterStrategy));
var JQLSorterStrategyRandom = (function (_super) {
    __extends(JQLSorterStrategyRandom, _super);
    function JQLSorterStrategyRandom(token) {
        return _super.call(this, token) || this;
    }
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
    return JQLStatementDelete;
}(JQLStatement));
