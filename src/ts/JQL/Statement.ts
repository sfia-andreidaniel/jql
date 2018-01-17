abstract class JQLStatement extends JQLOpcode {

    private remote: boolean;

    private binded: boolean;

    constructor(token: IJQL_LEXER_PARSED_STATEMENT) {
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

    public isBinded(): boolean {
        return this.binded;
    }

}