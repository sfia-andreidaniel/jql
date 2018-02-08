class JQLTableStorageEngineInMemory extends JQLTable {

    protected rows: JQLPrimitive[][] = [];

    private lastTransactionSnapshot: string;

    constructor(identifiers: IJQLTableColumn[], rows: JQLPrimitive[][], indexes?: IJQLTableIndexDescriptor[]) {

        super(identifiers);

        for (let i = 0, len = rows.length; i < len; i++) {
            this.rows.push(rows[ i ]);
        }

        if (indexes) {

            if (!Array.isArray(indexes)) {
                throw new Error("Invalid class constructor argument: indexes: Expected array!");
            }

            for (let i = 0, len = indexes.length; i < len; i++) {
                this.withSingleColumnIndex(indexes[ i ]);
            }

            this.reIndex();
        }

    }

    public isRemote(): boolean {
        return false;
    }

    public getStorageEngine(): EJQLTableStorageEngine {
        return EJQLTableStorageEngine.IN_MEMORY;
    }

    public getRowAt(rowIndex: number): JQLPrimitive[] {
        return this.rows[ rowIndex ] || null;
    }

    public createIterator(): JQLTableUtilsIterator {
        return new JQLTableUtilsIterator(this);
    }

    public replace(index: number, newRow: JQLPrimitive[]) {

        if (this.rows[ index ]) {

            for (let i = 0, len = this.rows[ index ].length; i < len; i++) {
                this.rows[ index ][ i ] = newRow[ i ];
            }

        } else {
            throw new Error("Undefined table index: " + JSON.stringify(index));
        }

    }

    public deleteRow(rowIndex: number) {
        if (this.rows[ rowIndex ]) {
            this.rows[ rowIndex ] = null;
        }
    }

    public insertRow(row: JQLPrimitive[]) {

        if (!row || undefined === row.length) {
            throw new Error("Invalid argument row: array expected!");
        }

        if (row.length !== this.identifiers.length) {
            throw new Error("Row mismatch: Expected " + this.identifiers.length + " values, got " + row.length + " values!");
        }

        if (this.autoIncrementColumnIndex !== null) {

            if (null === row[ this.autoIncrementColumnIndex ]) {

                row[ this.autoIncrementColumnIndex ] = this.autoIncrementValue;

                this.autoIncrementValue++;
            }

        }

        this.rows.push(row);

    }

    public compact() {
        for (let i = this.rows.length - 1; i >= 0; i--) {
            if (null === this.rows[ i ]) {
                this.rows.splice(i, 1);
            }
        }
    }

    public isTransactional(): boolean {
        return true;
    }

    public startTransaction(): void {
        this.lastTransactionSnapshot = JSON.stringify(this.rows);
    }

    public commitTransaction(): void {
        if (this.lastTransactionSnapshot !== undefined) {
            this.lastTransactionSnapshot = undefined;
        } else {
            throw new Error("No transaction started before!\"");
        }
    }

    public rollbackTransaction() {
        if (this.lastTransactionSnapshot !== undefined) {
            this.rows = JSON.parse(this.lastTransactionSnapshot);
        } else {
            throw new Error("Failed to rollback transaction: No transaction started before!");
        }
    }

    public getNextAutoIncrementValue(): number {

        return this.autoIncrementValue + 1;

    }

    public setNextAutoIncrementValue(value: number) {

        if ("number" !== typeof value || !isFinite(value)) {
            throw new Error("Value is not finite!");
        }

        if (value % 1 !== 0) {
            throw new Error("Value must be integer!");
        }

        if (value < 1) {
            throw new Error("Value must be greater than 0!");
        }

        this.autoIncrementValue = value;

    }

    public alterIndexes( indexes: IJQLTableIndexDescriptor[] ): JQueryPromise<boolean> {
        // is handled by unfetched table
        return null;
    }

    public supportsIndexes(): boolean {
        return true;
    }

}