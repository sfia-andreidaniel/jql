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
     * @param $queryExecutionContext
     *
     * @return string
     */
    public function getLiteral( $queryExecutionContext )
    {

        if (null !== $this->literal) {
            return $this->literal;
        }
        else {
            $this->literal = trim($this->toString($queryExecutionContext));
            $this->literal = str_replace('"', '', $this->literal);
            $this->literal = str_replace( "'", '', $this->literal);
            return $this->literal;
        }
    }
}