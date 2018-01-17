<?php

use Jison\JQLGrammar;

require_once __DIR__ . './JQL_AST.php';
require_once __DIR__ . '/JQLGrammar.php';

$grammar = new JQLGrammar();

$result = $grammar->parse('SELECT a AS moo, b AS car FROM foo' );

var_dump($result);