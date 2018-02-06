class JQLUtils {

    private static readonly RESERVED_KEYWORDS: string[] = [
        "select",
        "from",
        "where",
        "in",
        "limit",
        "order",
        "by",
        "asc",
        "update",
        "table",
        "set",
        "insert",
        "into",
        "values",
        "delete",
        "like",
    ];

    public static getType(variable: any): EJQLTableColumnType {

        if (undefined === variable) {

            return null;

        } else {

            if (null === variable) {

                return EJQLTableColumnType.NULL;

            } else {

                let t: string = typeof variable;

                if (t === "number") {

                    if (isFinite(variable)) {

                        return EJQLTableColumnType.NUMBER;

                    } else {

                        return null;

                    }

                } else {

                    if (t === "boolean") {

                        return EJQLTableColumnType.BOOLEAN;

                    } else {

                        if (t === "string") {

                            return EJQLTableColumnType.STRING;

                        } else {

                            return null;

                        }

                    }

                }

            }

        }

    }

    public static isNumeric(s: any): boolean {

        let t: EJQLTableColumnType = this.getType(s);

        if (t === EJQLTableColumnType.NUMBER) {

            return true;

        } else {

            if (t === EJQLTableColumnType.STRING) {
                if (s !== "-" && s !== "+") {
                    return /^([\-+])?(0|[1-9]([0-9]+)?)?(\.[0-9]+)?/.test(s);
                }
            }

        }

        return false;

    }

    public static getColumnDefinitions(o: object[]): IJQLTableColumn[] {

        let mappings: any = Object.create(null),
            type: EJQLTableColumnType;

        for (let y = 0, n = (o || []).length; y < n; y++) {

            if (y === 0) {

                for (let k in o[ y ]) {

                    if (o[ y ].hasOwnProperty(k)) {

                        type = this.getType(o[ y ][ k ]);

                        mappings[ k ] = type;

                    }

                }

            } else {
                break;
            }

        }

        let result: IJQLTableColumn[] = [];

        for (let k in mappings) {

            if (null !== mappings[ k ]) {

                result.push({
                    type: mappings[ k ],
                    name: k,
                });

            }
        }

        return result;

    }

    public static isReservedKeyword(k: string): boolean {

        return this.RESERVED_KEYWORDS.indexOf(String(k || "")) > -1;


    }

    public static shuffleArray(a: any[]): any[] {

        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [ a[ i ], a[ j ] ] = [ a[ j ], a[ i ] ];
        }

        return a;
    }

    public static compare(a: JQLPrimitive, b: JQLPrimitive): number {

        let aType = this.getType(a),
            bType = this.getType(b);

        if (aType === null && bType === null) {
            return 0;
        }

        if (aType === null || bType === null) {

            if (aType === null) {

                return -1;

            } else {

                return 1;

            }

        }

        let aToString: string,
            bToString: string;

        if (aType === bType) {

            switch (aType) {

                case EJQLTableColumnType.BOOLEAN:
                case EJQLTableColumnType.NUMBER:
                case EJQLTableColumnType.NULL:

                    if (a == b) {
                        return 0;
                    } else {
                        if (a < b) {
                            return -1;
                        } else {
                            return 1;
                        }
                    }

                case EJQLTableColumnType.STRING:
                    aToString = String(a).toLowerCase();
                    bToString = String(b).toLowerCase();
            }

        } else {

            // CAST TO STRING

            if (aType !== EJQLTableColumnType.STRING) {

                if (aType === EJQLTableColumnType.NUMBER) {

                    aToString = String(a);

                } else {

                    if (aType === EJQLTableColumnType.NULL) {
                        // empty string
                        aToString = "";
                    } else {
                        // boolean
                        aToString = a
                            ? "1"
                            : "0";
                    }
                }

            } else {
                aToString = String(a).toLowerCase();
            }

            if (bType !== EJQLTableColumnType.STRING) {

                if (bType === EJQLTableColumnType.NUMBER) {

                    bToString = String(b);

                } else {

                    if (bType === EJQLTableColumnType.NULL) {
                        // empty string
                        bToString = "";
                    } else {
                        // boolean
                        bToString = b
                            ? "1"
                            : "0";
                    }
                }

            } else {
                bToString = String(a).toLowerCase();
            }

        }

        if (aToString === bToString) {
            return 0;
        } else {
            if (aToString < bToString) {
                return -1;
            } else {
                return 1;
            }
        }

    }

    public static parseString(s: string): string {
        let result: string = "",
            ch: string,
            ch1: string;

        for (let i = 0, len = s.length; i < len; i++) {
            ch = s.charAt(i);
            if (ch === "\\") {

                ch1 = s.charAt(i + 1);

                i++;

                switch (ch1) {
                    case "r":
                        result += "\r";
                        break;
                    case "n":
                        result += "\n";
                        break;
                    case "t":
                        result += "\t";
                        break;
                    case "\\":
                        result += "\\";
                        break;
                    case "":
                        result += "\\";
                        break;
                    default:
                        result += ch1;
                }

            } else {
                result = result + ch;
            }
        }

        return result;
    }

    public static castToString(primitive: JQLPrimitive): string {
        if (true === primitive) {
            return "1";
        } else if (false === primitive) {
            return "0";
        } else {
            return String(primitive || "");
        }
    }


    public static compareAsStrings(a: JQLPrimitive, b: JQLPrimitive): number {

        let aString = this.castToString(a).toLowerCase(),
            bString = this.castToString(b).toLowerCase();

        return aString === bString
            ? 0
            : (aString < bString
                ? 1
                : -1);

    }
}