<?php

namespace JQL\Storage;

use JQL\Assertion\Assertion;
use JQL\Assertion\AssertionException;

class TableModelBuilder
{

    /**
     * @var int|null
     */
    private $id;

    /**
     * @var int
     */
    private $userId;

    /**
     * @var int|null
     */
    private $formId;

    /**
     * @var string
     */
    private $name;

    /**
     * @var array|null
     */
    private $schema;

    /**
     * @var string * ENUM("private", "global" )
     */
    private $namespace;

    /**
     * @var string * ENUM("r", "w", "rw")
     */
    private $accessMode;

    /**
     * @var string * ENUM("memory", "remote")
     */
    private $storageEngine;

    /**
     * @var int|null
     */
    private $createdDate;

    /**
     * @param int $userId
     *
     * @return TableModelBuilder
     * @throws AssertionException
     */
    public function withUserId($userId)
    {
        Assertion::assertIsNonZeroPositiveInteger($userId, 'user id must be non zero positive integer');
        $this->userId = $userId;
        return $this;
    }

    /**
     * @param int|null $formId
     *
     * @return TableModelBuilder
     * @throws AssertionException
     */
    public function withFormId($formId)
    {
        Assertion::assertIsNonZeroPositiveIntegerOrNull($formId, 'form id must be non zero positive int or null');
        $this->formId = $formId;
        return $this;
    }

    /**
     * @param string $name
     *
     * @return TableModelBuilder
     * @throws AssertionException
     */
    public function withName($name)
    {
        Assertion::assertIsValidIdentifierName($name, 'table name does not represent a valid table identifier');
        $this->name = $name;
        return $this;
    }

    /**
     * @param $schema
     *
     * @return $this
     * @throws AssertionException
     */
    public function withSchema($schema)
    {
        Assertion::assertIsArrayOrNull($schema, 'schema must either be array, either null');
        $this->schema = $schema;
        return $this;
    }

    /**
     * @param string $namespace
     *
     * @return TableModelBuilder
     * @throws AssertionException
     */
    public function withNamespace($namespace)
    {
        Assertion::assertValueIsOneOf(
            $namespace,
            [
                StorageService::TABLE_NAMESPACE_GLOBAL,
                StorageService::TABLE_NAMESPACE_PRIVATE,
            ],
            'table namespace must be one of: '
            . StorageService::TABLE_NAMESPACE_GLOBAL . ', '
            . StorageService::TABLE_NAMESPACE_PRIVATE
        );
        $this->namespace = $namespace;
        return $this;
    }

    /**
     * @param string $accessMode
     *
     * @return TableModelBuilder
     * @throws AssertionException
     */
    public function withAccessMode($accessMode)
    {
        Assertion::assertValueIsOneOf(
            $accessMode,
            [
                StorageService::TABLE_ACCESS_MODE_READ,
                StorageService::TABLE_ACCESS_MODE_READ_WRITE,
                StorageService::TABLE_ACCESS_MODE_READ_WRITE,
            ],
            'table access mode must be: r, w, or rw'
        );
        $this->accessMode = $accessMode;
        return $this;
    }

    /**
     * @param string $storageEngine
     *
     * @return TableModelBuilder
     * @throws AssertionException
     */
    public function withStorageEngine($storageEngine)
    {
        Assertion::assertValueIsOneOf(
            $storageEngine,
            [
                StorageService::TABLE_STORAGE_ENGINE_MEMORY,
                StorageService::TABLE_STORAGE_ENGINE_REMOTE,
            ],
            'storage engine must be: '
            . StorageService::TABLE_STORAGE_ENGINE_MEMORY . ', '
            . StorageService::TABLE_STORAGE_ENGINE_REMOTE
        );

        $this->storageEngine = $storageEngine;
        return $this;
    }

    /**
     * @param $createdDate
     *
     * @return TableModelBuilder
     * @throws AssertionException
     */
    public function withCreatedDate($createdDate)
    {
        Assertion::assertIsIntOrNull($createdDate);
        $this->createdDate = $createdDate;
        return $this;
    }

    /**
     * @return TableModel
     */
    public function build()
    {

        return new TableModel([
            'id'            => $this->id,
            'userId'        => $this->userId,
            'formId'        => $this->formId,
            'name'          => $this->name,
            'schema'        => $this->schema,
            'namespace'     => $this->namespace,
            'accessMode'    => $this->accessMode,
            'storageEngine' => $this->storageEngine,
            'createdDate'   => $this->createdDate,
        ]);

    }

}