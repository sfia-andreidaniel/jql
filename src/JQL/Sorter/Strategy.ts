abstract class JQLSorterStrategy extends JQLSorter {

    private strategy: EJQL_LEXER_ORDERING_STRATEGY;

    constructor( token: IJQL_LEXER_ORDER_BY_FIELDS_CLAUSE ) {

        super();

        this.strategy = token.type;

    }

    public getOpcodeType(): EJQL_LEXER_OPCODE_TYPES {
        return EJQL_LEXER_OPCODE_TYPES.ORDER_BY_OPTION;
    }

    public abstract isRandom(): boolean;

}