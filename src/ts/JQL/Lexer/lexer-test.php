<?php

use Jison\AST;
use Jison\JQLGrammar;

require_once __DIR__ . './AST.php';
require_once __DIR__ . '/JQLGrammar.php';

$grammar = new JQLGrammar();

$result = $grammar->parse('SELECT a AS moo, b AS car FROM foo' );

echo json_encode($result, JSON_PRETTY_PRINT ), "\n";
