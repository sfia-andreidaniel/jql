class JQLExpressionBoolean extends JQLExpression {

    private value: boolean;

    constructor( token: IJQL_LEXER_EXPRESSION_BOOLEAN ) {

        super();

        this.value = token.value;

    }

    public getExpressionType(): EJQL_LEXER_EXPRESSION_TYPES {
        return EJQL_LEXER_EXPRESSION_TYPES.BOOLEAN;
    }

    public getBindings(): JQLExpressionBinding[] {
        return [];
    }

    public getIdentifiers(): JQLExpressionIdentifier[] {
        return [];
    }

    public getFunctions(): JQLExpressionFunctionCall[] {
        return [];
    }

    public compute( context: IJQLTableRow ) {
        return this.value;
    }

    public toString(): string {
        return String(this.value);
    }
}