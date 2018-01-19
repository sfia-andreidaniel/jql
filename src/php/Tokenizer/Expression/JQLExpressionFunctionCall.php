<?php

namespace JQL\Tokenizer\Expression;

use JQL\Tokenizer\EJQLLexerExpressionTypes;
use JQL\Tokenizer\JQLExpression;
use JQL\Tokenizer\JQLLexerFactory;

class JQLExpressionFunctionCall extends JQLExpression
{

    /**
     * @var string
     */
    private $functionName;

    /**
     * @var JQLExpression[]
     */
    private $arguments = [];

    /**
     * JQLExpressionFunctionCall constructor.
     *
     * @param array $token
     *
     * @throws \JQL\Tokenizer\TokenizerException
     */
    public function __construct(array $token)
    {

        $this->functionName = $token['functionName'];

        for ($i = 0, $len = count($token['arguments']); $i < $len; $i++) {
            $this->arguments[] = JQLLexerFactory::create($token['arguments'][$i]);
        }

    }

    /**
     * @return string
     */
    public function getExpressionType()
    {
        return EJQLLexerExpressionTypes::FUNCTION_CALL;
    }

    /**
     * @return string
     */
    public function getFunctionName()
    {
        return $this->functionName;
    }

    /**
     * @return JQLExpression[]
     */
    public function getArguments()
    {
        return $this->arguments;
    }

    /**
     * @return JQLExpressionBinding[]
     */
    public function getBindings()
    {
        $result = [];

        for ($argI = 0, $numArgs = count($this->arguments); $argI < $numArgs; $argI++) {

            for ($i = 0, $bindings = $this->arguments[$argI]->getBindings(), $len = count($bindings); $i < $len; $i++) {
                $result[] = $bindings[$i];
            }

        }

        return $result;
    }

    public function getFunctions()
    {
        $result = [ $this ];

        for ($argI = 0, $numArgs = count($this->arguments); $argI < $numArgs; $argI++) {

            for ($i = 0, $functions = $this->arguments[$argI]->getFunctions(), $len = count($functions); $i < $len; $i++) {
                $result[] = $functions[$i];
            }

        }

        return $result;
    }

    public function getIdentifiers()
    {
        $result = [];

        for ($argI = 0, $numArgs = count($this->arguments); $argI < $numArgs; $argI++) {

            for ($i = 0, $identifiers = $this->arguments[$argI]->getIdentifiers(), $len = count($identifiers); $i < $len; $i++) {
                $result[] = $identifiers[$i];
            }

        }

        return $result;
    }

    public function toString()
    {
        $result = $this->functionName . '(';

        for ( $i=0, $len = count($this->arguments); $i<$len; $i++ ) {
            $result .= ( $i === 0 ? '' : ', ' ) . $this->arguments[$i]->toString();
        }

        return $result . ')';
    }

}