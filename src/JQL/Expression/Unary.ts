abstract class JQLExpressionUnary extends JQLOpcode {

    private operand: JQLExpression;

    constructor( token: IJQL_LEXER_EXPRESSION_UNARY ) {

        super();

        this.operand = <JQLExpression>JQLLexerFactory.create(token.left);

    }

    public getOpcodeType(): EJQL_LEXER_OPCODE_TYPES {
        return EJQL_LEXER_OPCODE_TYPES.EXPRESSION;
    }

    public getExpressionType(): EJQL_LEXER_EXPRESSION_TYPES {
        return EJQL_LEXER_EXPRESSION_TYPES.UNARY;
    }

    public abstract getOperator(): EJQL_LEXER_OPERATOR_UNARY_TYPE;

    public getOperand() {
        return this.operand;
    }
}