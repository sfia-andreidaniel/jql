class JQLExpressionLogicalLike extends JQLExpressionLogical {

    public getOperator(): EJQL_LEXER_OPERATOR_COMPARISION_TYPE {
        return EJQL_LEXER_OPERATOR_COMPARISION_TYPE.LIKE;
    }

    public compute(context: IJQLTableRow): JQLPrimitive {
        return this.like(this.left.compute(context), this.right.compute(context));
    }

    private like(left: JQLPrimitive, right: JQLPrimitive): boolean {
        let leftStr  = this.castToString(left),
            rightStr = this.castToString(right),
            regExp   = this.buildRegularExpression(rightStr);

        return regExp.test(leftStr);
    }

    private buildRegularExpression(str): RegExp {

        let regExpStr  = "^",
            ch: string = "";

        for (let i = 0, len = str.length; i < len; i++) {
            ch = str.charAt(i);
            switch (ch) {
                case "%":
                    regExpStr += "(.*)";
                    break;
                case "\n":
                    regExpStr += "\\n";
                    break;
                case "\r":
                    regExpStr += "\\r";
                    break;
                case "\t":
                    regExpStr += "\\t";
                    break;
                case ".":
                case "-":
                case "[":
                case "]":
                case "(":
                case ")":
                case "?":
                case "!":
                case "^":
                case "$":
                case "\\":
                case "/":
                    regExpStr += ("\\" + ch);
                    break;
                default:
                    regExpStr += ch;
                    break;
            }
        }

        return new RegExp(regExpStr + "$", "i");
    }

    private castToString(primitive: JQLPrimitive): string {
        if (true === primitive) {
            return "1";
        } else if (false === primitive) {
            return "0";
        } else {
            return String(primitive || "");
        }
    }

    public toString(): string {
        return this.left.toString() + " LIKE " + this.right.toString();
    }

}