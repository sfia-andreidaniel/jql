<?php

namespace JQL\RemoteQuery\Executor;

use JQL\Authorization\AuthorizationToken;
use JQL\Controller;
use JQL\RemoteQuery\RemoteQueryExecutorInterface;
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
    public function __construct(Controller $controller, JQLStatementSelect $statement )
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
            'resultType' => EJQLLexerStatementTypes::SELECT,
            'query'      => $this->statement->toString(EJQLQueryExecutionContext::SERVER_SIDE),
        ];
    }
}