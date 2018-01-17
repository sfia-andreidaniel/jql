class JQLExpressionMathAddition extends JQLExpressionMath {

    public getOperator(): EJQL_LEXER_OPERATOR_MATH_TYPE {
        return EJQL_LEXER_OPERATOR_MATH_TYPE.ADDITION;
    }

    public compute( context: IJQLTableRow ): JQLPrimitive {

        console.warn('TODO: Properly implement "+" operator');

        return Number(this.left.compute(context)) + Number(this.right.compute(context));

    }

    public toString(): string {

        return this.left.toString() + " + " + this.right.toString();

    }
    
}