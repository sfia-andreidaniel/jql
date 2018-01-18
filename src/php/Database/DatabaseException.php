<?php

namespace JQL\Database;


class DatabaseException extends \Exception
{
    const ERR_STATEMENT_FAILED = 1;
    const ERR_INVALID_ARGUMENT = 2;
}