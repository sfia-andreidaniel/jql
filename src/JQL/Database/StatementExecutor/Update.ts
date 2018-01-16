class JQLDatabaseStatementExecutorUpdate implements IDatabaseStatementExecutor {

    private statement: JQLStatementUpdate;

    private db: JQLDatabase;

    private markedRowsForUpdate: IJQLMarkedRowForUpdate[];

    constructor(statement: JQLStatementUpdate, db: JQLDatabase) {
        this.statement = statement;
        this.db = db;
    }

    public execute(): IJQLQueryExecuteStrategy {

        return (): JQueryDeferred<JQLStatementResult> => {

            return <any>this.db.getJQuery().Deferred((defer) => {

                this.markedRowsForUpdate = [];

                let table: JQLTableInMemory = <JQLTableInMemory>this.db.getTable(this.statement.getTable().getName()),
                    iterator = table.createIterator(),
                    row: JQLRow,
                    addRow: boolean,
                    where = this.statement.getFilter();

                while (row = iterator.next()) {

                    if (null === where) {

                        addRow = true;

                    } else {

                        addRow = !!where.compute(row);

                    }

                    if (addRow) {

                        this.markedRowsForUpdate.push({
                            rowIndex: row.getRowIndex(),
                            values: row.getDataAsArray(),
                        });

                    }

                }

                if (!this.markedRowsForUpdate.length) {

                    defer.resolve(new JQLStatementResult().withAffectedRows(0));

                    return;

                }

                // APPLY SORTING

                this.applySorting();

                // APPLY LIMITS

                this.applyLimits();

                if (!this.markedRowsForUpdate.length) {

                    defer.resolve(new JQLStatementResult().withAffectedRows(0));

                    return;

                }


                // DO UPDATES

                let result = new JQLStatementResult().withAffectedRows(this.markedRowsForUpdate.length),
                    updateRow: JQLRow = JQLRow.createFromTable( table ),
                    updateExpressions = this.statement.getFields(),
                    numFields: number = updateExpressions.length,
                    fieldName: string,
                    newValue: JQLPrimitive;

                for ( let i=0, len = this.markedRowsForUpdate.length; i<len; i++ ) {

                    updateRow.withIndex( this.markedRowsForUpdate[i].rowIndex ).withRowData( this.markedRowsForUpdate[i].values );

                    for ( let j=0; j<numFields; j++ ) {

                        fieldName = updateExpressions[j].getFieldName();

                        newValue = updateExpressions[j].getExpression().compute( updateRow );

                        updateRow.setColumnValue( fieldName, newValue );


                    }

                    table.replace( this.markedRowsForUpdate[i].rowIndex, updateRow.getDataAsArray() );

                }

                defer.resolve( result );

            }).promise();
        }
    }

    private applySorting() {

        let sorter = this.statement.getSorter(),
            table = <JQLTableInMemory>this.db.getTable(this.statement.getTable().getName());

        if (!sorter || this.markedRowsForUpdate.length < 2) {
            return;
        }

        if (sorter.isRandom()) {
            return JQLUtils.shuffleArray(this.markedRowsForUpdate);
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

        this.markedRowsForUpdate.sort(sortFunction);

    }

    private applyLimits() {

        let limit = this.statement.getLimit();

        if (!limit) {
            return;
        }

        this.markedRowsForUpdate = this.markedRowsForUpdate.slice(limit.getSkip(), limit.getSkip() + limit.getLimit());

    }

}