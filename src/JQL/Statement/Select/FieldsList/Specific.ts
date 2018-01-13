class JQLStatementSelectFieldsListSpecific extends JQLStatementSelectFieldsList {

    private fields: JQLStatementSelectField[] = [];

    constructor( lexerToken: IJQL_LEXER_SELECT_SPECIFIC_FIELDS_LIST ) {

        super();

        for ( let i=0, len = lexerToken.fields.length; i<len; i++ ) {

            this.fields.push( <JQLStatementSelectField>JQLLexerFactory.create( lexerToken.fields[i]) );

        }

    }

    public getFields(): JQLStatementSelectField[] {
        return this.fields;
    }

}