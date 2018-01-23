<?php

namespace JQL\RemoteQuery;

use JQL\Authorization\AuthorizationToken;
use JQL\Controller;
use JQL\Tokenizer\EJQLLexerOpcodeTypes;
use JQL\Tokenizer\JQLLexerFactory;
use JQL\Tokenizer\JQLStatement;

class RemoteQueryService
{
    /**
     * @var Controller
     */
    private $controller;

    /**
     * @var RemoteQueryExecutor
     */
    private $queryExecutor;

    /**
     * @var RemoteQueryServiceDAO
     */
    private $dao;

    /**
     * RemoteQueryService constructor.
     *
     * @param Controller $controller
     */
    public function __construct(Controller $controller)
    {
        $this->controller = $controller;
        $this->queryExecutor = new RemoteQueryExecutor($controller);
        $this->dao = new RemoteQueryServiceDAO($controller->getDatabase());
    }

    /**
     * @param array              $query
     * @param array              $queryBindings
     * @param AuthorizationToken $auth
     *
     * @return mixed
     * @throws RemoteQueryException
     */
    public function executeQuery(array $query, array $queryBindings, AuthorizationToken $auth)
    {

        try {

            $statement = JQLLexerFactory::create($query);

            if ($statement->getOpcodeType() !== EJQLLexerOpcodeTypes::STATEMENT) {
                throw new RemoteQueryException(
                    'Statement expected',
                    RemoteQueryException::ERR_STATEMENT_EXPECTED
                );
            }

            /** @var JQLStatement $statement */
            return $this->queryExecutor->createExecutorFromParsedJQLStatement($statement)
                ->execute($auth);

        } catch (RemoteQueryException $e) {

            throw $e;

        } catch (\Exception $e) {

            throw new RemoteQueryException(
                'Failed to execute query!',
                RemoteQueryException::ERR_EXECUTING_QUERY,
                $e
            );

        }

    }

    /**
     * @param AuthorizationToken $authorization
     * @param string             $statementId
     *
     * @return bool
     * @throws RemoteQueryException
     */
    public function isAuthorizedStatement(AuthorizationToken $authorization, $statementId)
    {
        return $this->dao->isAuthorizedStatement( $authorization->getUserId(), $authorization->getFormId(), $statementId );
    }

}