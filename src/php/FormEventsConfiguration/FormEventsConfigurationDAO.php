<?php

namespace JQL\FormEventsConfiguration;

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

    private function silentlyRollbackTransaction()
    {
        try {
            $this->database->query('ROLLBACK');
        } catch (\Exception $e) {
        }
    }

}