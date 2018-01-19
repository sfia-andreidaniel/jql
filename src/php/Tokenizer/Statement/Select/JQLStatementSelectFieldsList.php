<?php

namespace JQL\Tokenizer\Statement\Select;


use JQL\Tokenizer\EJQLLexerOpcodeTypes;
use JQL\Tokenizer\JQLOpcode;

abstract class JQLStatementSelectFieldsList extends JQLOpcode
{

    /**
     * @return string
     */
    public function getOpcodeType()
    {
        return EJQLLexerOpcodeTypes::FIELDS_LIST;
    }

    /**
     * @return bool
     */
    public abstract function isSelectingAllFields();

    /**
     * @return JQLStatementSelectField[]
     */
    public abstract function getFields();

}