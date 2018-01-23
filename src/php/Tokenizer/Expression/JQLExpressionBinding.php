<?php

namespace JQL\Tokenizer\Expression;

use JQL\Assertion\Assertion;
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
     *
     * @throws \JQL\Assertion\AssertionException
     */
    public function __construct(array $token)
    {
        Assertion::assertIsStringKey($token, 'name');
        Assertion::assertIsValidIdentifierName($token['name']);
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
        return [$this];
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