class JQLTableUtilsIterator {

    private table: JQLTableInMemory;

    private index: number = 0;

    private row: JQLRow;

    constructor( table: JQLTableInMemory ) {
        this.table = table;
        this.row = new JQLRow(table.describe(), null, null);
    }

    public next(): JQLRow {

        let data: JQLPrimitive[] = this.table.getRowAt(this.index);

        if ( null === data ) {
            return null;
        }

        this.row.withIndex( this.index );

        this.row.withRowData( data );

        this.index++;

        return this.row;

    }
}