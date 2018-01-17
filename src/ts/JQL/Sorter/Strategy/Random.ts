class JQLSorterStrategyRandom extends JQLSorterStrategy {

    constructor( token: IJQL_LEXER_ORDER_BY_FIELDS_CLAUSE ) {
        super(token);
    }

    public isRandom(): boolean {
        return true;
    }
}