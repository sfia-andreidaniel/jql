class JQLTableIndexSingleColumn extends JQLTableIndex {

    private unique: boolean;

    private autoIncrement: boolean;

    private values: JQLPrimitive[];

    private maxAutoIncrement: number = 0;

    constructor(table: JQLTableStorageEngineInMemory, column: IJQLTableColumn) {
        super(table, [column]);
        this.unique = !!column.unique;
        this.autoIncrement = !!column.autoIncrement;
    }

    public isUnique(): boolean {
        return this.unique;
    }

    public isAutoIncrement(): boolean {
        return this.autoIncrement;
    }

    public getNextAutoIncrementValue(): number {
        if (this.autoIncrement) {
            return this.maxAutoIncrement + 1;
        } else {
            throw new Error('Index is not auto-increment!');
        }
    }

    public index() {

        this.values = [];

        let row: IJQLTableRow,
            iterator = (<JQLTableStorageEngineInMemory>this.table).createIterator(),
            value: JQLPrimitive;

        this.maxAutoIncrement = 0;

        while (row = iterator.next()) {

            if (this.values.indexOf(value = row.getColumnValue(this.columns[0].name)) > -1) {
                throw new Error('Duplicate key ' + JSON.stringify(this.columns[0].name) + ' found with value ' + JSON.stringify(value) + ' found!');
            } else {
                this.values.push(value);
                if (this.autoIncrement) {
                    this.maxAutoIncrement = Math.max(this.maxAutoIncrement, Number(value));
                }
            }

        }

    }

}