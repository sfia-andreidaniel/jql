<?php

namespace JQL\RemoteQuery\Executor;

use JQL\Authorization\AuthorizationToken;
use JQL\Controller;
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
    public function __construct(Controller $controller, JQLStatementInsert $statement )
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
            'resultType' => EJQLLexerStatementTypes::INSERT,
            'query'      => $this->statement->toString(EJQLQueryExecutionContext::SERVER_SIDE),
        ];
    }
}