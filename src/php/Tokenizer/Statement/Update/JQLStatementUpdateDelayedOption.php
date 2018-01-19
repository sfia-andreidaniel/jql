<?php

namespace JQL\Tokenizer\Statement\Update;


use JQL\Tokenizer\EJQLLexerOpcodeTypes;
use JQL\Tokenizer\JQLOpcode;

class JQLStatementUpdateDelayedOption extends JQLOpcode
{

    /**
     * @var int|null
     */
    private $timer;


    public function __construct( array $token )
    {
        $this->timer = isset($token['timer']) && is_int($token['timer'])
            ? $token['timer']
            : null;
    }

    public function getOpcodeType()
    {
        return EJQLLexerOpcodeTypes::DELAYED_OPTION;
    }

    /**
     * @return int|null
     */
    public function getTimer()
    {
        return $this->timer;
    }

}