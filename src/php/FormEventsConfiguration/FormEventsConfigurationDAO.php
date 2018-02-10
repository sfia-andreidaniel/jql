<?php

namespace JQL\FormEventsConfiguration;

use JQL\Assertion\Assertion;
use JQL\Assertion\AssertionException;
use JQL\Database\Database;

class FormEventsConfigurationDAO
{
    /**
     * @var Database
     */
    private $database;

    /**
     * FormEventsConfigurationDAO constructor.
     *
     * @param Database $database
     */
    public function __construct(Database $database)
    {
        $this->database = $database;
    }

    /**
     * @param int   $userId
     * @param int   $formId
     * @param array $configuration
     *
     * @throws FormEventsConfigurationException
     */
    public function saveFormEventsConfiguration($userId, $formId, array $configuration)
    {

        $isTransactionStarted = false;

        try {

            $this->database->query('START TRANSACTION');

            $isTransactionStarted = true;

            $jsonConfig = json_encode($configuration);

            $this->database->query(
                'INSERT INTO jql_forms_config ( 
                                user_id, 
                                form_id, 
                                config 
                            ) VALUES ( 
                                :user_id, 
                                :form_id, 
                                :config 
                            )
                            ON DUPLICATE KEY UPDATE config = :config
                           ',
                [
                    ':user_id' => $userId,
                    ':form_id' => $formId,
                    ':config'  => $jsonConfig,
                ]
            );

            $this->database->query(
                'DELETE FROM jql_form_allowed_queries WHERE user_id = :user_id AND form_id = :form_id'/** NO LIMIT 1 */,
                [
                    ':user_id' => $userId,
                    ':form_id' => $formId,
                ]
            );

            $seenQueriesMD5Hashes = [];

            foreach ($configuration as $item) {

                foreach ($item['actions'] as $action) {

                    $md5Hash = md5(json_encode($action['statement']));

                    if (!in_array($md5Hash, $seenQueriesMD5Hashes)) {

                        $seenQueriesMD5Hashes[] = $md5Hash;

                    }

                }

            }

            foreach ($seenQueriesMD5Hashes as $md5Hash) {

                $this->database->query(
                    '
                                  INSERT INTO jql_form_allowed_queries ( 
                                      user_id, 
                                      form_id, 
                                      query_md5_hash 
                                  ) VALUES ( 
                                      :user_id, 
                                      :form_id, 
                                      :query_md5_hash 
                                  )',
                    [
                        ':user_id'        => $userId,
                        ':form_id'        => $formId,
                        ':query_md5_hash' => $md5Hash,
                    ]
                );

            }

            $this->database->query('COMMIT');

        } catch (\Exception $e) {

            if ($isTransactionStarted) {
                $this->silentlyRollbackTransaction();
            }

            throw new FormEventsConfigurationException(
                'Failed to save form events configuration: ' . $e->getMessage(),
                FormEventsConfigurationException::ERR_SAVE_FORM_CONFIGURATION,
                $e
            );

        }

    }

    /**
     *
     */
    private function silentlyRollbackTransaction()
    {
        try {
            $this->database->query('ROLLBACK');
        } catch (\Exception $e) {
        }
    }

    /**
     * @param int $userId
     * @param int $formId
     *
     * @return array|null
     * @throws FormEventsConfigurationException
     */
    public function getFormConfiguration($userId, $formId)
    {

        try {

            $rows = [];

            $self = $this;

            $this->database->query(
                '
                    SELECT `config` 
                    FROM jql_forms_config 
                    WHERE user_id = :user_id 
                      AND form_id = :form_id 
                    LIMIT 1
                ',
                [
                    ':user_id' => $userId,
                    ':form_id' => $formId,
                ]
            )->each(function(array $row) use (&$rows, $self) {
                $rows[] = $self->normalizeDAORow($row);
            });

            return count($rows) === 1
                ? $rows[0]
                : null;

        } catch (\Exception $e) {
            throw new FormEventsConfigurationException(
                'Failed to get JQL form Events configuration!',
                FormEventsConfigurationException::ERR_GET_JQL_FORM_EVENTS_CONFIGURATION,
                $e
            );
        }

    }

    /**
     * @param array $row
     *
     * @return array
     * @throws FormEventsConfigurationException
     * @throws AssertionException
     */
    private function normalizeDAORow(array $row)
    {
        $result = @json_decode($row['config'], true);

        if (json_last_error()) {
            throw new FormEventsConfigurationException(
                'Failed to decode data from database as JSON!',
                FormEventsConfigurationException::ERR_CORRUPTED_DATABASE_JSON_DATA
            );
        }

        Assertion::assertTrue(is_null($result) || is_array($result), 'Failed to decode form events configuration stored in database as JSON');

        return $result;
    }

}