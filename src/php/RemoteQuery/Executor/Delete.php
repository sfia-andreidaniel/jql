<?php

namespace JQL\RemoteQuery\Executor;

use JQL\Authorization\AuthorizationService;
use JQL\Authorization\AuthorizationToken;
use JQL\Controller;
use JQL\RemoteQuery\RemoteQueryException;
use JQL\RemoteQuery\RemoteQueryExecutorInterface;
use JQL\Tokenizer\EJQLLexerStatementTypes;
use JQL\Tokenizer\EJQLQueryExecutionContext;
use JQL\Tokenizer\Statement\JQLStatementDelete;

class Delete implements RemoteQueryExecutorInterface
{
    /**
     * @var Controller
     */
    private $controller;

    /**
     * @var JQLStatementDelete
     */
    private $statement;

    /**
     * Delete constructor.
     *
     * @param Controller         $controller
     * @param JQLStatementDelete $statement
     */
    public function __construct(Controller $controller, JQLStatementDelete $statement)
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

        $this->performAuthorization( $authorization );

        return [
            'resultType' => EJQLLexerStatementTypes::DELETE,
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

        if ( $authorization->getRole() !== AuthorizationService::AUTHORIZATION_TOKEN_ROLE_FORM_ADMIN ) {

            throw new RemoteQueryException(
                'Not enough privileges to execute delete statements on backend!',
                RemoteQueryException::ERR_NOT_ENOUGH_PRIVILEGES
            );

        }

    }

}