<?php

namespace JQL\RemoteQuery\Executor;

use JQL\Authorization\AuthorizationService;
use JQL\Authorization\AuthorizationToken;
use JQL\Controller;
use JQL\RemoteQuery\RemoteQueryException;
use JQL\RemoteQuery\RemoteQueryExecutorInterface;
use JQL\RemoteQuery\RemoteQueryService;
use JQL\Tokenizer\EJQLLexerStatementTypes;
use JQL\Tokenizer\EJQLQueryExecutionContext;
use JQL\Tokenizer\Statement\JQLStatementSelect;

class Select implements RemoteQueryExecutorInterface
{
    /**
     * @var Controller
     */
    private $controller;

    /**
     * @var JQLStatementSelect
     */
    private $statement;

    /**
     * Select constructor.
     *
     * @param Controller         $controller
     * @param JQLStatementSelect $statement
     */
    public function __construct(Controller $controller, JQLStatementSelect $statement)
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

        $this->performAuthorization($authorization, $this->statement->getId());

        return [
            'resultType' => EJQLLexerStatementTypes::SELECT,
            'query'      => $this->statement->toString(EJQLQueryExecutionContext::SERVER_SIDE),
        ];
    }

    /**
     * @param AuthorizationToken $authorization
     * @param string             $statementId
     *
     * @throws RemoteQueryException
     */
    private function performAuthorization(AuthorizationToken $authorization, $statementId)
    {

        if ($authorization->getRole() === AuthorizationService::AUTHORIZATION_TOKEN_ROLE_FORM_ADMIN) {
            return;
        }

        /** @var RemoteQueryService $remoteQueryService */
        $remoteQueryService = $this->controller->getRemoteQueryService();

        if (!$remoteQueryService->isAuthorizedStatement($authorization, $statementId)) {
            throw new RemoteQueryException(
                'Statement ' . json_encode($statementId) . ' is not allowed for current privileges',
                RemoteQueryException::ERR_NOT_ENOUGH_PRIVILEGES
            );
        }

    }
}