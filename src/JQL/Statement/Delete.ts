class JQLStatementDelete extends JQLStatement {

    private table: JQLTableReference;

    private filter: JQLExpression = null;

    private sorter: JQLSorterStrategy = null;

    private limit: JQLLimit = null;

    constructor( statement: IJQL_LEXER_PARSED_DELETE_STATEMENT ) {

        super( statement );

        this.table = <JQLTableReference>JQLLexerFactory.create( statement.table );

        if ( !!statement.where ) {
            this.filter = <JQLExpression>JQLLexerFactory.create( statement.where );
        }

        if ( !!statement.orderBy ) {
            this.sorter = <JQLSorterStrategy>JQLLexerFactory.create( statement.orderBy );
        }

        if ( !!statement.limit ) {
            this.limit = <JQLLimit>JQLLexerFactory.create(statement.limit);
        }

    }

    public getStatementType(): EJQL_LEXER_STATEMENT_TYPES {
        return EJQL_LEXER_STATEMENT_TYPES.DELETE;
    }

    public getTable(): JQLTableReference {
        return this.table;
    }

    public getFilter(): JQLExpression {
        return this.filter;
    }

    public getSorter(): JQLSorterStrategy {
        return this.sorter;
    }

    public getLimit(): JQLLimit {
        return this.limit;
    }

    public getBindings(): JQLExpressionBinding[] {
        let result: JQLExpressionBinding[] = [];
        return result;
    }

    public getFunctions(): JQLExpressionFunctionCall[] {
        let result: JQLExpressionFunctionCall[] = [];
        return result;
    }

}