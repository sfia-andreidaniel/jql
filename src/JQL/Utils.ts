class JQLUtils {

    private static readonly RESERVED_KEYWORDS: string[] = [
        'select',
        'from',
        'where',
        'in',
        'limit',
        'order',
        'by',
        'asc',
        'update',
        'table',
        'set',
        'insert',
        'into',
        'values',
        'delete',
    ];

    public static getType(variable: any): EJQLTableColumnType {

        if (undefined === variable) {

            return null;

        } else {

            if (null === variable) {

                return EJQLTableColumnType.NULL;

            } else {

                let t: string = typeof variable;

                if (t === 'number') {

                    if (isFinite(variable)) {

                        return EJQLTableColumnType.NUMBER;

                    } else {

                        return null;

                    }

                } else {

                    if (t === 'boolean') {

                        return EJQLTableColumnType.BOOLEAN;

                    } else {

                        if (t === 'string') {

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
                if (s !== '-' && s !== '+') {
                    return /^([\-+])?(0|[1-9]([0-9]+)?)?(\.[0-9]+)?/.test(s);
                }
            }

        }

        return false;

    }

    public static getIdentifiers(o: object[]): IJQLTableColumn[] {

        let mappings: any = Object.create(null),
            type: EJQLTableColumnType;

        for (let y = 0, n = (o || []).length; y < n; y++) {

            if (y === 0) {

                for (let k in o[y]) {

                    if (o[y].hasOwnProperty(k)) {

                        type = this.getType(o[y][k]);

                        mappings[k] = type;

                    }

                }

            } else {
                break;
            }

        }

        let result: IJQLTableColumn[] = [];

        for (let k in mappings) {

            if (null !== mappings[k]) {

                result.push({
                    type: mappings[k],
                    name: k
                });

            }
        }

        return result;

    }

    public static isReservedKeyword(k: string): boolean {

        return this.RESERVED_KEYWORDS.indexOf(String(k || '')) > -1;


    }

}