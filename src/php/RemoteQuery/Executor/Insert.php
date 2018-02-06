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

        try {

            $this->performAuthorization($authorization);

            $statementAsString = $this->stringifyStatement($authorization, $this->statement);

            $stmt = $this->controller->getDatabase()->query($statementAsString);

            $insertId = $stmt->lastInsertId();

            return [
                'resultType'   => EJQLLexerStatementTypes::INSERT,
                'query'        => $statementAsString,
                'lastInsertId' => (int)$insertId,
            ];

        } catch (RemoteQueryException $e) {

            throw $e;

        } catch (\Exception $e) {

            throw new RemoteQueryException(
                'Failed to execute INSERT statement!',
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
    private function performAuthorization(AuthorizationToken $authorization)
    {

        if ($authorization->getRole() !== AuthorizationService::AUTHORIZATION_TOKEN_ROLE_FORM_ADMIN) {
            throw new RemoteQueryException(
                'Not enough privileges to execute INSERT statement on server!',
                RemoteQueryException::ERR_NOT_ENOUGH_PRIVILEGES
            );
        }

    }

    /**
     * @param AuthorizationToken $authorizationToken
     * @param JQLStatementInsert $insertStatement
     *
     * @return string
     * @throws \JQL\Storage\StorageException
     */
    private function stringifyStatement(AuthorizationToken $authorizationToken, JQLStatementInsert $insertStatement)
    {

        $tableName = $insertStatement->getTable()
            ->getName();

        $tableModel = $this->controller->getStorageService()
            ->getTableByName($authorizationToken, $tableName);

        $insertStatement->getTable()
            ->withName('table_' . $tableModel->getId());

        $result = $insertStatement->toString(EJQLQueryExecutionContext::SERVER_SIDE);

        return $result;

    }
}