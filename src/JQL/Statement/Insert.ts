class JQLStatementInsert extends JQLStatement {

    private table: JQLTable;

    private fields: JQLStatementUpdateField[] = [];

    constructor ( statement: IJQL_LEXER_PARSED_INSERT_STATEMENT ) {

        super( statement );

        this.table = <JQLTable>JQLLexerFactory.create(statement.table);

        for ( let i=0, len = statement.fields.length; i<len; i++ ) {
            this.fields.push( <JQLStatementUpdateField>JQLLexerFactory.create( statement.fields[i]) );
        }
    }

    public getStatementType(): EJQL_LEXER_STATEMENT_TYPES {
        return EJQL_LEXER_STATEMENT_TYPES.INSERT;
    }

    public getTable(): JQLTable {
        return this.table;
    }

    public getFields(): JQLStatementUpdateField[] {
        return this.fields;
    }

}