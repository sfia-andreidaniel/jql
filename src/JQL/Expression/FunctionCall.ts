class JQLExpressionFunctionCall extends JQLOpcode {

    private functionName: string;

    private arguments: JQLExpression[] = [];

    constructor( token: IJQL_LEXER_EXPRESSION_FUNCTION_CALL ) {

        super();

        this.functionName = token.function_name;

        for ( let i=0, len = token.arguments.length; i<len; i++ ) {

            this.arguments.push( <JQLExpression>JQLLexerFactory.create( token.arguments[i] ) );

        }

    }

    public getOpcodeType(): EJQL_LEXER_OPCODE_TYPES {
        return EJQL_LEXER_OPCODE_TYPES.EXPRESSION;
    }

    public getExpressionType(): EJQL_LEXER_EXPRESSION_TYPES {
        return EJQL_LEXER_EXPRESSION_TYPES.FUNCTION_CALL;
    }

    public getFunctionName(): string {
        return this.functionName;
    }

    public getArguments(): JQLExpression[] {
        return this.arguments;
    }
}