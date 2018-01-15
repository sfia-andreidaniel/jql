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
                defer.reject(new Error('INSERT statements not implemented!'));
            } ).promise();
        }
    }
}