class UnfetchedTable implements IJQLTable {

    private identifiers: IJQLTableColumn[] = [];

    private remote: boolean;

    private storageEngine: EJQLTableStorageEngine;

    private db: JQLDatabase;

    private table: JQueryPromise<IJQLTable>;

    private name: string;

    constructor(definitions: IJQLBackendTableModel, db: JQLDatabase) {

        this.db = db;

        this.name = definitions.name;
        this.remote = definitions.storageEngine === EJQLTableStorageEngine.REMOTE;
        this.storageEngine = definitions.storageEngine;

        this.computeIdentifiers(definitions.schema);
    }

    public describe(): IJQLTableColumn[] {
        return this.identifiers;
    }

    public hasIdentifier(identifierName: string): boolean {
        for (let i = 0, len = this.identifiers.length; i < len; i++) {
            if (this.identifiers[ i ].name === identifierName) {
                return true;
            }
        }

        return false;
    }

    public isRemote(): boolean {
        return this.remote;
    }

    public fetch(): JQueryPromise<IJQLTable> {

        if (this.table) {
            return this.table;
        }

        if (!this.isRemote()) {

            this.table = (($: JQueryStatic, db: JQLDatabase): JQueryPromise<IJQLTable> => {

                return <any>$.Deferred((defer) => {

                    let fetchTableRequest = {
                        "action": "fetch-table",
                        "auth":   db.getAuthorizationToken(),
                        "name":   this.name,
                    };

                    $.ajax({
                        type: "POST",
                        url:  db.getRPCEndpointName(),
                        data: fetchTableRequest,
                    }).then(function (result) {

                        defer.resolve(
                            JQLTable.createFromInMemoryArrayOfObjects(
                                result,
                            ),
                        );

                    }).fail(function (e) {

                        defer.reject(e);

                    });

                }).promise();

            })(this.db.getJQuery(), this.db);

        } else {

            this.table = (($: JQueryStatic, db: JQLDatabase): JQueryPromise<IJQLTable> => {

                return <any>$.Deferred((defer) => {

                    defer.resolve(
                        JQLTable.createFromRemoteTableDefinition(this.describe()),
                    );

                }).promise();

            })(this.db.getJQuery(), this.db);

        }

        return this.table;
    }

    public getStorageEngine(): EJQLTableStorageEngine {
        return this.storageEngine;
    }

    private computeIdentifiers(schema: IJQLTableSchemaHashMap) {
        for (let identifierName in schema) {
            if (schema.hasOwnProperty(identifierName)) {
                this.identifiers.push({
                    name:          identifierName,
                    unique:        false,
                    autoIncrement: false,
                    type:          this.castBackendDataTypeToFrontendDataType(schema[ identifierName ]),
                    default:       null,
                });
            }
        }
    }

    private castBackendDataTypeToFrontendDataType(dataType: EJQLBackendTableColumnType): EJQLTableColumnType {
        switch (dataType) {
            case EJQLBackendTableColumnType.BOOLEAN:
                return EJQLTableColumnType.BOOLEAN;
            case EJQLBackendTableColumnType.FLOAT:
            case EJQLBackendTableColumnType.INT:
                return EJQLTableColumnType.NUMBER;
            case EJQLBackendTableColumnType.STRING:
                return EJQLTableColumnType.STRING;
            default:
                return EJQLTableColumnType.NULL;
        }
    }
}