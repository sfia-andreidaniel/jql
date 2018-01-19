<?php

namespace JQL\Tokenizer;


class EJQLLexerExpressionTypes
{
    const NUMBER        = "number";
    const BOOLEAN       = "boolean";
    const NULL          = "null";
    const STRING        = "string";
    const UNARY         = "unary";
    const LOGICAL       = "logical";
    const MATH          = "math";
    const GROUP         = "group";
    const IDENTIFIER    = "identifier";
    const BINDING       = "binding";
    const FUNCTION_CALL = "function_call";
}