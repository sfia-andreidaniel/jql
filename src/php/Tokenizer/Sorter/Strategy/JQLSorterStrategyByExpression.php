<?php

namespace JQL\Tokenizer\Sorter\Strategy;


use JQL\Assertion\Assertion;
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
     * @throws \JQL\Assertion\AssertionException
     */
    public function __construct(array $token)
    {
        parent::__construct($token);

        Assertion::assertIsArrayAndContainsElements($token['fields']);

        for ($i = 0, $len = count($token['fields']); $i < $len; $i++) {
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
    public function getSortExpressions()
    {
        return $this->expressions;
    }

    /**
     * @param $queryExecutionContext - one of EJQLQueryExecutionContext constants
     *
     * @return string
     */
    public function toString($queryExecutionContext)
    {
        $result = [];

        foreach ($this->expressions as $expression) {
            $result[] = $expression->toString($queryExecutionContext);
        }

        return 'ORDER BY ' . implode(', ', $result);
    }
}