abstract class JQLTable implements IJQLTable {

    protected identifiers: IJQLTableColumn[] = [];

    private emptyRow: JQLPrimitive[] = [];

    protected indexes: JQLTableIndex[] = [];

    constructor(identifiers: IJQLTableColumn[]) {

        for (let i = 0, idtf = identifiers || [], len = idtf.length; i < len; i++) {

            this.identifiers.push(idtf[ i ]);

            if (undefined !== idtf[ i ].default) {

                this.emptyRow.push(idtf[ i ].default);

            } else {

                switch (identifiers[ i ].type) {

                    case EJQLTableColumnType.NULL:
                        this.emptyRow.push(null);
                        break;

                    case EJQLTableColumnType.NUMBER:
                        this.emptyRow.push(0);
                        break;

                    case EJQLTableColumnType.STRING:
                        this.emptyRow.push("");
                        break;

                    case EJQLTableColumnType.BOOLEAN:
                        this.emptyRow.push(false);
                        break;

                    default:
                        this.emptyRow.push(null);

                }

            }

        }
    }

    public describe(): IJQLTableColumn[] {
        return this.identifiers.slice(0);
    }

    public hasIdentifier(identifierName: string): boolean {

        for (let i = 0, len = this.identifiers.length; i < len; i++) {
            if (this.identifiers[ i ].name === identifierName) {
                return true;
            }
        }

        return false;
    }

    public abstract isRemote(): boolean;

    public abstract getStorageEngine(): EJQLTableStorageEngine;

    public static createFromInMemoryArrayOfObjects(rows: object[], columnDefinitions?: IJQLTableColumn[]): JQLTable {

        let identifiers              = undefined === columnDefinitions
            ? JQLUtils.getColumnDefinitions(rows)
            : columnDefinitions,

            result: JQLPrimitive[][] = [],
            ncols: number            = identifiers.length,
            row: JQLPrimitive[],
            v: JQLPrimitive,
            vType: EJQLTableColumnType;

        if (!identifiers.length) {

            throw new Error("No valid columns were detected in \"in-memory\" array!");

        }

        for (let i = 0, len = rows.length; i < len; i++) {

            row = [];

            for (let col = 0; col < ncols; col++) {

                v = rows[ i ][ identifiers[ col ].name ];

                vType = JQLUtils.getType(v);

                if (vType === null || vType !== identifiers[ col ].type) {
                    v = null;
                }

                row.push(v);

            }

            result.push(row);

        }

        return new JQLTableStorageEngineInMemory(identifiers, result);

    }

    public static createFromRemoteTableDefinition(columns: IJQLTableColumn[]): JQLTable {
        return new JQLTableStorageEngineRemote(columns);
    }

    public createEmptyRow(): JQLPrimitive[] {
        return this.emptyRow.slice(0);
    }

    public getIndexes(): JQLTableIndex[] {
        return this.indexes;
    }

    public reIndex() {

        for (let i = 0, len = this.indexes.length; i < len; i++) {

            this.indexes[ i ].index();

            if (this.indexes[ i ].isAutoIncrement()) {

                this.setNextAutoIncrementValue(this.indexes[ i ].getNextAutoIncrementValue());

            }
        }

    }

    public fetch(): JQueryPromise<IJQLTable> {
        let $ = jQuery;
        return <any>$.Deferred((defer) => {
            defer.resolve(this);
        }).promise();
    }

    public abstract isTransactional(): boolean;

    public abstract startTransaction();

    public abstract commitTransaction();

    public abstract rollbackTransaction();

    public abstract getNextAutoIncrementValue(): number;

    public abstract setNextAutoIncrementValue(nextAutoIncrementValue: number);

}