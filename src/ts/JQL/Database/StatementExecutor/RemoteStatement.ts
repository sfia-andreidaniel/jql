class JQLDatabaseStatementExecutorRemoteStatement implements IDatabaseStatementExecutor {

    private statement: JQLStatement;

    private db: JQLDatabase;

    constructor(statement: JQLStatement, db: JQLDatabase) {
        this.statement = statement;
        this.db = db;
    }

    public execute(): IJQLQueryExecuteStrategy {

        return (): JQueryDeferred<JQLStatementResult> => {

            return <any>this.db.getJQuery().Deferred((defer) => {

                if (this.statement.getStatementType() !== EJQL_LEXER_STATEMENT_TYPES.SELECT) {
                    defer.reject(new Error("Only select statements can be sent to backend!"));
                    return;
                }

                let rpcEndpointName: string = this.db.getRPCEndpointName(),
                    query: IStringMap       = {
                        //"action":   "query",
                        "auth":     this.db.getAuthorizationToken(),
                        "query":    btoa(JSON.stringify(this.statement.getTokenizedStatement())),
                        "bindings": btoa(JSON.stringify(this.statement.getBindingData())),
                    };

                this.db.getJQuery().ajax({
                    url:      this.db.getRPCEndpointName() + "?action=query",
                    type:     "POST",
                    dataType: "json",
                    data:     query,
                }).then(function( result: any ){

                    console.log( "REMOTE: " + JSON.stringify(result) );

                }).fail(function(e){

                    console.error('args: ', arguments);

                    defer.reject(e);

                });

            }).promise();
        };
    }

}