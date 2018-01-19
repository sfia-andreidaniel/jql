<?php

namespace JQL\Tokenizer\Expression\Logical;


use JQL\Tokenizer\EJQLLexerOperatorComparisionType;
use JQL\Tokenizer\Expression\JQLExpressionLogical;

class JQLExpressionLogicalLike extends JQLExpressionLogical
{

    /**
     * @return string
     */
    public function toString()
    {
        return $this->left->toString() . ' ~= ' . $this->right->toString();
    }

    /**
     * @return string
     */
    public function getOperator()
    {
        return EJQLLexerOperatorComparisionType::LIKE;
    }
}