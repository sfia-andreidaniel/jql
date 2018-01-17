class JQLStatementUpdateDelayedOption extends JQLOpcode {

    private timer: number|null;

    constructor( token: IJQL_LEXER_DELAYED_OPTION ) {

        super();

        this.timer = 'number' === typeof token.timer
            ? token.timer
            : null;
    }

    public getOpcodeType(): EJQL_LEXER_OPCODE_TYPES {
        return EJQL_LEXER_OPCODE_TYPES.DELAYED_OPTION;
    }

    public getTimerValueInMilliseconds(): number {
        return this.timer;
    }

}