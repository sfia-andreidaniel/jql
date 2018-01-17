abstract class JQLStatementSelectFieldsList extends JQLOpcode{

    public getOpcodeType(): EJQL_LEXER_OPCODE_TYPES {
        return EJQL_LEXER_OPCODE_TYPES.FIELDS_LIST;
    }

    public abstract isSelectingAllFields(): boolean;

}