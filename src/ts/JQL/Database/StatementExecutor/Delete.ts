class JQLDatabaseStatementExecutorDelete implements IDatabaseStatementExecutor {

    private statement: JQLStatementDelete;

    private db: JQLDatabase;

    private markedRowsForDelete: IJQLMarkedRowForUpdate[];

    constructor(statement: JQLStatementDelete, db: JQLDatabase) {
        this.statement = statement;
        this.db = db;
    }

    public execute(): IJQLQueryExecuteStrategy {
        return (): JQueryDeferred<JQLStatementResult> => {
            return <any>this.db.getJQuery().Deferred(( defer ) => {
                this.db.getTable(this.statement.getTable().getName())
                    .fetch()
                    .then( (table: JQLTableStorageEngineInMemory) => {

                        if ( table.isTransactional() ) {
                            table.startTransaction();
                        }

                        try {

                            this.markedRowsForDelete = [];

                            let iterator                             = table.createIterator(),
                                row: JQLRow,
                                addRow: boolean,
                                where                                = this.statement.getFilter();

                            while (row = iterator.next()) {

                                if (null === where) {

                                    addRow = true;

                                } else {

                                    addRow = !!where.compute(row);

                                }

                                if (addRow) {

                                    this.markedRowsForDelete.push({
                                        rowIndex: row.getRowIndex(),
                                        values: row.getDataAsArray(),
                                    });

                                }

                            }

                            if (!this.markedRowsForDelete.length) {

                                if ( table.isTransactional() ) {
                                    table.commitTransaction();
                                }

                                defer.resolve(new JQLStatementResult().withAffectedRows(0));

                                return;

                            }

                            // APPLY SORTING

                            this.applySorting();

                            // APPLY LIMITS

                            this.applyLimits();

                            if (!this.markedRowsForDelete.length) {

                                if ( table.isTransactional() ) {
                                    table.commitTransaction();
                                }

                                defer.resolve(new JQLStatementResult().withAffectedRows(0));

                                return;

                            }

                            for (let i = 0, len = this.markedRowsForDelete.length; i < len; i++) {
                                table.deleteRow(this.markedRowsForDelete[i].rowIndex);
                            }

                            table.compact();

                            if ( table.isTransactional() ) {
                                table.commitTransaction();
                            }

                            defer.resolve(new JQLStatementResult().withAffectedRows(this.markedRowsForDelete.length));

                        } catch (e) {

                            console.error(e);

                            if ( table.isTransactional() ) {
                                table.rollbackTransaction();
                            }

                            defer.reject( new Error('Failed to execute DELETE statement!' ) );

                        }
                    })
                    .fail((e) => {

                        console.error(e);

                        defer.reject( new Error('Failed to fetch table from server!') )

                    });
            } ).promise();
        }
    }

    private applySorting() {

        let sorter = this.statement.getSorter(),
            table = <JQLTableStorageEngineInMemory>this.db.getTable(this.statement.getTable().getName());

        if (!sorter || this.markedRowsForDelete.length < 2) {
            return;
        }

        if (sorter.isRandom()) {
            return JQLUtils.shuffleArray(this.markedRowsForDelete);
        }

        let expressions = (<JQLSorterStrategyByExpression>sorter).getSortExpressions(),
            numExpressions = expressions.length;

        let sortFunction = (function () {

            let walkers: any[] = [];

            for (let i = 0; i < numExpressions; i++) {

                if (i === numExpressions - 1) {

                    // LAST WALKER

                    walkers.push((function (i) {

                        return function (a: JQLRow, b: JQLRow): number {

                            let exprA = expressions[i].getExpression().compute(a),
                                exprB = expressions[i].getExpression().compute(b),
                                result: number = JQLUtils.compare(exprA, exprB);

                            if (expressions[i].getDirection() === EJQL_LEXER_ORDER_DIRECTION.DESCENDING) {
                                result = -result;
                            }

                            return result;

                        }

                    })(i));


                } else {

                    // NOT LAST WALKER

                    walkers.push((function (i) {

                        return function (a: JQLRow, b: JQLRow): number {

                            let exprA = expressions[i].getExpression().compute(a),
                                exprB = expressions[i].getExpression().compute(b),
                                result: number = JQLUtils.compare(exprA, exprB);

                            if (expressions[i].getDirection() === EJQL_LEXER_ORDER_DIRECTION.DESCENDING) {
                                result = -result;
                            }

                            if (0 === result) {
                                return walkers[i + 1](a, b);
                            } else {
                                return result;
                            }
                        }

                    })(i));
                }

            }

            return function (a: IJQLMarkedRowForUpdate, b: IJQLMarkedRowForUpdate): number {

                return walkers[0](
                    JQLRow.createFromTable(table).withRowData(a.values).withIndex(-1),
                    JQLRow.createFromTable(table).withRowData(b.values).withIndex(-1),
                );

            }

        })();

        this.markedRowsForDelete.sort(sortFunction);

    }

    private applyLimits() {

        let limit = this.statement.getLimit();

        if (!limit) {
            return;
        }

        this.markedRowsForDelete = this.markedRowsForDelete.slice(limit.getSkip(), limit.getSkip() + limit.getLimit());

    }

}