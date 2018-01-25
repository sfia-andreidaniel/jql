<?php

namespace JQL\CSVParser;

use JQL\Assertion\Assertion;
use JQL\Assertion\AssertionException;

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
     * @throws AssertionException
     */
    public function withFieldDelimiter($fieldDelimiter)
    {
        Assertion::assertIsStringWithLength($fieldDelimiter, 1, 'the length of csv field delimiter must be 1 char');
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
     * @throws AssertionException
     */
    public function withFieldEnclosure($fieldEnclosure)
    {
        Assertion::assertIsStringWithMaxLength($fieldEnclosure, 1, 'the length of csv field enclosure must be max 1 char');
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
     * @throws AssertionException
     */
    public function withEncloseAllFields($encloseAllFields)
    {
        Assertion::assertIsBoolean($encloseAllFields, 'the enclose all fields csv parser parameter must be of type boolean');
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
     * @throws AssertionException
     */
    public function withEscapeCharacter($escapeCharacter)
    {
        Assertion::assertIsStringWithLength($escapeCharacter, 1, 'the length of csv parser escape character must be of 1 char');
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
     * @throws AssertionException
     */
    public function withAutoTrim($autoTrim)
    {
        Assertion::assertIsBoolean($autoTrim, 'the parameter csv auto trim must be of type boolean');
        $this->autoTrim = $autoTrim;
        return $this;
    }

    /**
     * @param $lineTerminator
     *
     * @return $this
     * @throws AssertionException
     */
    public function withLineTerminator($lineTerminator)
    {
        Assertion::assertIsStringWithMinLengthAndMaxLength($lineTerminator, 1, 2, 'csv parser line terminator must be min 1 char max 2 chars');
        $this->lineTerminator = $lineTerminator;
        return $this;
    }

    /**
     * @return string
     */
    public function getLineTerminator()
    {
        return $this->lineTerminator;
    }

}