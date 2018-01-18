<?php

namespace JQL;

class ControllerException extends \Exception
{
    const ERR_INVALID_ACTION = 1;
    const ERR_INVALID_REQUEST_ARGUMENT = 2;
    const ERR_FAILED_PARSE_REQUEST_QUERY = 3;
}