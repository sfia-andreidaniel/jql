abstract class JQLTable implements IJQLTable {

    private identifiers: IJQLTableColumn[] = [];

    constructor( identifiers: IJQLTableColumn[] ) {
        for ( let i=0, idtf = identifiers || [], len = idtf.length; i<len; i++ ) {
            this.identifiers.push( idtf[i] );
        }
    }

    public describe(): IJQLTableColumn[] {
        return this.identifiers.slice(0);
    }

    public hasIdentifier(identifierName: string): boolean {

        for ( let i=0, len = this.identifiers.length; i<len; i++ ) {
            if ( this.identifiers[i].name === identifierName ) {
                return true;
            }
        }

        return false;
    }

    public abstract isRemote(): boolean;

    public abstract getStorageEngine(): EJQLTableStorageEngine;

    public static createFromInMemoryArrayOfObjects( rows: object[] ): JQLTable {

        let identifiers = JQLUtils.getIdentifiers(rows),
            result: JQLPrimitive[][] = [],
            ncols: number = identifiers.length,
            row: JQLPrimitive[],
            v: JQLPrimitive,
            vType: EJQLTableColumnType;

        if ( !identifiers.length ) {

            throw new Error('No valid columns were detected in "in-memory" array!');

        }

        for ( let i=0, len = rows.length; i<len; i++ ) {

            row = [];

            for ( let col=0; col < ncols; col++ ) {

                v = rows[i][ identifiers[col].name ];

                vType = JQLUtils.getType(v);

                if ( vType === null || vType !== identifiers[col].type ) {
                    v = null;
                }

                row.push( v );

            }

            result.push( row );

        }

        return new JQLTableInMemory(identifiers, result);

    }

}