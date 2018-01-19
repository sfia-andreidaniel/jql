<?php

namespace JQL\Tokenizer\Statement\Select\FieldsList;


use JQL\Tokenizer\Statement\Select\JQLStatementSelectField;
use JQL\Tokenizer\Statement\Select\JQLStatementSelectFieldsList;

class JQLStatementSelectFieldsListAll extends JQLStatementSelectFieldsList
{

    public function __construct( array $token )
    {
        // NOTHING.
    }

    /**
     * @return bool
     */
    public function isSelectingAllFields()
    {
        return true;
    }

    /**
     * @return JQLStatementSelectField[]
     */
    public function getFields()
    {
        return [];
    }
}