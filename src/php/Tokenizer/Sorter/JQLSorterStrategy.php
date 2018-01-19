<?php

namespace JQL\Tokenizer\Sorter;


use JQL\Tokenizer\EJQLLexerOpcodeTypes;
use JQL\Tokenizer\JQLOpcode;

abstract class JQLSorterStrategy extends JQLOpcode
{

    /**
     * @var string
     */
    private $strategy;

    /**
     * JQLSorterStrategy constructor.
     *
     * @param array $token
     */
    public function __construct(array $token)
    {
        $this->strategy = $token['type'];
    }

    /**
     * @return string
     */
    public function getOpcodeType()
    {
        return EJQLLexerOpcodeTypes::ORDER_BY_OPTION;
    }

    /**
     * @return boolean
     */
    public abstract function isRandom();


    /**
     * @return JQLSorterExpression[]
     */
    public abstract function getSortExpressions();

}