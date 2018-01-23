<?php

namespace JQL\RemoteQuery\Executor;

use JQL\Authorization\AuthorizationService;
use JQL\Authorization\AuthorizationToken;
use JQL\Controller;
use JQL\RemoteQuery\RemoteQueryException;
use JQL\RemoteQuery\RemoteQueryExecutorInterface;
use JQL\Tokenizer\EJQLLexerStatementTypes;
use JQL\Tokenizer\EJQLQueryExecutionContext;
use JQL\Tokenizer\Statement\JQLStatementInsert;

class Insert implements RemoteQueryExecutorInterface
{

    /**
     * @var Controller
     */
    private $controller;

    /**
     * @var JQLStatementInsert
     */
    private $statement;

    /**
     * Insert constructor.
     *
     * @param Controller         $controller
     * @param JQLStatementInsert $statement
     */
    public function __construct(Controller $controller, JQLStatementInsert $statement)
    {
        $this->controller = $controller;
        $this->statement = $statement;
    }

    /**
     * @param AuthorizationToken $authorization
     *
     * @return array
     * @throws RemoteQueryException
     */
    public function execute(AuthorizationToken $authorization)
    {

        $this->performAuthorization($authorization);

        return [
            'resultType' => EJQLLexerStatementTypes::INSERT,
            'query'      => $this->statement->toString(EJQLQueryExecutionContext::SERVER_SIDE),
        ];
    }

    /**
     * @param AuthorizationToken $authorization
     *
     * @throws RemoteQueryException
     */
    private function performAuthorization(AuthorizationToken $authorization)
    {

        if ($authorization->getRole() !== AuthorizationService::AUTHORIZATION_TOKEN_ROLE_FORM_ADMIN) {
            throw new RemoteQueryException(
                'Not enough privileges to execute INSERT statement on server!',
                RemoteQueryException::ERR_NOT_ENOUGH_PRIVILEGES
            );
        }

    }
}