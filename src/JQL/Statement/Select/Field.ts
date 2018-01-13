class JQLStatementSelectField extends JQLOpcode {
    private literal: string|null = null;

    private expression: JQLExpression;

    constructor( token: IJQL_LEXER_SELECT_FIELD ) {

        super();

        this.literal = token.literal;

        this.expression = <JQLExpression>JQLLexerFactory.create( token.expression );

    }

    public getOpcodeType(): EJQL_LEXER_OPCODE_TYPES {
        return EJQL_LEXER_OPCODE_TYPES.FIELD;
    }

    public getLiteral(): string {
        return this.literal;
    }

    public getExpression(): JQLExpression {
        return this.expression;
    }

}