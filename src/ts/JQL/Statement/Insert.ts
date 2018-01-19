class JQLStatementInsert extends JQLStatement {

    private table: JQLTableReference;

    private fields: JQLStatementUpdateField[] = [];

    constructor(token: IJQL_LEXER_PARSED_INSERT_STATEMENT) {

        super(token);

        this.table = <JQLTableReference>JQLLexerFactory.create(token.table);

        for (let i = 0, len = token.fields.length; i < len; i++) {
            this.fields.push(<JQLStatementUpdateField>JQLLexerFactory.create(token.fields[ i ]));
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

        for (let i = 0, len = this.fields.length; i < len; i++) {
            for (let j = 0, bindings = this.fields[ i ].getExpression().getBindings(), n = bindings.length; j < n; j++) {
                result.push(bindings[ j ]);
            }
        }

        return result;
    }

    public getFunctions(): JQLExpressionFunctionCall[] {

        let result: JQLExpressionFunctionCall[] = [];

        for (let i = 0, len = this.fields.length; i < len; i++) {
            for (let j = 0, functions = this.fields[ i ].getExpression().getFunctions(), n = functions.length; j < n; j++) {
                result.push(functions[ j ]);
            }
        }

        return result;

    }

    public getIdentifiers(): JQLExpressionIdentifier[] {

        let result: JQLExpressionIdentifier[] = [];

        for (let i = 0, len = this.fields.length; i < len; i++) {
            for (let j = 0, identifiers = this.fields[ i ].getExpression().getIdentifiers(), n = identifiers.length; j < n; j++) {
                result.push(identifiers[ j ]);
            }
        }

        return result;

    }

}