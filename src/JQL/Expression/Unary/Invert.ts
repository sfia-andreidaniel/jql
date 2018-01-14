class JQLExpressionUnaryInvert extends JQLExpressionUnary {

    public getOperator(): EJQL_LEXER_OPERATOR_UNARY_TYPE {

        console.warn('TODO: Properly implement "Unary -" operator');

        return EJQL_LEXER_OPERATOR_UNARY_TYPE.INVERT;
    }

    public compute( context: IJQLTableRow ): JQLPrimitive {

        console.warn('TODO: Properly implement "Unary -" operator');

        return -this.operand.compute(context);

    }

}