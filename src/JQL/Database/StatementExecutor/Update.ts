class JQLDatabaseStatementExecutorUpdate implements IDatabaseStatementExecutor {

    private statement: JQLStatementUpdate;

    private db: JQLDatabase;

    constructor(statement: JQLStatementUpdate, db: JQLDatabase) {
        this.statement = statement;
        this.db = db;
    }

    public execute(): IJQLQueryExecuteStrategy {
        return (): JQueryDeferred<JQLStatementResult> => {
            return <any>this.db.getJQuery().Deferred(( defer ) => {
                defer.reject(new Error('UPDATE statements not implemented!'));
            } ).promise();
        }
    }
}