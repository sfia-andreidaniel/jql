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

    public getRowAt( rowIndex: number ): JQLPrimitive[] {
        return this.rows[ rowIndex ] || null;
    }

    public createIterator(): JQLTableUtilsIterator {
        return new JQLTableUtilsIterator(this);
    }

    public replace( index: number, newRow: JQLPrimitive[] ) {

        if ( this.rows[ index ] ) {

            for ( let i=0, len = this.rows[index].length; i<len; i++ ) {
                this.rows[index][i] = newRow[i];
            }

        } else {
            throw new Error('Undefined table index: ' + JSON.stringify( index ) );
        }

    }

}