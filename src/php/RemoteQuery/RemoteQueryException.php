<?php

namespace JQL\RemoteQuery;

class RemoteQueryException extends \Exception
{

    const ERR_EXECUTING_QUERY = 1;
    const ERR_STATEMENT_EXPECTED = 2;
}