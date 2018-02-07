<?php

namespace JQL\FormEventsConfiguration;

class FormEventsConfigurationException extends \Exception
{

    const ERR_NOT_ENOUGH_PRIVILEGES = 1;
    const ERR_SAVE_FORM_CONFIGURATION = 2;
    const ERR_INVALID_JQL_TOKENIZED_SYNTAX = 3;
}