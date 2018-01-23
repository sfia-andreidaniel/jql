<?php

namespace JQL\Tokenizer\Statement\Select\FieldsList;


use JQL\Assertion\Assertion;
use JQL\Tokenizer\JQLLexerFactory;
use JQL\Tokenizer\Statement\Select\JQLStatementSelectField;
use JQL\Tokenizer\Statement\Select\JQLStatementSelectFieldsList;

class JQLStatementSelectFieldsListSpecific extends JQLStatementSelectFieldsList
{

    /**
     * @var JQLStatementSelectField[]
     */
    private $fields = [];


    /**
     * JQLStatementSelectFieldsListSpecific constructor.
     *
     * @param array $token
     *
     * @throws \JQL\Tokenizer\TokenizerException
     * @throws \JQL\Assertion\AssertionException
     */
    public function __construct(array $token)
    {

        Assertion::assertIsArrayAndContainsElements($token['fields']);

        for ($i = 0, $len = count($token['fields']); $i < $len; $i++) {

            $this->fields[] = JQLLexerFactory::create($token['fields'][$i]);

        }
    }

    /**
     * @return bool
     */
    public function isSelectingAllFields()
    {
        return false;
    }

    /**
     * @return JQLStatementSelectField[]
     */
    public function getFields()
    {
        return $this->fields;
    }

    /**
     * @param $queryExecutionContext - one of EJQLQueryExecutionContext constants
     *
     * @return string
     */
    public function toString($queryExecutionContext)
    {
        $result = [];

        foreach ($this->fields as $field) {
            $result[] = $field->toString($queryExecutionContext);
        }

        return implode(', ', $result);
    }
}