class JQLRow implements IJQLTableRow {

    private numColumns: number;

    private columns: { [ columnName: string ]: { type: EJQLTableColumnType, index: number } } = {};

    private data: JQLPrimitive[] = [];

    private columnIndex: number;

    constructor( columns: IJQLTableColumn[], data: JQLPrimitive[], index: number ) {

        this.numColumns = columns.length;

        for ( let i=0; i<this.numColumns; i++ ) {
            this.columns[ columns[i].name ] = { type: columns[i].type, index: i };
        }

        this.data = data;

        this.columnIndex = index;

    }

    public withIndex( index: number ): this {
        this.columnIndex = index;
        return this;
    }

    public withRowData( data: JQLPrimitive[] ): this {
        this.data = data;
        return this;
    }

    public getColumnValue(columnName: string): JQLPrimitive {
        return this.data[ this.columns[ columnName ].index ];
    }

}