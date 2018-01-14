class JQLExpressionBoolean extends JQLExpression {

    private value: boolean;

    constructor( lexerToken: IJQL_LEXER_EXPRESSION_BOOLEAN ) {

        super();

        this.value = lexerToken.value;

    }

    public getOpcodeType(): EJQL_LEXER_OPCODE_TYPES {
        return EJQL_LEXER_OPCODE_TYPES.EXPRESSION;
    }

    public getExpressionType(): EJQL_LEXER_EXPRESSION_TYPES {
        return EJQL_LEXER_EXPRESSION_TYPES.BOOLEAN;
    }

    public getBindings(): JQLExpressionBinding[] {
        return [];
    }

    public getFunctions(): JQLExpressionFunctionCall[] {
        return [];
    }

    public compute( context: IJQLTableRow ) {
        return this.value;
    }
}