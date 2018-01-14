class JQLExpressionLogicalLike extends JQLExpressionLogical {

    public getOperator(): EJQL_LEXER_OPERATOR_COMPARISION_TYPE {
        return EJQL_LEXER_OPERATOR_COMPARISION_TYPE.LIKE;
    }

    public compute(context: IJQLTableRow): JQLPrimitive {

        console.warn('TODO: Properly implement "Logical ~=" operator');

        return this.like( this.left.compute( context ), this.right.compute( context ) );
    }

    private like( left: JQLPrimitive, right: JQLPrimitive ): boolean {

        console.warn("TODO: JQLExpressionLogicalLike.like(left, right): implement");

        return true;

    }

}