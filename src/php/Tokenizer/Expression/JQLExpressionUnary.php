<?php

namespace JQL\Tokenizer\Expression;


use JQL\Tokenizer\EJQLLexerExpressionTypes;
use JQL\Tokenizer\JQLExpression;
use JQL\Tokenizer\JQLLexerFactory;

abstract class JQLExpressionUnary extends JQLExpression
{

    /**
     * @var JQLExpression
     */
    protected $operand;

    /**
     * JQLExpressionUnary constructor.
     *
     * @param array $token
     *
     * @throws \JQL\Tokenizer\TokenizerException
     */
    public function __construct( array $token )
    {
        $this->operand = JQLLexerFactory::create($token['left']);
    }

    /**
     * @return string
     */
    public function getExpressionType()
    {
        return EJQLLexerExpressionTypes::UNARY;
    }

    /**
     * @return string
     */
    public abstract function getOperator();

    /**
     * @return JQLExpression
     */
    public function getOperand() {
        return $this->operand;
    }

    /**
     * @return JQLExpressionBinding[]
     */
    public function getBindings() {
        return $this->operand->getBindings();
    }

    /**
     * @return JQLExpressionFunctionCall[]
     */
    public function getFunctions() {
        return $this->operand->getFunctions();
    }

    /**
     * @return JQLExpressionIdentifier[]
     */
    public function getIdentifiers() {
        return $this->operand->getIdentifiers();
    }

}