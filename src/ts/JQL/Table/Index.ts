abstract class JQLTableIndex {

    protected descriptors: IJQLTableIndexDescriptor[];

    protected table: JQLTable;

    constructor( table: JQLTable, descriptors: IJQLTableIndexDescriptor[] ) {
        this.table = table;
        this.descriptors = ( descriptors || [] ).slice(0);
    }

    public getDescriptors(): IJQLTableIndexDescriptor[] {
        return this.descriptors;
    }

    public getTable(): JQLTable {
        return this.table;
    }

    public static createFromIndexDescriptor(table: IJQLTable, indexDescriptor: IJQLTableIndexDescriptor ): JQLTableIndex {

        if ( table.getStorageEngine() === EJQLTableStorageEngine.IN_MEMORY ) {

            return new JQLTableIndexSingleColumn( <JQLTableStorageEngineInMemory>table, indexDescriptor );

        } else {

            throw new Error('Backend-side table indexes not supported!');

        }


    }

    public abstract isUnique(): boolean;

    public abstract isAutoIncrement(): boolean;

    public abstract getNextAutoIncrementValue(): number;

    /**
     * @throws Error if index cannot be performed.
     */
    public abstract index();

}