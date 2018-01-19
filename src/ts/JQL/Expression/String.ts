class JQLExpressionString extends JQLExpression {

    private value: string;

    constructor( token: IJQL_LEXER_EXPRESSION_STRING ) {

        super();

        this.value = token.value;

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