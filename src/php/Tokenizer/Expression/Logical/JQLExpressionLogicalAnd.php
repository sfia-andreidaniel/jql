<?php

namespace JQL\Tokenizer\Expression\Logical;


use JQL\Tokenizer\EJQLLexerOperatorLogicalType;
use JQL\Tokenizer\Expression\JQLExpressionLogical;

class JQLExpressionLogicalAnd extends JQLExpressionLogical
{

    /**
     * @return string
     */
    public function toString()
    {
        return $this->left->toString() . ' && ' . $this->right->toString();
    }

    /**
     * @return string
     */
    public function getOperator()
    {
        return EJQLLexerOperatorLogicalType::OP_AND;
    }
}