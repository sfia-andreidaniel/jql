<?php

namespace JQL\Tokenizer;

use JQL\Tokenizer\Expression\JQLExpressionBinding;
use JQL\Tokenizer\Expression\JQLExpressionFunctionCall;
use JQL\Tokenizer\Expression\JQLExpressionIdentifier;

abstract class JQLStatement extends JQLOpcode
{

    /**
     * @var boolean
     */
    private $remote;

    /**
     * Statement constructor.
     *
     * @param array $token
     */
    public function __construct(array $token)
    {
        $this->remote = $token['remote'];
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

}