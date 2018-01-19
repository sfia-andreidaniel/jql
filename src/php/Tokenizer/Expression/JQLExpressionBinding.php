<?php

namespace JQL\Tokenizer\Expression;

use JQL\Tokenizer\EJQLLexerExpressionTypes;
use JQL\Tokenizer\JQLExpression;

class JQLExpressionBinding extends JQLExpression
{

    /**
     * @var string
     */
    private $bindingName;

    /**
     * JQLExpressionBinding constructor.
     *
     * @param array $token
     */
    public function __construct(array $token)
    {
        $this->bindingName = $token['name'];
    }

    /**
     * @return string
     */
    public function getExpressionType()
    {
        return EJQLLexerExpressionTypes::BINDING;
    }

    /**
     * @return string
     */
    public function getBindingName()
    {
        return $this->bindingName;
    }

    /**
     * @return JQLExpressionBinding[]
     */
    public function getBindings()
    {
        return [ $this ];
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

    public function toString()
    {
        return ':' . $this->bindingName;
    }

}