<?php

namespace JQL\Tokenizer\Expression\Logical;


use JQL\Tokenizer\EJQLLexerOperatorLogicalType;
use JQL\Tokenizer\EJQLQueryExecutionContext;
use JQL\Tokenizer\Expression\JQLExpressionLogical;

class JQLExpressionLogicalOr extends JQLExpressionLogical
{

    /**
     * @param $queryExecutionContext
     *
     * @return string
     */
    public function toString( $queryExecutionContext )
    {
        $leftStringified = $this->left->toString($queryExecutionContext);
        $rightStringified = $this->right->toString($queryExecutionContext);

        switch ($queryExecutionContext) {
            case EJQLQueryExecutionContext::CLIENT_SIDE:
                return $leftStringified . ' || ' . $rightStringified;
                break;
            case EJQLQueryExecutionContext::SERVER_SIDE:
            case EJQLQueryExecutionContext::ANY:
            default:
                return $leftStringified . ' OR ' . $rightStringified;
                break;
        }


    }

    /**
     * @return string
     */
    public function getOperator()
    {
        return EJQLLexerOperatorLogicalType::OP_OR;
    }
}