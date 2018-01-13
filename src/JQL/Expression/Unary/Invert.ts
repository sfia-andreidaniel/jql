class JQLExpressionUnaryInvert extends JQLExpressionUnary {

    public getOperator(): EJQL_LEXER_OPERATOR_UNARY_TYPE {
        return EJQL_LEXER_OPERATOR_UNARY_TYPE.INVERT;
    }

}