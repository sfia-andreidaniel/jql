<?php

namespace JQL\CSVParser;

class ParsedCSVModel
{
    /**
     * @var string[]
     */
    private $columns = [];

    /**
     * @var string[]
     */
    private $assocSafeColumnNames = [];

    /**
     * @var int
     */
    private $numColumns = 0;

    /**
     * @var mixed[][]
     */
    private $rows = [];

    /**
     * @var CSVParserOptions
     */
    private $options;

    /**
     * @param $columnName
     *
     * @return ParsedCSVModel
     * @throws CSVParserException
     */
    public function withColumn($columnName)
    {

        if (!is_string($columnName)) {
            throw new CSVParserException(
                'Invalid argument: $columnName: string expected!',
                CSVParserException::ERR_INVALID_ARGUMENT
            );
        }

        $this->columns[] = $columnName;

        $this->assocSafeColumnNames[] = $this->computeSafeColumnName($columnName);

        $this->numColumns = count($this->columns);

        return $this;
    }

    /**
     * @param array $row
     *
     * @throws CSVParserException
     */
    public function withRow(array $row)
    {

        if (($rowCols = count($row)) !== $this->numColumns) {
            throw new CSVParserException(
                'Invalid row number of columns: expected ' . $this->numColumns . ', got ' . $rowCols . ' columns!',
                CSVParserException::ERR_COLUMNS_NUMBER_MISMATCH
            );
        }

        if ($this->options->isAutoTrim()) {
            foreach ($row as &$value) {
                $value = trim($value);
            }
        }

        $this->rows[] = $row;

    }

    /**
     * @param CSVParserOptions $options
     *
     * @return $this
     */
    public function withOptions(CSVParserOptions $options)
    {
        $this->options = $options;
        return $this;
    }

    /**
     * @return string[]
     */
    public function getColumns()
    {
        return $this->assocSafeColumnNames;
    }

    /**
     * @return \mixed[][]
     */
    public function getRows()
    {
        return $this->rows;
    }

    public function getAssoc()
    {
        $result = [];

        for ($i = 0, $len = count($this->rows); $i < $len; $i++) {
            $row = [];
            foreach ($this->assocSafeColumnNames as $colIndex => $columnName) {
                $row[$columnName] = $this->rows[$i][$colIndex];
            }
            $result[] = $row;
        }

        return $result;
    }

    private function computeSafeColumnName($columnName)
    {
        $name = trim(preg_replace('/[^a-z0-9A-Z]/', '_', strtolower($columnName)), '_');

        $name = preg_replace('/[_]+/', '_', $name);

        if ($name === '') {
            $name = 'column_' . $this->numColumns;
        } else {

            if (strpos('0123456789', $name[0])) {
                $name = 'column_' . $name;
            }

        }

        $suffix = 0;

        while (in_array($name . ($suffix === 0 ? '' : '_' . $suffix), $this->assocSafeColumnNames)) {

            $suffix++;

        }

        return $name . ($suffix === 0 ? '' : '_' . $suffix);
    }

    public function getComputedColumnTypes()
    {
        $result = [];

        foreach ($this->assocSafeColumnNames as $columnIndex => $columnName) {

            $result[$columnName] = $this->getComputedColumnTypeByIndex($columnIndex);

        }

        return $result;
    }

    private function isInt($strval)
    {

        return preg_match('/^0|-?[1-9][0-9]+?$/', $strval);

    }

    private function getComputedColumnTypeByIndex($columnIndex)
    {

        $result = null;

        foreach ($this->rows as $row) {

            switch ($result) {

                case null:

                    if ($this->isInt($row[$columnIndex])) {
                        $result = CSVParser::TYPE_INT;
                    } else {
                        if ($this->isFloat($row[$columnIndex])) {
                            $result = CSVParser::TYPE_FLOAT;
                        } else {
                            if ($this->isBoolean($row[$columnIndex])) {
                                $result = CSVParser::TYPE_BOOLEAN;
                            } else {
                                $result = CSVParser::TYPE_TEXT;
                            }
                        }
                    }

                    break;

                case CSVParser::TYPE_INT:

                    if ($this->isInt($row[$columnIndex])) {
                        //$result = CSVParser::TYPE_INT;
                    } else {
                        if ($this->isFloat($row[$columnIndex])) {
                            $result = CSVParser::TYPE_FLOAT;
                        } else {
                            $result = CSVParser::TYPE_TEXT;
                        }
                    }

                    break;

                case CSVParser::TYPE_FLOAT:

                    if ($this->isFloat($row[$columnIndex])) {
                        //$result = CSVParser::TYPE_FLOAT;
                    } else {
                        $result = CSVParser::TYPE_TEXT;
                    }

                    break;

                case CSVParser::TYPE_BOOLEAN:
                    if ($this->isBoolean($row[$columnIndex])) {
                        $result = CSVParser::TYPE_BOOLEAN;
                    } else {
                        $result = CSVParser::TYPE_TEXT;
                    }
                    break;

                default:
                    break;
            }


        }

        if (null === $result) {
            $result = CSVParser::TYPE_TEXT;
        }

        return $result;
    }

    private function isFloat($value)
    {
        return is_numeric($value);
    }

    private function isBoolean($value)
    {
        return $value === 'true' || $value === 'false';
    }

}