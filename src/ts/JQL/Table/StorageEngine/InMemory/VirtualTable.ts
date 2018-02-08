class JQLTableStorageEngineInMemoryVirtualTable extends JQLTableStorageEngineInMemory {

    constructor(identifiers: IJQLTableColumn[]) {
        super(identifiers, [], undefined);
    }

    public createRow(): JQLTableStorageEngineInMemoryVirtualRow {
        let result = new JQLTableStorageEngineInMemoryVirtualRow(this);
        this.rows.push(<any>result);
        return result;
    }

    public withSingleColumnIndex(indexDescriptor: IJQLTableIndexDescriptor): this {
        throw new Error("Cannot add indexes on virtual tables!");
    }

    public replace(index: number, newRow: JQLPrimitive[]) {
        throw new Error('Cannot replace rows on virtual tables!');
    }

    public insertRow(row: any) {
        throw new Error('Cannot insert rows on virtual tables!');
    }

    public deleteRow(rowIndex: number) {
        throw new Error('Cannot delete rows from virtual tables!');
    }

    public isTransactional(): boolean {
        return false;
    }

    public startTransaction(): void {
        throw new Error('Transactions are not supported on virtual tables!');
    }

    public commitTransaction(): void {
        throw new Error('Transactions are not supported on virtual tables!');
    }

    public rollbackTransaction(): void {
        throw new Error('Transactions are not supported on virtual tables!');
    }

    public getNextAutoIncrementValue(): number {
        return 1;
    }

    public supportsIndexes(): boolean {
        return false;
    }
}