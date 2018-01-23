<?php

namespace JQL\Tokenizer\Expression\Math;


use JQL\Tokenizer\EJQLLexerOperatorMathType;
use JQL\Tokenizer\Expression\JQLExpressionMath;

class JQLExpressionMathDifference extends JQLExpressionMath
{

    /**
     * @param string $queryExecutionContext
     *
     * @return string
     */
    public function toString( $queryExecutionContext )
    {
        $leftStringified = $this->left->toString($queryExecutionContext);
        $rightStringified = $this->right->toString($queryExecutionContext);

        return $leftStringified . ' - ' . $rightStringified;
    }

    /**
     * @return string
     */
    public function getOperator()
    {
        return EJQLLexerOperatorMathType::DIFFERENCE;
    }
}