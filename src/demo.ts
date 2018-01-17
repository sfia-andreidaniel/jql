let db: JQLDatabase = (new JQLDatabase()).withJQuery(jQuery.noConflict());

db.withTable(
    'persons',
    JQLTable.createFromInMemoryArrayOfObjects(
        [
            {
                id: 1,
                name: "Jack",
                age: 12,
            },
            {
                id: 2,
                name: "Jill",
                age: 14,
            },
            {
                id: 3,
                name: "Betty",
                age: 32
            },
        ],
        [
            {
                name: "id",
                type: EJQLTableColumnType.NUMBER,
                default: null,
                unique: true,
                autoIncrement: true,
            },
            {
                name: "name",
                type: EJQLTableColumnType.STRING,
                default: "",
                unique: false,
            },
            {
                name: "age",
                type: EJQLTableColumnType.NUMBER,
                default: 0,
                unique: false,
            }
        ]
    )
);

db.withTable(
    'products',
    JQLTable.createFromInMemoryArrayOfObjects(
        [
            {
                id: 1,
                name: "VGA Card",
                ownerId: 1,
            },
            {
                id: 2,
                name: "CPU",
                ownerId: 1,
            },
            {
                id: 4,
                name: "Computer keyboard",
                ownerId: 3,
            }
        ]
    )
);

db.withFunction('sum', function (a: number, b: number): number {
    return a + b;
});