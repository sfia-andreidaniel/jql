class JQLExpressionLogicalOr extends JQLExpressionLogical {

    public getOperator(): EJQL_LEXER_OPERATOR_LOGICAL_TYPE {
        return EJQL_LEXER_OPERATOR_LOGICAL_TYPE.OR;
    }

}