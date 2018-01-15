class JQLDatabaseStatementExecutorRemoteStatement implements IDatabaseStatementExecutor {

    private statement: JQLStatement;

    private db: JQLDatabase;

    constructor( statement: JQLStatement, db: JQLDatabase ) {
        this.statement = statement;
        this.db = db;
    }

    public execute(): IJQLQueryExecuteStrategy {
        return (): JQueryDeferred<JQLStatementResult> => {
            return <any>this.db.getJQuery().Deferred(( defer ) => {
                defer.reject(new Error('REMOTE statements not implemented!'));
            } ).promise();
        }
    }

}