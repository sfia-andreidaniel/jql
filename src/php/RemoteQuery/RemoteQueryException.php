<?php

namespace JQL\RemoteQuery;

class RemoteQueryException extends \Exception
{

    const ERR_EXECUTING_QUERY = 1;
    const ERR_STATEMENT_EXPECTED = 2;
    const ERR_UNKNOWN_STATEMENT_TYPE = 3;
    const ERR_NOT_ENOUGH_PRIVILEGES = 4;
    const ERR_FETCH_QUERY_AUTHORIZATION_STATUS = 5;
    const ERR_BINDING_STATEMENT = 6;
}