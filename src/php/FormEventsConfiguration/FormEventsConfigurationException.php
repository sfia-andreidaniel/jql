<?php

namespace JQL\FormEventsConfiguration;

class FormEventsConfigurationException extends \Exception
{

    const ERR_NOT_ENOUGH_PRIVILEGES = 1;
    const ERR_SAVE_FORM_CONFIGURATION = 2;
    const ERR_INVALID_JQL_TOKENIZED_SYNTAX = 3;
    const ERR_FETCH_FORM_CONFIGURATION = 4;
    const ERR_GET_JQL_FORM_EVENTS_CONFIGURATION = 5;
    const ERR_CORRUPTED_DATABASE_JSON_DATA = 6;
}