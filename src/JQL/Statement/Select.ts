class JQLStatementSelect extends JQLStatement {

    private fields: JQLStatementSelectFieldsList;

    private table: JQLTableReference = null;

    private filter: JQLExpression = null;

    private sorter: JQLSorterStrategy = null;

    private limit: JQLLimit = null;

    private union: JQLStatementSelect = null;

    private previous: JQLStatementSelect = null;

    constructor(token: IJQL_LEXER_PARSED_SELECT_STATEMENT) {

        super(token);

        this.fields = JQLLexerFactory.create(token.fields);

        if (!!token.table) {

            this.table = <JQLTableReference>JQLLexerFactory.create(token.table);

            if (!!token.where) {
                this.filter = <JQLExpression>JQLLexerFactory.create(token.where);
            }

            if (!!token.orderBy) {
                this.sorter = <JQLSorterStrategy>JQLLexerFactory.create(token.orderBy);
            }

            if (!!token.limit) {
                this.limit = <JQLLimit>JQLLexerFactory.create(token.limit);
            }

        }

        if (!!token.union) {
            this.union = (<JQLStatementSelect>JQLLexerFactory.create(token.union)).withPreviousStatement(this);
        }

    }

    public isRemote(): boolean {
        if ( this.previous ) {
            return this.previous.isRemote();
        } else {
            return super.isRemote();
        }
    }

    public getStatementType(): EJQL_LEXER_STATEMENT_TYPES {
        return EJQL_LEXER_STATEMENT_TYPES.SELECT;
    }

    public getFields(): JQLStatementSelectFieldsList {
        return this.fields;
    }

    public getTable(): JQLTableReference|null {
        return this.table;
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

    public getUnion(): JQLStatementSelect {
        return this.union;
    }

    public withPreviousStatement( statement: JQLStatementSelect ): this {
        this.previous = statement || null;
        return this;
    }

}