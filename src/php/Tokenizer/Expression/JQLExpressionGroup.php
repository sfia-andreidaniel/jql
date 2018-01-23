<?php

namespace JQL\Tokenizer\Expression;


use JQL\Tokenizer\EJQLLexerExpressionTypes;
use JQL\Tokenizer\JQLExpression;
use JQL\Tokenizer\JQLLexerFactory;

class JQLExpressionGroup extends JQLExpression
{

    /**
     * @var JQLExpression
     */
    private $expression;

    /**
     * JQLExpressionGroup constructor.
     *
     * @param array $token
     *
     * @throws \JQL\Tokenizer\TokenizerException
     */
    public function __construct(array $token)
    {
        $this->expression = JQLLexerFactory::create($token['expression']);
    }

    /**
     * @return string
     */
    public function getExpressionType()
    {
        return EJQLLexerExpressionTypes::GROUP;
    }

    /**
     * @return JQLExpressionBinding[]
     */
    public function getBindings()
    {
        return $this->expression->getBindings();
    }

    /**
     * @return JQLExpressionFunctionCall[]
     */
    public function getFunctions()
    {
        return $this->expression->getFunctions();
    }

    /**
     * @return JQLExpressionIdentifier[]
     */
    public function getIdentifiers()
    {
        return $this->expression->getIdentifiers();
    }

    /**
     * @param $queryExecutionContext
     *
     * @return string
     */
    public function toString($queryExecutionContext )
    {
        return '(' . $this->expression->toString( $queryExecutionContext ) . ')';
    }
}