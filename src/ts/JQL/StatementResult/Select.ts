class JQLStatementResultSelect extends JQLStatementResult {

    private rows: object[] = [];

    public addRows(rows: object[]): this {

        if (rows && rows.length) {
            for (let i = 0, len = rows.length; i < len; i++) {
                this.rows.push(rows[ i ]);
            }
        }

        return this;
    }

    public hasRows(): boolean {
        return true;
    }

    public getAffectedRows(): number {
        return this.rows.length;
    }

    public getRows(): object[] {
        return this.rows;
    }

    public getRowsAsArray(): JQLPrimitive[][] {

        if (!this.rows || !this.rows.length) {
            return [];
        }

        let result: JQLPrimitive[][] = [],
            keys: string[],
            numKeys: number,
            row: JQLPrimitive[],
            v: JQLPrimitive;

        for (let i = 0, len = this.rows.length; i < len; i++) {

            row = [];

            keys = Object.keys(this.rows[ i ]);

            numKeys = keys.length;

            for (let j = 0; j < numKeys; j++) {

                v = this.rows[ i ][ keys[ j ] ];

                if (undefined === v) {
                    v = null;
                }

                row.push(v);

            }

            result.push(row);

        }

        return result;
    }

}