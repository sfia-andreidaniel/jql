<?php

namespace JQL\RemoteQuery;

use JQL\Authorization\AuthorizationToken;

interface RemoteQueryExecutorInterface
{
    /**
     * @param AuthorizationToken $authorization
     *
     * @return array
     */
    public function execute( AuthorizationToken $authorization );
}