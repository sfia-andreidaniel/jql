<?php

return [

    'token.jti'                 => '4f1g23a12aa',
    'token.password'            => 'LKSJDO(#sdklo*quw#eksd>amkuy@#($*ylasdalkj(*(@#$',
    'token.ttl'                 => 86400,
    'server.name'               => $_SERVER['SERVER_NAME'],
    'database.default.url'      => 'mysql:host=127.0.0.1;dbname=rovis_events;charset=utf8mb4',
    'database.default.user'     => 'root',
    'database.default.password' => 'vagrant',
    'database.default.options'  => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ],
];