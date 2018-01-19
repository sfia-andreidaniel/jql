<?php

namespace JQL\Tokenizer\Statement;

use JQL\Tokenizer\EJQLLexerStatementTypes;
use JQL\Tokenizer\Expression\JQLExpressionBinding;
use JQL\Tokenizer\Expression\JQLExpressionFunctionCall;
use JQL\Tokenizer\JQLExpression;
use JQL\Tokenizer\JQLLexerFactory;
use JQL\Tokenizer\JQLLimit;
use JQL\Tokenizer\JQLTableReference;
use JQL\Tokenizer\Sorter\JQLSorterStrategy;
use JQL\Tokenizer\Statement;

class JQLStatementDelete extends Statement
{

    /**
     * @var JQLTableReference
     */
    private $table;

    /**
     * @var JQLExpression
     */
    private $filter;

    /**
     * @var JQLSorterStrategy
     */
    private $sorter;

    /**
     * @var JQLLimit
     */
    private $limit;

    /**
     * JQLStatementDelete constructor.
     *
     * @param array $token
     *
     * @throws \JQL\Tokenizer\TokenizerException
     */
    public function __construct(array $token)
    {

        $this->table = JQLLexerFactory::create($token['table']);

        if (isset($token['where'])) {
            $this->filter = JQLLexerFactory::create($token['where']);
        }

        if (isset($token['orderBy'])) {
            $this->sorter = JQLLexerFactory::create($token['orderBy']);
        }

        if (isset($token['limit'])) {
            $this->limit = JQLLexerFactory::create($token['limit']);
        }
    }

    /**
     * @return string
     */
    public function getStatementType()
    {
        return EJQLLexerStatementTypes::DELETE;
    }

    /**
     * @return JQLTableReference
     */
    public function getTable() {
        return $this->table;
    }

    /**
     * @return JQLExpression|null
     */
    public function getFilter() {
        return $this->filter;
    }

    /**
     * @return JQLSorterStrategy|null
     */
    public function getSorter() {
        return $this->sorter;
    }

    /**
     * @return JQLLimit|null
     */
    public function getLimit() {
        return $this->limit;
    }

    /**
     * @return JQLExpressionBinding[]
     */
    public function getBindings()
    {
        $result = [];

        if ($this->filter) {
            for ($bindings = $this->filter->getBindings(), $i = 0, $len = count($bindings); $i < $len; $i++) {
                $result[] = $bindings[ $i ];
            }

        }

        if ($this->sorter) {
            if (!$this->sorter->isRandom()) {
                for ($sorterByExpression = $this->sorter, $i = 0, $expressions = $sorterByExpression->getSortExpressions(), $len = count($expressions); $i < $len; $i++) {
                    for ($j = 0, $bindings = $expressions[ $i ]->getExpression()->getBindings(), $n = count($bindings); $j < $n; $j++) {
                        $result[] = $bindings[ $i ];
                    }
                }
            }
        }

        return $result;

    }

    /**
     * @return JQLExpressionFunctionCall[]
     */
    public function getFunctions()
    {
        $result = [];

        if ($this->filter) {
            for ($functions = $this->filter->getFunctions(), $i = 0, $len = count($functions); $i < $len; $i++) {
                $result[] = $functions[ $i ];
            }
        }

        if ($this->sorter) {
            if (!$this->sorter->isRandom()) {
                for ($sorterByExpression = $this->sorter, $i = 0, $expressions = $sorterByExpression->getSortExpressions(), $len = count(expressions); $i < $len; $i++) {
                    for ($j = 0, $functions = $expressions[ $i ]->getExpression()->getFunctions(), $n = count($functions); $j < $n; $j++) {
                        $result[] = $functions[ $i ];
                    }
                }
            }
        }


        return $result;

    }

    public function getIdentifiers()
    {
        $result = [];

        if (null !== $this->filter) {
            for ($identifiers = $this->filter->getIdentifiers(), $i = 0, $len = count($identifiers); $i < $len; $i++) {
                $result[] = $identifiers[ $i ];
            }
        }

        if (null !== $this->sorter) {
            if (!$this->sorter->isRandom()) {
                for ($sorterByExpression = $this->sorter, $i = 0, $expressions = $sorterByExpression->getSortExpressions(), $len = count($expressions); $i < $len; $i++) {
                    for ($j = 0, $identifiers = $expressions[ $i ]->getExpression()->getIdentifiers(), $n = count($identifiers); $j < $n; $j++) {
                        $result[] = $identifiers[ $j ];
                    }
                }
            }
        }

        return $result;
    }

}