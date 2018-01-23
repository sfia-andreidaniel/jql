<?php

namespace JQL\Tokenizer\Expression\Unary;


use JQL\Tokenizer\EJQLQueryExecutionContext;
use JQL\Tokenizer\Expression\JQLExpressionUnary;
use JQL\Tokenizer\Statement\EJQLLexerOperatorUnaryType;

class JQLExpressionUnaryNot extends JQLExpressionUnary
{

    /**
     * @param $queryExecutionContext
     *
     * @return string
     */
    public function toString($queryExecutionContext)
    {

        switch ($queryExecutionContext) {

            case EJQLQueryExecutionContext::CLIENT_SIDE:
                return '!' . $this->operand->toString($queryExecutionContext);
                break;

            case EJQLQueryExecutionContext::SERVER_SIDE:
            case EJQLQueryExecutionContext::ANY:
            default:
                return 'NOT ' . $this->operand->toString($queryExecutionContext);
                break;

        }
    }

    /**
     * @return string
     */
    public function getOperator()
    {
        return EJQLLexerOperatorUnaryType::NOT;
    }
}