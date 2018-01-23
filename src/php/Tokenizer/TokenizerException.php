<?php

namespace JQL\Tokenizer;

class TokenizerException extends \Exception
{

    const ERR_BINDING_NAME_IS_NOT_DEFINED = 1;
    const ERR_VALUE_IS_NOT_A_TOKENIZED_OPCODE = 2;
    const ERR_CREATING_UNARY_EXPRESSION = 3;
    const ERR_CREATE_LOGICAL_EXPRESSION = 4;
    const ERR_CREATE_MATH_EXPRESSION = 5;
    const ERR_UNKNOWN_EXPRESSION_TYPE = 6;
    const ERR_INVALID_SELECT_FIELDS_TYPE = 7;
    const ERR_LEXER_TOKEN_ORDER_BY = 8;
    const ERR_CREATE_TOKENIZED_CLASS = 9;
}