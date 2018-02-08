class JQLTableStorageEngineInMemoryVirtualRow {

    private table: JQLTableStorageEngineInMemory;

    private cols: number;

    private data: any;

    constructor(table: JQLTableStorageEngineInMemory) {

        this.table = table;

        this.data = Object.create(null);

        for (let i = 0, identifiers = this.table.describe(), len = identifiers.length; i < len; i++) {

            (function (identifierIndex: number, identifierName: string, self: JQLTableStorageEngineInMemoryVirtualRow) {

                Object.defineProperty(self, String(identifierIndex), {
                    get:          function (): JQLPrimitive {
                        return (undefined === self.data[ identifierName ] || undefined === self.data[ identifierName ].get)
                            ? undefined
                            : self.data[ identifierName ].get();
                    },
                    set:          function (value: JQLPrimitive) {
                        if (undefined === self.data[ identifierName ] || undefined === self.data[ identifierName ].set) {
                            throw new Error("Value \"" + identifierName + "\" is read-only!");
                        } else {
                            self.data[ identifierName ].set(value);
                        }
                    },
                    enumerable:   true,
                    configurable: false,
                });

            })(i, identifiers[ i ].name, this);

            this.cols = i + 1;

        }

    }

    get length(): number {
        return this.cols;
    }

    public withPropertySetter(propertyName: string, setter: (value: JQLPrimitive) => void): this {
        if (this.table.hasIdentifier(propertyName)) {
            this.data[ propertyName ] = this.data[ propertyName ] || Object.create(null);
            this.data[ propertyName ].set = setter;
        } else {
            throw new Error("Property \"" + propertyName + "\" is not allowed!");
        }
        return this;
    }

    public withPropertyGetter(propertyName: string, getter: () => JQLPrimitive): this {
        if (this.table.hasIdentifier(propertyName)) {
            this.data[ propertyName ] = this.data[ propertyName ] || Object.create(null);
            this.data[ propertyName ].get = getter;
        } else {
            throw new Error("Property \"" + propertyName + "\" is not allowed!");
        }
        return this;
    }


}