<?php

namespace JQL\Tokenizer;


use JQL\Assertion\Assertion;

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
     *
     * @throws \JQL\Assertion\AssertionException
     */
    public function __construct(array $token)
    {
        Assertion::assertIsPositiveIntArrayKey($token, 'limit');
        Assertion::assertIsUnsignedIntArrayKey($token, 'skip');

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

    /**
     * @param $queryExecutionContext
     *
     * @return string
     */
    public function toString( $queryExecutionContext )
    {
        return 'LIMIT ' . $this->skip . ',' . $this->limit;
    }
}