<?php

namespace JQL\CSVParser;

class CSVParserOptions
{
    /**
     * @var string
     */
    private $fieldDelimiter = ',';

    /**
     * @var string
     */
    private $fieldEnclosure = '"';

    /**
     * @var bool
     */
    private $encloseAllFields = true;

    /**
     * @var string
     */
    private $escapeCharacter = '\\';

    /**
     * @var bool
     */
    private $autoTrim = true;

    /**
     * @var string
     */
    private $lineTerminator = "\n";

    /**
     * @return string
     */
    public function getFieldDelimiter()
    {
        return $this->fieldDelimiter;
    }

    /**
     * @param string $fieldDelimiter
     *
     * @return CSVParserOptions
     */
    public function withFieldDelimiter($fieldDelimiter)
    {
        $this->fieldDelimiter = $fieldDelimiter;
        return $this;
    }

    /**
     * @return string
     */
    public function getFieldEnclosure()
    {
        return $this->fieldEnclosure;
    }

    /**
     * @param string $fieldEnclosure
     *
     * @return CSVParserOptions
     */
    public function withFieldEnclosure($fieldEnclosure)
    {
        $this->fieldEnclosure = $fieldEnclosure;
        return $this;
    }

    /**
     * @return bool
     */
    public function isEncloseAllFields()
    {
        return $this->encloseAllFields;
    }

    /**
     * @param bool $encloseAllFields
     *
     * @return CSVParserOptions
     */
    public function withEncloseAllFields($encloseAllFields)
    {
        $this->encloseAllFields = $encloseAllFields;
        return $this;
    }

    /**
     * @return string
     */
    public function getEscapeCharacter()
    {
        return $this->escapeCharacter;
    }

    /**
     * @param string $escapeCharacter
     *
     * @return CSVParserOptions
     */
    public function withEscapeCharacter($escapeCharacter)
    {
        $this->escapeCharacter = $escapeCharacter;
        return $this;
    }

    /**
     * @return bool
     */
    public function isAutoTrim()
    {
        return $this->autoTrim;
    }

    /**
     * @param bool $autoTrim
     *
     * @return CSVParserOptions
     */
    public function withAutoTrim($autoTrim)
    {
        $this->autoTrim = $autoTrim;
        return $this;
    }

    /**
     * @return string
     */
    public function getLineTerminator()
    {
        return $this->lineTerminator;
    }

    /**
     * @param string $lineTerminator
     *
     * @return CSVParserOptions
     */
    public function setLineTerminator($lineTerminator)
    {
        $this->lineTerminator = $lineTerminator;
        return $this;
    }



}