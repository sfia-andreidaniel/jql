<?php

namespace JQL;

use JQL\Authorization\AuthorizationException;
use JQL\Authorization\AuthorizationService;
use JQL\Database\Database;

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
     */
    private function executeQueryAction()
    {
        return null;
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
     * @return Database
     */
    public function getDatabase()
    {
        return null === $this->database
            ? $this->database = new Database($this, 'default')
            : $this->database;
    }
}