class JQLTableIndexBackend extends JQLTableIndex {

    constructor(table: JQLTableStorageEngineInMemory, indexDescriptor: IJQLTableIndexDescriptor) {
        super(table, [indexDescriptor]);
    }

    public isUnique(): boolean {
        return true;
    }

    public isAutoIncrement(): boolean {
        return null;
    }

    public getNextAutoIncrementValue(): number {
        return null;
    }

    public index() {
    }

}