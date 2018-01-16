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

                try {

                    let table: JQLTableInMemory = <JQLTableInMemory>this.db.getTable(this.statement.getTable().getName()),
                        row: JQLRow = JQLRow.createFromTable(table);

                    for (let i = 0, fields = this.statement.getFields(), len = fields.length; i < len; i++) {
                        row.setColumnValue(fields[i].getFieldName(), fields[i].getExpression().compute(row));
                    }

                    table.insertRow(row.getDataAsArray());

                    defer.resolve( (new JQLStatementResult()).withAffectedRows(1) );

                } catch (e) {

                    console.error(e);

                    defer.reject( 'Failed to execute INSERT statement' );

                }

            } ).promise();
        }
    }
}