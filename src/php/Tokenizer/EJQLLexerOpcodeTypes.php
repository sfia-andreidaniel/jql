<?php

namespace JQL\Tokenizer;

class EJQLLexerOpcodeTypes
{
    const STATEMENT = "statement";
    const TABLE = "table_reference";
    const EXPRESSION = "expression";
    const FIELDS_LIST = "fields_list";
    const FIELD = "field";
    const UPDATE_FIELD = "update_field";
    const DELAYED_OPTION = "delayed_option";
    const LIMIT_OPTION = "limit_option";
    const ORDER_BY_OPTION = "order_by_option";
    const ORDER_BY_EXPRESSION = "order_by_expression";
}