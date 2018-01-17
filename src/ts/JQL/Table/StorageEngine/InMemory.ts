class JQLTableStorageEngineInMemory extends JQLTable {

    private rows: JQLPrimitive[][] = [];

    private lastTransactionSnapshot: string;

    private autoIncrementColumnIndex: number = null;

    private autoIncrementValue: number = 1;

    constructor(identifiers: IJQLTableColumn[], rows: JQLPrimitive[][]) {

        super(identifiers);

        for (let i = 0, len = rows.length; i < len; i++) {

            this.rows.push(rows[i]);

        }

        let index: JQLTableIndex,
            numberOfAutoIncrementIndexes: number = 0;

        for (let idtf = identifiers || [], len = idtf.length, i = 0; i < len; i++) {

            if ((undefined !== idtf[i].unique && idtf[i].unique) || (undefined !== idtf[i].autoIncrement && idtf[i].autoIncrement)) {

                index = JQLTableIndex.createFromColumnIdentifier(this, idtf[i]);

                if (index.isAutoIncrement()) {

                    numberOfAutoIncrementIndexes++;

                    if (index.getColumns().length > 1) {
                        throw new Error('Auto-increment indexes must refer to a single column only!');
                    }

                    if (numberOfAutoIncrementIndexes > 1) {
                        throw new Error('There can be only a single auto-increment index!');
                    }

                    if (index.getColumns()[0].type !== EJQLTableColumnType.NUMBER) {
                        throw new Error('Auto-increment index column type must be NUMBER!');
                    }

                    if (!index.isUnique()) {
                        throw new Error('Auto-increment indexes must be unique!');
                    }

                    this.autoIncrementColumnIndex = i;

                }

                this.indexes.push(index);

            }

        }

        this.reIndex();

    }

    public isRemote(): boolean {
        return false;
    }

    public getStorageEngine(): EJQLTableStorageEngine {
        return EJQLTableStorageEngine.IN_MEMORY;
    }

    public getRowAt(rowIndex: number): JQLPrimitive[] {
        return this.rows[rowIndex] || null;
    }

    public createIterator(): JQLTableUtilsIterator {
        return new JQLTableUtilsIterator(this);
    }

    public replace(index: number, newRow: JQLPrimitive[]) {

        if (this.rows[index]) {

            for (let i = 0, len = this.rows[index].length; i < len; i++) {
                this.rows[index][i] = newRow[i];
            }

        } else {
            throw new Error('Undefined table index: ' + JSON.stringify(index));
        }

    }

    public deleteRow(rowIndex: number) {
        if (this.rows[rowIndex]) {
            this.rows[rowIndex] = null;
        }
    }

    public insertRow(row: JQLPrimitive[]) {

        if (!row || undefined === row.length) {
            throw new Error('Invalid argument row: array expected!');
        }

        if (row.length !== this.identifiers.length) {
            throw new Error('Row mismatch: Expected ' + this.identifiers.length + ' values, got ' + row.length + ' values!');
        }

        if (this.autoIncrementColumnIndex !== null) {

            if (null === row[this.autoIncrementColumnIndex]) {

                row[this.autoIncrementColumnIndex] = this.autoIncrementValue;

                this.autoIncrementValue++;
            }

        }

        this.rows.push(row);

    }

    public compact() {
        for (let i = this.rows.length - 1; i >= 0; i--) {
            if (null === this.rows[i]) {
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
            throw new Error('No transaction started before!"');
        }
    }

    public rollbackTransaction() {
        if (this.lastTransactionSnapshot !== undefined) {
            this.rows = JSON.parse(this.lastTransactionSnapshot);
        } else {
            throw new Error('Failed to rollback transaction: No transaction started before!');
        }
    }

    public getNextAutoIncrementValue(): number {

        return this.autoIncrementValue + 1;

    }

    public setNextAutoIncrementValue(value: number) {

        if ('number' !== typeof value || !isFinite(value)) {
            throw new Error('Value is not finite!');
        }

        if (value % 1 !== 0) {
            throw new Error('Value must be integer!');
        }

        if (value < 1) {
            throw new Error('Value must be greater than 0!');
        }

        this.autoIncrementValue = value;

    }

}