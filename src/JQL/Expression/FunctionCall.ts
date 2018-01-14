class JQLExpressionFunctionCall extends JQLExpression {

    private functionName: string;

    private arguments: JQLExpression[] = [];

    private database: IJQLDatabase = null;

    constructor(token: IJQL_LEXER_EXPRESSION_FUNCTION_CALL) {

        super();

        this.functionName = token.function_name;

        for (let i = 0, len = token.arguments.length; i < len; i++) {

            this.arguments.push(<JQLExpression>JQLLexerFactory.create(token.arguments[ i ]));

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

    public getBindings(): JQLExpressionBinding[] {

        let result: JQLExpressionBinding[] = [];

        for (let argI = 0, numArgs = this.arguments.length; argI < numArgs; argI++) {

            for (let i = 0, bindings = this.arguments[ i ].getBindings(), len = bindings.length; i < len; i++) {
                result.push(bindings[ i ]);
            }

        }

        return result;

    }

    public getFunctions(): JQLExpressionFunctionCall[] {
        return [ this ];
    }

    public withDatabase(database: IJQLDatabase): this {
        this.database = database || null;
        return this;
    }

    public compute(context: IJQLTableRow): JQLPrimitive {

        if (this.database) {

            let computedArgs: JQLPrimitive[] = [];

            for (let i = 0, len = this.arguments.length; i < len; i++) {
                computedArgs.push(this.arguments[ i ].compute(context));
            }

            return this.database.callFunction(this.functionName, computedArgs);

        } else {

            throw new Error("Failed to call function " + JSON.stringify(this.functionName) + ": Database not binded to function!");

        }

    }
}