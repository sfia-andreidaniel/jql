class JQLExpressionBinding extends JQLExpression {

    private bindingName: string;

    constructor( token: IJQL_LEXER_EXPRESSION_BINDING ) {

        super();

        this.bindingName = token.name;

    }

    public getOpcodeType(): EJQL_LEXER_OPCODE_TYPES {
        return EJQL_LEXER_OPCODE_TYPES.EXPRESSION;
    }

    public getExpressionType(): EJQL_LEXER_EXPRESSION_TYPES {
        return EJQL_LEXER_EXPRESSION_TYPES.BINDING;
    }

    public getBindingName(): string {
        return this.bindingName;
    }
}