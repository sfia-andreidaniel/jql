<?php

namespace JQL\Tokenizer;

abstract class Statement extends JQLOpcode
{

    /**
     * @var boolean
     */
    private $remote;

    /**
     * @var boolean
     */
    private $binded;

    /**
     * @return string
     */
    public abstract function getStatementType();

    /**
     * @return string
     */
    public function getOpcodeType()
    {
        return EJQLLexerOpcodeTypes::STATEMENT;
    }

    /**
     * @return boolean
     */
    public function isRemote() {
        return $this->isRemote();
    }

    /**
     * @return JQLExpressionBinding[]
     */
    public abstract function getBindings();

    /**
     * @return JQLExpressionFunctionCall[]
     */
    public abstract function getFunctions();

    /**
     * @return JQLExpressionIdentifier[]
     */
    public abstract function getIdentifiers();

    /**
     * @return JQLTableReference
     */
    public abstract function getTable();

    /**
     * @param array $data
     *
     * @return $this
     * @throws TokenizerException
     */
    public function bind(array $data ) {

        $this->binded = false;

        $bindings = $this->getBindings();
        $numBindings = count($bindings);
        $bindingName = '';

        for ( $i=0; $i<$numBindings; $i++){
            $bindings[$i]->unbind();
        }

        for ( $i=0; $i<$numBindings; $i++ ) {

            $bindingName = $bindings[$i]->getBindingName();

            if ( null === $bindingName ) {
                throw new TokenizerException(
                    "Failed to bind statement: Binding " . json_encode($bindingName) . " is not defined in bind object!",
                    TokenizerException::ERR_BINDING_NAME_IS_NOT_DEFINED
                );
            } else {
                $bindings[$i]->bind( $data[$bindingName] );
            }

        }

        $this->binded = true;

        return $this;

    }

    /**
     * @return bool
     */
    public function isBinded() {
        return $this->binded;
    }

}