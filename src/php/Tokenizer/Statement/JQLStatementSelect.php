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
use JQL\Tokenizer\JQLStatement;
use JQL\Tokenizer\Statement\Select\JQLStatementSelectFieldsList;

class JQLStatementSelect extends JQLStatement
{

    /**
     * @var JQLStatementSelectFieldsList
     */
    private $fields;

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
     * @var JQLStatementSelect
     */
    private $union;

    /**
     * @var JQLStatementSelect
     */
    private $previous;


    /**
     * JQLStatementSelect constructor.
     *
     * @param array $token
     *
     * @throws \JQL\Tokenizer\TokenizerException
     * @throws \JQL\Assertion\AssertionException
     */
    public function __construct(array $token)
    {

        parent::__construct($token);

        $this->fields = JQLLexerFactory::create($token['fields']);

        if (isset($token['table'])) {

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

        if (isset($token['union'])) {
            $this->union = JQLLexerFactory::create($token['union']);
            $this->union->withPreviousStatement($this);
        }
    }

    /**
     * @return bool
     */
    public function isRemote()
    {
        if (null !== $this->previous) {
            return $this->previous->isRemote();
        } else {
            return parent::isRemote();
        }
    }

    /**
     * @return string
     */
    public function getStatementType()
    {
        return EJQLLexerStatementTypes::SELECT;
    }

    /**
     * @return JQLStatementSelectFieldsList|null
     */
    public function getFields()
    {
        return $this->fields;
    }

    /**
     * @return JQLTableReference|null
     */
    public function getTable()
    {
        return $this->table;
    }

    /**
     * @return JQLExpression|null
     */
    public function getFilter()
    {
        return $this->filter;
    }

    /**
     * @return JQLSorterStrategy|null
     */
    public function getSorter()
    {
        return $this->sorter;
    }

    /**
     * @return JQLLimit|null
     */
    public function getLimit()
    {
        return $this->limit;
    }

    /**
     * @return JQLStatementSelect|null
     */
    public function getUnion()
    {
        return $this->union;
    }

    /**
     * @param JQLStatementSelect $previous
     *
     * @return self
     */
    public function withPreviousStatement(JQLStatementSelect $previous)
    {
        $this->previous = $previous ? $previous : null;
        return $this;
    }

    /**
     * @return JQLExpressionBinding[]
     */
    public function getBindings()
    {

        $result = [];

        if (null !== $this->fields) {
            if (!$this->fields->isSelectingAllFields()) {
                for ($specificFields = $this->fields, $i = 0, $fields = $specificFields->getFields(), $len = count($fields); $i < $len; $i++) {
                    for ($j = 0, $bindings = $fields[$i]->getExpression()->getBindings(), $n = count($bindings); $j < $n; $j++) {
                        $result[] = $bindings[$j];
                    }
                }
            }
        }

        if (null !== $this->filter) {
            for ($bindings = $this->filter->getBindings(), $i = 0, $len = count($bindings); $i < $len; $i++) {
                $result = $bindings[$i];
            }
        }

        if (null !== $this->sorter) {
            if (!$this->sorter->isRandom()) {
                for ($sorterByExpression = $this->sorter, $i = 0, $expressions = $sorterByExpression->getSortExpressions(), $len = count($expressions); $i < $len; $i++) {
                    for ($j = 0, $bindings = $expressions[$i]->getExpression()->getBindings(), $n = count($bindings); $j < $n; $j++) {
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

        if (null !== $this->fields) {
            if ($this->fields->isSelectingAllFields()) {
                for ($specificFields = $this->fields, $i = 0, $fields = $specificFields->getFields(), $len = count($fields); $i < $len; $i++) {
                    for ($j = 0, $functions = $fields[$i]->getExpression()->getFunctions(), $n = count($functions); $j < $n; $j++) {
                        $result[] = $functions[$j];
                    }
                }
            }
        }

        if (null !== $this->filter) {
            for ($functions = $this->filter->getFunctions(), $i = 0, $len = count($functions); $i < $len; $i++) {
                $result[] = $functions[$i];
            }
        }

        if (null !== $this->sorter) {
            if (!$this->sorter->isRandom()) {
                for ($sorterByExpression = $this->sorter, $i = 0, $expressions = $sorterByExpression->getSortExpressions(), $len = count($expressions); $i < $len; $i++) {
                    for ($j = 0, $functions = $expressions[$i]->getExpression()->getFunctions(), $n = count($functions); $j < $n; $j++) {
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

        if (null !== $this->fields) {
            if (!$this->fields->isSelectingAllFields()) {
                for ($specificFields = $this->fields, $i = 0, $fields = $specificFields->getFields(), $len = count($fields); $i < $len; $i++) {
                    for ($j = 0, $identifiers = $fields[$i]->getExpression()->getIdentifiers(), $n = count($identifiers); $j < $n; $j++) {
                        $result[] = $identifiers[$j];
                    }
                }
            }
        }

        if (null !== $this->filter) {
            for ($identifiers = $this->filter->getIdentifiers(), $i = 0, $len = count($identifiers); $i < $len; $i++) {
                $result[] = $identifiers[$i];
            }
        }

        if (null !== $this->sorter) {
            if (!$this->sorter->isRandom()) {
                for ($sorterByExpression = $this->sorter, $i = 0, $expressions = $sorterByExpression->getSortExpressions(), $len = count($expressions); $i < $len; $i++) {
                    for ($j = 0, $identifiers = $expressions[$i]->getExpression()->getIdentifiers(), $n = count($identifiers); $j < $n; $j++) {
                        $result[] = $identifiers[$j];
                    }
                }
            }
        }

        return $result;

    }

    /**
     * @param $queryExecutionContext - one of EJQLQueryExecutionContext constants
     *
     * @return string
     */
    public function toString($queryExecutionContext)
    {
        $result = ['SELECT'];

        $result[] = $this->fields->toString($queryExecutionContext);

        if (null !== $this->table) {

            $result[] = 'FROM ' . $this->table->toString($queryExecutionContext);

            if (null !== $this->filter) {
                $result[] = 'WHERE ' . $this->filter->toString($queryExecutionContext);
            }

            if (null !== $this->sorter) {
                $result[] = $this->sorter->toString($queryExecutionContext);
            }

            if (null !== $this->limit) {
                $result[] = $this->limit->toString($queryExecutionContext);
            }

        }

        if (null !== $this->union) {

            $result[] = ['UNION'];
            $result[] = $this->union->toString($queryExecutionContext);

        }

        return implode(' ', $result);

    }
}