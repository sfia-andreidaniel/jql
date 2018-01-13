class JQLTable extends JQLOpcode {

    public name: string;

    constructor( opcode: IJQL_LEXER_TABLE_REFERENCE ) {

        super();

        this.name = opcode.name;

    }

    public getOpcodeType(): EJQL_LEXER_OPCODE_TYPES {
        return EJQL_LEXER_OPCODE_TYPES.TABLE;
    }

    public getName(): string {
        return this.name;
    }

}