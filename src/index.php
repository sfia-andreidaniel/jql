<?php

use JQL\Controller;

require_once __DIR__ . '/autoloaders.php';

header('Content-Type: application/json');

try {

    $controller = new Controller($_GET, $_POST, require __DIR__ . '/php/config.php');

    $result = $controller->dispatch();

    echo json_encode($result, JSON_PRETTY_PRINT);

} catch (\Exception $e) {

    header('HTTP/1.1 500 Service error');

    echo json_encode([
        'ok'    => false,
        'error' => [
            'message' => $e->getMessage(),
            'code'    => $e->getCode(),
            'line'    => $e->getLine(),
            'file'    => $e->getFile(),
            'kind'    => preg_replace('/\\.php$/i', '', @end(explode('\\', get_class($e)))),
        ],
    ]);

}