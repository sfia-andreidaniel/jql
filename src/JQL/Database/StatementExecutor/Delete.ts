class JQLDatabaseStatementExecutorDelete implements IDatabaseStatementExecutor {

    private statement: JQLStatementDelete;

    private db: JQLDatabase;

    constructor(statement: JQLStatementDelete, db: JQLDatabase) {
        this.statement = statement;
        this.db = db;
    }

    public execute(): IJQLQueryExecuteStrategy {
        return (): JQueryDeferred<JQLStatementResult> => {
            return <any>this.db.getJQuery().Deferred(( defer ) => {
                defer.reject(new Error('DELETE statements not implemented!'));
            } ).promise();
        }
    }
}