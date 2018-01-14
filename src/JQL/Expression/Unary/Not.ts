class JQLExpressionUnaryNot extends JQLExpressionUnary {

    public getOperator(): EJQL_LEXER_OPERATOR_UNARY_TYPE {
        return EJQL_LEXER_OPERATOR_UNARY_TYPE.NOT;
    }

    public compute( context: IJQLTableRow ): JQLPrimitive {

        console.warn('TODO: Properly implement "Unary !" operator');

        return !this.operand.compute(context);

    }

}