<?php

namespace JQL\Storage;

use JQL\Assertion\Assertion;
use JQL\Assertion\AssertionException;
use JQL\CSVParser\CSVParser;
use JQL\CSVParser\ParsedCSVModel;
use JQL\Database\Database;
use JQL\Database\DatabaseException;
use JQL\Tokenizer\EJQLLexerFieldTypes;

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
                $where = 'WHERE `user_id` = :userId AND ( `form_id` = :formId OR `form_id` IS NULL )';
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
                           `json_schema`                                 AS `schema`,
                           `json_indexes`                                AS `indexes`
                    FROM   jql_tables
                    ' . $where,
                $bindings
            )
                ->each(
                    function(array $row) use (&$result, $self) {
                        $result[] = $self->normalizeDAORow($row);
                    }
                );

            return $result;


        } catch (\Exception $e) {
            throw new StorageException(
                'Failed to fetch user tables!', StorageException::ERR_GET_USER_TABLES, $e
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
            'indexes'       => empty($row['indexes'])
                ? null
                : @json_decode($row['indexes'], true),
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
        ParsedCSVModel $parsedCSV
    )
    {

        $transaction = null;
        $tableCreated = false;

        try {

            $tableSchema = $parsedCSV->getComputedColumnTypes();

            $tableIndexes = $tableModel->getIndexes();

            $transaction = $this->database->query('START TRANSACTION');

            $stmt = $this->database->query(
                '
                    INSERT INTO jql_tables (
                      `user_id`,
                      `form_id`,
                      `name`,
                      `json_schema`,
                      `json_indexes`,
                      `created_date`,
                      `access_mode`,
                      `storage_engine`
                    ) VALUES (
                      :user_id,
                      :form_id,
                      :name,
                      :json_schema,
                      :json_indexes,
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
                    ':json_indexes'   => json_encode($tableIndexes),
                    ':access_mode'    => $tableModel->getAccessMode(),
                    ':storage_engine' => $tableModel->getStorageEngine(),
                ]
            );

            $tableId = $stmt->lastInsertId();

            // CREATE TABLE, AND POPULATE IT

            $tableCreationStatement = $this->getTableCreationStatementSQL(
                $tableId,
                $tableSchema
            );

            $this->database->query($tableCreationStatement);

            $tableCreated = true;

            $insertionStatement = $this->getTableInsertValuesStatementSQL($tableId, $tableSchema);

            foreach ($parsedCSV->getAssocCasted($tableSchema) as $row) {
                $binding = [];
                foreach ($row as $k => $v) {
                    $binding[':' . $k] = $this->castBindingToNativeSQLFormat($v);
                }
                $this->database->query($insertionStatement, $binding);
            }

            $this->database->query('COMMIT');

            $tableModel = $this->getTableById($tableId);

            return $tableModel;

        } catch (\Exception $e) {

            try {
                if ($tableCreated) {
                    // DDL CAUSES IMPLICIT COMMIT
                    $this->database->query('DROP TABLE `table_' . $tableSchema['id'] . '`');
                    $this->database->query('DELETE FROM jql_tables WHERE id=' . $tableSchema['id']);
                } else {
                    if ($transaction) {
                        $this->database->query('ROLLBACK');
                    }
                }
            } catch (\Exception $e) {
                $a = 2;
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
                           `json_schema`                                 AS `schema`,
                           `json_indexes`                                AS `indexes`
                    FROM   jql_tables
                    WHERE id = :id
                    LIMIT 1',
                [
                    ':id' => $tableId,
                ]
            )
                ->each(
                    function(array $row) use (&$result, $self) {
                        $result[] = $self->normalizeDAORow($row);
                    }
                );

            if (0 === count($result)) {
                throw new StorageException(
                    'Failed to get table #' . $tableId . ': table not found!', StorageException::ERR_GET_TABLE_BY_ID
                );
            }

            return $result[0];


        } catch (StorageException $e) {

            throw $e;

        } catch (\Exception $e) {

            throw new StorageException(
                'Failed to fetch table #id = ' . $tableId, StorageException::ERR_GET_TABLE_BY_ID, $e
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

    /**
     * @param int   $tableId
     * @param array $tableSchema
     *
     * @return string
     */
    private function getTableInsertValuesStatementSQL($tableId, array $tableSchema)
    {
        $insertionStatement = 'INSERT INTO `table_' . $tableId . '` ( `' . implode(
                '`, `',
                array_keys($tableSchema)
            ) . '` ) VALUES (';

        $bindings = [];

        foreach ($tableSchema as $colName => $colValue) {
            $bindings[] = ':' . $colName;
        }

        $insertionStatement .= (implode(', ', $bindings) . ')');

        return $insertionStatement;
    }

    /**
     * @param mixed $bindingValue
     *
     * @return mixed
     */
    private function castBindingToNativeSQLFormat($bindingValue)
    {
        if (is_bool($bindingValue)) {
            return (int)$bindingValue;
        } else {
            return $bindingValue;
        }
    }

    /**
     * @param int      $userId
     * @param int|null $formId
     * @param string   $tableName
     *
     * @return array
     * @throws StorageException
     */
    public function getTableByName($userId, $formId, $tableName)
    {

        try {

            $self = $this;

            $result = [];

            if ($formId === null) {
                $where = 'WHERE `name` = :name AND `user_id` = :userId AND `form_id` IS NULL';
                $bindings = [
                    ':userId' => $userId,
                    ':name'   => $tableName,
                ];
            } else {
                $where = 'WHERE `name` = :name AND `user_id` = :userId AND ( `form_id` = :formId OR `form_id` IS NULL )';
                $bindings = [
                    ':userId' => $userId,
                    ':formId' => $formId,
                    ':name'   => $tableName,
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
                           `json_schema`                                 AS `schema`,
                           `json_indexes`                                AS `indexes`
                    FROM   jql_tables
                    ' . $where . '
                    LIMIT 1',
                $bindings
            )
                ->each(
                    function(array $row) use (&$result, $self) {
                        $result[] = $self->normalizeDAORow($row);
                    }
                );

            if (!count($result)) {
                throw new StorageException(
                    'Table "' . $tableName . '" not found!', StorageException::ERR_TABLE_NOT_FOUND
                );
            }

            return $result[0];


        } catch (\Exception $e) {
            throw new StorageException(
                'Failed to fetch user tables!', StorageException::ERR_GET_USER_TABLES, $e
            );
        }
    }

    /**
     * @param array $tableSchema
     * @param int   $tableId
     *
     * @return array
     * @throws StorageException
     */
    public function fetchTableRowsInMemory(array $tableSchema, $tableId)
    {

        try {

            $result = [];

            $self = $this;

            $this->database->query(
                'SELECT * FROM table_' . $tableId
            )
                ->each(
                    function(array $row) use (&$result, $tableSchema, $self) {
                        $result[] = $self->normalizeInMemoryTableRow($row, $tableSchema);
                    }
                );

            return $result;

        } catch (StorageException $e) {

            throw $e;

        } catch (\Exception $e) {

            throw new StorageException(
                'Failed to fetch table rows in-memory', StorageException::ERR_FETCH_TABLE_ROWS_IN_MEMORY, $e
            );
        }

    }

    /**
     * @param array $row
     * @param array $tableSchema
     *
     * @return array
     */
    private function normalizeInMemoryTableRow(array $row, array $tableSchema)
    {
        foreach ($row as $columnName => &$value) {

            if (isset($tableSchema[$columnName])) {

                switch ($tableSchema[$columnName]) {
                    case CSVParser::TYPE_BOOLEAN:
                        $value = (bool)(int)$value;
                        break;

                    case CSVParser::TYPE_INT:
                        $value = (int)$value;
                        break;

                    case CSVParser::TYPE_FLOAT:
                        $value = (float)$value;
                        break;

                    case CSVParser::TYPE_TEXT:
                    default:
                        break;
                }

            } else {

                unset($row[$columnName]);

            }

        }

        return $row;
    }

    /**
     * @param string $physicalTableName
     * @param int    $jqlTableId
     *
     * @throws StorageException
     */
    public function dropTable($physicalTableName, $jqlTableId)
    {

        try {

            $this->database->query(
                'DELETE FROM jql_tables WHERE id = :id LIMIT 1',
                [
                    ':id' => $jqlTableId,
                ]
            );

            $this->database->query('DROP TABLE IF EXISTS `' . $physicalTableName . '`');

        } catch (\Exception $e) {

            throw new StorageException(
                'Failed to drop table ' . json_encode($physicalTableName) . ': ' . $e->getMessage(),
                StorageException::ERR_DROP_TABLE,
                $e
            );

        }

    }

    /**
     * @param int        $jqlTableId
     * @param string     $tableNameOnMySQLServer
     * @param array      $tableSchema
     * @param array|null $newIndexes
     * @param array|null $previousIndexes
     *
     * @return array
     * @throws StorageException
     */
    public function alterTableIndexes(
        $jqlTableId,
        $tableNameOnMySQLServer,
        array $tableSchema,
        $newIndexes,
        $previousIndexes
    )
    {

        $phase = 'Initializing operation';

        $rollbackPreviousIndexes = false;

        try {

            if ((null === $newIndexes && null === $previousIndexes) || (json_encode($newIndexes) === json_encode(
                        $previousIndexes
                    ))) {
                // NO CHANGES. ABORT
                return $this->getTableById($jqlTableId);
            }

            // CREATE A COPY OF ORIGINAL TABLE

            $temporaryTableNameOnMySQLServer = $tableNameOnMySQLServer . '_tmp_' . time();

            $phase = 'Creating copy of original table';

            $this->database->query(
                'CREATE TEMPORARY TABLE ' . $temporaryTableNameOnMySQLServer . ' LIKE ' . $tableNameOnMySQLServer
            );

            // REMOVE ALL PREVIOUS INDEXES FROM TEMPORARY TABLE

            $phase = 'Dropping previously added indexes';

            if (null !== $previousIndexes) {

                foreach ($previousIndexes as $index) {

                    $this->dropPhysicalTableIndex($temporaryTableNameOnMySQLServer, $index, $tableSchema);

                }

            }

            // INSERT ALL EXISTING DATA IN TEMPORARY TABLE

            $phase = 'Inserting original data in table copy';

            $this->database->query(
                'INSERT INTO ' . $temporaryTableNameOnMySQLServer . ' SELECT * FROM ' . $tableNameOnMySQLServer
            );

            // ADD NEW TABLE INDEXES TO TEMPORARY  TABLE

            if (null !== $newIndexes) {

                $phase = 'Adding new indexes';

                foreach ($newIndexes as $index) {

                    $this->addPhysicalTableIndex($temporaryTableNameOnMySQLServer, $index, $tableSchema);

                }

            }

            $phase = 'Update jql_tables indexes for table ' . $jqlTableId;
            $this->database->query(
                "UPDATE `jql_tables` SET `json_indexes` = :indexes WHERE id = :id LIMIT 1",
                [
                    ':id'      => $jqlTableId,
                    ':indexes' => json_encode($newIndexes),
                ]
            );

            $rollbackPreviousIndexes = true;

            // RENAME ORIGINAL TABLE TO "table_xx_back"
            $phase = 'Create physical backup of original table';
            $this->database->query("RENAME TABLE `$tableNameOnMySQLServer` TO `$tableNameOnMySQLServer" . "_bak`");

            // RE-CREATE ORIGINAL TABLE
            $phase = 'Re-create original table from temporary table';
            $this->database->query("CREATE TABLE `$tableNameOnMySQLServer` LIKE `$temporaryTableNameOnMySQLServer`");

            // RE-INSERT TEMPORARY DATA
            $phase = 'Re-insert data in original table from temporary table';
            $this->database->query(
                "INSERT INTO `$tableNameOnMySQLServer` SELECT * FROM `$temporaryTableNameOnMySQLServer`"
            );

            // DROP BACKUP TABLE
            $phase = 'Drop backup physical table';
            $this->database->query('DROP TABLE `' . $tableNameOnMySQLServer . '_bak`');

        } catch (StorageException $e) {

            throw $e;

        } catch (\Exception $e) {

            if ($rollbackPreviousIndexes) {

                try {

                    $this->database->query(
                        "UPDATE jql_tables SET `json_indexes` = :indexes WHERE id = :id LIMIT 1",
                        [
                            ':indexes' => json_encode($previousIndexes),
                            ':id'      => $jqlTableId,
                        ]
                    );

                } catch (\Exception $e) {
                    // FAILED TO RESTORE JQL PREVIOUS TABLE INDEXES!!!
                }

            }

            throw new StorageException(
                'Failed to alter table indexes while ' . $phase . ': ' . $e->getMessage(), StorageException::ERR_ALTER_TABLE_INDEXES, $e
            );

        }

        return $this->getTableById($jqlTableId);

    }

    /**
     * @param string      $temporaryTableNameOnMySQLServer
     * @param array|mixed $index
     * @param array       $tableSchema
     *
     * @throws StorageException
     * @throws AssertionException
     */
    private function addPhysicalTableIndex(
        $temporaryTableNameOnMySQLServer,
        $index,
        array $tableSchema
    )
    {

        if (!is_array($index)) {
            throw new StorageException(
                'Invalid argument: $index: array expected', StorageException::ERR_INVALID_ARGUMENT
            );
        }

        Assertion::assertIsStringKey($index, 'name', 'Invalid argument: non-string key "name" in index definition');
        Assertion::assertIsValidIdentifierName($index['name'], 'Invalid index column name!');
        Assertion::assertTrue(
            array_key_exists($index['name'], $tableSchema),
            'Column ' . json_encode($index['name']) . ' is not defined in table schema!'
        );

        $schemaType = $tableSchema[$index['name']];
        $columnName = $index['name'];

        $autoIncrement = false;

        if (isset($index['autoIncrement'])) {
            Assertion::assertIsBoolean($index['autoIncrement'], 'index auto increment property should be boolean!');
            $autoIncrement = $index['autoIncrement'];
        }

        try {

            if ($schemaType === CSVParser::TYPE_INT && $autoIncrement) {

                $this->database->query(
                    'ALTER TABLE `' . $temporaryTableNameOnMySQLServer . '` 
                                  CHANGE `' . $columnName . '` `' . $columnName . '` INT 
                                  AUTO_INCREMENT PRIMARY KEY'
                );

            } else {

                if ($autoIncrement && $schemaType) {

                    throw new StorageException(
                        'Auto-Increment fields must be of type integer!',
                        StorageException::ERR_AUTOINCREMENT_FIELD_NOT_INT
                    );

                }

                $this->database->query(
                    'ALTER TABLE `' . $temporaryTableNameOnMySQLServer . '`
                                ADD UNIQUE KEY `index_____' . $columnName . '` ( `' . $columnName . '` )'
                );

            }

        } catch (StorageException $e) {
            throw $e;
        } catch (DatabaseException $e) {

            if ((int)($e->getPrevious()->getCode()) === 23000) {

                throw new StorageException(
                    'Cannot add index on column "' . $columnName . '" because it contains non-unique values!',
                    StorageException::ERR_APPLY_COLUMN_INDEX_ON_DUPLICATE_VALUES,
                    $e
                );

            } else {

                throw new StorageException(
                    'A database error has been encountered while adding index on column ' . $columnName . '. Operation aborted!',
                    StorageException::ERR_APPLY_COLUMN_INDEX,
                    $e
                );
            }
        } catch (\Exception $e) {
            throw new StorageException(
                'Failed to apply index on column "' . $columnName . '". Operation aborted!',
                StorageException::ERR_APPLY_COLUMN_INDEX,
                $e
            );
        }
    }

    /**
     * @param string $temporaryTableNameOnMySQLServer
     * @param array  $index
     * @param array  $tableSchema
     *
     * @throws StorageException
     */
    private function dropPhysicalTableIndex($temporaryTableNameOnMySQLServer, array $index, array $tableSchema)
    {

        try {

            Assertion::assertIsStringKey(
                $tableSchema,
                $index['name'],
                'Column ' . $index['name'] . ' not present in table schema!'
            );

            $autoIncrement = isset($index['autoIncrement']) && true === $index['autoIncrement'];

            $columnName = $index['name'];

            if ($autoIncrement) {

                if ($index['type'] !== CSVParser::TYPE_INT) {

                    $this->database->query(
                        'ALTER TABLE `' . $temporaryTableNameOnMySQLServer . '`
                                   DROP PRIMARY KEY,
                                   CHANGE `' . $columnName . '` `' . $columnName . '` INT'
                    );

                } else {

                    throw new StorageException(
                        'Unexpected old index setting!', StorageException::ERR_DROP_COLUMN_INDEX
                    );

                }

            } else {

                $this->database->query(
                    'ALTER TABLE `' . $temporaryTableNameOnMySQLServer . '` 
                                DROP INDEX `index_____' . $columnName . '`'
                );
            }

        } catch (StorageException $e) {
            throw $e;
        } catch (\Exception $e) {
            throw new StorageException(
                'Failed to drop table index: ' . $e->getMessage(), StorageException::ERR_DROP_COLUMN_INDEX, $e
            );
        }

    }

}