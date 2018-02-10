<?php

namespace ContactForm\JQL;

class JQLMicroserviceError extends \Exception
{

    const ERR_FETCH_MICROSERVICE_DATA = 1;
    const ERR_INVALID_MICROSERVICE_RESPONSE = 2;
    const ERR_CONFIGURATION_FILE_NOT_FOUND = 3;
    const ERR_INVALID_ARGUMENT = 4;
    const ERR_BACKEND_ERROR = 5;
}