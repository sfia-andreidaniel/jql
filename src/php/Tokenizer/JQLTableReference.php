<?php

namespace JQL\Tokenizer;

class JQLTableReference extends JQLOpcode
{

    /**
     * @var string
     */
    public $name;

    public function __construct(array $token)
    {
        $this->name = $token['name'];
    }

    /**
     * @return string
     */
    public function getOpcodeType()
    {
        return EJQLLexerOpcodeTypes::TABLE;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

}