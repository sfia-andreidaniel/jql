class JQLRow implements IJQLTableRow {

    private numColumns: number;

    private columns: { [ columnName: string ]: { type: EJQLTableColumnType, index: number } } = {};

    private data: JQLPrimitive[] = [];

    private rowIndex: number;

    constructor(columns: IJQLTableColumn[], data: JQLPrimitive[], index: number) {

        this.numColumns = columns.length;

        for (let i = 0; i < this.numColumns; i++) {
            this.columns[columns[i].name] = {type: columns[i].type, index: i};
        }

        this.data = data;

        this.rowIndex = index;

    }

    public withIndex(index: number): this {
        this.rowIndex = index;
        return this;
    }

    public withRowData(data: JQLPrimitive[]): this {
        this.data = data;
        return this;
    }

    public getDataAsArray(): JQLPrimitive[] {
        return this.data;
    }

    public getColumnValue(columnName: string): JQLPrimitive {
        return this.data[this.columns[columnName].index];
    }

    public setColumnValue(columnName: string, columnValue: JQLPrimitive) {
        this.data[this.columns[columnName].index] = columnValue;
    }

    public toObject(): object {

        let result = Object.create(null),
            v: JQLPrimitive;

        for (let columnName in this.columns) {

            v = this.data[this.columns[columnName].index];

            if (v === undefined) {
                v = null;
            }

            result[columnName] = v;

        }

        return result;
    }

    public getRowIndex(): number {
        return this.rowIndex;
    }

    public static createFromObject(o: object): JQLRow {

        let columns: IJQLTableColumn[] = [],
            values: JQLPrimitive[] = [];

        for (let k in o) {
            columns.push({
                type: EJQLTableColumnType.NULL,
                name: k
            });
            values.push(o[k]);
        }

        return new JQLRow(columns, values, 0);

    }

    public static createFromTable(table: JQLTableInMemory): JQLRow {

        return new JQLRow(table.describe(), table.createEmptyRow(), undefined);

    }

}