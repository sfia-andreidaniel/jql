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

        this.fields = <JQLStatementSelectFieldsList>JQLLexerFactory.create(token.fields);

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

    public getBindings(): JQLExpressionBinding[] {

        let result: JQLExpressionBinding[] = [];

        if ( null !== this.fields ) {
            if ( !this.fields.isSelectingAllFields() ) {
                for ( let specificFields = <JQLStatementSelectFieldsListSpecific>this.fields, i=0, fields = specificFields.getFields(), len = fields.length; i<len; i++) {
                    for ( let j=0, bindings = fields[i].getExpression().getBindings(), n = bindings.length; j<n; j++ ) {
                        result.push( bindings[j] );
                    }
                }
            }
        }

        if ( null !== this.filter ) {
            for ( let bindings = this.filter.getBindings(), i=0, len = bindings.length; i<len; i++ ) {
                result.push(bindings[i] );
            }
        }

        if ( null !== this.sorter ) {
            if ( !this.sorter.isRandom() ) {
                for ( let sorterByExpression = <JQLSorterStrategyByExpression>this.sorter, i=0, expressions = sorterByExpression.getSortExpressions(), len = expressions.length; i<len; i++ ) {
                    for ( let j=0, bindings = expressions[i].getExpression().getBindings(), n = bindings.length; j<n; j++ ) {
                        result.push(bindings[i]);
                    }
                }
            }
        }

        return result;
    }

    public getFunctions(): JQLExpressionFunctionCall[] {

        let result: JQLExpressionFunctionCall[] = [];

        if ( null !== this.fields ) {
            if ( !this.fields.isSelectingAllFields() ) {
                for ( let specificFields = <JQLStatementSelectFieldsListSpecific>this.fields, i=0, fields = specificFields.getFields(), len = fields.length; i<len; i++) {
                    for ( let j=0, functions = fields[i].getExpression().getFunctions(), n = functions.length; j<n; j++ ) {
                        result.push( functions[j] );
                    }
                }
            }
        }

        if ( null !== this.filter ) {
            for ( let functions = this.filter.getFunctions(), i=0, len = functions.length; i<len; i++ ) {
                result.push(functions[i] );
            }
        }

        if ( null !== this.sorter ) {
            if ( !this.sorter.isRandom() ) {
                for ( let sorterByExpression = <JQLSorterStrategyByExpression>this.sorter, i=0, expressions = sorterByExpression.getSortExpressions(), len = expressions.length; i<len; i++ ) {
                    for ( let j=0, functions = expressions[i].getExpression().getFunctions(), n = functions.length; j<n; j++ ) {
                        result.push(functions[i]);
                    }
                }
            }
        }

        return result;
    }

}