class JQLStatementInsert extends JQLStatement {

    constructor ( statement: IJQL_LEXER_PARSED_INSERT_STATEMENT ) {
        super( statement );
    }

    public getStatementType(): EJQL_LEXER_STATEMENT_TYPES {
        return EJQL_LEXER_STATEMENT_TYPES.INSERT;
    }

}