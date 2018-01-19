<?php

namespace JQL\Tokenizer\Statement;

use JQL\Tokenizer\EJQLLexerStatementTypes;
use JQL\Tokenizer\Expression\JQLExpressionBinding;
use JQL\Tokenizer\Expression\JQLExpressionFunctionCall;
use JQL\Tokenizer\Expression\JQLExpressionIdentifier;
use JQL\Tokenizer\JQLLexerFactory;
use JQL\Tokenizer\JQLTableReference;
use JQL\Tokenizer\Statement;
use JQL\Tokenizer\Statement\Update\JQLStatementUpdateField;

class JQLStatementInsert extends Statement
{

    /**
     * @var JQLTableReference
     */
    private $table;

    /**
     * @var JQLStatementUpdateField[]
     */
    private $fields = [];

    /**
     * JQLStatementInsert constructor.
     *
     * @param array $statement
     *
     * @throws \JQL\Tokenizer\TokenizerException
     */
    public function __construct(array $statement)
    {
        $this->table = JQLLexerFactory::create($statement['table']);

        for ($i = 0, $len = count($statement['fields']); $i < $len; $i++) {
            $this->fields[] = JQLLexerFactory::create($statement['fields'][$i]);
        }
    }

    /**
     * @return string
     */
    public function getStatementType()
    {
        return EJQLLexerStatementTypes::INSERT;
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

        return $result;

    }

    /**
     * @return JQLExpressionIdentifier[]
     */
    public function getIdentifiers()
    {
        $result = [];

        for ($i = 0, $len = count($this->fields); $i < $len; $i++) {
            for ($j = 0, $identifiers = $this->fields[ $i ]->getExpression()->getIdentifiers(), $n = count($identifiers); $j < $n; $j++) {
            $result[] = $identifiers[ $j ];
        }
        }

        return $result;

    }

}