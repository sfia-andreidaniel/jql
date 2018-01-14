class JQLExpressionLogicalGreaterThen extends JQLExpressionLogical {

    public getOperator(): EJQL_LEXER_OPERATOR_COMPARISION_TYPE {
        return EJQL_LEXER_OPERATOR_COMPARISION_TYPE.GT;
    }

    public compute(context: IJQLTableRow): JQLPrimitive {

        console.warn('TODO: Properly implement "Logical >" operator');

        return this.left.compute(context) > this.right.compute(context);
    }

}