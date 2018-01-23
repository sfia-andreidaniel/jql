<?php

namespace JQL\Tokenizer\Expression;

use JQL\Assertion\Assertion;
use JQL\Tokenizer\EJQLLexerExpressionTypes;
use JQL\Tokenizer\JQLExpression;

class JQLExpressionIdentifier extends JQLExpression
{

    /**
     * @var string
     */
    private $identifierName;

    /**
     * JQLExpressionIdentifier constructor.
     *
     * @param array $token
     *
     * @throws \JQL\Assertion\AssertionException
     */
    public function __construct(array $token)
    {
        Assertion::assertIsStringKey($token, 'name');
        Assertion::assertIsValidIdentifierName($token['name']);
        $this->identifierName = $token['name'];
    }

    /**
     * @return string
     */
    public function getExpressionType()
    {
        return EJQLLexerExpressionTypes::IDENTIFIER;
    }

    /**
     * @return mixed|string
     */
    public function getIdentifierName()
    {
        return $this->identifierName;
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
        return [$this];
    }

    /**
     * @return string
     */
    public function toString()
    {
        return $this->identifierName;
    }
}