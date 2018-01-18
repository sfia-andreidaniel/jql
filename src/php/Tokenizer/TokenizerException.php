<?php

namespace JQL\Tokenizer;

class TokenizerException extends \Exception
{

    const ERR_BINDING_NAME_IS_NOT_DEFINED = 1;
    const ERR_VALUE_IS_NOT_A_TOKENIZED_OPCODE = 2;
}