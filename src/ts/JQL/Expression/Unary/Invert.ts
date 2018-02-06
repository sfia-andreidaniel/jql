class JQLExpressionUnaryInvert extends JQLExpressionUnary {

    public getOperator(): EJQL_LEXER_OPERATOR_UNARY_TYPE {
        return EJQL_LEXER_OPERATOR_UNARY_TYPE.INVERT;
    }

    public compute(context: IJQLTableRow): JQLPrimitive {

        let computedOperand = this.operand.compute(context);

        if (computedOperand === null) {
            return null;
        } else if (computedOperand === true) {
            return -1;
        } else if (computedOperand === false) {
            return 0;
        } else if (isNaN(<any>computedOperand)) {
            return -computedOperand;
        } else {
            return 0;
        }

    }

    public toString(): string {
        return "-" + this.operand.toString();
    }

}