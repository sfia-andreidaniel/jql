<?php

namespace JQL\RemoteQuery;

use JQL\Database\Database;
use JQL\Database\DatabaseException;

class RemoteQueryServiceDAO
{
    /**
     * @var Database
     */
    private $database;

    /**
     * RemoteQueryServiceDAO constructor.
     *
     * @param Database $database
     */
    public function __construct(Database $database)
    {
        $this->database = $database;
    }

    /**
     * @param $userId
     * @param $formId
     * @param $statementId
     *
     * @return bool
     * @throws RemoteQueryException
     */
    public function isAuthorizedStatement($userId, $formId, $statementId)
    {

        try {

            $result = (int)$this->database->query(
                'SELECT COUNT(1) 
                       FROM jql_form_allowed_queries
                       WHERE user_id = :userId
                             AND form_id = :formId
                             AND query_md5_hash = :statementId',
                [
                    ':userId'      => $userId,
                    ':formId'      => $formId,
                    ':statementId' => $statementId,
                ]
            )->fetchColumn(0);

            return (bool)$result;

        } catch (\Exception $e) {

            throw new RemoteQueryException(
                'Failed to determine query authorization status!',
                RemoteQueryException::ERR_FETCH_QUERY_AUTHORIZATION_STATUS,
                $e
            );

        }
    }
}