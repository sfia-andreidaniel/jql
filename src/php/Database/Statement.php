<?php

namespace JQL\Database;


class Statement
{

    /**
     * @var \PDOStatement
     */
    private $statement;

    /**
     * @var int|null
     */
    private $lastInsertId;

    /**
     * Statement constructor.
     *
     * @param \PDOStatement $statement
     * @param null          $lastInsertId
     */
    public function __construct(\PDOStatement $statement, $lastInsertId = null)
    {
        $this->statement = $statement;
        $this->lastInsertId = $lastInsertId;
    }

    /**
     * Returns the number of rows the statement will return
     * @return int
     */
    public function getRowCount()
    {
        return $this->statement->rowCount();
    }

    /**
     * Fetch all rows into a associative array, and return that array.
     * Warning, depending on the fetched dataset, this might eat some RAM
     *
     * @param int $fetchMode
     *
     * @return array
     */
    public function fetchAll($fetchMode = \PDO::FETCH_ASSOC)
    {
        return $this->statement->fetchAll($fetchMode);
    }

    /**
     * Executes a callback on each row of the dataset.
     *
     * @param callable $callback
     * @param int      $fetchMode
     */
    public function each($callback, $fetchMode = \PDO::FETCH_ASSOC)
    {
        while ($row = $this->statement->fetch($fetchMode)) {
            $callback($row);
        }
    }

    /**
     * @param $columnIndex
     *
     * @return mixed|null
     */
    public function fetchColumn( $columnIndex)
    {
        $result = $this->fetchAll(\PDO::FETCH_NUM);
        if (count($result)) {
            return isset($result[0][$columnIndex])
                ? $result[0][$columnIndex]
                : null;
        } else {
            return null;
        }
    }

    /**
     * @return mixed
     */
    public function lastInsertId()
    {
        return $this->lastInsertId;
    }

}