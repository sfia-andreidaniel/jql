<?php

namespace JQL\Tokenizer\Statement\Select\FieldsList;


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
     */
    public function __construct(array $token )
    {
        for ( $i=0, $len = count($token['fields']); $i<$len; $i++ ) {

            $this->fields[] = JQLLexerFactory::create( $token['fields'][$i]);

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
    public function getFields() {
        return $this->fields;
    }
}