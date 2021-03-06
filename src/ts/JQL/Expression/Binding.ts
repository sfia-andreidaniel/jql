class JQLExpressionBinding extends JQLExpression {

    private bindingName: string;

    private bindingValue: JQLPrimitive;

    constructor(token: IJQL_LEXER_EXPRESSION_BINDING) {

        super();

        this.bindingName = token.name;

    }

    public getExpressionType(): EJQL_LEXER_EXPRESSION_TYPES {
        return EJQL_LEXER_EXPRESSION_TYPES.BINDING;
    }

    public getBindingName(): string {
        return this.bindingName;
    }

    public getBindedValue(): JQLPrimitive {
        if (undefined === this.bindingValue) {
            throw new Error("Binding " + JSON.stringify(this.bindingName) + " is not binded!");
        }
        return this.bindingValue;
    }

    public getBindings(): JQLExpressionBinding[] {
        return [ this ];
    }

    public getFunctions(): JQLExpressionFunctionCall[] {
        return [];
    }

    public getIdentifiers(): JQLExpressionIdentifier[] {
        return [];
    }

    public bind(value: JQLPrimitive): this {
        this.bindingValue = value;
        return this;
    }

    public unbind(): this {
        this.bindingValue = undefined;
        return this;
    }

    public compute(context: IJQLTableRow): JQLPrimitive {

        if (undefined !== this.bindingValue) {

            return this.bindingValue;

        } else {

            throw new Error("Failed to compute binding: Binding " + this.bindingName + " is not binded!");

        }
    }

    public toString(): string {
        return ":" + this.bindingName;
    }
}