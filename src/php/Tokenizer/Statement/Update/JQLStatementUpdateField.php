<?php

namespace JQL\Tokenizer\Statement\Update;


use JQL\Assertion\Assertion;
use JQL\Tokenizer\EJQLLexerOpcodeTypes;
use JQL\Tokenizer\JQLExpression;
use JQL\Tokenizer\JQLLexerFactory;
use JQL\Tokenizer\JQLOpcode;

class JQLStatementUpdateField extends JQLOpcode
{

    /**
     * @var string
     */
    private $name;

    /**
     * @var JQLExpression
     */
    private $expression;

    /**
     * JQLStatementUpdateField constructor.
     *
     * @param array $token
     *
     * @throws \JQL\Tokenizer\TokenizerException
     * @throws \JQL\Assertion\AssertionException
     */
    public function __construct(array $token)
    {

        Assertion::assertIsValidIdentifierName($token['name']);

        $this->name = $token['name'];

        $this->expression = JQLLexerFactory::create($token['expression']);

    }

    /**
     * @return string
     */
    public function getOpcodeType()
    {
        return EJQLLexerOpcodeTypes::UPDATE_FIELD;
    }

    public function getFieldName()
    {
        return $this->name;
    }

    public function getExpression()
    {
        return $this->expression;
    }

    /**
     * @param $queryExecutionContext - one of EJQLQueryExecutionContext constants
     *
     * @return string
     */
    public function toString($queryExecutionContext)
    {
        return '`' . $this->name . '` = ' . $this->expression->toString($queryExecutionContext);
    }
}