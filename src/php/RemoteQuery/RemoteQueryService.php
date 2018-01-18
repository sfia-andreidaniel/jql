<?php

namespace JQL\RemoteQuery;

use JQL\Authorization\AuthorizationToken;
use JQL\Controller;

class RemoteQueryService
{
    /**
     * @var Controller
     */
    private $controller;

    /**
     * RemoteQueryService constructor.
     *
     * @param Controller $controller
     */
    public function __construct(Controller $controller)
    {
        $this->controller = $controller;
    }

    /**
     * @param array              $query
     * @param array              $queryBindings
     * @param AuthorizationToken $auth
     *
     * @return mixed
     */
    public function executeQuery(array $query, array $queryBindings, AuthorizationToken $auth)
    {

        $statement = ( new RemoteQueryBuilder() )->createFromTokenizedQuery( $query );

    }

}