abstract class JQLStatement extends JQLOpcode {

    private remote: boolean;

    constructor( token: IJQL_LEXER_PARSED_STATEMENT ) {
        super();
        this.remote = token.remote;
    }

    public abstract getStatementType(): EJQL_LEXER_STATEMENT_TYPES;

    public getOpcodeType(): EJQL_LEXER_OPCODE_TYPES {
        return EJQL_LEXER_OPCODE_TYPES.STATEMENT;
    }

    public isRemote(): boolean {
        return this.remote;
    }

    public abstract getBindings(): JQLExpressionBinding[];

    public abstract getFunctions(): JQLExpressionFunctionCall[];

}