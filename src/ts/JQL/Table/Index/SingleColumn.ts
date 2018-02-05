class JQLTableIndexSingleColumn extends JQLTableIndex {

    private unique: boolean;

    private autoIncrement: boolean;

    private values: JQLPrimitive[];

    private maxAutoIncrement: number = 0;

    constructor(table: JQLTableStorageEngineInMemory, indexDescriptor: IJQLTableIndexDescriptor) {
        super(table, [indexDescriptor]);
        this.unique = !!indexDescriptor.unique;
        this.autoIncrement = !!indexDescriptor.autoIncrement;
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

            let rowIndexedValue: string = String(row.getColumnValue(this.descriptors[0].name)).toLowerCase();

            if (this.values.indexOf(value = rowIndexedValue) > -1) {
                throw new Error('Duplicate key ' + JSON.stringify(this.descriptors[0].name) + ' found with value ' + JSON.stringify(value) + ' found!');
            } else {
                this.values.push(value);
                if (this.autoIncrement) {
                    this.maxAutoIncrement = Math.max(this.maxAutoIncrement, Number(value));
                }
            }

        }

    }

}