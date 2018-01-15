class JQLTableInMemory extends JQLTable {

    private rows: JQLPrimitive[][] = [];

    constructor( identifiers: IJQLTableColumn[], rows: JQLPrimitive[][] ) {

        super( identifiers );

        for ( let i=0, len = rows.length; i<len; i++ ) {
            this.rows.push( rows[i] );
        }

    }

    public isRemote(): boolean {
        return false;
    }

    public getStorageEngine(): EJQLTableStorageEngine {
        return EJQLTableStorageEngine.IN_MEMORY;
    }

}