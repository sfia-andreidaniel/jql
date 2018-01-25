<?php

namespace JQL\Storage;

use JQL\Authorization\AuthorizationService;
use JQL\Authorization\AuthorizationToken;
use JQL\CSVParser\CSVParser;
use JQL\CSVParser\CSVParserOptions;

class StorageService
{

    const TABLE_NAMESPACE_PRIVATE = 'private';
    const TABLE_NAMESPACE_GLOBAL = 'global';

    const TABLE_ACCESS_MODE_READ = 'r';
    const TABLE_ACCESS_MODE_WRITE = 'w';
    const TABLE_ACCESS_MODE_READ_WRITE = 'rw';

    const TABLE_STORAGE_ENGINE_MEMORY = 'memory';
    const TABLE_STORAGE_ENGINE_REMOTE = 'remote';

    /**
     * @var StorageServiceDAO
     */
    private $dao;

    /**
     * @var CSVParser
     */
    private $csvParser;

    /**
     * StorageService constructor.
     *
     * @param StorageServiceDAO $dao
     * @param CSVParser         $csvParser
     */
    public function __construct(StorageServiceDAO $dao, CSVParser $csvParser)
    {
        $this->dao = $dao;
        $this->csvParser = $csvParser;
    }

    /**
     * @param string             $csvFileContents
     * @param CSVParserOptions   $csvParserOptions
     * @param TableModel         $tableModel
     * @param AuthorizationToken $authorizationToken
     *
     * @return TableModel
     * @throws StorageException
     */
    public function createTableFromCSV(
        $csvFileContents,
        CSVParserOptions $csvParserOptions,
        TableModel $tableModel,
        AuthorizationToken $authorizationToken
    )
    {

        try {

            if ($authorizationToken->getRole() !== AuthorizationService::AUTHORIZATION_TOKEN_ROLE_FORM_ADMIN) {
                throw new StorageException(
                    'Not enough permissions to create table!',
                    StorageException::ERR_NOT_ENOUGH_PERMISSIONS
                );
            }

            if ($authorizationToken->getUserId() !== $tableModel->getUserId()) {
                throw new StorageException(
                    'User #' . $authorizationToken->getUserId() . ' is not allowed to create tables for user #' . $tableModel->getUserId(),
                    StorageException::ERR_USER_ID_FORBIDDEN
                );
            }

            $tables = $this->getUserTables(
                $authorizationToken,
                $tableModel->getUserId(),
                $tableModel->getFormId()
            );

            foreach ($tables as $table) {
                if (strtolower($table->getName()) === strtolower($tableModel->getName())) {
                    throw new StorageException(
                        'Table "' . $table->getName() . '" already exists!',
                        StorageException::ERR_TABLE_ALREADY_EXISTS
                    );
                }
            }

            $parsedCSV = $this->csvParser->parse($csvFileContents, $csvParserOptions);

            $result = $this->dao->createTableFromParsedCSV($tableModel, $parsedCSV);

            return new TableModel($result);

        } catch (StorageException $e) {

            throw $e;

        } catch (\Exception $e) {

            throw new StorageException(
                'Failed to create table from CSV',
                StorageException::ERR_CREATE_TABLE_FROM_CSV,
                $e
            );

        }
    }

    /**
     * @param AuthorizationToken $authorizationToken
     * @param int                $userId
     * @param int|null           $formId
     *
     * @return TableModel[]
     * @throws StorageException
     */
    public function getUserTables(AuthorizationToken $authorizationToken, $userId, $formId)
    {
        $result = [];

        if ($authorizationToken->getUserId() !== $userId) {
            throw new StorageException(
                'Access not allowed - user id mismatch!',
                StorageException::ERR_USER_ID_FORBIDDEN
            );
        }

        if (null !== $formId && $formId !== $authorizationToken->getFormId()) {
            throw new StorageException(
                'Access not allowed - form id mismatch!',
                StorageException::ERR_FORM_ID_FORBIDDEN
            );
        }

        foreach ($this->dao->getUserTables($userId, $formId) as $table) {
            $result[] = new TableModel($table);
        }

        return $result;
    }

}