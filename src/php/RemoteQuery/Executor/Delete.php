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

        try {

            $this->performAuthorization($authorization);

            $statementAsString = $this->stringifyStatement($authorization, $this->statement);

            $stmt = $this->controller->getDatabase()
                                     ->query($statementAsString);

            return [
                'resultType'   => EJQLLexerStatementTypes::DELETE,
                'query'        => $statementAsString,
                'affectedRows' => $stmt->getRowCount(),
            ];

        }
        catch (RemoteQueryException $e) {

            throw $e;

        }
        catch (\Exception $e) {

            throw new RemoteQueryException(
                'Failed to execute DELETE statement!', RemoteQueryException::ERR_EXECUTING_QUERY, $e
            );

        }
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
                'Not enough privileges to execute delete statements on backend!',
                RemoteQueryException::ERR_NOT_ENOUGH_PRIVILEGES
            );

        }

    }

    /**
     * @param AuthorizationToken $authorizationToken
     * @param JQLStatementDelete $deleteStatement
     *
     * @return string
     * @throws \JQL\Storage\StorageException
     */
    private function stringifyStatement(AuthorizationToken $authorizationToken, JQLStatementDelete $deleteStatement)
    {

        $tableName = $deleteStatement->getTable()
                                     ->getName();

        $tableModel = $this->controller->getStorageService()
                                       ->getTableByName($authorizationToken, $tableName);

        $deleteStatement->getTable()
                        ->withName('table_' . $tableModel->getId());

        $result = $deleteStatement->toString(EJQLQueryExecutionContext::SERVER_SIDE);

        return $result;

    }

}