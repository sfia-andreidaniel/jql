<?php

namespace JQL\Tokenizer\Statement;

use JQL\Expression\JQLExpressionBinding;
use JQL\Expression\JQLExpressionFunctionCall;
use JQL\Expression\JQLExpressionIdentifier;
use JQL\Tokenizer\JQLTableReference;
use JQL\Tokenizer\Statement;

class JQLStatementUpdate extends Statement
{

    /**
     * @return string
     */
    public function getStatementType()
    {
        // TODO: Implement getStatementType() method.
    }

    /**
     * @return JQLExpressionBinding[]
     */
    public function getBindings()
    {
        // TODO: Implement getBindings() method.
    }

    /**
     * @return JQLExpressionFunctionCall[]
     */
    public function getFunctions()
    {
        // TODO: Implement getFunctions() method.
    }

    /**
     * @return JQLExpressionIdentifier[]
     */
    public function getIdentifiers()
    {
        // TODO: Implement getIdentifiers() method.
    }

    /**
     * @return JQLTableReference
     */
    public function getTable()
    {
        // TODO: Implement getTable() method.
    }
}