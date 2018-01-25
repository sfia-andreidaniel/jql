class UnfetchedTable implements IJQLTable {

    private identifiers: IJQLTableColumn[] = [];

    private remote: boolean;

    private storageEngine: EJQLTableStorageEngine;

    private db: JQLDatabase;

    constructor(definitions: IJQLBackendTableModel, db: JQLDatabase) {

        this.db = db;

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
        return <any>this.db.getJQuery().Deferred((defer) => {
            defer.reject(new Error("Not implemented!"));
        }).promise();
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