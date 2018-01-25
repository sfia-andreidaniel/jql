<?php

use JQL\Controller;

require_once __DIR__ . '/autoloaders.php';

header('Content-Type: application/json');

function getExceptionPretty(\Exception $e)
{
    $result = [
        'message' => $e->getMessage(),
        'code'    => $e->getCode(),
        'file'    => preg_replace('/\\.php$/', '', @end(explode(DIRECTORY_SEPARATOR, $e->getFile()))),
        'line'    => $e->getLine(),
        'kind'    => preg_replace('/\\.php$/i', '', @end(explode('\\', get_class($e)))),
    ];

    try {
        $clone = new ReflectionClass($e);

        $constants = $clone->getConstants();

        foreach ($constants as $constantName => $constantValue) {
            if ($constantValue === $e->getCode()) {
                $result['code'] .= ': ' . $constantName;
                break;
            }
        }
    } catch (ReflectionException $e) {
    }

    if ($e->getPrevious()) {
        $result['previous'] = getExceptionPretty($e->getPrevious());
    }

    return $result;
}

try {

    $controller = new Controller($_GET, $_POST, require __DIR__ . '/config/config.php');

    $result = $controller->dispatch();

    echo json_encode($result, JSON_PRETTY_PRINT);

} catch (\Exception $e) {

    header('HTTP/1.1 500 Service error');

    echo json_encode(getExceptionPretty($e), JSON_PRETTY_PRINT);

}