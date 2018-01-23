<?php

namespace JQL\RemoteQuery\Executor;

use JQL\Authorization\AuthorizationToken;
use JQL\Controller;
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
     */
    public function execute(AuthorizationToken $authorization)
    {
        return [
            'resultType' => EJQLLexerStatementTypes::DELETE,
            'query'      => $this->statement->toString(EJQLQueryExecutionContext::SERVER_SIDE),
        ];
    }
}