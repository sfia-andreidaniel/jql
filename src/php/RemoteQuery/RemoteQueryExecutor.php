<?php

namespace JQL\RemoteQuery;

use JQL\Controller;
use JQL\RemoteQuery\Executor\Delete;
use JQL\RemoteQuery\Executor\Insert;
use JQL\RemoteQuery\Executor\Select;
use JQL\RemoteQuery\Executor\Update;
use JQL\Tokenizer\EJQLLexerStatementTypes;
use JQL\Tokenizer\JQLStatement;
use JQL\Tokenizer\Statement\JQLStatementDelete;
use JQL\Tokenizer\Statement\JQLStatementInsert;
use JQL\Tokenizer\Statement\JQLStatementSelect;
use JQL\Tokenizer\Statement\JQLStatementUpdate;

class RemoteQueryExecutor
{

    /**
     * @var Controller
     */
    private $controller;

    /**
     * RemoteQueryExecutor constructor.
     *
     * @param Controller $controller
     */
    public function __construct(Controller $controller)
    {
        $this->controller = $controller;
    }

    /**
     * @param JQLStatement $statement
     *
     * @return RemoteQueryExecutorInterface
     * @throws RemoteQueryException
     */
    public function createExecutorFromParsedJQLStatement(JQLStatement $statement)
    {

        switch ($statement->getStatementType()) {

            case EJQLLexerStatementTypes::SELECT:
                /** @var JQLStatementSelect $statement */
                return new Select(
                    $this->controller,
                    $statement
                );
                break;
            case EJQLLexerStatementTypes::INSERT:
                /** @var JQLStatementInsert $statement */
                return new Insert($this->controller, $statement);
                break;
            case EJQLLexerStatementTypes::UPDATE:
                /** @var JQLStatementUpdate $statement */
                return new Update($this->controller, $statement);
                break;
            case EJQLLexerStatementTypes::DELETE:
                /** @var JQLStatementDelete $statement */
                return new Delete($this->controller, $statement);
                break;

            default:
                throw new RemoteQueryException(
                    'Unknown statement type!', RemoteQueryException::ERR_UNKNOWN_STATEMENT_TYPE
                );

        }

    }
}