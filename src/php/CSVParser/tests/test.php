<?php

use JQL\CSVParser\CSVParser;
use JQL\CSVParser\CSVParserOptions;

require_once __DIR__ . '/../CSVParser.php';
require_once __DIR__ . '/../CSVParserOptions.php';
require_once __DIR__ . '/../CSVParserException.php';
require_once __DIR__ . '/../ParsedCSVModel.php';
require_once __DIR__ . '/../StringBuffer.php';

$parser = new CSVParser();

$options = (new CSVParserOptions())->withEncloseAllFields(false);

$csv = file_get_contents(__DIR__ . '/quote-delimiters.csv');

$result = $parser->parse($csv, $options);

print_r($result->getComputedColumnTypes());
print_r($result->getAssoc());