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
     * @var array
     */
    private $bindings;

    /**
     * Select constructor.
     *
     * @param Controller         $controller
     * @param JQLStatementUpdate $statement
     * @param array              $bindings
     */
    public function __construct(Controller $controller, JQLStatementUpdate $statement, array $bindings )
    {
        $this->controller = $controller;
        $this->statement = $statement;
        $this->bindings = $bindings;
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

            $this->performAuthorizaton($authorization);

            $statementAsString = $this->stringifyStatement($authorization, $this->statement);

            $stmt = $this->controller->getDatabase()->query($statementAsString, $this->bindings);

            return [
                'resultType'   => EJQLLexerStatementTypes::UPDATE,
                'query'        => $statementAsString,
                'affectedRows' => $stmt->getRowCount(),
            ];

        } catch (RemoteQueryException $e) {

            throw $e;

        } catch (\Exception $e) {

            throw new RemoteQueryException(
                'Failed to execute UPDATE statement!',
                RemoteQueryException::ERR_EXECUTING_QUERY,
                $e
            );

        }
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

    /**
     * @param AuthorizationToken $authorizationToken
     * @param JQLStatementUpdate $updateStatement
     *
     * @return string
     * @throws \JQL\Storage\StorageException
     */
    private function stringifyStatement(AuthorizationToken $authorizationToken, JQLStatementUpdate $updateStatement)
    {
        $tableName = $updateStatement->getTable()
            ->getName();

        $tableModel = $this->controller->getStorageService()
            ->getTableByName($authorizationToken, $tableName);

        $updateStatement->getTable()
            ->withName('table_' . $tableModel->getId());

        $result = $updateStatement->toString(EJQLQueryExecutionContext::SERVER_SIDE);

        return $result;

    }
}