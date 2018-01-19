<?php

namespace JQL\Tokenizer\Sorter\Strategy;


use JQL\Tokenizer\JQLLexerFactory;
use JQL\Tokenizer\Sorter\JQLSorterExpression;
use JQL\Tokenizer\Sorter\JQLSorterStrategy;

class JQLSorterStrategyByExpression extends JQLSorterStrategy
{

    /**
     * @var JQLSorterExpression[]
     */
    private $expressions = [];

    /**
     * JQLSorterStrategyByExpression constructor.
     *
     * @param array $token
     *
     * @throws \JQL\Tokenizer\TokenizerException
     */
    public function __construct(array $token)
    {
        parent::__construct($token);

        for ( $i=0, $len = count($token['fields']); $i<$len; $i++ ) {
            $this->expressions[] = JQLLexerFactory::create($token['fields'][$i]);
        }

    }

    /**
     * @return boolean
     */
    public function isRandom()
    {
        return false;
    }

    /**
     * @return JQLSorterExpression[]
     */
    public function getSortExpressions() {
        return $this->expressions;
    }
}