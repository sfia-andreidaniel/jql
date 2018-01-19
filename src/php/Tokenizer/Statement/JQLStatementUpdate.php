<?php

namespace JQL\Tokenizer\Statement;

use JQL\Tokenizer\EJQLLexerStatementTypes;
use JQL\Tokenizer\Expression\JQLExpressionBinding;
use JQL\Tokenizer\Expression\JQLExpressionFunctionCall;
use JQL\Tokenizer\Expression\JQLExpressionIdentifier;
use JQL\Tokenizer\JQLExpression;
use JQL\Tokenizer\JQLLexerFactory;
use JQL\Tokenizer\JQLLimit;
use JQL\Tokenizer\JQLTableReference;
use JQL\Tokenizer\Sorter\JQLSorterStrategy;
use JQL\Tokenizer\Statement;
use JQL\Tokenizer\Statement\Update\JQLStatementUpdateDelayedOption;
use JQL\Tokenizer\Statement\Update\JQLStatementUpdateField;

class JQLStatementUpdate extends Statement
{

    /**
     * @var JQLTableReference
     */
    private $table;

    /**
     * JQLStatementUpdateField[]
     */
    private $fields = [];

    /**
     * @var JQLExpression
     */
    private $filter;

    /**
     * @var JQLLimit
     */
    private $limit;

    /**
     * @var JQLSorterStrategy
     */
    private $sorter;

    /**
     * @var JQLStatementUpdateDelayedOption
     */
    private $timer;

    /**
     * JQLStatementUpdate constructor.
     *
     * @param array $token
     *
     * @throws \JQL\Tokenizer\TokenizerException
     */
    public function __construct(array $token)
    {
        $this->table = JQLLexerFactory::create($token['table']);

        if (isset($token['delayed'])) {
            $this->timer = JQLLexerFactory::create($token['delayed']);
        }

        for ($i = 0, $len = count($token['fields']); $i < $len; $i++) {
            $this->fields[] = JQLLexerFactory::create($token['fields'][$i]);
        }

        if (isset($token['where'])) {
            $this->filter = JQLLexerFactory::create($token['where']);
        }

        if (isset($token['limit'])) {
            $this->limit = JQLLexerFactory::create($token['limit']);
        }

        if (isset($token['orderBy'])) {
            $this['sorter'] = JQLLexerFactory::create($token['orderBy']);
        }

    }

    /**
     * @return string
     */
    public function getStatementType()
    {
        return EJQLLexerStatementTypes::UPDATE;
    }

    /**
     * @return JQLStatementUpdateDelayedOption
     */
    public function getTimer()
    {
        return $this->timer;
    }

    /**
     * @return JQLTableReference
     */
    public function getTable()
    {
        return $this->table;
    }

    /**
     * @return JQLStatementUpdateField[]
     */
    public function getFields()
    {
        return $this->fields;
    }

    /**
     * @return JQLExpression
     */
    public function getFilter()
    {
        return $this->filter;
    }

    /**
     * @return JQLSorterStrategy
     */
    public function getSorter()
    {
        return $this->sorter;
    }

    /**
     * @return JQLLimit
     */
    public function getLimit()
    {
        return $this->limit;
    }

    /**
     * @return JQLExpressionBinding[]
     */
    public function getBindings()
    {
        $result = [];

        for ($i = 0, $len = count($this->fields); $i < $len; $i++) {

            for ($j = 0, $bindings = $this->fields[$i]->getExpression()
                                                      ->getBindings(), $n = count($bindings); $j < $n; $j++) {
                $result[] = $bindings[$j];
            }

        }

        if ($this->filter) {
            for ($i = 0, $bindings = $this->filter->getBindings(), $len = count($bindings); $i < $len; $i++) {
                $result[] = $bindings[$i];
            }
        }

        if ($this->sorter) {
            if (!$this->sorter->isRandom()) {
                for ($sorterByExpression = $this->sorter, $i = 0, $expressions = $sorterByExpression->getSortExpressions(
                ), $len = count($expressions); $i < $len; $i++) {
                    for ($j = 0, $bindings = $expressions[$i]->getExpression()
                                                             ->getBindings(), $n = count($bindings); $j < $n; $j++) {
                        $result[] = $bindings[$i];
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

        for ($i = 0, $len = count($this->fields); $i < $len; $i++) {

            for ($j = 0, $functions = $this->fields[$i]->getExpression()
                                                       ->getFunctions(), $n = count($functions); $j < $n; $j++) {
                $result[] = $functions[$j];
            }

        }

        if ($this->filter) {
            for ($i = 0, $functions = $this->filter->getFunctions(), $len = count($functions); $i < $len; $i++) {
                $result[] = $functions[$i];
            }
        }

        if ($this->sorter) {
            if (!$this->sorter->isRandom()) {
                for ($sorterByExpression = $this->sorter, $i = 0, $expressions = $sorterByExpression->getSortExpressions(
                ), $len = count($expressions); $i < $len; $i++) {
                    for ($j = 0, $functions = $expressions[$i]->getExpression()
                                                              ->getFunctions(), $n = count($functions); $j < $n; $j++) {
                        $result[] = $functions[$i];
                    }
                }
            }
        }


        return $result;
    }

    /**
     * @return JQLExpressionIdentifier[]
     */
    public function getIdentifiers()
    {
        $result = [];

        for ($i = 0, $len = count($this->fields); $i < $len; $i++) {

            for ($j = 0, $identifiers = $this->fields[$i]->getExpression()
                                                         ->getIdentifiers(), $n = count($identifiers); $j < $n; $j++) {
                $result[] = $identifiers[$j];
            }

        }

        if ($this->filter) {
            for ($i = 0, $identifiers = $this->filter->getIdentifiers(), $len = count($identifiers); $i < $len; $i++) {
                $result[] = $identifiers[$i];
            }
        }

        if ($this->sorter) {
            if (!$this->sorter->isRandom()) {
                for ($sorterByExpression = $this->sorter, $i = 0, $expressions = $sorterByExpression->getSortExpressions(
                ), $len = count($expressions); $i < $len; $i++) {
                    for ($j = 0, $identifiers = $expressions[$i]->getExpression()
                                                                ->getIdentifiers(), $n = count(
                        $identifiers
                    ); $j < $n; $j++) {
                        $result[] = $identifiers[$j];
                    }
                }
            }
        }

        return $result;
    }
}