<?php

namespace JQL\Storage;

class StorageException extends \Exception
{

    const ERR_NOT_ENOUGH_PERMISSIONS = 1;
    const ERR_USER_ID_FORBIDDEN = 2;
    const ERR_GET_USER_TABLES = 3;
    const ERR_FORM_ID_FORBIDDEN = 4;
    const ERR_TABLE_ALREADY_EXISTS = 5;
    const ERR_CREATE_TABLE_FROM_CSV = 6;
    const ERR_GET_TABLE_BY_ID = 7;
}