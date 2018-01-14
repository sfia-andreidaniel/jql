class JQLStatementDelete extends JQLStatement {

    private table: JQLTableReference;

    private filter: JQLExpression = null;

    private sorter: JQLSorterStrategy = null;

    private limit: JQLLimit = null;

    constructor(statement: IJQL_LEXER_PARSED_DELETE_STATEMENT) {

        super(statement);

        this.table = <JQLTableReference>JQLLexerFactory.create(statement.table);

        if (!!statement.where) {
            this.filter = <JQLExpression>JQLLexerFactory.create(statement.where);
        }

        if (!!statement.orderBy) {
            this.sorter = <JQLSorterStrategy>JQLLexerFactory.create(statement.orderBy);
        }

        if (!!statement.limit) {
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

        if (!!this.filter) {
            for (let bindings = this.filter.getBindings(), i = 0, len = bindings.length; i < len; i++) {
                result.push(bindings[ i ]);
            }

        }

        if (!!this.sorter) {
            if (!this.sorter.isRandom()) {
                for (let sorterByExpression = <JQLSorterStrategyByExpression>this.sorter, i = 0, expressions = sorterByExpression.getSortExpressions(), len = expressions.length; i < len; i++) {
                    for (let j = 0, bindings = expressions[ i ].getExpression().getBindings(), n = bindings.length; j < n; j++) {
                        result.push(bindings[ i ]);
                    }
                }
            }
        }

        return result;
    }

    public getFunctions(): JQLExpressionFunctionCall[] {

        let result: JQLExpressionFunctionCall[] = [];

        if (null !== this.filter) {
            for (let functions = this.filter.getFunctions(), i = 0, len = functions.length; i < len; i++) {
                result.push(functions[ i ]);
            }
        }

        if (null !== this.sorter) {
            if (!this.sorter.isRandom()) {
                for (let sorterByExpression = <JQLSorterStrategyByExpression>this.sorter, i = 0, expressions = sorterByExpression.getSortExpressions(), len = expressions.length; i < len; i++) {
                    for (let j = 0, functions = expressions[ i ].getExpression().getFunctions(), n = functions.length; j < n; j++) {
                        result.push(functions[ i ]);
                    }
                }
            }
        }


        return result;

    }

    public getIdentifiers(): JQLExpressionIdentifier[] {

        let result: JQLExpressionIdentifier[] = [];

        if (null !== this.filter) {
            for (let identifiers = this.filter.getIdentifiers(), i = 0, len = identifiers.length; i < len; i++) {
                result.push(identifiers[ i ]);
            }
        }

        if (null !== this.sorter) {
            if (!this.sorter.isRandom()) {
                for (let sorterByExpression = <JQLSorterStrategyByExpression>this.sorter, i = 0, expressions = sorterByExpression.getSortExpressions(), len = expressions.length; i < len; i++) {
                    for (let j = 0, identifiers = expressions[ i ].getExpression().getIdentifiers(), n = identifiers.length; j < n; j++) {
                        result.push(identifiers[ i ]);
                    }
                }
            }
        }

        return result;

    }

}