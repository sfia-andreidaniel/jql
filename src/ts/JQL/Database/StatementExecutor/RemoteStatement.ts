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
            throw new Error("Object expected!");
        }

        if (undefined === serverResponse.resultType) {
            throw new Error("Property \"resultType\" expected!");
        }

        switch (serverResponse.resultType) {

            case EJQL_LEXER_STATEMENT_TYPES.SELECT:

                let selectResult = new JQLStatementResultSelect();
                selectResult.addRows(serverResponse.rows);
                return selectResult;

            case EJQL_LEXER_STATEMENT_TYPES.UPDATE:

                let updateResult = new JQLStatementResult();
                updateResult.withAffectedRows(parseInt(serverResponse.affectedRows) || 0);
                return updateResult;

            case EJQL_LEXER_STATEMENT_TYPES.INSERT:

                let insertResult = new JQLStatementResultInsert();
                insertResult.withLastInsertId(parseInt(serverResponse.lastInsertId) || 0);
                insertResult.withAffectedRows(1);
                return insertResult;

            case EJQL_LEXER_STATEMENT_TYPES.DELETE:

                let deleteResult = new JQLStatementResult();
                deleteResult.withAffectedRows(parseInt(serverResponse.affectedRows) || 0);
                return deleteResult;

            default:
                throw new Error("Invalid server response resultType: " + JSON.stringify(serverResponse.resultType));
        }

    }
}