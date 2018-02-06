<?php

namespace JQL\RemoteQuery;

use JQL\Assertion\Assertion;
use JQL\Assertion\AssertionException;
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
     * @param array        $queryBindings
     *
     * @return RemoteQueryExecutorInterface
     * @throws RemoteQueryException
     */
    public function createExecutorFromParsedJQLStatement(JQLStatement $statement, array $queryBindings)
    {

        try {

            foreach ($queryBindings as $bindingName => $bindingValue) {
                Assertion::assertIsPrimitive($bindingValue, 'Binding "' . $bindingName . '" must have a primitive value (int|float|null|bool|string)');
            }

            foreach ($statement->getBindings() as &$binding) {

                if (!array_key_exists($binding->getBindingName(), $queryBindings)) {
                    throw new RemoteQueryException(
                        'Binding "' . $binding->getBindingName() . '" is not defined in bindings list!',
                        RemoteQueryException::ERR_BINDING_STATEMENT
                    );
                }

            }

        } catch (AssertionException $e) {

            throw new RemoteQueryException('Failed to bind statement: ' . $e->getMessage(), RemoteQueryException::ERR_BINDING_STATEMENT, $e);

        }

        switch ($statement->getStatementType()) {

            case EJQLLexerStatementTypes::SELECT:
                /** @var JQLStatementSelect $statement */
                return new Select($this->controller, $statement, $queryBindings);
                break;
            case EJQLLexerStatementTypes::INSERT:
                /** @var JQLStatementInsert $statement */
                return new Insert($this->controller, $statement, $queryBindings);
                break;
            case EJQLLexerStatementTypes::UPDATE:
                /** @var JQLStatementUpdate $statement */
                return new Update($this->controller, $statement, $queryBindings);
                break;
            case EJQLLexerStatementTypes::DELETE:
                /** @var JQLStatementDelete $statement */
                return new Delete($this->controller, $statement, $queryBindings);
                break;

            default:
                throw new RemoteQueryException(
                    'Unknown statement type!', RemoteQueryException::ERR_UNKNOWN_STATEMENT_TYPE
                );

        }

    }
}