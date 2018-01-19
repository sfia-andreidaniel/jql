<?php

namespace JQL\Tokenizer\Expression;


use JQL\Tokenizer\EJQLLexerExpressionTypes;
use JQL\Tokenizer\JQLExpression;
use JQL\Tokenizer\JQLLexerFactory;

abstract class JQLExpressionMath extends JQLExpression
{

    /**
     * @var JQLExpression
     */
    protected $left;

    /**
     * @var JQLExpression
     */
    protected $right;

    /**
     * JQLExpressionMath constructor.
     *
     * @param array $token
     *
     * @throws \JQL\Tokenizer\TokenizerException
     */
    public function __construct(array $token)
    {
        $this->left = JQLLexerFactory::create($token['left']);

        $this->right = JQLLexerFactory::create($token['right']);

    }

    /**
     * @return string
     */
    public function getExpressionType()
    {
        return EJQLLexerExpressionTypes::MATH;
    }

    /**
     * @return string
     */
    public abstract function getOperator();

    /**
     * @return JQLExpression
     */
    public function getLeftOperand() {
        return $this->left;
    }

    /**
     * @return JQLExpression
     */
    public function getRightOperand() {
        return $this->right;
    }

    /**
     * @return JQLExpressionBinding[]
     */
    public function getBindings()
    {
        $result = [];

        for ( $i=0, $bindings = $this->left->getBindings(), $len = count($bindings); $i<$len; $i++ ) {
            $result[] = $bindings[$i];
        }

        for ( $i=0, $bindings = $this->right->getBindings(), $len = count($bindings); $i<$len; $i++ ) {
            $result[] = $bindings[$i];
        }

        return $result;
    }

    /**
     * @return JQLExpressionFunctionCall[]
     */
    public function getFunctions()
    {
        $result = [];

        for ( $i=0, $functions = $this->left->getFunctions(), $len = count($functions); $i<$len; $i++ ) {
            $result[] = $functions[$i];
        }

        for ( $i=0, $functions = $this->right->getFunctions(), $len = count($functions); $i<$len; $i++ ) {
            $result[] = $functions[$i];
        }

        return $result;
    }

    /**
     * @return JQLExpressionIdentifier[]
     */
    public function getIdentifiers()
    {
        $result = [];

        for ( $i=0, $identifiers = $this->left->getIdentifiers(), $len = count($identifiers); $i<$len; $i++ ) {
            $result[] = $identifiers[$i];
        }

        for ( $i=0, $identifiers = $this->right->getIdentifiers(), $len = count($identifiers); $i<$len; $i++ ) {
            $result[] = $identifiers[$i];
        }

        return $result;
    }

}