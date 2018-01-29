<?php

namespace JQL\Storage;

class TableModel
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
     * @var array|null
     */
    private $indexes;

    /**
     * @var string * ENUM("private", "global" )
     */
    private $namespace;

    /**
     * @var string * ENUM("r", "w", "rw")
     */
    private $accessMode;

    /**
     * @var int|null
     */
    private $createdDate;

    /**
     * @var string * ENUM("memory", "remote")
     */
    private $storageEngine;

    public function __construct(array $daoRow)
    {
        $this->id = $daoRow['id'];
        $this->userId = $daoRow['userId'];
        $this->formId = $daoRow['formId'];
        $this->name = $daoRow['name'];
        $this->schema = $daoRow['schema'];
        $this->indexes = $daoRow['indexes'];
        $this->namespace = $daoRow['namespace'];
        $this->accessMode = $daoRow['accessMode'];
        $this->storageEngine = $daoRow['storageEngine'];
        $this->createdDate = $daoRow['createdDate'];
    }

    /**
     * @return array
     */
    public function toArray()
    {
        return [
            'id'            => $this->id,
            'userId'        => $this->userId,
            'formId'        => $this->formId,
            'name'          => $this->name,
            'schema'        => $this->schema,
            'indexes'       => $this->indexes,
            'namespace'     => $this->namespace,
            'accessMode'    => $this->accessMode,
            'storageEngine' => $this->storageEngine,
            'createdDate'   => $this->createdDate,
        ];
    }

    /**
     * @return int|null
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return int
     */
    public function getUserId()
    {
        return $this->userId;
    }

    /**
     * @return int|null
     */
    public function getFormId()
    {
        return $this->formId;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @return array|null
     */
    public function getSchema()
    {
        return $this->schema;
    }

    /**
     * @return array|null
     */
    public function getIndexes()
    {
        return $this->indexes;
    }

    /**
     * @return string
     */
    public function getNamespace()
    {
        return $this->namespace;
    }

    /**
     * @return string
     */
    public function getAccessMode()
    {
        return $this->accessMode;
    }

    /**
     * @return string
     */
    public function getStorageEngine()
    {
        return $this->storageEngine;
    }

    /**
     * @return int
     */
    public function getCreatedDate()
    {
        return $this->createdDate;
    }

}