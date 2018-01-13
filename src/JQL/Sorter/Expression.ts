class JQLSorterExpression extends JQLOpcode {

    private direction: EJQL_LEXER_ORDER_DIRECTION;

    private expression: JQLExpression;

    constructor( token: IJQL_LEXER_FIELD_ORDER ) {

        super();

        this.direction = token.direction;

        this.expression = <JQLExpression>JQLLexerFactory.create(token.expression);

    }

    public getOpcodeType(): EJQL_LEXER_OPCODE_TYPES {
        return EJQL_LEXER_OPCODE_TYPES.ORDER_BY_EXPRESSION;
    }

    public getDirection(): EJQL_LEXER_ORDER_DIRECTION {
        return this.direction;
    }

    public getExpression(): JQLExpression {
        return this.expression;
    }

}