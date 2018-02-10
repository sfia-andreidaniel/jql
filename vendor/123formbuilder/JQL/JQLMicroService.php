<?php

namespace ContactForm\JQL;

class JQLMicroService
{

    /**
     * @var self
     */
    private static $instance;

    /**
     * @var mixed|array
     */
    private $config;

    /**
     * JQLMicroService constructor.
     *
     * @param string $JQLMicroServiceConfigFilePath
     *
     * @throws JQLMicroserviceError
     */
    public function __construct($JQLMicroServiceConfigFilePath)
    {

        if (file_exists($JQLMicroServiceConfigFilePath)) {

            $this->config = require $JQLMicroServiceConfigFilePath;

        } else {

            throw new JQLMicroserviceError(
                'Failed to instantiate JQL Microservice! Configuration file was not found!',
                JQLMicroserviceError::ERR_CONFIGURATION_FILE_NOT_FOUND
            );

        }
    }

    /**
     * @return self
     * @throws JQLMicroserviceError
     */
    public static function getInstance()
    {
        return null !== self::$instance
            ? self::$instance
            : self::$instance = new self(__DIR__ . '/../../../src/config/microservice.config.php');
    }

    /**
     * @param array      $get
     * @param array|null $post
     *
     * @return mixed
     * @throws JQLMicroserviceError
     */
    private function request(array $get = null, array $post = null)
    {

        $url = $this->getConfigValue('microservice.url');

        $requestType = 'get';

        if (is_array($post) && count($post)) {
            $requestType = 'post';
        }

        if (is_array($get) && count($get)) {

            $queryParams = [];

            foreach ($get as $queryParamName => $queryParamValue) {

                if ('' === $queryParamName) {
                    continue;
                }

                $queryParams[] = urlencode($queryParamName) . '=' . urlencode((string)$queryParamValue);

            }

            if (count($queryParams) > 0) {

                $queryString = '?' . implode('&', $queryParams);

                $url .= $queryString;

            }

        }

        $ch = curl_init($url);

        if ($requestType === 'post') {
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
        }

        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 3);

        $buffer = curl_exec($ch);

        if (false === $buffer) {
            throw new JQLMicroserviceError(
                'Error fetching microservice data',
                JQLMicroserviceError::ERR_FETCH_MICROSERVICE_DATA
            );
        }

        $result = @json_decode($buffer, true);

        if (json_last_error()) {
            throw new JQLMicroserviceError(
                'Invalid Microservice response - The response could not be parsed as valid JSON!',
                JQLMicroserviceError::ERR_INVALID_MICROSERVICE_RESPONSE
            );
        }

        $responseInfo = curl_getinfo( $ch );

        if ( $responseInfo['http_code'] !== 200 ) {

            if ( is_array($result) && isset($result['message'])) {

                $formattedException = $this->formatBackendException( $result );

                throw new JQLMicroserviceError(
                    $formattedException,
                    JQLMicroserviceError::ERR_BACKEND_ERROR
                );

            } else {
                throw new JQLMicroserviceError(
                    'Unknown backend exception!',
                    JQLMicroserviceError::ERR_BACKEND_ERROR
                );
            }

        }


        return $result;

    }

    /**
     * @param $formId
     * @param $userId
     *
     * @return string
     * @throws JQLMicroserviceError
     */
    public function createAdminAuthenticationToken($formId, $userId)
    {

        if (!is_int($formId) || $formId <= 0) {
            throw new JQLMicroserviceError(
                'Invalid argument: $formId: int>0 expected!',
                JQLMicroserviceError::ERR_INVALID_ARGUMENT
            );
        }

        if (!is_int($userId) || $userId <= 0) {
            throw new JQLMicroserviceError(
                'Invalid argument: $formId: int>0 expected!',
                JQLMicroserviceError::ERR_INVALID_ARGUMENT
            );
        }

        $result = $this->request([
                'action'     => 'token',
                'token_type' => 'admin',
                'user_id'    => $userId,
                'form_id'    => $formId,
            ]
        );

        return $result;

    }

    /**
     * @param $formId
     * @param $userId
     *
     * @return string
     * @throws JQLMicroserviceError
     */
    public function createAnonymousAuthenticationToken($formId, $userId)
    {
        if (!is_int($formId) || $formId <= 0) {
            throw new JQLMicroserviceError(
                'Invalid argument: $formId: int>0 expected!',
                JQLMicroserviceError::ERR_INVALID_ARGUMENT
            );
        }

        if (!is_int($userId) || $userId <= 0) {
            throw new JQLMicroserviceError(
                'Invalid argument: $formId: int>0 expected!',
                JQLMicroserviceError::ERR_INVALID_ARGUMENT
            );
        }

        $result = $this->request([
                'action'     => 'token',
                'token_type' => 'viewer',
                'user_id'    => $userId,
                'form_id'    => $formId,
            ]
        );

        return $result;

    }

    /**
     * @param string $authorizationToken
     *
     * @return array|null
     * @throws JQLMicroserviceError
     */
    public function getFormJQLConfiguration($authorizationToken)
    {

        $result = $this->request(
            null,
            [
                'action' => 'fetch-form-data',
                'auth'   => $authorizationToken,
            ]
        );

        return $result;

    }

    /**
     * @param int        $formId
     * @param int        $userId
     * @param int        $eventType
     * @param array|null $submissionBinding
     */
    public function executeSubmissionActions($formId, $userId, $eventType, array $submissionBinding = null)
    {

    }

    /**
     * @param string     $configKey
     * @param mixed|null $defaultValue
     *
     * @return mixed
     */
    protected function getConfigValue($configKey, $defaultValue = null)
    {
        return is_array($this->config) && isset($this->config[$configKey])
            ? $this->config[$configKey]
            : $defaultValue;
    }

    /**
     * @param array $result
     * @param int   $indentation
     *
     * @return string
     */
    private function formatBackendException(array $result, $indentation = 0)
    {

        $parts = [ str_repeat(' ', $indentation ) . '[BACKEND]' ];

        if ( isset($result['kind']) ){
            $parts[] = '[KIND: ' . $result['kind'] . ']';
        }

        if ( isset($result['code'])) {
            $parts[] = '[CODE: ' . $result['code'] . ']';
        }

        if ( isset($result['message'])) {
            $parts[] = ' ' . $result['message'];
        }

        if ( isset($result['file'])) {
            $parts[] = ' [FILE: ' . $result['file'] . ( isset($result['line']) ? ':' . $result['line'] : '' ) . ']';
        }

        $text = implode('', $parts );

        if ( isset($result['previous'])) {

            $text .= "\n" . $this->formatBackendException( $result['previous'], $indentation + 2 );

        }

        return $text;

    }

}