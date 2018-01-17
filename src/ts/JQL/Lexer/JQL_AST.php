<?php

namespace Jison;


class JQL_AST
{

    public static $STATEMENT_TYPES = [
        'SELECT' => 'select',
        'UPDATE' => 'update',
        'INSERT' => 'insert',
        'DELETE' => 'delete',
    ];

    public static $TOKEN_TYPES = [
        'STATEMENT'        => 'statement',
        'TABLE_REFERENCE'  => 'table_reference',
        'EXPRESSION'       => 'expression',
        'FIELDS_LIST'      => 'fields_list',
        'FIELD'            => 'field',
        'UPDATE_FIELD'     => 'update_field',
        'OPTION_DELAYED'   => 'delayed_option',
        'OPTION_LIMIT'     => 'limit_option',
        'OPTION_ORDERING'  => 'order_by_option',
        'ORDER_EXPRESSION' => 'order_by_expression'
    ];

    public static $EXPRESSION = [
        'NUMBER'        => 'number',        // 0, 2.123, 2, 231231
        'BOOLEAN'       => 'boolean',       // true, false
        'NULL'          => 'null',          // null
        'STRING'        => 'string',        // "mumu"
        'UNARY'         => 'unary',         // !foo, -a
        'LOGICAL'       => 'logical',       // a && b, 2 || true
        'MATH'          => 'math',          // foo + 3, 2 / 4
        'GROUP'         => 'group',         // ( 2 + 3 * 6 + sum( '2', 3 ) )
        'IDENTIFIER'    => 'identifier',    // foo
        'BINDING'       => 'binding',       // :foo
        'FUNCTION_CALL' => 'function_call'  // foo(2, 3, mar(bar + 2) )
    ];

    public static $OPERATOR = [
        'NOT'    => '!',             // !true, !1, !asd, !"1"
        'INVERT' => '-',             // -3, -true, -"asd",

        'OR'  => '||',            // a or b, a || b
        'AND' => '&&',            // a && b, a and b

        'EQUALS' => '==',            // a == b, 1 == 2
        'LIKE'   => '~=',            // a ~= '%foo'

        'LTE' => '<=',            // 3 <= 4
        'LT'  => '<',             // 3 <  4
        'GTE' => '>=',            // 4 >= 3
        'GT'  => '>',             // 4 > 3

        'MULTIPLY' => '*',             // 3 * 4
        'DIVISION' => '/',             // 3 / 4

        'ADDITION'   => '+',             // 3 + 4
        'DIFFERENCE' => '-',             // 4 - 3
    ];

    public static $ORDERING_STRATEGY = [
        'RANDOM'  => 'random',
        'ORDERED' => 'ordered',
    ];

    public static $ORDER_DIRECTION = [
        'ASCENDING'  => 'asc',
        'DESCENDING' => 'desc',
    ];

    public static $FIELD_TYPES = [
        'ALL_FIELDS'      => 'all',
        'SPECIFIC_FIELDS' => 'enumeration',
    ];

    /**
     * @param string $o
     *
     * @return float
     */
    public static function parseNumber($o)
    {
        return (float)$o;
    }

    /**
     * @param $o
     *
     * @return string
     */
    public static function unescapeIdentifier($o)
    {

        return preg_replace('/^`([\\S]+)`$/', '$1', (string)$o);
    }

    /**
     * @param array $o
     *
     * @return mixed|null|string
     */
    public static function createFieldAliasFromExpression(array $o)
    {
        switch ($o['type']) {
            case 'string':
                return $o['value'];
                break;
            case 'boolean':
                return $o['value']
                    ? 'true'
                    : 'false';
                break;
            case 'number':
                return (string)$o['value'];
            case 'null':
                return 'null';
            default:
                return null;
        }
    }

    /**
     * @param $input
     *
     * @return string
     * @throws \Exception
     */
    public static function parseString($input)
    {

        if (!is_string($input)) {
            throw new \Exception('Invalid argument: string expected!');
        }

        $strlen = strlen($input);
        $startch = substr($input, 0, 1);
        $endch = substr($input, $strlen - 1, 1);
        $ch = null;
        $nextch = null;
        $result = '';

        if ($strlen < 2 || $startch != $endch || ($startch !== "'" && $startch !== '"')) {
            throw new \Exception('Failed to parse string! Please report this bug!');
        }

        for ($i = 1; $i < $strlen - 1; $i++) {

            $ch = substr($input, $i, 1);

            if ('\\' === $ch) {

                $nextch = substr($input, $i + 1, 1);

                switch ($nextch) {
                    case "r": // "r"
                        $result .= "\r";
                        break;
                    case "t": // "t"
                        $result .= "\t";
                        break;
                    case "n": // "n"
                        $result .= "\n";
                        break;
                    case "\\": // "\"
                        $result .= "\\";
                        break;
                    case '':
                        throw new \Exception('Unexpected string termination!');
                        break;
                    default:
                        $result .= $nextch;
                        break;
                }

                $i++;

            }
            else {

                $result .= $ch;

            }
        }

        return $result;


    }

    /**
     * @param string $bindingName
     *
     * @return string
     */
    public static function unescapeBindingName($bindingName)
    {
        return preg_replace( '/^\\:/', '', (string)$bindingName);
    }

    /**
     * @param string $booleanAsString
     *
     * @return bool
     */
    public static function parseBoolean($booleanAsString)
    {
        return strtolower((string)$booleanAsString) === 'true' ? true : false;
    }

    public static function trace( $lineNumber ) {
        echo "trace: ", $lineNumber, "\n";
    }

}