<?php

namespace JQL\Tokenizer\Statement\Select;


use JQL\Assertion\Assertion;
use JQL\Tokenizer\EJQLLexerOpcodeTypes;
use JQL\Tokenizer\JQLExpression;
use JQL\Tokenizer\JQLLexerFactory;
use JQL\Tokenizer\JQLOpcode;

class JQLStatementSelectField extends JQLOpcode
{

    /**
     * @var string|null
     */
    private $literal;

    /**
     * @var JQLExpression
     */
    private $expression;

    /**
     * JQLStatementSelectField constructor.
     *
     * @param array $token
     *
     * @throws \JQL\Tokenizer\TokenizerException
     * @throws \JQL\Assertion\AssertionException
     */
    public function __construct(array $token)
    {
        Assertion::assertIsValidLiteralNameOrNull($token['literal']);

        $this->literal = $token['literal'];
        $this->expression = JQLLexerFactory::create($token['expression']);
    }

    public function getOpcodeType()
    {
        return EJQLLexerOpcodeTypes::FIELD;
    }

    /**
     * @return null|string
     */
    public function getLiteral()
    {
        return $this->literal;
    }

    /**
     * @return JQLExpression
     */
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
        if (null === $this->literal) {
            $literal = $this->expression->getLiteral($queryExecutionContext);
        } else {
            $literal = $this->literal;
        }

        return $this->expression->toString($queryExecutionContext) . ' AS `' . $literal . '`';

    }
}