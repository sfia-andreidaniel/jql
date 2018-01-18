<?php

namespace JQL;

use JQL\Authorization\AuthorizationException;
use JQL\Authorization\AuthorizationService;
use JQL\Database\Database;
use JQL\RemoteQuery\RemoteQueryService;

class Controller
{

    const ACTION_GENERATE_TOKEN = 'token';
    const ACTION_EXECUTE_QUERY = 'query';


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
     * @throws AuthorizationException
     * @throws ControllerException
     */
    public function dispatch()
    {

        $action = $this->get('action');

        switch ($action) {

            case self::ACTION_GENERATE_TOKEN:
                return $this->generateTokenAction();
                break;

            case self::ACTION_EXECUTE_QUERY:
                return $this->executeQueryAction();
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

        $tokenizedJSONBindings = @json_decode($bindingsBase64);

        if (!is_string($tokenizedJSONBindings) || empty($tokenizedJSONBindings)) {
            throw new ControllerException(
                'Invalid argument: $bindings. Failed to decode the bindings as base/64 string!' .
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

        $result = $this->remoteQueryService->executeQuery($decodedQuery, $decodedBindings, $auth);

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
}