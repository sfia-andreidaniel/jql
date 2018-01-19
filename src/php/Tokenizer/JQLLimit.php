<?php

namespace JQL\Tokenizer;


class JQLLimit extends JQLOpcode
{

    /**
     * @var int
     */
    private $limit;

    /**
     * @var int
     */
    private $skip;

    /**
     * JQLLimit constructor.
     *
     * @param array $token
     */
    public function __construct(array $token)
    {
        $this->limit = $token['limit'];
        $this->skip = $token['skip'];
    }

    /**
     * @return string
     */
    public function getOpcodeType()
    {
        return EJQLLexerOpcodeTypes::LIMIT_OPTION;
    }
}