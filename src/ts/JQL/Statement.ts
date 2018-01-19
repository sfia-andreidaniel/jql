abstract class JQLStatement extends JQLOpcode {

    private remote: boolean;

    private binded: boolean;

    private statement: IJQL_LEXER_PARSED_STATEMENT;

    constructor(token: IJQL_LEXER_PARSED_STATEMENT) {
        super();
        this.remote = token.remote;
        this.statement = token;
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

    public abstract getIdentifiers(): JQLExpressionIdentifier[];

    public abstract getTable(): JQLTableReference;

    public bind(data?: IJQLBindData): this {

        this.binded = false;

        let bindings: JQLExpressionBinding[] = this.getBindings(),
            numBindings: number              = bindings.length,
            bindingName: string;

        for (let i = 0; i < numBindings; i++) {
            bindings[ i ].unbind();
        }

        for (let i = 0; i < numBindings; i++) {

            bindingName = bindings[ i ].getBindingName();

            if (undefined === data[ bindingName ]) {
                throw new Error("Failed to bind statement: Binding " + JSON.stringify(bindingName) + " is not defined in bind object!");
            } else {
                bindings[ i ].bind(data[ bindingName ]);
            }

        }

        this.binded = true;

        return this;

    }

    public getBindingData(): IJQLBindData {

        let bindData: IJQLBindData = {},
            bindings: JQLExpressionBinding[] = this.getBindings(),
            bindingName;

        for ( let i=0, len = bindings.length; i<len; i++ ) {
            if ( undefined === bindData[ bindingName = bindings[i].getBindingName() ] ) {
                bindData[ bindingName ] = bindings[i].getBindedValue();
            }
        }

        return bindData;

    }

    public isBinded(): boolean {
        return this.binded;
    }

    public getTokenizedStatement(): IJQL_LEXER_PARSED_STATEMENT {
        // return a clone of the parsed statement, in order to avoid argument-passed-by-reference issues
        return JSON.parse(JSON.stringify(this.statement));
    }

}