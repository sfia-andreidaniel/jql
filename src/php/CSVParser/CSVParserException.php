<?php

namespace JQL\CSVParser;

class CSVParserException extends \Exception
{

    const ERR_INVALID_ARGUMENT = 1;
    const ERR_DUPLICATE_COLUMN_NAME = 2;
    const ERR_COLUMNS_NUMBER_MISMATCH = 3;
    const ERR_FIELD_ENCLOSURE_EXPECTED = 4;
    const ERR_UNEXPECTED_END_OF_STRING = 5;
    const ERR_UNEXPECTED_INPUT = 6;
}