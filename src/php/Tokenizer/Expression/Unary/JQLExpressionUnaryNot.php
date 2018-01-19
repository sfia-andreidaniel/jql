<?php

namespace JQL\Tokenizer\Expression\Unary;


use JQL\Tokenizer\Expression\JQLExpressionUnary;
use JQL\Tokenizer\Statement\EJQLLexerOperatorUnaryType;

class JQLExpressionUnaryNot extends JQLExpressionUnary
{

    /**
     * @return string
     */
    public function toString()
    {
        return '!' . $this->operand->toString();
    }

    /**
     * @return string
     */
    public function getOperator()
    {
        return EJQLLexerOperatorUnaryType::NOT;
    }
}