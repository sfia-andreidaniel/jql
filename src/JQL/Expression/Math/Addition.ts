class JQLExpressionMathAddition extends JQLExpressionMath {

    public getOperator(): EJQL_LEXER_OPERATOR_MATH_TYPE {
        return EJQL_LEXER_OPERATOR_MATH_TYPE.ADDITION;
    }
    
}