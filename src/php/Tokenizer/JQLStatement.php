<?php

namespace JQL\Tokenizer;

use JQL\Assertion\Assertion;
use JQL\Tokenizer\Expression\JQLExpressionBinding;
use JQL\Tokenizer\Expression\JQLExpressionFunctionCall;
use JQL\Tokenizer\Expression\JQLExpressionIdentifier;

abstract class JQLStatement extends JQLOpcode
{

    /**
     * @var array
     */
    private $tokenizedStatement;

    /**
     * @var string
     */
    private $id;

    /**
     * @var boolean
     */
    private $remote;

    /**
     * Statement constructor.
     *
     * @param array $token
     *
     * @throws \JQL\Assertion\AssertionException
     */
    public function __construct(array $token)
    {

        Assertion::assertIsArray($token, 'A parsed JQL token must always be of type array!');
        Assertion::assertIsBooleanKey($token, 'remote');

        $this->remote = $token['remote'];
        $this->tokenizedStatement = $token;
        $this->id = md5(json_encode($token));
    }

    /**
     * @return string
     */
    public abstract function getStatementType();

    /**
     * @return string
     */
    public function getOpcodeType()
    {
        return EJQLLexerOpcodeTypes::STATEMENT;
    }

    /**
     * @return boolean
     */
    public function isRemote()
    {
        return $this->isRemote();
    }

    /**
     * @return JQLExpressionBinding[]
     */
    public abstract function getBindings();

    /**
     * @return JQLExpressionFunctionCall[]
     */
    public abstract function getFunctions();

    /**
     * @return JQLExpressionIdentifier[]
     */
    public abstract function getIdentifiers();

    /**
     * @return JQLTableReference
     */
    public abstract function getTable();

    /**
     * @return array
     */
    public function getTokenizedStatement()
    {
        return $this->tokenizedStatement;
    }

    /**
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }
}