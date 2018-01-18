<?php

namespace JQL\RemoteQuery;

use JQL\Tokenizer\EJQLLexerStatementTypes;
use JQL\Tokenizer\EJQLOpcodeTypes;
use JQL\Tokenizer\Opcode;
use JQL\Tokenizer\Statement\JQLStatementDelete;
use JQL\Tokenizer\Statement\JQLStatementInsert;
use JQL\Tokenizer\Statement\JQLStatementSelect;
use JQL\Tokenizer\Statement\JQLStatementUpdate;
use JQL\Tokenizer\TokenizerException;

class RemoteQueryBuilder
{

    /**
     * @param array $tokenizedQuery
     *
     * @return Opcode
     * @throws TokenizerException
     */
    public function createFromTokenizedQuery(array $tokenizedQuery)
    {

        if (!isset($tokenizedQuery['op'])) {
            throw new TokenizerException('Value is not a valid binding tokenized opcode', TokenizerException::ERR_VALUE_IS_NOT_A_TOKENIZED_OPCODE);
        }

        switch ($tokenizedQuery['op']) {

            case EJQLOpcodeTypes::STATEMENT:

                switch ($tokenizedQuery['type']) {

                    case EJQLLexerStatementTypes::SELECT:

                        return new JQLStatementSelect($tokenizedQuery);

                        break;

                    case EJQLLexerStatementTypes::INSERT:

                        return new JQLStatementInsert($tokenizedQuery);

                        break;

                    case EJQLLexerStatementTypes::UPDATE:

                        return new JQLStatementUpdate($tokenizedQuery);

                        break;

                    case EJQLLexerStatementTypes::DELETE:

                        return new JQLStatementDelete($tokenizedQuery);

                        break;
                }

                break;

            default:
                throw new TokenizerException(
                    'Invalid lexer token opcode type: ' . json_encode($tokenizedQuery['op']),
                    TokenizerException::ERR_VALUE_IS_NOT_A_TOKENIZED_OPCODE
                );
        }

    }

}