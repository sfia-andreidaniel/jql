class JQLExpressionIdentifier extends JQLOpcode {

    private identifierName: string;

    constructor( token: IJQL_LEXER_EXPRESSION_IDENTIFIER ) {
        super();
        this.identifierName = token.name;
    }

    public getOpcodeType(): EJQL_LEXER_OPCODE_TYPES {
        return EJQL_LEXER_OPCODE_TYPES.EXPRESSION;
    }

    public getExpressionType(): EJQL_LEXER_EXPRESSION_TYPES {
        return EJQL_LEXER_EXPRESSION_TYPES.IDENTIFIER;
    }

    public getIdentifierName(): string {
        return this.identifierName;
    }

}