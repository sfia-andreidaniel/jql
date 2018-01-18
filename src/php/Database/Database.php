<?php

namespace JQL\Database;

use JQL\Controller;

class Database
{

    private static $connections;

    const DEFAULT_DATE_FORMAT     = 'Y-m-d';
    const DEFAULT_DATETIME_FORMAT = 'Y-m-d H:i:s';

    const QUERY_TYPE_INSERT       = 'INSERT';
    const QUERY_TYPE_DELETE       = 'DELETE';
    const QUERY_TYPE_UPDATE       = 'UPDATE';
    const QUERY_TYPE_SELECT       = 'SELECT';
    const QUERY_TYPE_REPLACE      = 'REPLACE';

    const QUERY_TYPE_EMPTY        = 'EMPTY';
    const QUERY_TYPE_OTHER        = 'OTHER';

    const EVENT_TYPE_QUERY        = 'query';
    const EVENT_TYPE_ERROR        = 'error';
    const EVENT_TYPE_QUERY_TIME   = 'query-time';

    /**
     * @var \PDO
     */
    private $connection = null;

    /**
     * @var string
     */
    private $name;

    /**
     * @var Controller
     */
    private $controller;

    /**
     * Database constructor.
     *
     * @param Controller $controller
     * @param string     $name
     */
    public function __construct(Controller $controller, $name = 'default')
    {
        $this->name = $name;

        self::$connections[$name] = $this;

        $this->controller = $controller;
    }

    /**
     * @return bool
     */
    public function isConnected()
    {
        return $this->connection !== null;
    }

    public function connect()
    {
        if (!$this->isConnected()) {

            $this->connection = new \PDO(
                $this->controller->config('database.' . $this->name . '.url'),
                $this->controller->config('database.' . $this->name . '.user'),
                $this->controller->config('database.' . $this->name . '.password'),
                $this->controller->config('database.' . $this->name . '.options')
            );

        }
    }

    /**
     * Performs a query and returns it
     *
     * @param string  $queryString
     * @param mixed[] $queryArgs
     *
     * @return Statement
     * @throws DatabaseException
     */
    public function query($queryString, $queryArgs = [])
    {
        $this->connect();

        $queryType = $this->getQueryType($queryString);

        if ($queryType === self::QUERY_TYPE_EMPTY) {
            throw new DatabaseException('Empty mysql query');
        }

        try {

            $statement = $this->connection->prepare($queryString);

            $statement->execute($queryArgs);

        } catch (\PDOException $e) {

            throw new DatabaseException("SQL Statement failed (statement = '$queryString', type = '$queryType', data = " . json_encode($queryArgs) . ")", DatabaseException::ERR_STATEMENT_FAILED, $e);

        }

        $lastInsertId = null;

        if ($queryType === self::QUERY_TYPE_INSERT) {
            $lastInsertId = $this->connection->lastInsertId();
        }

        return new Statement($statement, $lastInsertId);
    }

    /**
     * @param string $queryString
     *
     * @return string
     */
    private function getQueryType($queryString)
    {
        $queryString = trim($queryString);

        if ($queryString === '') {
            return self::QUERY_TYPE_EMPTY;
        }

        if (preg_match('/^(select|insert|update|delete|replace)[\s]+/i', $queryString, $matches)) {
            switch (strtolower($matches[1])) {
                case 'select':
                    return self::QUERY_TYPE_SELECT;
                    break;
                case 'insert':
                    return self::QUERY_TYPE_INSERT;
                    break;
                case 'update':
                    return self::QUERY_TYPE_UPDATE;
                    break;
                case 'DELETE':
                    return self::QUERY_TYPE_DELETE;
                    break;
                case 'REPLACE':
                    return self::QUERY_TYPE_REPLACE;
                    break;
                default:
                    return self::QUERY_TYPE_OTHER;
                    break;
            }
        } else {
            return self::QUERY_TYPE_OTHER;
        }
    }

    /**
     * @param string $connectionName
     *
     * @return Database
     * @throws DatabaseException
     */
    public function getConnection($connectionName)
    {

        if (!is_string($connectionName) || '' === $connectionName) {
            throw new DatabaseException(
                'Failed to obtain database connection to ' . json_encode($connectionName) . ': invalid argument $connectionName: string not empty expected!',
                DatabaseException::ERR_INVALID_ARGUMENT
            );
        }

        if ($this->name === $connectionName) {
            return $this;
        } else {
            if (isset(self::$connections[$connectionName])) {
                return self::$connections[$connectionName];
            } else {
                return new self(
                    $this->controller,
                    $connectionName
                );
            }
        }

    }

    /**
     * @param string $string
     *
     * @return string
     * @throws DatabaseException
     */
    public function escape($string) {

        if ( !is_string( $string ) ) {
            throw new DatabaseException(
                'Invalid argument: string expected!',
                DatabaseException::ERR_INVALID_ARGUMENT
            );
        }

        $this->connect();

        return $this->connection->quote( $string );

    }
}