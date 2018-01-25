<?php

namespace JQL\Storage;

use JQL\Authorization\AuthorizationService;
use JQL\CSVParser\CSVParser;
use JQL\CSVParser\ParsedCSVModel;
use JQL\Database\Database;

class StorageServiceDAO
{
    /**
     * @var Database
     */
    private $database;

    /**
     * StorageServiceDAO constructor.
     *
     * @param Database $database
     */
    public function __construct(Database $database)
    {
        $this->database = $database;
    }

    /**
     * @param int      $userId
     * @param int|null $formId
     *
     * @return array
     * @throws StorageException
     */
    public function getUserTables($userId, $formId)
    {

        try {

            $self = $this;

            $result = [];

            if ($formId === null) {
                $where = 'WHERE `user_id` = :userId AND `form_id` IS NULL';
                $bindings = [
                    ':userId' => $userId,
                ];
            } else {
                $where = 'WHERE `user_id` = :userId AND `form_id` = :formId';
                $bindings = [
                    ':userId' => $userId,
                    ':formId' => $formId,
                ];
            }

            $this->database->query(
                '
                    SELECT `id`                                          AS `id`,
                           `user_id`                                     AS `userId`,
                           `form_id`                                     AS `formId`,
                           `name`                                        AS `name`,
                           IF ( `form_id` IS NULL, "global", "private" ) AS `namespace`,
                           UNIX_TIMESTAMP( `created_date` )              AS `createdDate`,
                           `access_mode`                                 AS `accessMode`,
                           `storage_engine`                              AS `storageEngine`,
                           `json_schema`                                 AS `schema`
                    FROM   jql_tables
                    ' . $where,
                $bindings
            )->each(function(array $row) use (&$result, $self) {
                $result[] = $self->normalizeDAORow($row);
            });

            return $result;


        } catch (\Exception $e) {
            throw new StorageException(
                'Failed to fetch user tables!',
                StorageException::ERR_GET_USER_TABLES,
                $e
            );
        }

    }

    private function normalizeDAORow(array $row)
    {

        return [
            'id'            => (int)$row['id'],
            'userId'        => (int)$row['userId'],
            'formId'        => empty((int)$row['formId'])
                ? null
                : (int)$row['formId'],
            'name'          => $row['name'],
            'namespace'     => $row['namespace'],
            'createdDate'   => (int)$row['createdDate'],
            'accessMode'    => $row['accessMode'],
            'storageEngine' => $row['storageEngine'],
            'schema'        => @json_decode($row['schema'], true),
        ];

    }

    /**
     * @param TableModel     $tableModel
     * @param ParsedCSVModel $parsedCSV
     *
     * @return array
     * @throws StorageException
     */
    public function createTableFromParsedCSV(
        TableModel $tableModel,
        ParsedCSVModel $parsedCSV)
    {

        $transaction = null;

        try {

            $transaction = $this->database->query('START TRANSACTION');

            $tableSchema = $parsedCSV->getComputedColumnTypes();

            $stmt = $this->database->query(
                '
                    INSERT INTO jql_tables (
                      user_id,
                      form_id,
                      name,
                      json_schema,
                      created_date,
                      access_mode,
                      storage_engine
                    ) VALUES (
                      :user_id,
                      :form_id,
                      :name,
                      :json_schema,
                      NOW(),
                      :access_mode,
                      :storage_engine
                    );
                ',
                [
                    ':user_id'        => $tableModel->getUserId(),
                    ':form_id'        => $tableModel->getFormId(),
                    ':name'           => $tableModel->getName(),
                    ':json_schema'    => json_encode($tableSchema),
                    ':access_mode'    => $tableModel->getAccessMode(),
                    ':storage_engine' => $tableModel->getStorageEngine(),
                ]
            );

            $tableId = $stmt->lastInsertId();

            $tableModel = $this->getTableById($tableId);

            // CREATE TABLE, AND POPULATE IT

            $tableCreationStatement = $this->getTableCreationStatementSQL(
                $tableModel->getId(),
                $tableSchema
            );

            $this->database->query($tableCreationStatement);

            $insertionStatement = 'INSERT INTO table_' . $tableModel->getId() .
                '( `' . implode('`, `', array_keys($tableSchema)) . '` ) VALUES (';

            $bindings = [];

            foreach ($tableSchema as $colName => $colValue) {
                $bindings[] = ':' . $colName;
            }

            $insertionStatement .= (implode(', ', $bindings) . ')');

            foreach ($parsedCSV->getAssoc() as $row) {
                $binding = [];
                foreach ($row as $k => $v) {
                    $binding[':' . $k] = $v;
                }
                $this->database->query($insertionStatement, $binding);
            }

            $this->database->query('COMMIT');

            return $tableModel;

        } catch (\Exception $e) {

            try {
                if ($transaction) {
                    $this->database->query('ROLLBACK');
                }
            } catch (\Exception $e) {

            }

            throw new StorageException(
                'Failed to create table from parsed csv: ' . $e->getMessage(),
                StorageException::ERR_CREATE_TABLE_FROM_CSV,
                $e
            );
        }

    }

    /**
     * @param int $tableId
     *
     * @return array
     * @throws StorageException
     */
    private function getTableById($tableId)
    {
        try {

            $self = $this;

            $result = [];

            $this->database->query(
                '
                    SELECT `id`                                          AS `id`,
                           `user_id`                                     AS `userId`,
                           `form_id`                                     AS `formId`,
                           `name`                                        AS `name`,
                           IF ( `form_id` IS NULL, "global", "private" ) AS `namespace`,
                           UNIX_TIMESTAMP( `created_date` )              AS `createdDate`,
                           `access_mode`                                 AS `accessMode`,
                           `storage_engine`                              AS `storageEngine`,
                           `json_schema`                                 AS `schema`
                    FROM   jql_tables
                    WHERE id = :id
                    LIMIT 1',
                [
                    ':id' => $tableId,
                ]
            )->each(function(array $row) use (&$result, $self) {
                $result[] = $self->normalizeDAORow($row);
            });

            if (0 === count($result)) {
                throw new StorageException(
                    'Failed to get table #' . $tableId . ': table not found!',
                    StorageException::ERR_GET_TABLE_BY_ID
                );
            }

            return $result[0];


        } catch (StorageException $e) {

            throw $e;

        } catch (\Exception $e) {

            throw new StorageException(
                'Failed to fetch table #id = ' . $tableId,
                StorageException::ERR_GET_TABLE_BY_ID,
                $e
            );

        }

    }

    /**
     * @param int   $tableId
     * @param array $tableSchema
     *
     * @return string
     */
    private function getTableCreationStatementSQL($tableId, array $tableSchema)
    {

        $result = [
            'CREATE TABLE `table_' . $tableId . '` (',

        ];

        $columns = [];

        foreach ($tableSchema as $columnName => $columnType) {

            switch ($columnType) {

                case CSVParser::TYPE_TEXT:

                    $columns[] = '`' . $columnName . '` VARCHAR(512)';

                    break;

                case CSVParser::TYPE_INT:

                    $columns[] = '`' . $columnName . '` INT';

                    break;

                case CSVParser::TYPE_FLOAT:

                    $columns[] = '`' . $columnName . '` FLOAT';

                    break;

                case CSVParser::TYPE_BOOLEAN:

                    $columns[] = '`' . $columnName . '` BOOLEAN';

                    break;

            }

        }

        $result[] = implode(',', $columns);

        $result[] = ') ENGINE=INNODB, CHARSET=UTF8';

        return implode(' ', $result);

    }

}