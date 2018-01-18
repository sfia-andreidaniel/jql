<?php

namespace JQL\Authorization;

class AuthorizationException extends \Exception
{

    const ERR_INVALID_ARGUMENT = 1;
    const ERR_INVALID_TOKEN_TYPE = 2;
}