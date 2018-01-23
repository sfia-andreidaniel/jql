<?php

namespace JQL\Tokenizer\Sorter;


use JQL\Assertion\Assertion;
use JQL\Tokenizer\EJQLLexerOpcodeTypes;
use JQL\Tokenizer\EJQLLexerOrderDirection;
use JQL\Tokenizer\EJQLLexerOrderingStrategy;
use JQL\Tokenizer\JQLExpression;
use JQL\Tokenizer\JQLLexerFactory;
use JQL\Tokenizer\JQLOpcode;

class JQLSorterExpression extends JQLOpcode
{

    /**
     * @var string
     */
    private $direction;

    /**
     * @var JQLExpression
     */
    private $expression;

    /**
     * JQLSorterExpression constructor.
     *
     * @param array $token
     *
     * @throws \JQL\Tokenizer\TokenizerException
     * @throws \JQL\Assertion\AssertionException
     */
    public function __construct(array $token)
    {
        Assertion::assertIsStringKey($token, 'direction');

        $this->direction = $token['direction'];
        $this->expression = JQLLexerFactory::create($token['expression']);
    }

    public function getOpcodeType()
    {
        return EJQLLexerOpcodeTypes::ORDER_BY_EXPRESSION;
    }

    /**
     * @return string
     */
    public function getDirection()
    {
        return $this->direction;
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
        $result = $this->expression->toString($queryExecutionContext);

        switch ($this->direction) {

            case EJQLLexerOrderDirection::DESCENDING:
                return $result . ' DESC';
                break;

            case EJQLLexerOrderDirection::ASCENDING:
            default:
                return $result . ' ASC';
                break;

        }
    }
}