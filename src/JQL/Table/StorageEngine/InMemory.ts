class JQLTableStorageEngineInMemory extends JQLTable {

    private rows: JQLPrimitive[][] = [];

    private lastTransactionSnapshot: string;

    constructor( identifiers: IJQLTableColumn[], rows: JQLPrimitive[][] ) {

        super( identifiers );

        for ( let i=0, len = rows.length; i<len; i++ ) {

            this.rows.push( rows[i] );

        }

        for ( let idtf = identifiers || [], len = idtf.length, i = 0; i<len; i++ ) {

            if ( undefined !== idtf[i].unique ) {

                this.indexes.push( JQLTableIndex.createFromColumnIdentifier( this, idtf[i] ) );

            }

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

    public deleteRow( rowIndex: number ) {
        if ( this.rows[rowIndex] ) {
            this.rows[ rowIndex ] = null;
        }
    }

    public insertRow( row: JQLPrimitive[] ) {

        if ( !row || undefined === row.length ) {
            throw new Error('Invalid argument row: array expected!' );
        }

        if ( row.length !== this.identifiers.length ) {
            throw new Error('Row mismatch: Expected ' + this.identifiers.length + ' values, got ' + row.length + ' values!' );
        }

        this.rows.push( row );

    }

    public compact() {
        for ( let i = this.rows.length - 1; i>=0; i-- ) {
            if ( null === this.rows[i] ) {
                this.rows.splice(i, 1);
            }
        }
    }

    public isTransactional(): boolean {
        return true;
    }

    public startTransaction(): void {
        this.lastTransactionSnapshot = JSON.stringify( this.rows );
    }

    public commitTransaction(): void {
        if ( this.lastTransactionSnapshot !== undefined ) {
            this.lastTransactionSnapshot = undefined;
        } else {
            throw new Error('No transaction started before!"' );
        }
    }

    public rollbackTransaction() {
        if ( this.lastTransactionSnapshot !== undefined ) {
            this.rows = JSON.parse( this.lastTransactionSnapshot );
        } else {
            throw new Error('Failed to rollback transaction: No transaction started before!');
        }
    }

}