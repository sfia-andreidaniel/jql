class JQLStatementUpdate extends JQLStatement {

    private table: JQLTableReference;

    private fields: JQLStatementUpdateField[] = [];

    private filter: JQLExpression = null;

    private limit: JQLLimit = null;

    private sorter: JQLSorterStrategy = null;

    private timer: JQLStatementUpdateDelayedOption = null;

    constructor(statement: IJQL_LEXER_PARSED_UPDATE_STATEMENT) {

        super(statement);

        this.table = <JQLTableReference>JQLLexerFactory.create(statement.table);

        if (!!statement.delayed) {
            this.timer = <JQLStatementUpdateDelayedOption>JQLLexerFactory.create(statement.delayed);
        }

        for (let i = 0, len = statement.fields.length; i < len; i++) {
            this.fields.push(<JQLStatementUpdateField>JQLLexerFactory.create(statement.fields[ i ]));
        }

        if (!!statement.where) {
            this.filter = <JQLExpression>JQLLexerFactory.create(statement.where);
        }

        if (!!statement.limit) {
            this.limit = <JQLLimit>JQLLexerFactory.create(statement.limit);
        }

        if (!!statement.orderBy) {
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

    public getSorter(): JQLSorterStrategy {
        return this.sorter;
    }

    public getLimit(): JQLLimit {
        return this.limit;
    }

    public getBindings(): JQLExpressionBinding[] {

        let result: JQLExpressionBinding[] = [];

        for (let i = 0, len = this.fields.length; i < len; i++) {

            for (let j = 0, bindings = this.fields[ i ].getExpression().getBindings(), n = bindings.length; j < n; j++) {
                result.push(bindings[ j ]);
            }

        }

        if (!!this.filter) {
            for (let i = 0, bindings = this.filter.getBindings(), len = bindings.length; i < len; i++) {
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

        for (let i = 0, len = this.fields.length; i < len; i++) {

            for (let j = 0, functions = this.fields[ i ].getExpression().getFunctions(), n = functions.length; j < n; j++) {
                result.push(functions[ j ]);
            }

        }

        if (!!this.filter) {
            for (let i = 0, functions = this.filter.getFunctions(), len = functions.length; i < len; i++) {
                result.push(functions[ i ]);
            }
        }

        if (!!this.sorter) {
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

        for (let i = 0, len = this.fields.length; i < len; i++) {

            for (let j = 0, identifiers = this.fields[ i ].getExpression().getIdentifiers(), n = identifiers.length; j < n; j++) {
                result.push(identifiers[ j ]);
            }

        }

        if (!!this.filter) {
            for (let i = 0, identifiers = this.filter.getIdentifiers(), len = identifiers.length; i < len; i++) {
                result.push(identifiers[ i ]);
            }
        }

        if (null !== this.sorter) {
            if (!this.sorter.isRandom()) {
                for (let sorterByExpression = <JQLSorterStrategyByExpression>this.sorter, i = 0, expressions = sorterByExpression.getSortExpressions(), len = expressions.length; i < len; i++) {
                    for (let j = 0, identifiers = expressions[ i ].getExpression().getIdentifiers(), n = identifiers.length; j < n; j++) {
                        result.push(identifiers[ j ]);
                    }
                }
            }
        }

        return result;

    }

}