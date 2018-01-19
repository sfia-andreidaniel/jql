<?php

namespace JQL\Tokenizer\Sorter\Strategy;


use JQL\Tokenizer\Sorter\JQLSorterExpression;
use JQL\Tokenizer\Sorter\JQLSorterStrategy;

class JQLSorterStrategyRandom extends JQLSorterStrategy
{

    /**
     * @return boolean
     */
    public function isRandom()
    {
        return true;
    }

    /**
     * @return JQLSorterExpression[]
     */
    public function getSortExpressions()
    {
        return [];
    }
}