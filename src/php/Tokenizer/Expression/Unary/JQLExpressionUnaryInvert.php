<?php

namespace JQL\Tokenizer\Expression\Unary;


use JQL\Tokenizer\Expression\JQLExpressionUnary;
use JQL\Tokenizer\Statement\EJQLLexerOperatorUnaryType;

class JQLExpressionUnaryInvert extends JQLExpressionUnary
{

    /**
     * @param $queryExecutionContext
     *
     * @return string
     */
    public function toString( $queryExecutionContext )
    {
        return '-' . $this->operand->toString( $queryExecutionContext );
    }

    /**
     * @return string
     */
    public function getOperator()
    {
        return EJQLLexerOperatorUnaryType::INVERT;
    }
}