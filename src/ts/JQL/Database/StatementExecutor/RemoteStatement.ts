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
                    query: IStringMap = {
                        //"action":   "query",
                        "auth": this.db.getAuthorizationToken(),
                        "query": btoa(JSON.stringify(this.statement.getTokenizedStatement())),
                        "bindings": btoa(JSON.stringify(this.statement.getBindingData())),
                    };

                this.db.getJQuery().ajax({
                    url: this.db.getRPCEndpointName() + "?action=query",
                    type: "POST",
                    dataType: "json",
                    data: query,
                }).then((result: object) => {

                    defer.resolve(this.createStatementResult(result));

                }).fail(function (e) {

                    console.error("args: ", arguments);

                    defer.reject(e);

                });

            }).promise();
        };
    }

    private createStatementResult(serverResponse: any): JQLStatementResult {

        if (!(serverResponse instanceof Object)) {
            throw new Error('Object expected!');
        }

        if (undefined === serverResponse.resultType) {
            throw new Error('Property "resultType" expected!');
        }

        switch (serverResponse.resultType) {

            case EJQL_LEXER_STATEMENT_TYPES.SELECT:

                let result = new JQLStatementResultSelect();
                result.addRows(serverResponse.rows);
                return result;

            case EJQL_LEXER_STATEMENT_TYPES.UPDATE:

                throw new Error('Update server response not implemented!');

            case EJQL_LEXER_STATEMENT_TYPES.INSERT:

                throw new Error('Insert server response not implemented!');

            case EJQL_LEXER_STATEMENT_TYPES.DELETE:

                throw new Error('Delete server response not implemented!');

            default:
                throw new Error('Invalid server response resultType: ' + JSON.stringify(serverResponse.resultType));
        }

    }
}