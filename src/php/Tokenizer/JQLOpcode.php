<?php

namespace JQL\Tokenizer;

abstract class JQLOpcode
{

    /**
     * @return string
     */
    public abstract function getOpcodeType();

    /**
     * @param $queryExecutionContext - one of EJQLQueryExecutionContext constants
     *
     * @return string
     */
    public abstract function toString($queryExecutionContext);

}