class JQLStatementUpdateField extends JQLOpcode {

    private name: string;

    private expression: JQLExpression;

    constructor( token: IJQL_LEXER_UPDATE_FIELD ) {

        super();

        this.name = token.name;

        this.expression = <JQLExpression>JQLLexerFactory.create(token.expression);

    }

    public getOpcodeType(): EJQL_LEXER_OPCODE_TYPES {
        return EJQL_LEXER_OPCODE_TYPES.UPDATE_FIELD;
    }

    public getFieldName(): string {
        return this.name;
    }

    public getExpression(): JQLExpression {
        return this.expression;
    }

}