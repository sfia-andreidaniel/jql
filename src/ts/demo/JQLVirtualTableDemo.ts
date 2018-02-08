class JQLVirtualTableDemo {

    public static create(db: JQLDatabase): JQLTableStorageEngineInMemoryVirtualTable {

        let table = JQLTable.createVirtualTable([
            {
                name:    "id",
                type:    EJQLTableColumnType.NUMBER,
                default: 0,
            },
            {
                name:    "name",
                type:    EJQLTableColumnType.STRING,
                default: "",
            },
        ]);

        table.createRow()
            .withPropertyGetter("id", function (): number {
                return 1;
            })
            .withPropertyGetter("name", function(): string {
                return "Jack";
            });

        table.createRow()
            .withPropertyGetter("id", function (): number {
                return 2;
            })
            .withPropertyGetter("name", function(): string {
                return "John";
            });

        return table;
    }

}