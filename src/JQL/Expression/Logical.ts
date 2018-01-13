abstract class JQLExpressionLogical extends JQLOpcode {

    protected left: JQLExpression;

    protected right: JQLExpression;

    constructor( token: IJQL_LEXER_EXPRESSION_LOGICAL ) {

        super();

        this.left = <JQLExpression>JQLLexerFactory.create( token.left );

        this.right = <JQLExpression>JQLLexerFactory.create( token.right );

    }

    public getOpcodeType(): EJQL_LEXER_OPCODE_TYPES {
        return EJQL_LEXER_OPCODE_TYPES.EXPRESSION;
    }

    public getExpressionType(): EJQL_LEXER_EXPRESSION_TYPES {
        return EJQL_LEXER_EXPRESSION_TYPES.LOGICAL;
    }

    public abstract getOperator(): EJQL_LEXER_OPERATOR_LOGICAL_TYPE|EJQL_LEXER_OPERATOR_COMPARISION_TYPE;

    public getLeftOperand(): JQLExpression {
        return this.left;
    }

    public getRightOperand(): JQLExpression {
        return this.right;
    }
}