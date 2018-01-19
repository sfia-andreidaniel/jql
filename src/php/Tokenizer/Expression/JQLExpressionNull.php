<?php

namespace JQL\Tokenizer\Expression;


use JQL\Tokenizer\EJQLLexerExpressionTypes;
use JQL\Tokenizer\JQLExpression;

class JQLExpressionNull extends JQLExpression
{

    /**
     * @return string
     */
    public function getExpressionType()
    {
        return EJQLLexerExpressionTypes::NULL;
    }

    /**
     * @return JQLExpressionBinding[]
     */
    public function getBindings()
    {
        return [];
    }

    /**
     * @return JQLExpressionFunctionCall[]
     */
    public function getFunctions()
    {
        return [];
    }

    /**
     * @return JQLExpressionIdentifier[]
     */
    public function getIdentifiers()
    {
        return [];
    }

    /**
     * @return string
     */
    public function toString()
    {
        return 'null';
    }

}