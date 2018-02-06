class JQLLexerFactory {

    public static create(lexerToken: IJQL_LEXER_OPCODE): JQLOpcode {

        switch (lexerToken.op) {

            case EJQL_LEXER_OPCODE_TYPES.STATEMENT:

                switch ((<IJQL_LEXER_PARSED_STATEMENT>lexerToken).type) {

                    case EJQL_LEXER_STATEMENT_TYPES.SELECT:
                        return new JQLStatementSelect(<IJQL_LEXER_PARSED_SELECT_STATEMENT>lexerToken);

                    case EJQL_LEXER_STATEMENT_TYPES.INSERT:
                        return new JQLStatementInsert(<IJQL_LEXER_PARSED_INSERT_STATEMENT>lexerToken);

                    case EJQL_LEXER_STATEMENT_TYPES.UPDATE:
                        return new JQLStatementUpdate(<IJQL_LEXER_PARSED_UPDATE_STATEMENT>lexerToken);

                    case EJQL_LEXER_STATEMENT_TYPES.DELETE:
                        return new JQLStatementDelete(<IJQL_LEXER_PARSED_DELETE_STATEMENT>lexerToken);

                    default:
                        throw new Error("Cannot create statement from token: " + JSON.stringify(lexerToken));

                }


            case EJQL_LEXER_OPCODE_TYPES.TABLE:
                return new JQLTableReference(<IJQL_LEXER_TABLE_REFERENCE>lexerToken);

            case EJQL_LEXER_OPCODE_TYPES.EXPRESSION:

                switch ((<IJQL_LEXER_EXPRESSION>lexerToken).type) {

                    case EJQL_LEXER_EXPRESSION_TYPES.NUMBER:
                        return new JQLExpressionNumber(<IJQL_LEXER_EXPRESSION_NUMBER>lexerToken);

                    case EJQL_LEXER_EXPRESSION_TYPES.BOOLEAN:
                        return new JQLExpressionBoolean(<IJQL_LEXER_EXPRESSION_BOOLEAN>lexerToken);

                    case EJQL_LEXER_EXPRESSION_TYPES.NULL:
                        return new JQLExpressionNull();

                    case EJQL_LEXER_EXPRESSION_TYPES.STRING:
                        return new JQLExpressionString(<IJQL_LEXER_EXPRESSION_STRING>lexerToken);

                    case EJQL_LEXER_EXPRESSION_TYPES.UNARY:

                        switch (<EJQL_LEXER_OPERATOR_UNARY_TYPE>(<IJQL_LEXER_EXPRESSION_UNARY>lexerToken).operator) {

                            case EJQL_LEXER_OPERATOR_UNARY_TYPE.INVERT:
                                return new JQLExpressionUnaryInvert(<IJQL_LEXER_EXPRESSION_UNARY>lexerToken);

                            case EJQL_LEXER_OPERATOR_UNARY_TYPE.NOT:
                                return new JQLExpressionUnaryNot(<IJQL_LEXER_EXPRESSION_UNARY>lexerToken);

                            default:
                                throw new Error("Cannot create unary expression from token: " + JSON.stringify(lexerToken));
                        }

                    case EJQL_LEXER_EXPRESSION_TYPES.LOGICAL:

                        switch (<EJQL_LEXER_OPERATOR_LOGICAL_TYPE | EJQL_LEXER_OPERATOR_COMPARISION_TYPE>(<IJQL_LEXER_EXPRESSION_LOGICAL>lexerToken).operator) {

                            case EJQL_LEXER_OPERATOR_LOGICAL_TYPE.AND:
                                return new JQLExpressionLogicalAnd(<IJQL_LEXER_EXPRESSION_LOGICAL>lexerToken);

                            case EJQL_LEXER_OPERATOR_LOGICAL_TYPE.OR:
                                return new JQLExpressionLogicalOr(<IJQL_LEXER_EXPRESSION_LOGICAL>lexerToken);

                            case EJQL_LEXER_OPERATOR_COMPARISION_TYPE.EQUALS:
                                return new JQLExpressionLogicalEquals(<IJQL_LEXER_EXPRESSION_LOGICAL>lexerToken);

                            case EJQL_LEXER_OPERATOR_COMPARISION_TYPE.DIFFERENT:
                                return new JQLExpressionLogicalDifferent(<IJQL_LEXER_EXPRESSION_LOGICAL>lexerToken);

                            case EJQL_LEXER_OPERATOR_COMPARISION_TYPE.GT:
                                return new JQLExpressionLogicalGreaterThen(<IJQL_LEXER_EXPRESSION_LOGICAL>lexerToken);

                            case EJQL_LEXER_OPERATOR_COMPARISION_TYPE.GTE:
                                return new JQLExpressionLogicalGreaterThenEquals(<IJQL_LEXER_EXPRESSION_LOGICAL>lexerToken);

                            case EJQL_LEXER_OPERATOR_COMPARISION_TYPE.LT:
                                return new JQLExpressionLogicalLowerThen(<IJQL_LEXER_EXPRESSION_LOGICAL>lexerToken);

                            case EJQL_LEXER_OPERATOR_COMPARISION_TYPE.LTE:
                                return new JQLExpressionLogicalLowerThenEquals(<IJQL_LEXER_EXPRESSION_LOGICAL>lexerToken);

                            case EJQL_LEXER_OPERATOR_COMPARISION_TYPE.LIKE:
                                return new JQLExpressionLogicalLike(<IJQL_LEXER_EXPRESSION_LOGICAL>lexerToken);

                            default:
                                throw new Error("Cannot create logical expression from token: " + JSON.stringify(lexerToken));

                        }

                    case EJQL_LEXER_EXPRESSION_TYPES.MATH:

                        switch (<EJQL_LEXER_OPERATOR_MATH_TYPE>(<IJQL_LEXER_EXPRESSION_MATH>lexerToken).operator) {

                            case EJQL_LEXER_OPERATOR_MATH_TYPE.ADDITION:
                                return new JQLExpressionMathAddition(<IJQL_LEXER_EXPRESSION_MATH>lexerToken);

                            case EJQL_LEXER_OPERATOR_MATH_TYPE.DIFFERENCE:
                                return new JQLExpressionMathDifference(<IJQL_LEXER_EXPRESSION_MATH>lexerToken);

                            case EJQL_LEXER_OPERATOR_MATH_TYPE.DIVISION:
                                return new JQLExpressionMathDivision(<IJQL_LEXER_EXPRESSION_MATH>lexerToken);

                            case EJQL_LEXER_OPERATOR_MATH_TYPE.MULTIPLY:
                                return new JQLExpressionMathMultiply(<IJQL_LEXER_EXPRESSION_MATH>lexerToken);

                            default:
                                throw new Error("Cannot create math expression from token: " + JSON.stringify(lexerToken));

                        }

                    case EJQL_LEXER_EXPRESSION_TYPES.GROUP:
                        return new JQLExpressionGroup(<IJQL_LEXER_EXPRESSION_GROUP>lexerToken);

                    case EJQL_LEXER_EXPRESSION_TYPES.IDENTIFIER:
                        return new JQLExpressionIdentifier(<IJQL_LEXER_EXPRESSION_IDENTIFIER>lexerToken);

                    case EJQL_LEXER_EXPRESSION_TYPES.BINDING:
                        return new JQLExpressionBinding(<IJQL_LEXER_EXPRESSION_BINDING>lexerToken);

                    case EJQL_LEXER_EXPRESSION_TYPES.FUNCTION_CALL:
                        return new JQLExpressionFunctionCall(<IJQL_LEXER_EXPRESSION_FUNCTION_CALL>lexerToken);

                    default:
                        throw new Error("Unknown expression type: " + JSON.stringify(lexerToken));
                }

            case EJQL_LEXER_OPCODE_TYPES.FIELDS_LIST:

                switch ((<IJQL_LEXER_SELECT_FIELDS_LIST>lexerToken).type) {

                    case EJQL_LEXER_FIELD_TYPES.ALL_FIELDS:
                        return new JQLStatementSelectFieldsListAll(<IJQL_LEXER_SELECT_ALL_FIELDS_LIST>lexerToken);

                    case EJQL_LEXER_FIELD_TYPES.SPECIFIC_FIELDS:
                        return new JQLStatementSelectFieldsListSpecific(<IJQL_LEXER_SELECT_SPECIFIC_FIELDS_LIST>lexerToken);

                    default:
                        throw new Error("Invalid lexer token select fields type: " + JSON.stringify(lexerToken));
                }

            case EJQL_LEXER_OPCODE_TYPES.FIELD:
                return new JQLStatementSelectField(<IJQL_LEXER_SELECT_FIELD>lexerToken);

            case EJQL_LEXER_OPCODE_TYPES.UPDATE_FIELD:
                return new JQLStatementUpdateField(<IJQL_LEXER_UPDATE_FIELD>lexerToken);

            case EJQL_LEXER_OPCODE_TYPES.DELAYED_OPTION:
                return new JQLStatementUpdateDelayedOption(<IJQL_LEXER_DELAYED_OPTION>lexerToken);

            case EJQL_LEXER_OPCODE_TYPES.LIMIT_OPTION:
                return new JQLLimit(<IJQL_LEXER_LIMIT_CLAUSE>lexerToken);

            case EJQL_LEXER_OPCODE_TYPES.ORDER_BY_OPTION:

                switch ((<IJQL_LEXER_ORDER_BY_FIELDS_CLAUSE>lexerToken).type) {

                    case EJQL_LEXER_ORDERING_STRATEGY.RANDOM:
                        return new JQLSorterStrategyRandom(<IJQL_LEXER_ORDER_BY_FIELDS_CLAUSE>lexerToken);

                    case EJQL_LEXER_ORDERING_STRATEGY.ORDERED:
                        return new JQLSorterStrategyByExpression(<IJQL_LEXER_ORDER_BY_FIELDS_CLAUSE>lexerToken);

                    default:
                        throw new Error("Invalid lexer token ORDER BY: " + JSON.stringify(lexerToken));
                }

            case EJQL_LEXER_OPCODE_TYPES.ORDER_BY_EXPRESSION:
                return new JQLSorterExpression(<IJQL_LEXER_FIELD_ORDER>lexerToken);

            default:
                throw new Error("Invalid lexer token opcode type: " + JSON.stringify(lexerToken.op));

        }

    }

}