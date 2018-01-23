<?php

namespace JQL\RemoteQuery;

class RemoteQueryException extends \Exception
{

    const ERR_EXECUTING_QUERY = 1;
    const ERR_STATEMENT_EXPECTED = 2;
    const ERR_UNKNOWN_STATEMENT_TYPE = 3;
}