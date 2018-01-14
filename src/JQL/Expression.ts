abstract class JQLExpression extends JQLOpcode {

    public getOpcodeType(): EJQL_LEXER_OPCODE_TYPES {
        return EJQL_LEXER_OPCODE_TYPES.EXPRESSION;
    }

    public abstract getExpressionType(): EJQL_LEXER_EXPRESSION_TYPES;

    public abstract getBindings(): JQLExpressionBinding[];

    public abstract getFunctions(): JQLExpressionFunctionCall[];

    public abstract compute( context: IJQLTableRow ): JQLPrimitive;

}