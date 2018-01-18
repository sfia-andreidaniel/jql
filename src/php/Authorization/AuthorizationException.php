<?php

namespace JQL\Authorization;

class AuthorizationException extends \Exception
{

    const ERR_INVALID_ARGUMENT = 1;
    const ERR_INVALID_TOKEN_TYPE = 2;
    const ERR_UNAUTHORIZED_REQUEST = 3;
    const ERR_INVALID_AUTHORIZATION_TOKEN = 4;
    const ERR_FAILED_VALIDATE_TOKEN_ISSUER = 5;
}