abstract class JQLTableIndex {

    protected columns: IJQLTableColumn[];

    protected table: JQLTable;

    constructor( table: JQLTable, columns: IJQLTableColumn[] ) {
        this.table = table;
        this.columns = ( columns || [] ).slice(0);
    }

    public getColumns(): IJQLTableColumn[] {
        return this.columns;
    }

    public getTable(): JQLTable {
        return this.table;
    }

    public static createFromColumnIdentifier( table: JQLTable, column: IJQLTableColumn ): JQLTableIndex {

        if ( table.getStorageEngine() === EJQLTableStorageEngine.IN_MEMORY ) {

            return new JQLTableIndexSingleColumn( <JQLTableStorageEngineInMemory>table, column );

        } else {

            throw new Error('Backend-side table indexes not supported!');

        }


    }

    public abstract isUnique(): boolean;

    /**
     * @throws Error if index cannot be performed.
     */
    public abstract index();



}