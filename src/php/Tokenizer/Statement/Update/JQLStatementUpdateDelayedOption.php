<?php

namespace JQL\Tokenizer\Statement\Update;


use JQL\Tokenizer\EJQLLexerOpcodeTypes;
use JQL\Tokenizer\EJQLQueryExecutionContext;
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

    /**
     * @param $queryExecutionContext - one of EJQLQueryExecutionContext constants
     *
     * @return string
     */
    public function toString($queryExecutionContext)
    {
        switch ( $queryExecutionContext ) {

            case EJQLQueryExecutionContext::CLIENT_SIDE:
                return 'DELAYED' . ( null === $this->timer ? ' ' . $this->timer : '' );
                break;

            //UPDATE DELAYED STATEMENTS ARE NOT SUPPORTED BACKEND (THEY DON'T MAKE SENSE)
            default:
                return '';
                break;

        }
    }
}