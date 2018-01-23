<?php

namespace JQL\RemoteQuery\Executor;

use JQL\Authorization\AuthorizationToken;
use JQL\Controller;
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
     */
    public function execute(AuthorizationToken $authorization)
    {
        return [
            'resultType' => EJQLLexerStatementTypes::UPDATE,
            'query'      => $this->statement->toString(EJQLQueryExecutionContext::SERVER_SIDE),
        ];
    }
}