class JQLExpressionNull extends JQLExpression {

    public getExpressionType(): EJQL_LEXER_EXPRESSION_TYPES {
        return EJQL_LEXER_EXPRESSION_TYPES.NULL;
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
        return null;
    }

    public toString(): string {
        return 'null';
    }
}