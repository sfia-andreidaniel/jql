class JQLStatementInsert extends JQLStatement {

    private table: JQLTableReference;

    private fields: JQLStatementUpdateField[] = [];

    constructor ( statement: IJQL_LEXER_PARSED_INSERT_STATEMENT ) {

        super( statement );

        this.table = <JQLTableReference>JQLLexerFactory.create(statement.table);

        for ( let i=0, len = statement.fields.length; i<len; i++ ) {
            this.fields.push( <JQLStatementUpdateField>JQLLexerFactory.create( statement.fields[i]) );
        }
    }

    public getStatementType(): EJQL_LEXER_STATEMENT_TYPES {
        return EJQL_LEXER_STATEMENT_TYPES.INSERT;
    }

    public getTable(): JQLTableReference {
        return this.table;
    }

    public getFields(): JQLStatementUpdateField[] {
        return this.fields;
    }

    public getBindings(): JQLExpressionBinding[] {

        let result: JQLExpressionBinding[] = [];

        for ( let i=0, len = this.fields.length; i<len; i++ ) {

            for ( let j=0, bindings = this.fields[i].getExpression().getBindings(), n = bindings.length; j<n; j++ ) {

                result.push( bindings[j] );

            }

        }

        return result;
    }

    public getFunctions(): JQLExpressionFunctionCall[] {

        let result: JQLExpressionFunctionCall[] = [];

        for ( let i=0, len = this.fields.length; i<len; i++ ) {

            for ( let j=0, functions = this.fields[i].getExpression().getFunctions(), n = functions.length; j<n; j++ ) {

                result.push( functions[j] );

            }

        }

        return result;

    }

}