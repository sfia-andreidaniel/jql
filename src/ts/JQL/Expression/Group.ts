class JQLExpressionGroup extends JQLExpression {

    private expression: JQLExpression;

    constructor( token: IJQL_LEXER_EXPRESSION_GROUP ) {
        super();
        this.expression = <JQLExpression>JQLLexerFactory.create(token.expression);
    }

    public getExpressionType(): EJQL_LEXER_EXPRESSION_TYPES {
        return EJQL_LEXER_EXPRESSION_TYPES.GROUP;
    }

    public getBindings(): JQLExpressionBinding[] {
        return this.expression.getBindings();
    }

    public getFunctions(): JQLExpressionFunctionCall[] {
        return this.expression.getFunctions();
    }

    public getIdentifiers(): JQLExpressionIdentifier[] {
        return this.expression.getIdentifiers();
    }

    public compute( context: IJQLTableRow ): JQLPrimitive {
        return this.expression.compute( context );
    }

    public toString(): string {

        return '(' + this.expression.toString() + ')';

    }

}