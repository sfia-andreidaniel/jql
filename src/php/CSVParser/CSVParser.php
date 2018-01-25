<?php

namespace JQL\CSVParser;

class CSVParser
{

    const TYPE_INT     = 'int';
    const TYPE_FLOAT   = 'float';
    const TYPE_BOOLEAN = 'boolean';
    const TYPE_TEXT    = 'string';


    /**
     * @param                  $buffer
     * @param CSVParserOptions $options
     *
     * @return ParsedCSVModel
     * @throws CSVParserException
     */
    public function parse($buffer, CSVParserOptions $options)
    {

        if (!is_string($buffer)) {
            throw new CSVParserException(
                'Invalid argument: $buffer: string expected!',
                CSVParserException::ERR_INVALID_ARGUMENT
            );
        }

        $stream = new StringBuffer($buffer);

        $result = (new ParsedCSVModel())->withOptions($options);

        while (true) {

            $column = $this->readColumn($stream, $options);

            $result->withColumn($column);

            if ($this->readEOL($stream, $options)) {

                break;

            } else {

                if ($this->readColumnSeparator($stream, $options)) {

                    // ANOTHER COLUMN IS FOLLOWING

                } else {

                    throw new CSVParserException(
                        'Unexpected input!',
                        CSVParserException::ERR_UNEXPECTED_INPUT
                    );

                }

            }

        }

        // READ CSV BODY

        while (true) {

            $row = [];

            while (true) {

                $column = $this->readColumn($stream, $options);

                $row[] = $column;

                if ($this->readEOL($stream, $options)) {

                    break;

                } else {

                    if ($this->readColumnSeparator($stream, $options)) {

                        // ANOTHER COLUMN IS FOLLOWING

                    } else {
                        throw new CSVParserException(
                            'Unexpected input!',
                            CSVParserException::ERR_UNEXPECTED_INPUT
                        );

                    }

                }

            }

            $result->withRow($row);

            if ($stream->eof()) {
                break;
            }

        }

        return $result;

    }

    /**
     * @param StringBuffer     $stream
     * @param CSVParserOptions $options
     *
     * @return null
     * @throws CSVParserException
     */
    private function readColumn(StringBuffer $stream, CSVParserOptions $options)
    {

        if ($stream->eof()) {
            throw new CSVParserException(
                'Unexpected end of file!',
                CSVParserException::ERR_UNEXPECTED_END_OF_STRING
            );
        }

        $firstChar = $stream->readChar();

        $result = '';

        $escapeCharacter = $options->getEscapeCharacter();
        $fieldEnclosure = $options->getFieldEnclosure();
        $fieldDelimiter = $options->getFieldDelimiter();
        $lineTerminator = $options->getLineTerminator();
        $lineTerminatorLength = strlen($lineTerminator);

        if (
            $options->isEncloseAllFields()
            || $firstChar === $fieldEnclosure
        ) {

            if ($firstChar !== $fieldEnclosure) {
                throw new CSVParserException(
                    'Expected ' . json_encode($options->getFieldEnclosure()),
                    CSVParserException::ERR_FIELD_ENCLOSURE_EXPECTED
                );
            }


            while (!$stream->eof()) {

                $ch = $stream->readChar();

                // IS ESC?
                if ($ch === $escapeCharacter) {

                    if ($stream->eof()) {
                        throw new CSVParserException(
                            'Unexpected end of string!',
                            CSVParserException::ERR_UNEXPECTED_END_OF_STRING
                        );
                    }

                    $ch = $stream->readChar();

                    $result .= $ch;

                } elseif ($ch === $fieldEnclosure) {

                    return $result;

                } else {

                    $result .= $ch;

                }

            }

        } else {

            $result = $firstChar;

            while (!$stream->eof()) {

                $nextChar = $stream->getCharAtCurrentPosition();

                if ($nextChar === $escapeCharacter) {

                    $stream->readChar();

                    if (!$stream->eof()) {

                        $nextChar = $stream->getCharAtCurrentPosition();

                        $stream->readChar();

                        $result .= $nextChar;

                    } else {

                        throw new CSVParserException(
                            'Unexpected end of string!',
                            CSVParserException::ERR_UNEXPECTED_END_OF_STRING
                        );

                    }


                } elseif ($nextChar === $fieldDelimiter) {

                    return $result;

                } else {

                    if ($nextChar === $lineTerminator[0]) {

                        if (1 === $lineTerminatorLength) {

                            return $result;

                        } else {

                            $char0 = $stream->readChar();

                            $nextChar = $stream->getCharAtCurrentPosition();

                            if ($nextChar === $lineTerminator[1]) {

                                $stream->unread(1);

                                return $result;

                            } else {

                                $result .= $char0;

                                $stream->readChar();

                                $result .= $nextChar;

                            }

                        }

                    } else {

                        $result .= $nextChar;
                        $stream->readChar();

                    }

                }

            }

            return $result;

        }

    }

    /**
     * @param StringBuffer     $stream
     * @param CSVParserOptions $options
     *
     * @return bool
     */
    private function readEOL(StringBuffer $stream, CSVParserOptions $options)
    {

        if ($stream->eof()) {
            return true;
        }

        $lineTerminator = $options->getLineTerminator();
        $lineTerminatorLength = strlen($lineTerminator);

        $ch0 = $stream->getCharAtCurrentPosition();

        if ($ch0 === $lineTerminator[0]) {

            if (1 === $lineTerminatorLength) {
                $stream->readChar();
                return true;
            }

            $stream->readChar();

            $ch1 = $stream->getCharAtCurrentPosition();

            if ($ch1 === $lineTerminator[1]) {

                $stream->readChar();
                return true;

            } else {

                $stream->unread(1);
                return false;

            }

        }

    }

    /**
     * @param StringBuffer     $stream
     * @param CSVParserOptions $options
     *
     * @return bool
     */
    private function readColumnSeparator(StringBuffer $stream, CSVParserOptions $options)
    {

        if ($stream->getCharAtCurrentPosition() === $options->getFieldDelimiter()) {
            $stream->readChar();
            return true;
        }

        return false;

    }


}