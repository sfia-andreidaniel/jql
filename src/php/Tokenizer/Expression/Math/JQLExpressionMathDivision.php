<?php

namespace JQL\Tokenizer\Expression\Math;


use JQL\Tokenizer\EJQLLexerOperatorMathType;
use JQL\Tokenizer\Expression\JQLExpressionMath;

class JQLExpressionMathDivision extends JQLExpressionMath
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

        return $leftStringified . ' / ' . $rightStringified;
    }

    /**
     * @return string
     */
    public function getOperator()
    {
        return EJQLLexerOperatorMathType::DIVISION;
    }
}