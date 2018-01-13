class JQLExpressionNumber extends JQLOpcode {

    private readonly value: number;

    constructor( opcode: IJQL_LEXER_EXPRESSION_NUMBER ) {

        super();

        this.value = opcode.value;

    }

    public getOpcodeType(): EJQL_LEXER_OPCODE_TYPES {
        return EJQL_LEXER_OPCODE_TYPES.EXPRESSION;
    }

    public getExpressionType(): EJQL_LEXER_EXPRESSION_TYPES {
        return EJQL_LEXER_EXPRESSION_TYPES.NUMBER;
    }
}