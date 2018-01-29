class JQLTableStorageEngineRemote extends JQLTable {

    constructor(identifiers: IJQLTableColumn[], indexes?: IJQLTableIndexDescriptor[]) {

        super( identifiers );

        if (indexes) {

            if (!Array.isArray(indexes)) {
                throw new Error("Invalid class constructor argument: indexes: Expected array!");
            }

            for (let i = 0, len = indexes.length; i < len; i++) {
                this.withSingleColumnIndex(indexes[ i ]);
            }

        }

    }

    public isRemote(): boolean {
        return true;
    }

    public getStorageEngine(): EJQLTableStorageEngine {
        return EJQLTableStorageEngine.REMOTE;
    }

    public isTransactional(): boolean {
        return false;
    }

    // REMOTE TABLES STORAGE ENGINES IMPLEMENT TRANSACTIONS BY THEMSELVES
    public startTransaction() {
        throw new Error('Operation handled by backend!');
    }

    // REMOTE TABLES STORAGE ENGINES IMPLEMENT TRANSACTIONS BY THEMSELVES
    public commitTransaction() {
        throw new Error('Operation handled by backend!');
    }

    // REMOTE TABLES STORAGE ENGINES IMPLEMENT TRANSACTIONS BY THEMSELVES
    public rollbackTransaction() {
        throw new Error('Operation handled by backend!');
    }

    // REMOTE TABLES STORAGE ENGINES IMPLEMENT AUTO_INCREMENT BY THEMSELVES
    public getNextAutoIncrementValue(): number {
        throw new Error('Operation handled by backend!');
    }

    // REMOTE TABLES STORAGE ENGINES IMPLEMENT AUTO_INCREMENT BY THEMSELVES
    public setNextAutoIncrementValue(nextAutoIncrementValue: number) {
        throw new Error('Operation handled by backend!');
    }

}