<?php

namespace JQL\FormEventsConfiguration;

use JQL\Assertion\Assertion;
use JQL\Assertion\AssertionException;
use JQL\Authorization\AuthorizationService;
use JQL\Authorization\AuthorizationToken;
use JQL\Controller;
use JQL\Tokenizer\JQLLexerFactory;
use JQL\Tokenizer\JQLStatement;

class FormEventsConfigurationService
{
    /**
     * @var Controller
     */
    private $controller;
    /**
     * @var FormEventsConfigurationDAO
     */
    private $dao;

    /**
     * FormEventsConfigurationService constructor.
     *
     * @param Controller                 $controller
     * @param FormEventsConfigurationDAO $dao
     */
    public function __construct(Controller $controller, FormEventsConfigurationDAO $dao)
    {
        $this->controller = $controller;
        $this->dao = $dao;
    }

    /**
     * @param AuthorizationToken $authorizationToken
     * @param array|mixed        $configuration
     *
     * @throws FormEventsConfigurationException
     */
    public function saveFormConfiguration(AuthorizationToken $authorizationToken, $configuration)
    {

        try {

            if ($authorizationToken->getRole() !== AuthorizationService::AUTHORIZATION_TOKEN_ROLE_FORM_ADMIN) {
                throw new FormEventsConfigurationException(
                    'Not enough privileges!',
                    FormEventsConfigurationException::ERR_NOT_ENOUGH_PRIVILEGES
                );
            }

            $this->assertArrayIsValidFormEventsConfigurationV2($configuration);

            $this->dao->saveFormEventsConfiguration(
                $authorizationToken->getUserId(),
                $authorizationToken->getFormId(),
                $configuration
            );

        } catch (AssertionException $e) {
            throw new FormEventsConfigurationException(
                'Cannot save form events configuration: ' . $e->getMessage(),
                FormEventsConfigurationException::ERR_SAVE_FORM_CONFIGURATION,
                $e
            );
        } catch (FormEventsConfigurationException $e) {
            throw $e;
        }

    }

    /**
     * @param $configuration
     *
     * @throws AssertionException
     * @throws FormEventsConfigurationException
     */
    private function assertArrayIsValidFormEventsConfigurationV2($configuration)
    {

        Assertion::assertIsArray($configuration);

        foreach ($configuration as $configurationElement) {

            Assertion::assertIsArray($configurationElement);

            Assertion::assertIsUnsignedIntArrayKey($configurationElement, 'eventType');

            Assertion::assertIsStringKey($configurationElement, 'controlId');

            Assertion::assertIsArrayKey($configurationElement, 'actions');

            if (isset($configurationElement['isRule'])) {
                Assertion::assertIsBooleanKey($configurationElement, 'isRule');
            }

            foreach ($configurationElement['actions'] as $action) {

                $this->assertIsValidFormActionConfiguration($action);

            }

        }

    }

    /**
     * @param $action
     *
     * @throws AssertionException
     * @throws FormEventsConfigurationException
     */
    private function assertIsValidFormActionConfiguration($action)
    {

        Assertion::assertIsArray($action);

        Assertion::assertIsStringKey($action, 'controlId');

        Assertion::assertIsStringKey($action, 'jql');

        Assertion::assertIsArrayKey($action, 'statement');

        $statement = null;

        try {
            $statement = JQLLexerFactory::create($action['statement']);
        } catch (\Exception $e) {
            throw new FormEventsConfigurationException(
                'Configuration contains invalid JQL tokenized syntax. This might be a BUG in backend side JQL assembler engine, or a hijack attempt!',
                FormEventsConfigurationException::ERR_INVALID_JQL_TOKENIZED_SYNTAX,
                $e
            );
        }

        Assertion::assertTrue($statement instanceof JQLStatement, 'Tokenized structure does not represent a statement!');

    }

    /**
     * @param AuthorizationToken $authorizationToken
     *
     * @return array|null
     * @throws FormEventsConfigurationException
     */
    public function getFormConfiguration(AuthorizationToken $authorizationToken)
    {

        try {

            Assertion::assertTrue(is_int($authorizationToken->getUserId()) && $authorizationToken->getUserId() > 0, 'Token\'s user id must be int > 0');
            Assertion::assertTrue(is_int($authorizationToken->getFormId()) && $authorizationToken->getFormId() > 0, 'Token\'s form id must be int > 0');

            $result = $this->dao->getFormConfiguration( $authorizationToken->getUserId(), $authorizationToken->getFormId() );

            return $result;

        } catch (AssertionException $e) {
            throw new FormEventsConfigurationException(
                'Failed to fetch form configuration!',
                FormEventsConfigurationException::ERR_FETCH_FORM_CONFIGURATION,
                $e
            );
        }

    }

}