/**
 * @triggers:
 *      "schema-changed" () - When a table is added or removed
 */
class JQLDatabase extends EventEmitter implements IJQLDatabase, EventEmitterInterface {

    private functions: IJQLFunctionHashMap = {};

    private tables: IJQLTableHashMap = {};

    private jq: JQueryStatic;

    private planner: JQLDatabaseQueryPlanner;

    private authorizationToken: string;

    private rpcEndpointName: string;

    private bindingProviders: IQueryBindingProvider[] = [];

    public withJQuery(jq: JQueryStatic): this {
        this.jq = jq;
        this.planner = new JQLDatabaseQueryPlanner(this);
        return this;
    }

    public getJQuery(): JQueryStatic {
        return this.jq;
    }

    public withAuthorizationToken(authorizationToken: string): this {
        this.authorizationToken = authorizationToken;
        return this;
    }

    public getAuthorizationToken(): string {
        return this.authorizationToken;
    }

    public withRPCEndpointName(rpcEndpointName: string): this {
        this.rpcEndpointName = rpcEndpointName;
        return this;
    }

    public getRPCEndpointName(): string {
        return this.rpcEndpointName;
    }

    private isValidIdentifierName(identifier: string): boolean {
        return "string" === typeof identifier && /^[a-zA-Z$_][a-zA-Z0-9_$]+$/.test(identifier);
    }

    public withFunction(functionName: string, func: IJQLDatabaseFunction): this {

        if (!this.isValidIdentifierName(functionName)) {
            throw new Error(JSON.stringify(functionName) + " is not a valid function name!");
        }

        functionName = functionName.toLowerCase();

        /**
         * IF FUNCTION NAME IS A RESERVED KEYWORD, ABORT
         */
        if (JQLUtils.isReservedKeyword(functionName)) {
            throw new Error(JSON.stringify(functionName) + " is a reserved keyword and cannot be used as a function name!");
        }

        if (undefined !== this.functions[ functionName ]) {
            throw new Error("Function " + JSON.stringify(functionName) + " already registered in database!");
        }

        this.functions[ functionName ] = func;

        return this;
    }

    public hasFunction(functionName: string): boolean {

        if ("string" === typeof functionName) {

            functionName = functionName.toLowerCase();

            if (undefined !== this.functions[ functionName ] && this.functions.hasOwnProperty(functionName)) {
                return true;
            }

        }

        return false;

    }

    public callFunction(functionName: string, functionArgs: JQLPrimitive[]): JQLPrimitive {
        if (this.hasFunction(functionName)) {
            return this.functions[ functionName.toLowerCase() ].apply(this, functionArgs);
        } else {
            throw new Error("Failed to call function " + JSON.stringify(functionName) + ": Function not defined!");
        }
    }

    public getFunction(functionName: string): IJQLDatabaseFunction {
        if (this.hasFunction(functionName)) {
            return this.functions[ functionName ];
        } else {
            throw new Error("Failed to get function " + JSON.stringify(functionName) + ": Function not defined!");
        }
    }

    private withTable(tableName: string, table: IJQLTable): this {

        if (!this.isValidIdentifierName(tableName)) {
            throw new Error(JSON.stringify(tableName) + " is not a valid table name!");
        }

        if (undefined !== this.tables[ tableName ]) {
            throw new Error("Table " + JSON.stringify(tableName) + " already created!");
        }

        this.tables[ tableName ] = table;

        return this;

    }

    public withTablesList(tables: IJQLBackendTableModel[]): this {

        for (let i = 0, len = tables.length; i < len; i++) {
            this.withTable(tables[ i ].name, new UnfetchedTable(tables[ i ], this));
        }

        if (tables && tables.length) {
            this.trigger("schema-changed");
        }

        return this;
    }

    public hasTable(tableName: string): boolean {
        return "string" === typeof tableName && undefined !== this.tables[ tableName ] && this.tables.hasOwnProperty(tableName);
    }

    public enumerateTables(): IJQLTableDescriptor[] {

        let result: IJQLTableDescriptor[] = [];

        for (let tableName in this.tables) {
            if (this.tables.hasOwnProperty(tableName)) {
                result.push({
                    name:     tableName,
                    instance: this.tables[ tableName ],
                });
            }
        }

        return result;
    }

    public getTable(tableName: string): IJQLTable {

        if (this.hasTable(tableName)) {
            return this.tables[ tableName ];
        } else {
            throw new Error("Table " + JSON.stringify(tableName) + " does not exist!");
        }

    }

    public createStatement(statement: string): JQLStatement {

        if (!statement || "string" !== typeof statement) {
            throw new Error("Invalid argument: statement: string expected!");
        }

        let stmt = <JQLStatement>JQLLexerFactory.create(
            JQLGrammar.parse(
                statement,
            ),
        );

        let tableReference = stmt.getTable();

        if (tableReference) {

            if (!this.hasTable(tableReference.getName())) {

                throw new Error(
                    "Failed to create statement: Table " + JSON.stringify(tableReference.getName()) + " does not exist!",
                );

            }

            // TEST IF ALL STATEMENT IDENTIFIERS ARE DECLARED IN THE TABLE

            let table: IJQLTable                                = this.getTable(tableReference.getName()),
                statementIdentifiers: JQLExpressionIdentifier[] = stmt.getIdentifiers();

            for (let i = 0, len = statementIdentifiers.length; i < len; i++) {
                if (!table.hasIdentifier(statementIdentifiers[ i ].getIdentifierName())) {
                    throw new Error("Unknown table identifier " + JSON.stringify(statementIdentifiers[ i ].getIdentifierName()));
                }
            }

            // IF THE STATEMENT REMOTE FLAG DOES NOT MATCH WITH THE TABLE REMOTE FLAG, RAISE ERROR
            if (table.isRemote() !== stmt.isRemote()) {

                if (stmt.isRemote()) {

                    throw new Error("Cannot create remote statement affecting in-memory table!");

                } else {

                    throw new Error("Cannot create in-memory statement affecting remote table!");

                }

            }

        } else {

            // A STATEMENT WITHOUT TABLE CANNOT HAVE IDENTIFIERS

            if (stmt.getIdentifiers().length) {

                throw new Error("A statement which does not affect a table cannot have identifiers!");

            }

        }

        // TEST IF ALL THE FUNCTIONS OF THE STATEMENT ARE REGISTERED

        let statementFunctions: JQLExpressionFunctionCall[] = stmt.getFunctions();

        for (let i = 0, len = statementFunctions.length; i < len; i++) {

            if (!this.hasFunction(statementFunctions[ i ].getFunctionName())) {

                throw new Error(
                    "Failed to create statement: Function " + JSON.stringify(statementFunctions[ i ].getFunctionName()) + " is not declared!",
                );

            } else {

                statementFunctions[ i ].withDatabase(this);

            }

        }

        return stmt;

    }

    public executeStatement(statement: JQLStatement, bindings?: IJQLBindData): JQueryPromise<JQLStatementResult> {

        try {

            statement.bind(bindings || {}, this);

            return this.planner.scheduleStatement(statement, this.createExecutionStrategy(statement));

        }
        catch (e) {

            return <any>this.jq.Deferred(function (deferred) {
                deferred.reject(e);
            }).promise();

        }

    }

    private createExecutionStrategy(statement: JQLStatement): IJQLQueryExecuteStrategy {

        if (!statement.isRemote()) {

            switch (statement.getStatementType()) {

                case EJQL_LEXER_STATEMENT_TYPES.SELECT:
                    return (new JQLDatabaseStatementExecutorSelect(<JQLStatementSelect>statement, this)).execute();

                case EJQL_LEXER_STATEMENT_TYPES.INSERT:
                    return (new JQLDatabaseStatementExecutorInsert(<JQLStatementInsert>statement, this)).execute();

                case EJQL_LEXER_STATEMENT_TYPES.UPDATE:
                    return (new JQLDatabaseStatementExecutorUpdate(<JQLStatementUpdate>statement, this)).execute();

                case EJQL_LEXER_STATEMENT_TYPES.DELETE:
                    return (new JQLDatabaseStatementExecutorDelete(<JQLStatementDelete>statement, this)).execute();

                default:
                    throw new Error("Failed to create execution strategy: Uknown statement type!");
            }

        } else {

            return (new JQLDatabaseStatementExecutorRemoteStatement(statement, this)).execute();

        }

    }

    public createTableFromCSVFile(request: IJQLCreateTableFromCSVFileRequest) {

        let data = new FormData();

        data.append("action", "create-table-from-csv");
        data.append("auth", this.authorizationToken);
        data.append("csvFile", request.csvFile || "");
        data.append("setting", btoa(JSON.stringify({
            table:     {
                name:          request.tableName,
                namespace:     request.tableNamespace,
                accessMode:    request.tableAccessMode,
                storageEngine: request.tableStorageEngine,
            },
            csvParser: {
                enclosure:        JQLUtils.parseString(request.csvFieldEnclosure),
                encloseAllFields: request.csvEncloseAllFields,
                delimiter:        JQLUtils.parseString(request.csvFieldDelimiter),
                escapeCharacter:  JQLUtils.parseString(request.csvEscapeCharacter),
                autoTrim:         request.csvAutoTrim,
                lineTerminator:   JQLUtils.parseString(request.csvLineTerminator),
            },
        })));

        return (function ($: JQueryStatic, self: JQLDatabase) {

            return $.Deferred(function (defer) {

                $.ajax({
                    url:         self.rpcEndpointName,
                    data:        data,
                    type:        "POST",
                    dataType:    "json",
                    processData: false,
                    contentType: false,
                }).then(function (response: IJQLBackendTableModel) {

                    self.withTablesList([ response ]);

                    defer.resolve(response);

                }).fail(function (e) {

                    defer.reject(e);

                });


            }).promise();


        })(this.jq, this);
    }

    public dropTable(tableName: string): JQueryPromise<boolean> {

        return <any>(function ($: JQueryStatic, self: JQLDatabase) {

            return $.Deferred(function (defer) {

                if (!self.hasTable(tableName)) {
                    defer.reject(new Error("Table " + JSON.stringify(tableName) + " not found!"));
                    return;
                }

                $.ajax({
                    url:      self.rpcEndpointName,
                    data:     {
                        action: "drop-table",
                        auth:   self.authorizationToken,
                        name:   tableName,
                    },
                    type:     "POST",
                    dataType: "json",
                }).then(function (response: boolean) {

                    delete self.tables[ tableName ];

                    self.trigger("schema-changed");

                    defer.resolve(response);

                }).fail(function (e) {

                    defer.reject(e);

                });

            }).promise();


        })(this.jq, this);

    }

    public alterTableIndexes(tableName: string, indexes: IJQLTableIndexDescriptor[]): JQueryPromise<IJQLBackendTableModel> {

        return <any>(($: JQueryStatic, self: JQLDatabase) => {

            return $.Deferred((defer) => {

                if (!self.hasTable(tableName)) {
                    defer.reject(new Error("Table " + JSON.stringify(tableName) + " not found!"));
                    return;
                }

                $.ajax({
                    url:      self.rpcEndpointName,
                    data:     {
                        action:  "alter-table-indexes",
                        auth:    self.authorizationToken,
                        name:    tableName,
                        indexes: btoa(JSON.stringify(indexes || null)),
                    },
                    type:     "POST",
                    dataType: "json",
                }).then(function (response: IJQLBackendTableModel) {

                    defer.resolve(response);

                    self.trigger("schema-changed");

                }).fail(function (e) {

                    defer.reject(e);

                });

            }).promise();

        })(this.jq, this);

    }

    public autoBind(bindingName: string, jqlExpressionBinding: JQLExpressionBinding): boolean {

        for (let i = 0, len = this.bindingProviders.length; i < len; i++) {

            if (this.bindingProviders[ i ].canBind(bindingName)) {

                jqlExpressionBinding.bind(this.bindingProviders[ i ].getBindedValue(bindingName));

                return true;

            }

        }

        return false;

    }

    public withAutoBindingProvider(provider: IQueryBindingProvider): this {
        this.bindingProviders.push(provider);
        return this;
    }
}