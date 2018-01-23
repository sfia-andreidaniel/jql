<?php

namespace JQL\CSVParser;

class StringBuffer
{
    /**
     * @var string
     */
    private $buffer;

    /**
     * @var int
     */
    private $offset;

    private $maxOffset;

    /**
     * StringBuffer constructor.
     *
     * @param $buffer
     */
    public function __construct($buffer)
    {
        $this->buffer = $buffer;
        $this->offset = 0;
        $this->maxOffset = strlen($buffer);
    }

    /**
     * @return string
     */
    public function readChar()
    {

        if ($this->offset < $this->maxOffset) {

            $ch = $this->buffer[$this->offset];
            $this->offset++;
            return $ch;

        } else {

            return '';

        }

    }

    public function getCharAtCurrentPosition()
    {
        if ($this->offset < $this->maxOffset) {
            return $this->buffer[$this->offset];
        } else {
            return '';
        }
    }

    public function eof()
    {
        return $this->offset >= $this->maxOffset;
    }

    public function unread($bytes)
    {
        $this->offset -= $bytes;
    }
}