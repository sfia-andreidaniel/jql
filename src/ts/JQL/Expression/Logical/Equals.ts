class JQLExpressionLogicalEquals extends JQLExpressionLogical {

    public getOperator(): EJQL_LEXER_OPERATOR_COMPARISION_TYPE {
        return EJQL_LEXER_OPERATOR_COMPARISION_TYPE.EQUALS;
    }

    public compute(context: IJQLTableRow): JQLPrimitive {

        let computedLeft  = this.left.compute(context),
            computedRight = this.right.compute(context);

        if ((computedLeft === null && computedRight !== null) || (computedLeft !== null && computedRight === null)) {
            return null;
        }

        return computedLeft == computedRight;

    }

    public toString(): string {
        return this.left.toString() + " = " + this.right.toString();
    }

}