<?php

namespace JQL\Tokenizer;

use JQL\Assertion\Assertion;

class JQLTableReference extends JQLOpcode
{

    /**
     * @var string
     */
    public $name;

    /**
     * JQLTableReference constructor.
     *
     * @param array $token
     *
     * @throws \JQL\Assertion\AssertionException
     */
    public function __construct(array $token)
    {
        Assertion::assertIsStringKey($token, 'name');
        Assertion::assertIsValidIdentifierName($token['name'], 'Invalid table name!');
        $this->name = $token['name'];
    }

    /**
     * @return string
     */
    public function getOpcodeType()
    {
        return EJQLLexerOpcodeTypes::TABLE;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param $queryExecutionContext
     *
     * @return string
     */
    public function toString( $queryExecutionContext )
    {
        return '`' . $this->name . '`';
    }
}