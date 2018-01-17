abstract class JQLExpression extends JQLOpcode {

    private literal: string;

    public getOpcodeType(): EJQL_LEXER_OPCODE_TYPES {
        return EJQL_LEXER_OPCODE_TYPES.EXPRESSION;
    }

    public abstract getExpressionType(): EJQL_LEXER_EXPRESSION_TYPES;

    public abstract getBindings(): JQLExpressionBinding[];

    public abstract getFunctions(): JQLExpressionFunctionCall[];

    public abstract getIdentifiers(): JQLExpressionIdentifier[];

    public abstract compute( context: IJQLTableRow ): JQLPrimitive;

    public abstract toString(): string;

    public getLiteral(): string {

        if ( undefined !== this.literal ) {
            return this.literal;
        }

        this.literal = this.toString().replace(/["']+/g, '').trim();

        return this.literal;

    }

}