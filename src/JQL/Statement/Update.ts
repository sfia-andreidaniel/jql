class JQLStatementUpdate extends JQLStatement {

    private table: JQLTable;

    private fields: JQLStatementUpdateField[] = [];

    private filter: JQLExpression = null;

    private limit: JQLLimit = null;

    private sorter: JQLSorterStrategy = null;

    constructor( statement: IJQL_LEXER_PARSED_UPDATE_STATEMENT ) {

        super( statement );

        this.table = <JQLTable>JQLLexerFactory.create(statement.table);

        for ( let i=0, len = statement.fields.length; i<len; i++ ) {
            this.fields.push( <JQLStatementUpdateField>JQLLexerFactory.create(statement.fields[i]) );
        }

        if ( !!statement.where ) {
            this.filter = <JQLExpression>JQLLexerFactory.create(statement.where );
        }

        if ( !!statement.limit ) {
            this.limit = <JQLLimit>JQLLexerFactory.create(statement.limit);
        }

        if ( !!statement.orderBy ) {
            this.sorter = <JQLSorterStrategy>JQLLexerFactory.create(statement.orderBy);
        }

    }

    public getStatementType(): EJQL_LEXER_STATEMENT_TYPES {
        return EJQL_LEXER_STATEMENT_TYPES.UPDATE;
    }

    public getTable(): JQLTable {
        return this.table;
    }

    public getFields(): JQLStatementUpdateField[] {
        return this.fields;
    }

    public getFilter(): JQLExpression {
        return this.filter;
    }

    public getSorter(): JQLSorter {
        return this.sorter;
    }

    public getLimit(): JQLLimit {
        return this.limit;
    }


}