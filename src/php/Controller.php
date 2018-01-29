<?php

namespace JQL;

use JQL\Assertion\Assertion;
use JQL\Assertion\AssertionException;
use JQL\Authorization\AuthorizationException;
use JQL\Authorization\AuthorizationService;
use JQL\CSVParser\CSVParser;
use JQL\CSVParser\CSVParserOptions;
use JQL\Database\Database;
use JQL\RemoteQuery\RemoteQueryException;
use JQL\RemoteQuery\RemoteQueryService;
use JQL\Storage\StorageService;
use JQL\Storage\StorageServiceDAO;
use JQL\Storage\TableModelBuilder;
use JQL\Storage\StorageException;

class Controller
{

    const ACTION_GENERATE_TOKEN = 'token';
    const ACTION_EXECUTE_QUERY = 'query';
    const ACTION_CREATE_TABLE_FROM_CSV = 'create-table-from-csv';
    const ACTION_SHOW_TABLES = 'show-tables';
    const ACTION_FETCH_TABLE = 'fetch-table';


    /**
     * @var array
     */
    private $_get;

    /**
     * @var array
     */
    private $_post;

    /**
     * @var array
     */
    private $_config;

    /**
     * @var AuthorizationService
     */
    private $authorizationService;

    /**
     * @var Database
     */
    private $database;

    /**
     * @var RemoteQueryService
     */
    private $remoteQueryService;

    /**
     * @var StorageService
     */
    private $storageService;

    /**
     * Controller constructor.
     *
     * @param array $get
     * @param array $post
     * @param array $config
     */
    public function __construct(array $get, array $post, array $config)
    {
        $this->_get = $get;
        $this->_post = $post;
        $this->_config = $config;
    }

    public function get($variable, $defaultValue = null)
    {
        return isset($this->_get[$variable])
            ? $this->_get[$variable]
            : $defaultValue;
    }

    public function post($variable, $defaultValue = null)
    {
        return isset($this->_post[$variable])
            ? $this->_post[$variable]
            : $defaultValue;
    }

    public function requestParam($variable, $defaultValue = null)
    {
        return isset($this->_get[$variable])
            ? $this->_get[$variable]
            : (isset($this->_post[$variable])
                ? $this->_post[$variable]
                : $defaultValue
            );
    }

    public function config($variable, $defaultValue = null)
    {
        return isset($this->_config[$variable])
            ? $this->_config[$variable]
            : $defaultValue;
    }

    /**
     * @return mixed
     * @throws AssertionException
     * @throws AuthorizationException
     * @throws ControllerException
     * @throws RemoteQueryException
     * @throws StorageException
     */
    public function dispatch()
    {

        $action = $this->requestParam('action');

        switch ($action) {

            case self::ACTION_GENERATE_TOKEN:
                return $this->generateTokenAction();
                break;

            case self::ACTION_EXECUTE_QUERY:
                return $this->executeQueryAction();
                break;

            case self::ACTION_CREATE_TABLE_FROM_CSV:
                return $this->createTableFromCSVAction();
                break;

            case self::ACTION_SHOW_TABLES:
                return $this->showTablesAction();
                break;

            case self::ACTION_FETCH_TABLE:
                return $this->fetchTableAction();
                break;

            default:
                throw new ControllerException(
                    'Invalid action: ' . json_encode($action),
                    ControllerException::ERR_INVALID_ACTION
                );
        }

    }

    /**
     * @return mixed
     * @throws Authorization\AuthorizationException
     */
    private function generateTokenAction()
    {

        $tokenType = $this->requestParam('token_type');
        $formId = $this->requestParam('form_id', -1);
        $userId = $this->requestParam('user_id', -1);

        $authorization = new AuthorizationService($this);

        return $authorization->generateAuthenticationToken($tokenType, (int)$userId, (int)$formId);

    }

    /**
     * @return mixed
     * @throws AuthorizationException
     * @throws ControllerException
     * @throws RemoteQueryException
     */
    private function executeQueryAction()
    {

        $auth = $this->getAuthorizationService()->getAuthenticationToken();

        $queryBase64 = $this->requestParam('query');

        if (!is_string($queryBase64) || empty($queryBase64)) {
            throw new ControllerException(
                'Invalid argument: $query. String non empty expected!',
                ControllerException::ERR_INVALID_REQUEST_ARGUMENT
            );
        }

        $tokenizedJSONQuery = @base64_decode($queryBase64);

        if (!is_string($tokenizedJSONQuery) || empty($queryBase64)) {
            throw new ControllerException(
                'Invalid argument: $query. Failed to decode the query as base/64 string!',
                ControllerException::ERR_INVALID_REQUEST_ARGUMENT
            );
        }

        /**
         * @var array $decodedQuery
         */
        $decodedQuery = @json_decode($tokenizedJSONQuery, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new ControllerException(
                'Invalid argument: $query. Failed to decode the query as JSON after decoding it from base/64 string!',
                ControllerException::ERR_INVALID_REQUEST_ARGUMENT
            );
        }

        if (!is_array($decodedQuery)) {
            throw new ControllerException(
                'Invalid argument: $query. The decoded JSON tokenized query is not a array!',
                ControllerException::ERR_INVALID_REQUEST_ARGUMENT
            );
        }

        $bindingsBase64 = $this->requestParam('bindings');

        if (!is_string($bindingsBase64) || empty($bindingsBase64)) {
            throw new ControllerException(
                'Invalid argument: $bindings: String non empty expected!',
                ControllerException::ERR_INVALID_REQUEST_ARGUMENT
            );
        }

        $tokenizedJSONBindings = @base64_decode($bindingsBase64, true);

        if (!is_string($tokenizedJSONBindings) || empty($tokenizedJSONBindings)) {
            throw new ControllerException(
                'Invalid argument: $bindings. Failed to decode the bindings as base/64 string!',
                ControllerException::ERR_INVALID_REQUEST_ARGUMENT
            );
        }

        /**
         * @var array $decodedBindings
         */
        $decodedBindings = @json_decode($tokenizedJSONBindings, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new ControllerException(
                'Invalid argument: $bindings. Failed to decode the bindings as JSON after decoding them from base/64 string!',
                ControllerException::ERR_INVALID_REQUEST_ARGUMENT
            );
        }

        if (!is_array($decodedBindings)) {
            throw new ControllerException(
                'Invalid argument: $bindings. The decoded JSON bindings is not a array!',
                ControllerException::ERR_INVALID_REQUEST_ARGUMENT
            );
        }

        $result = $this->getRemoteQueryService()->executeQuery($decodedQuery, $decodedBindings, $auth);

        return $result;
    }

    /**
     * @return AuthorizationService
     */
    public function getAuthorizationService()
    {
        return null === $this->authorizationService
            ? $this->authorizationService = new AuthorizationService($this)
            : $this->authorizationService;
    }

    /**
     * @return RemoteQueryService
     */
    public function getRemoteQueryService()
    {
        return null === $this->remoteQueryService
            ? $this->remoteQueryService = new RemoteQueryService($this)
            : $this->remoteQueryService;
    }

    /**
     * @return Database
     */
    public function getDatabase()
    {
        return null === $this->database
            ? $this->database = new Database($this, 'default')
            : $this->database;
    }

    /**
     * @return StorageService
     */
    public function getStorageService()
    {
        return null === $this->storageService
            ? $this->storageService = new StorageService(
                new StorageServiceDAO(
                    $this->getDatabase()
                ),
                new CSVParser()
            )
            : $this->storageService;
    }

    /**
     * @return array
     * @throws AssertionException
     * @throws AuthorizationException
     * @throws StorageException
     */
    private function createTableFromCSVAction()
    {
        $token = $this->getAuthorizationService()->getAuthenticationToken();

        $fileData = isset($_FILES['csvFile'])
            ? file_get_contents($_FILES['csvFile']['tmp_name'])
            : null;

        $setting = $this->post('setting');

        Assertion::assertIsString($setting, 'invalid request argument: $setting');

        $settingDecodedFromBase64 = @base64_decode($setting);

        Assertion::assertIsString($settingDecodedFromBase64);

        $settingJSON = @json_decode($settingDecodedFromBase64, true);

        Assertion::assertIsArray($settingJSON, 'invalid request argument: $setting is not array!');

        unset($setting);
        unset($settingDecodedFromBase64);

        Assertion::assertIsArray($settingJSON['table'], 'invalid request argument: setting.table is not array!');

        Assertion::assertIsStringKey($settingJSON['table'], 'name', 'invalid request argument: setting.table.name is not string');
        Assertion::assertIsStringKey($settingJSON['table'], 'namespace', 'invalid request argument: setting.table.namespace is not string');
        Assertion::assertIsStringKey($settingJSON['table'], 'storageEngine', 'invalid request argument: setting.table.storageEngine is not string');
        Assertion::assertIsStringKey($settingJSON['table'], 'accessMode', 'invalid request argument: setting.table.accessMode is not string');

        Assertion::assertIsArray($settingJSON['csvParser'], 'invalid request argument: setting.csvParser is not array!');

        Assertion::assertIsStringKey($settingJSON['csvParser'], 'enclosure', 'invalid request argument: setting.csvParser.enclosure is not string');
        Assertion::assertIsBooleanKey($settingJSON['csvParser'], 'encloseAllFields', 'invalid request argument: setting.csvParser.encloseAllFields is not boolean');
        Assertion::assertIsStringKey($settingJSON['csvParser'], 'delimiter', 'invalid request argument: setting.csvParser.delimiter is not string');
        Assertion::assertIsStringKey($settingJSON['csvParser'], 'escapeCharacter', 'invalid request argument: setting.csvParser.escapeCharacter is not string');
        Assertion::assertIsBooleanKey($settingJSON['csvParser'], 'autoTrim', 'invalid request argument: setting.csvParser.autoTrim is not boolean');
        Assertion::assertIsStringKey($settingJSON['csvParser'], 'lineTerminator', 'invalid request argument: setting.csvParser.lineTerminator is not string');

        $table = (new TableModelBuilder())
            ->withUserId($token->getUserId())
            ->withFormId(
                $settingJSON['table']['namespace'] === StorageService::TABLE_NAMESPACE_PRIVATE
                    ? $token->getFormId()
                    : null
            )
            ->withAccessMode($settingJSON['table']['accessMode'])
            ->withName($settingJSON['table']['name'])
            ->withNamespace($settingJSON['table']['namespace'])
            ->withStorageEngine($settingJSON['table']['storageEngine'])
            ->build();

        $csvParserOptions = (new CSVParserOptions())
            ->withEncloseAllFields($settingJSON['csvParser']['encloseAllFields'])
            ->withFieldEnclosure($settingJSON['csvParser']['enclosure'])
            ->withFieldDelimiter($settingJSON['csvParser']['delimiter'])
            ->withEscapeCharacter($settingJSON['csvParser']['escapeCharacter'])
            ->withAutoTrim($settingJSON['csvParser']['autoTrim'])
            ->withLineTerminator($settingJSON['csvParser']['lineTerminator']);

        return $this->getStorageService()->createTableFromCSV(
            $fileData,
            $csvParserOptions,
            $table,
            $token
        )->toArray();
    }

    /**
     * @throws AuthorizationException
     * @throws StorageException
     */
    private function showTablesAction()
    {

        $token = $this->getAuthorizationService()->getAuthenticationToken();

        $result = [];

        foreach ($this->getStorageService()->getUserTables(
            $token,
            $token->getUserId(),
            $token->getFormId()
        ) as $tableModel) {
            $result[] = [
                'name'          => $tableModel->getName(),
                'schema'        => $tableModel->getSchema(),
                'indexes'       => $tableModel->getIndexes(),
                'namespace'     => $tableModel->getNamespace(),
                'accessMode'    => $tableModel->getAccessMode(),
                'storageEngine' => $tableModel->getStorageEngine(),
            ];
        }

        return $result;

    }

    /**
     * @throws AuthorizationException
     * @throws StorageException
     */
    private function fetchTableAction()
    {

        $token = $this->getAuthorizationService()->getAuthenticationToken();

        $tableName = $this->requestParam('name');

        $rows = $this->getStorageService()->getTableRows(
            $token,
            $tableName
        );

        return $rows;

    }
}