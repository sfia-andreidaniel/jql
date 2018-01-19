<?php

namespace JQL\Tokenizer;


use JQL\Tokenizer\Expression\JQLExpressionBinding;
use JQL\Tokenizer\Expression\JQLExpressionFunctionCall;
use JQL\Tokenizer\Expression\JQLExpressionIdentifier;

abstract class JQLExpression extends JQLOpcode
{

    /**
     * @var string|null
     */
    private $literal;

    /**
     * @return string
     */
    public function getOpcodeType()
    {
        return EJQLLexerOpcodeTypes::EXPRESSION;
    }

    /**
     * @return string
     */
    public abstract function getExpressionType();

    /**
     * @return JQLExpressionBinding[]
     */
    public abstract function getBindings();

    /**
     * @return JQLExpressionFunctionCall[]
     */
    public abstract function getFunctions();

    /**
     * @return JQLExpressionIdentifier[];
     */
    public abstract function getIdentifiers();

    /**
     * @return string
     */
    public abstract function toString();

    /**
     * @return string
     */
    public function getLiteral()
    {

        if (null !== $this->literal) {
            return $this->literal;
        }
        else {
            $this->literal = preg_replace('/["\']+/g', '', trim($this->toString()));
            return $this->literal;
        }
    }
}