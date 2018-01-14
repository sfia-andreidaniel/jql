class JQLExpressionLogicalOr extends JQLExpressionLogical {

    public getOperator(): EJQL_LEXER_OPERATOR_LOGICAL_TYPE {
        return EJQL_LEXER_OPERATOR_LOGICAL_TYPE.OR;
    }

    public compute(context: IJQLTableRow): JQLPrimitive {

        console.warn('TODO: Properly implement "Logical ||" operator');

        return this.left.compute(context) || this.right.compute(context);
    }

}