<?php

namespace JQL\RemoteQuery;

use JQL\Authorization\AuthorizationToken;
use JQL\Controller;
use JQL\Tokenizer\EJQLLexerOpcodeTypes;
use JQL\Tokenizer\JQLLexerFactory;
use JQL\Tokenizer\JQLStatement;
use JQL\Tokenizer\TokenizerException;

class RemoteQueryService
{
    /**
     * @var Controller
     */
    private $controller;

    /**
     * RemoteQueryService constructor.
     *
     * @param Controller $controller
     */
    public function __construct(Controller $controller)
    {
        $this->controller = $controller;
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

            return true;

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

}