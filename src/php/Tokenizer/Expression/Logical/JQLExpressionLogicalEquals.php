<?php

namespace JQL\Tokenizer\Expression\Logical;


use JQL\Tokenizer\EJQLLexerExpressionTypes;
use JQL\Tokenizer\EJQLLexerOperatorComparisionType;
use JQL\Tokenizer\EJQLLexerOperatorLogicalType;
use JQL\Tokenizer\EJQLQueryExecutionContext;
use JQL\Tokenizer\Expression\JQLExpressionLogical;

class JQLExpressionLogicalEquals extends JQLExpressionLogical
{

    /**
     * @param $queryExecutionContext
     *
     * @return string
     */
    public function toString($queryExecutionContext)
    {
        $leftStringified = $this->left->toString($queryExecutionContext);
        $rightStringified = $this->right->toString($queryExecutionContext);

        switch ($queryExecutionContext) {
            case EJQLQueryExecutionContext::CLIENT_SIDE:
                return $leftStringified . ' == ' . $rightStringified;
                break;
            case EJQLQueryExecutionContext::SERVER_SIDE:
            case EJQLQueryExecutionContext::ANY:
            default:

                if ($this->right->getExpressionType() === EJQLLexerExpressionTypes::NULL) {

                    return $leftStringified . ' IS NULL';

                } else {

                    return $leftStringified . ' = ' . $rightStringified;

                }

                break;
        }

    }

    /**
     * @return string
     */
    public function getOperator()
    {
        return EJQLLexerOperatorComparisionType::EQUALS;
    }
}