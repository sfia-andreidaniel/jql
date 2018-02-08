class UnfetchedTable implements IJQLTable {

    private identifiers: IJQLTableColumn[] = [];

    private indexes: IJQLTableIndexDescriptor[] = [];

    private remote: boolean;

    private storageEngine: EJQLTableStorageEngine;

    private db: JQLDatabase;

    private table: JQueryPromise<IJQLTable>;

    private name: string;

    private deferredTable: IJQLTable = null;

    constructor(definitions: IJQLBackendTableModel, db: JQLDatabase) {

        this.db = db;

        this.name = definitions.name;
        this.remote = definitions.storageEngine === EJQLTableStorageEngine.REMOTE;
        this.storageEngine = definitions.storageEngine;

        this.computeIdentifiers(definitions.schema);
        this.computeIndexDescriptors(definitions.indexes);
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
                    }).then((result: JQLPrimitive[][]) => {

                        this.deferredTable = JQLTable.createFromInMemoryArrayOfObjects(
                            result,
                            this.identifiers,
                            this.indexes,
                        );

                        defer.resolve(
                            this.deferredTable,
                        );

                    }).fail(function (e) {

                        defer.reject(e);

                    });

                }).promise();

            })(this.db.getJQuery(), this.db);

        } else {

            this.table = (($: JQueryStatic): JQueryPromise<IJQLTable> => {

                return <any>$.Deferred((defer) => {

                    this.deferredTable = JQLTable.createFromRemoteTableDefinition(this.describe(), this.indexes);

                    defer.resolve(
                        this.deferredTable,
                    );

                }).promise();

            })(this.db.getJQuery());

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
                    name:    identifierName,
                    type:    UnfetchedTable.castBackendDataTypeToFrontendDataType(schema[ identifierName ]),
                    default: null,
                });
            }
        }
    }

    private computeIndexDescriptors(indexes: IJQLTableIndexDescriptor[]) {
        if (indexes) {

            if (!Array.isArray(indexes)) {
                throw new Error("Invalid argument: indexes: array expected!");
            }

            for (let i = 0, len = indexes.length; i < len; i++) {
                this.indexes.push(indexes[ i ]);
            }

        }
    }

    private static castBackendDataTypeToFrontendDataType(dataType: EJQLBackendTableColumnType): EJQLTableColumnType {
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

    public getIndexes(): JQLTableIndex[] {

        if (this.deferredTable) {
            return this.deferredTable.getIndexes();
        }

        let result: JQLTableIndex[] = [];

        for (let i = 0, len = (this.indexes || []).length; i < len; i++) {
            result.push(JQLTableIndex.createFromIndexDescriptor(this, this.indexes[ i ]));
        }

        return result;

    }

    public alterIndexes(indexes: IJQLTableIndexDescriptor[]): JQueryPromise<boolean> {

        return (($: JQueryStatic) => {

            return <any>$.Deferred((defer) => {

                this.db.alterTableIndexes(this.name, indexes).then((tableModel: IJQLBackendTableModel) => {
                    this.deferredTable = null;
                    this.indexes = tableModel.indexes;
                    defer.resolve(true);
                }).fail((e: Error) => {
                    defer.reject(e);
                });

            }).promise();


        })(this.db.getJQuery());
    }

    public isIndexable(): boolean {

        if (this.deferredTable) {
            return this.deferredTable.isIndexable();
        }

        return true;
    }

    public isVirtual(): boolean {

        if (this.deferredTable) {
            return this.deferredTable.isVirtual();
        }

        return false;
    }

    public isTransactional(): boolean {

        if (this.deferredTable) {
            return this.deferredTable.isTransactional();
        }

        return true;
    }
}