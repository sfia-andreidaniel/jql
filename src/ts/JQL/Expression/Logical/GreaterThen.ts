class JQLExpressionLogicalGreaterThen extends JQLExpressionLogical {

    public getOperator(): EJQL_LEXER_OPERATOR_COMPARISION_TYPE {
        return EJQL_LEXER_OPERATOR_COMPARISION_TYPE.GT;
    }

    public compute(context: IJQLTableRow): JQLPrimitive {

        let computedLeft  = this.left.compute(context),
            computedRight = this.right.compute(context);

        // ANY MEMBER THAT IS NULL RESULTS IN A NULL EXPRESSION RESULT
        if ((computedLeft === null || computedRight === null)) {
            return null;
        }

        // BOTH MEMBERS ARE NUMBERS?
        if (!isNaN(<any>computedLeft) && !isNaN(<any>computedRight)) {
            return Number(computedLeft) > Number(computedRight);
        }

        return computedLeft > computedRight || JQLUtils.compareAsStrings(computedLeft, computedRight) < 0;

    }

    public toString(): string {
        return this.left.toString() + " > " + this.right.toString();
    }

}