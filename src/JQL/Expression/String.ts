class JQLExpressionString extends JQLExpression {

    private value: string;

    constructor( opcode: IJQL_LEXER_EXPRESSION_STRING ) {

        super();

        this.value = opcode.value;

    }

    public getOpcodeType(): EJQL_LEXER_OPCODE_TYPES {
        return EJQL_LEXER_OPCODE_TYPES.EXPRESSION;
    }

    public getExpressionType(): EJQL_LEXER_EXPRESSION_TYPES {
        return EJQL_LEXER_EXPRESSION_TYPES.STRING;
    }

    public getBindings(): JQLExpressionBinding[] {
        return [];
    }

    public getFunctions(): JQLExpressionFunctionCall[] {
        return [];
    }

    public getIdentifiers(): JQLExpressionIdentifier[] {
        return [];
    }

    public compute( context: IJQLTableRow ): JQLPrimitive {
        return this.value;
    }

    public toString(): string {
        return JSON.stringify(this.value);
    }
}