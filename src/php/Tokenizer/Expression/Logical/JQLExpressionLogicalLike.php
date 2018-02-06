<?php

namespace JQL\Tokenizer\Expression\Logical;


use JQL\Tokenizer\EJQLLexerOperatorComparisionType;
use JQL\Tokenizer\EJQLQueryExecutionContext;
use JQL\Tokenizer\Expression\JQLExpressionLogical;

class JQLExpressionLogicalLike extends JQLExpressionLogical
{

    /**
     * @param string $queryExecutionContext
     *
     * @return string
     */
    public function toString($queryExecutionContext)
    {
        $leftStringified = $this->left->toString($queryExecutionContext);
        $rightStringified = $this->right->toString($queryExecutionContext);

        switch ($queryExecutionContext) {

            case EJQLQueryExecutionContext::CLIENT_SIDE:
                return $leftStringified . ' LIKE ' . $rightStringified;
                break;

            case EJQLQueryExecutionContext::SERVER_SIDE:
            case EJQLQueryExecutionContext::ANY:
            default:
                return $leftStringified . ' LIKE ' . $rightStringified;
                break;
        }
    }

    /**
     * @return string
     */
    public function getOperator()
    {
        return EJQLLexerOperatorComparisionType::LIKE;
    }
}