class JQLSorterStrategyByExpression extends JQLSorterStrategy {

    private expressions: JQLSorterExpression[] = [];

    constructor( token: IJQL_LEXER_ORDER_BY_FIELDS_CLAUSE ) {

        super( token );

        for ( let i=0, len = token.fields.length; i<len; i++ ) {
            this.expressions.push( <JQLSorterExpression>JQLLexerFactory.create( token.fields[i] ) );
        }

    }

    public getSortExpressions(): JQLSorterExpression[] {
        return this.expressions;
    }

    public isRandom(): boolean {
        return false;
    }

}