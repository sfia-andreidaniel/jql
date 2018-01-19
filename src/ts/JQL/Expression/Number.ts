class JQLExpressionNumber extends JQLExpression {

    private value: number;

    constructor( token: IJQL_LEXER_EXPRESSION_NUMBER ) {

        super();

        this.value = token.value;

    }

    public getExpressionType(): EJQL_LEXER_EXPRESSION_TYPES {
        return EJQL_LEXER_EXPRESSION_TYPES.NUMBER;
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
        return String(this.value);
    }
}