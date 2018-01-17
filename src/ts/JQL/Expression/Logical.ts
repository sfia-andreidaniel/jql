abstract class JQLExpressionLogical extends JQLExpression {

    protected left: JQLExpression;

    protected right: JQLExpression;

    constructor( token: IJQL_LEXER_EXPRESSION_LOGICAL ) {

        super();

        this.left = <JQLExpression>JQLLexerFactory.create( token.left );

        this.right = <JQLExpression>JQLLexerFactory.create( token.right );

    }

    public getOpcodeType(): EJQL_LEXER_OPCODE_TYPES {
        return EJQL_LEXER_OPCODE_TYPES.EXPRESSION;
    }

    public getExpressionType(): EJQL_LEXER_EXPRESSION_TYPES {
        return EJQL_LEXER_EXPRESSION_TYPES.LOGICAL;
    }

    public abstract getOperator(): EJQL_LEXER_OPERATOR_LOGICAL_TYPE|EJQL_LEXER_OPERATOR_COMPARISION_TYPE;

    public getLeftOperand(): JQLExpression {
        return this.left;
    }

    public getRightOperand(): JQLExpression {
        return this.right;
    }

    public getBindings(): JQLExpressionBinding[] {

        let result: JQLExpressionBinding[] = [];

        for ( let i=0, bindings = this.left.getBindings(), len = bindings.length; i<len; i++ ) {
            result.push(bindings[i]);
        }

        for ( let i=0, bindings = this.right.getBindings(), len = bindings.length; i<len; i++ ) {
            result.push(bindings[i]);
        }

        return result;
    }

    public getFunctions(): JQLExpressionFunctionCall[] {

        let result: JQLExpressionFunctionCall[] = [];

        for ( let i=0, functions = this.left.getFunctions(), len = functions.length; i<len; i++ ) {
            result.push(functions[i]);
        }

        for ( let i=0, functions = this.right.getFunctions(), len = functions.length; i<len; i++ ) {
            result.push(functions[i]);
        }

        return result;
    }

    public getIdentifiers(): JQLExpressionIdentifier[] {

        let result: JQLExpressionIdentifier[] = [];

        for ( let i=0, identifiers = this.left.getIdentifiers(), len = identifiers.length; i<len; i++ ) {
            result.push(identifiers[i]);
        }

        for ( let i=0, identifiers = this.right.getIdentifiers(), len = identifiers.length; i<len; i++ ) {
            result.push(identifiers[i]);
        }

        return result;
    }
}