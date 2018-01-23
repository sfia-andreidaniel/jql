<?php

namespace JQL\Tokenizer;

use JQL\Assertion\Assertion;
use JQL\Tokenizer\Expression\JQLExpressionBinding;
use JQL\Tokenizer\Expression\JQLExpressionBoolean;
use JQL\Tokenizer\Expression\JQLExpressionFunctionCall;
use JQL\Tokenizer\Expression\JQLExpressionGroup;
use JQL\Tokenizer\Expression\JQLExpressionIdentifier;
use JQL\Tokenizer\Expression\JQLExpressionNull;
use JQL\Tokenizer\Expression\JQLExpressionNumber;
use JQL\Tokenizer\Expression\JQLExpressionString;
use JQL\Tokenizer\Expression\Logical\JQLExpressionLogicalEquals;
use JQL\Tokenizer\Expression\Logical\JQLExpressionLogicalGreaterThen;
use JQL\Tokenizer\Expression\Logical\JQLExpressionLogicalGreaterThenEquals;
use JQL\Tokenizer\Expression\Logical\JQLExpressionLogicalLike;
use JQL\Tokenizer\Expression\Logical\JQLExpressionLogicalLowerThen;
use JQL\Tokenizer\Expression\Logical\JQLExpressionLogicalLowerThenEquals;
use JQL\Tokenizer\Expression\Math\JQLExpressionMathAddition;
use JQL\Tokenizer\Expression\Math\JQLExpressionMathDifference;
use JQL\Tokenizer\Expression\Math\JQLExpressionMathDivision;
use JQL\Tokenizer\Expression\Math\JQLExpressionMathMultiply;
use JQL\Tokenizer\Expression\Unary\JQLExpressionUnaryInvert;
use JQL\Tokenizer\Expression\Unary\JQLExpressionUnaryNot;
use JQL\Tokenizer\Expression\Logical\JQLExpressionLogicalAnd;
use JQL\Tokenizer\Expression\Logical\JQLExpressionLogicalOr;
use JQL\Tokenizer\Sorter\JQLSorterExpression;
use JQL\Tokenizer\Sorter\Strategy\JQLSorterStrategyByExpression;
use JQL\Tokenizer\Sorter\Strategy\JQLSorterStrategyRandom;
use JQL\Tokenizer\Statement\EJQLLexerOperatorUnaryType;
use JQL\Tokenizer\Statement\JQLStatementDelete;
use JQL\Tokenizer\Statement\JQLStatementInsert;
use JQL\Tokenizer\Statement\JQLStatementSelect;
use JQL\Tokenizer\Statement\JQLStatementUpdate;
use JQL\Tokenizer\Statement\Select\FieldsList\JQLStatementSelectFieldsListAll;
use JQL\Tokenizer\Statement\Select\FieldsList\JQLStatementSelectFieldsListSpecific;
use JQL\Tokenizer\Statement\Select\JQLStatementSelectField;
use JQL\Tokenizer\Statement\Update\JQLStatementUpdateDelayedOption;
use JQL\Tokenizer\Statement\Update\JQLStatementUpdateField;

class JQLLexerFactory
{

    /**
     * @param array $lexerToken
     *
     * @return JQLOpcode
     * @throws TokenizerException
     */
    public static function create(array $lexerToken)
    {

        try {

            Assertion::assertIsArray($lexerToken);
            Assertion::assertIsStringKey($lexerToken, 'op');

            switch ($lexerToken['op']) {

                case EJQLLexerOpcodeTypes::STATEMENT:

                    Assertion::assertIsStringKey($lexerToken, 'type');

                    switch ($lexerToken['type']) {

                        case EJQLLexerStatementTypes::SELECT:

                            return new JQLStatementSelect($lexerToken);

                            break;

                        case EJQLLexerStatementTypes::INSERT:

                            return new JQLStatementInsert($lexerToken);

                            break;

                        case EJQLLexerStatementTypes::UPDATE:

                            return new JQLStatementUpdate($lexerToken);

                            break;

                        case EJQLLexerStatementTypes::DELETE:

                            return new JQLStatementDelete($lexerToken);

                            break;
                    }

                    break;

                case EJQLLexerOpcodeTypes::TABLE:

                    return new JQLTableReference($lexerToken);

                    break;

                case EJQLLexerOpcodeTypes::EXPRESSION:

                    Assertion::assertIsStringKey($lexerToken, 'type');

                    switch ($lexerToken['type']) {

                        case EJQLLexerExpressionTypes::NUMBER:
                            return new JQLExpressionNumber($lexerToken);
                            break;

                        case EJQLLexerExpressionTypes::BOOLEAN:
                            return new JQLExpressionBoolean($lexerToken);
                            break;

                        case EJQLLexerExpressionTypes::NULL:
                            return new JQLExpressionNull();
                            break;

                        case EJQLLexerExpressionTypes::STRING:
                            return new JQLExpressionString($lexerToken);
                            break;

                        case EJQLLexerExpressionTypes::UNARY:

                            Assertion::assertIsStringKey($lexerToken, 'operator');

                            switch ($lexerToken['operator']) {

                                case EJQLLexerOperatorUnaryType::INVERT:
                                    return new JQLExpressionUnaryInvert($lexerToken);
                                    break;

                                case EJQLLexerOperatorUnaryType::NOT:
                                    return new JQLExpressionUnaryNot($lexerToken);
                                    break;

                                default:
                                    throw new TokenizerException(
                                        'Cannot create unary expression from token: ' . json_encode($lexerToken),
                                        TokenizerException::ERR_CREATING_UNARY_EXPRESSION
                                    );

                            }
                            break;

                        case EJQLLexerExpressionTypes::LOGICAL:

                            Assertion::assertIsStringKey($lexerToken, 'operator');

                            switch ($lexerToken['operator']) {

                                case EJQLLexerOperatorLogicalType::OP_AND:
                                    return new JQLExpressionLogicalAnd($lexerToken);
                                    break;

                                case EJQLLexerOperatorLogicalType::OP_OR:
                                    return new JQLExpressionLogicalOr($lexerToken);
                                    break;

                                case EJQLLexerOperatorComparisionType::EQUALS:
                                    return new JQLExpressionLogicalEquals($lexerToken);
                                    break;

                                case EJQLLexerOperatorComparisionType::GT:
                                    return new JQLExpressionLogicalGreaterThen($lexerToken);
                                    break;

                                case EJQLLexerOperatorComparisionType::GTE:
                                    return new JQLExpressionLogicalGreaterThenEquals($lexerToken);
                                    break;

                                case EJQLLexerOperatorComparisionType::LT:
                                    return new JQLExpressionLogicalLowerThen($lexerToken);
                                    break;

                                case EJQLLexerOperatorComparisionType::LTE:
                                    return new JQLExpressionLogicalLowerThenEquals($lexerToken);
                                    break;

                                case EJQLLexerOperatorComparisionType::LIKE:
                                    return new JQLExpressionLogicalLike($lexerToken);
                                    break;

                                default:
                                    throw new TokenizerException(
                                        'Cannot create logical expression from token: ' . json_encode($lexerToken),
                                        TokenizerException::ERR_CREATE_LOGICAL_EXPRESSION
                                    );
                            }

                            break;

                        case EJQLLexerExpressionTypes::MATH:

                            Assertion::assertIsStringKey($lexerToken, 'operator');

                            switch ($lexerToken['operator']) {

                                case EJQLLexerOperatorMathType::ADDITION:
                                    return new JQLExpressionMathAddition($lexerToken);
                                    break;

                                case EJQLLexerOperatorMathType::DIFFERENCE:
                                    return new JQLExpressionMathDifference($lexerToken);
                                    break;

                                case EJQLLexerOperatorMathType::DIVISION:
                                    return new JQLExpressionMathDivision($lexerToken);
                                    break;

                                case EJQLLexerOperatorMathType::MULTIPLY:
                                    return new JQLExpressionMathMultiply($lexerToken);
                                    break;

                                default:
                                    throw new TokenizerException(
                                        'Cannot create math expression from token: ' . json_encode($lexerToken),
                                        TokenizerException::ERR_CREATE_MATH_EXPRESSION
                                    );

                            }

                            break;

                        case EJQLLexerExpressionTypes::GROUP:
                            return new JQLExpressionGroup($lexerToken);
                            break;

                        case EJQLLexerExpressionTypes::IDENTIFIER:
                            return new JQLExpressionIdentifier($lexerToken);
                            break;

                        case EJQLLexerExpressionTypes::BINDING:
                            return new JQLExpressionBinding($lexerToken);
                            break;

                        case EJQLLexerExpressionTypes::FUNCTION_CALL:
                            return new JQLExpressionFunctionCall($lexerToken);
                            break;

                        default:
                            throw new TokenizerException(
                                'Unknown expression type: ' . json_encode($lexerToken),
                                TokenizerException::ERR_UNKNOWN_EXPRESSION_TYPE
                            );
                    }

                    break;

                case EJQLLexerOpcodeTypes::FIELDS_LIST:

                    Assertion::assertIsStringKey($lexerToken, 'type');

                    switch ($lexerToken['type']) {

                        case EJQLLexerFieldTypes::ALL_FIELDS:
                            return new JQLStatementSelectFieldsListAll($lexerToken);
                            break;

                        case EJQLLexerFieldTypes::SPECIFIC_FIELDS:
                            return new JQLStatementSelectFieldsListSpecific($lexerToken);
                            break;

                        default:
                            throw new TokenizerException(
                                'Invalid lexer token select fields type: ' . json_encode($lexerToken),
                                TokenizerException::ERR_INVALID_SELECT_FIELDS_TYPE
                            );
                    }

                    break;

                case EJQLLexerOpcodeTypes::FIELD:
                    return new JQLStatementSelectField($lexerToken);
                    break;

                case EJQLLexerOpcodeTypes::UPDATE_FIELD:
                    return new JQLStatementUpdateField($lexerToken);
                    break;

                case EJQLLexerOpcodeTypes::DELAYED_OPTION:
                    return new JQLStatementUpdateDelayedOption($lexerToken);
                    break;

                case EJQLLexerOpcodeTypes::LIMIT_OPTION:
                    return new JQLLimit($lexerToken);
                    break;

                case EJQLLexerOpcodeTypes::ORDER_BY_OPTION:

                    Assertion::assertIsStringKey($lexerToken, 'type');

                    switch ($lexerToken['type']) {

                        case EJQLLexerOrderingStrategy::RANDOM:
                            return new JQLSorterStrategyRandom($lexerToken);
                            break;

                        case EJQLLexerOrderingStrategy::ORDERED:
                            return new JQLSorterStrategyByExpression($lexerToken);
                            break;

                        default:
                            throw new TokenizerException(
                                'Invalid lexer token ORDER BY: ' . json_encode($lexerToken),
                                TokenizerException::ERR_LEXER_TOKEN_ORDER_BY
                            );
                            break;

                    }

                    break;

                case EJQLLexerOpcodeTypes::ORDER_BY_EXPRESSION:
                    return new JQLSorterExpression($lexerToken);
                    break;

                default:
                    throw new TokenizerException(
                        'Invalid lexer token opcode type: ' . json_encode($lexerToken['op']),
                        TokenizerException::ERR_VALUE_IS_NOT_A_TOKENIZED_OPCODE
                    );
            }

        } catch (TokenizerException $e) {

            throw $e;

        } catch (\Exception $e) {

            throw new TokenizerException(
                'Failed creating token class representation: ' . $e->getMessage(),
                TokenizerException::ERR_CREATE_TOKENIZED_CLASS,
                $e
            );

        }

    }

}