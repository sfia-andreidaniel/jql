<?php

namespace JQL\Tokenizer\Expression\Logical;


use JQL\Tokenizer\EJQLLexerOperatorComparisionType;
use JQL\Tokenizer\Expression\JQLExpressionLogical;

class JQLExpressionLogicalGreaterThen extends JQLExpressionLogical
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

        return $leftStringified . ' > ' . $rightStringified;
    }

    /**
     * @return string
     */
    public function getOperator()
    {
        return EJQLLexerOperatorComparisionType::GT;
    }
}