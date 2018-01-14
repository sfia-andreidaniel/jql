class JQLExpressionMathDivision extends JQLExpressionMath {

    public getOperator(): EJQL_LEXER_OPERATOR_MATH_TYPE {
        return EJQL_LEXER_OPERATOR_MATH_TYPE.DIVISION;
    }

    public compute( context: IJQLTableRow ): JQLPrimitive {

        console.warn('TODO: properly implement "/" operator' );

        return Number(this.left.compute(context) ) / Number( this.right.compute(context) );
    }

}