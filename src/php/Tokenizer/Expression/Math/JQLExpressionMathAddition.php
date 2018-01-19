<?php

namespace JQL\Tokenizer\Expression\Math;


use JQL\Tokenizer\EJQLLexerOperatorMathType;
use JQL\Tokenizer\Expression\JQLExpressionMath;

class JQLExpressionMathAddition extends JQLExpressionMath
{

    /**
     * @return string
     */
    public function toString()
    {
        return $this->left->toString() . ' + ' . $this->right->toString();
    }

    /**
     * @return string
     */
    public function getOperator()
    {
        return EJQLLexerOperatorMathType::ADDITION;
    }
}