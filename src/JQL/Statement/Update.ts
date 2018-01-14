class JQLStatementUpdate extends JQLStatement {

    private table: JQLTableReference;

    private fields: JQLStatementUpdateField[] = [];

    private filter: JQLExpression = null;

    private limit: JQLLimit = null;

    private sorter: JQLSorterStrategy = null;

    private timer: JQLStatementUpdateDelayedOption = null;

    constructor( statement: IJQL_LEXER_PARSED_UPDATE_STATEMENT ) {

        super( statement );

        this.table = <JQLTableReference>JQLLexerFactory.create(statement.table);

        if ( !!statement.delayed ) {
            this.timer = <JQLStatementUpdateDelayedOption>JQLLexerFactory.create( statement.delayed );
        }

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

    public getTimer(): JQLStatementUpdateDelayedOption {
        return this.timer;
    }

    public getTable(): JQLTableReference {
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

    public getBindings(): JQLExpressionBinding[] {
        let result: JQLExpressionBinding[] = [];
        return result;
    }

    public getFunctions(): JQLExpressionFunctionCall[] {
        let result: JQLExpressionFunctionCall[] = [];
        return result;
    }

}