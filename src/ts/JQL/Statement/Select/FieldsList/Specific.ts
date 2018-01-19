class JQLStatementSelectFieldsListSpecific extends JQLStatementSelectFieldsList {

    private fields: JQLStatementSelectField[] = [];

    constructor( token: IJQL_LEXER_SELECT_SPECIFIC_FIELDS_LIST ) {

        super();

        for ( let i=0, len = token.fields.length; i<len; i++ ) {

            this.fields.push( <JQLStatementSelectField>JQLLexerFactory.create( token.fields[i]) );

        }

    }

    public getFields(): JQLStatementSelectField[] {
        return this.fields;
    }

    public isSelectingAllFields(): boolean {
        return false;
    }

}