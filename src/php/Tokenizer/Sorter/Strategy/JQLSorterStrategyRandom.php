<?php

namespace JQL\Tokenizer\Sorter\Strategy;


use JQL\Tokenizer\EJQLQueryExecutionContext;
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

    /**
     * @param $queryExecutionContext - one of EJQLQueryExecutionContext constants
     *
     * @return string
     */
    public function toString($queryExecutionContext)
    {
        switch ($queryExecutionContext) {
            case EJQLQueryExecutionContext::CLIENT_SIDE:
                return 'ORDER BY RANDOM';

            case EJQLQueryExecutionContext::SERVER_SIDE:
            case EJQLQueryExecutionContext::ANY:
            default:
                return 'ORDER BY RAND()';
        }
    }
}