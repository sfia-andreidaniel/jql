<?php

namespace JQL\RemoteQuery\Executor;

use JQL\Authorization\AuthorizationService;
use JQL\Authorization\AuthorizationToken;
use JQL\Controller;
use JQL\Database\Database;
use JQL\RemoteQuery\RemoteQueryException;
use JQL\RemoteQuery\RemoteQueryExecutorInterface;
use JQL\RemoteQuery\RemoteQueryService;
use JQL\Storage\StorageException;
use JQL\Storage\StorageService;
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
     * @var array
     */
    private $bindings;

    /**
     * Select constructor.
     *
     * @param Controller         $controller
     * @param JQLStatementSelect $statement
     * @param array              $bindings
     */
    public function __construct(
        Controller $controller,
        JQLStatementSelect $statement,
        array $bindings
    ) {

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

            $this->performAuthorization($authorization, $this->statement->getId());

            $statementAsString = $this->stringifyStatement($authorization, $this->statement);

            /** @var Database $database */
            $database = $this->controller->getDatabase();

            $result = [];

            $self = $this;

            $database->query($statementAsString, $this->bindings)
                     ->each(
                         function (array $row) use (&$result, $self) {

                             $result[] = $row;
                         }
                     );

            return [
                'resultType' => EJQLLexerStatementTypes::SELECT,
                'query'      => $statementAsString,
                'rows'       => $result,
            ];

        }
        catch (RemoteQueryException $e) {

            throw $e;

        }
        catch (\Exception $e) {

            throw new RemoteQueryException(
                'Failed to execute select statement!', RemoteQueryException::ERR_EXECUTING_QUERY, $e
            );

        }
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

    /**
     * @param AuthorizationToken $authorizationToken
     * @param JQLStatementSelect $statementSelect
     *
     * @return string
     * @throws StorageException
     */
    private function stringifyStatement(AuthorizationToken $authorizationToken, JQLStatementSelect $statementSelect)
    {

        $cursor = $statementSelect;

        do {

            if (null !== $cursor->getTable()) {

                $tableName = $cursor->getTable()
                                    ->getName();

                $tableModel = $this->controller->getStorageService()
                                               ->getTableByName($authorizationToken, $tableName);

                $cursor->getTable()
                       ->withName('table_' . $tableModel->getId());

            }

            $cursor = $cursor->getUnion();

        } while ($cursor);

        $result = $statementSelect->toString(EJQLQueryExecutionContext::SERVER_SIDE);

        return $result;

    }
}