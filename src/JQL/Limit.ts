class JQLLimit extends JQLOpcode {

    private limit: number;

    private skip: number;

    constructor( token: IJQL_LEXER_LIMIT_CLAUSE ) {

        super();

        this.limit = token.limit;

        this.skip = token.skip;

    }

    public getOpcodeType(): EJQL_LEXER_OPCODE_TYPES {
        return EJQL_LEXER_OPCODE_TYPES.LIMIT_OPTION;
    }

    public getLimit(): number {
        return this.limit;
    }

    public getSkip(): number {
        return this.skip;
    }

}