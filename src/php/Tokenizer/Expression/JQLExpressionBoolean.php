<?php

namespace JQL\Tokenizer\Expression;


use JQL\Tokenizer\EJQLLexerExpressionTypes;
use JQL\Tokenizer\JQLExpression;

class JQLExpressionBoolean extends JQLExpression
{

    /**
     * @var bool
     */
    private $value;

    /**
     * JQLExpressionBoolean constructor.
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
        return EJQLLexerExpressionTypes::BOOLEAN;
    }

    /**
     * @return JQLExpressionBinding[]
     */
    public function getBindings()
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
     * @return JQLExpressionFunctionCall[]
     */
    public function getFunctions()
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
        return $this->value
            ? 'true'
            : 'false';
    }
}