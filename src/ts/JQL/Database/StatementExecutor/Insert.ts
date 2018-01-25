class JQLDatabaseStatementExecutorInsert implements IDatabaseStatementExecutor {

    private statement: JQLStatementInsert;

    private db: JQLDatabase;

    constructor(statement: JQLStatementInsert, db: JQLDatabase) {
        this.statement = statement;
        this.db = db;
    }

    public execute(): IJQLQueryExecuteStrategy {
        return (): JQueryDeferred<JQLStatementResult> => {
            return <any>this.db.getJQuery().Deferred(( defer ) => {

                this.db.getTable(this.statement.getTable().getName())
                    .fetch()
                    .then((table: JQLTableStorageEngineInMemory) => {

                        if ( table.isTransactional() ) {
                            table.startTransaction();
                        }

                        try {

                            let row: JQLRow = JQLRow.createFromTable(table);

                            for (let i = 0, fields = this.statement.getFields(), len = fields.length; i < len; i++) {
                                row.setColumnValue(fields[i].getFieldName(), fields[i].getExpression().compute(row));
                            }

                            table.insertRow(row.getDataAsArray());

                            table.reIndex();

                            table.commitTransaction();

                            defer.resolve( (new JQLStatementResult()).withAffectedRows(1) );

                        } catch (e) {

                            if ( table.isTransactional() ) {
                                table.rollbackTransaction();
                            }

                            console.error(e);

                            defer.reject( new Error('Failed to execute INSERT statement' ) );

                        }

                    })
                    .fail((e) => {

                        console.error(e);

                        defer.reject(new Error('Failed to fetch table from server!'));

                    });


            } ).promise();
        }
    }
}