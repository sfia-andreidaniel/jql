<?php

namespace JQL\Tokenizer\Sorter;


use JQL\Tokenizer\EJQLLexerOpcodeTypes;
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
     */
    public function __construct(array $token)
    {
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
}