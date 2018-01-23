<?php

namespace JQL\Tokenizer\Expression;


use JQL\Tokenizer\EJQLLexerExpressionTypes;
use JQL\Tokenizer\JQLExpression;

class JQLExpressionNumber extends JQLExpression
{

    /**
     * @var int|float
     */
    private $value;

    /**
     * JQLExpressionNumber constructor.
     *
     * @param array $token
     */
    public function __construct(array $token)
    {
        $this->value = $token['value'];
    }

    /**
     * @return string
     */
    public function getExpressionType()
    {
        return EJQLLexerExpressionTypes::NUMBER;
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
     * @param $queryExecutionContext
     *
     * @return string
     */
    public function toString( $queryExecutionContext )
    {
        return (string)$this->value;
    }

}