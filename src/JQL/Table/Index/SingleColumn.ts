class JQLTableIndexSingleColumn extends JQLTableIndex {

    private unique: boolean;

    private values: JQLPrimitive[];

    constructor( table: JQLTableStorageEngineInMemory, column: IJQLTableColumn ) {
        super( table, [ column ] );
        this.unique = !!column.unique;
    }

    public isUnique(): boolean {
        return this.unique;
    }

    public index() {

        this.values = [];

        let row: IJQLTableRow,
            iterator = (<JQLTableStorageEngineInMemory>this.table).createIterator(),
            value: JQLPrimitive;

        while ( row = iterator.next() ) {

            if ( this.values.indexOf( value = row.getColumnValue( this.columns[0].name ) ) > -1 ) {
                throw new Error('Duplicate key ' + JSON.stringify( this.columns[0].name ) + ' found with value ' + JSON.stringify( value ) + ' found!' );
            } else {
                this.values.push( value );
            }

        }

    }

}