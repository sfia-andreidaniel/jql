<?php

namespace JQL\RemoteQuery\Executor;

use JQL\Authorization\AuthorizationService;
use JQL\Authorization\AuthorizationToken;
use JQL\Controller;
use JQL\RemoteQuery\RemoteQueryException;
use JQL\RemoteQuery\RemoteQueryExecutorInterface;
use JQL\Tokenizer\EJQLLexerStatementTypes;
use JQL\Tokenizer\EJQLQueryExecutionContext;
use JQL\Tokenizer\Statement\JQLStatementUpdate;

class Update implements RemoteQueryExecutorInterface
{
    /**
     * @var Controller
     */
    private $controller;

    /**
     * @var JQLStatementUpdate
     */
    private $statement;

    /**
     * Select constructor.
     *
     * @param Controller         $controller
     * @param JQLStatementUpdate $statement
     */
    public function __construct(Controller $controller, JQLStatementUpdate $statement)
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

        $this->performAuthorizaton($authorization);

        return [
            'resultType' => EJQLLexerStatementTypes::UPDATE,
            'query'      => $this->statement->toString(EJQLQueryExecutionContext::SERVER_SIDE),
        ];
    }

    /**
     * @param AuthorizationToken $authorization
     *
     * @throws RemoteQueryException
     */
    private function performAuthorizaton(AuthorizationToken $authorization)
    {

        if ($authorization->getRole() !== AuthorizationService::AUTHORIZATION_TOKEN_ROLE_FORM_ADMIN) {
            throw new RemoteQueryException(
                'Not enough privileges to execute UPDATE statement on server!',
                RemoteQueryException::ERR_NOT_ENOUGH_PRIVILEGES
            );
        }

    }
}