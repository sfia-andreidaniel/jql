class JQLDatabaseStatementExecutorSelect implements IDatabaseStatementExecutor {

    private statement: JQLStatementSelect;

    private db: JQLDatabase;

    constructor( statement: JQLStatementSelect, db: JQLDatabase ) {
        this.statement = statement;
        this.db = db;
    }

    execute(): IJQLQueryExecuteStrategy {
        return (): JQueryDeferred<JQLStatementResult> => {
            return <any>this.db.getJQuery().Deferred(( defer ) => {
                defer.reject(new Error('SELECT statements not implemented!'));
            } ).promise();
        }
    }

}