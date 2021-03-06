class JQLExpressionIdentifier extends JQLExpression {

    private identifierName: string;

    constructor(token: IJQL_LEXER_EXPRESSION_IDENTIFIER) {
        super();
        this.identifierName = token.name;
    }

    public getExpressionType(): EJQL_LEXER_EXPRESSION_TYPES {
        return EJQL_LEXER_EXPRESSION_TYPES.IDENTIFIER;
    }

    public getIdentifierName(): string {
        return this.identifierName;
    }

    public getBindings(): JQLExpressionBinding[] {
        return [];
    }

    public getFunctions(): JQLExpressionFunctionCall[] {
        return [];
    }

    public getIdentifiers(): JQLExpressionIdentifier[] {
        return [ this ];
    }

    public compute(context: IJQLTableRow): JQLPrimitive {
        return context.getColumnValue(this.identifierName);
    }

    public toString(): string {
        return this.identifierName;
    }

}