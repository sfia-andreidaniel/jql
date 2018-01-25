<?php

namespace JQL\Assertion;

class Assertion
{
    /**
     * @param mixed       $var
     * @param null|string $message
     *
     * @throws AssertionException
     */
    public static function assertIsArray($var, $message = null)
    {
        if (!is_array($var)) {
            throw new AssertionException(
                null === $message
                    ? 'Failed asserting that variable is of type array'
                    : $message,
                AssertionException::ERR_ASSERTION_FAILED
            );
        }
    }

    /**
     * @param mixed       $var
     * @param string      $key
     * @param null|string $message
     *
     * @throws AssertionException
     */
    public static function assertIsBooleanKey($var, $key, $message = null)
    {

        if (!(is_array($var) && is_bool($var[$key]))) {
            throw new AssertionException(
                null === $message
                    ? 'Failed asserting that key ' . json_encode($key) . ' of array is of type boolean!'
                    : $message,
                AssertionException::ERR_ASSERTION_FAILED
            );
        }

    }

    /**
     * @param mixed       $var
     * @param string      $key
     * @param null|string $message
     *
     * @throws AssertionException
     */
    public static function assertIsStringKey($var, $key, $message = null)
    {
        if (!(is_array($var) && is_string($var[$key]))) {
            throw new AssertionException(
                null === $message
                    ? 'Failed asserting that key ' . json_encode($key) . ' of array is of type string!'
                    : $message,
                AssertionException::ERR_ASSERTION_FAILED
            );
        }
    }

    /**
     * @param mixed       $var
     * @param null|string $message
     *
     * @throws AssertionException
     */
    public static function assertIsString($var, $message = null)
    {
        if (!is_string($var)) {
            throw new AssertionException(
                null === $message
                    ? 'Failed asserting that variable is string!'
                    : $message,
                AssertionException::ERR_ASSERTION_FAILED
            );
        }
    }

    /**
     * @param mixed       $var
     * @param null|string $message
     *
     * @throws AssertionException
     */
    public static function assertIsValidIdentifierName($var, $message = null)
    {

        if (is_string($var) && preg_match('/^[a-zA-Z_\\$]([a-zA-Z0-9_\\$]+)?$/', $var)) {
            return;
        }

        throw new AssertionException(
            null === $message
                ? 'Failed asserting that variable represents a valid identifier name!'
                : $message,
            AssertionException::ERR_ASSERTION_FAILED
        );

    }

    /**
     * @param mixed       $token
     * @param string      $key
     * @param null|string $message
     *
     * @throws AssertionException
     */
    public static function assertIsPositiveIntArrayKey($token, $key, $message = null)
    {
        if (!(is_array($token) && is_int($token[$key]) && $token[$key] > 0)) {
            throw new AssertionException(
                null === $message
                    ? 'Failed asserting that variable is int > 0!'
                    : $message,
                AssertionException::ERR_ASSERTION_FAILED
            );
        }
    }

    /**
     * @param mixed       $var
     * @param string      $key
     * @param null|string $message
     *
     * @throws AssertionException
     */
    public static function assertIsUnsignedIntArrayKey($var, $key, $message = null)
    {
        if (!(is_array($var) && is_int($var[$key]) && $var[$key] >= 0)) {
            throw new AssertionException(
                null === $message
                    ? 'Failed asserting that variable is int >= 0!'
                    : $message,
                AssertionException::ERR_ASSERTION_FAILED
            );
        }
    }

    /**
     * @param mixed       $var
     * @param null|string $message
     *
     * @throws AssertionException
     */
    public static function assertIsArrayAndContainsElements($var, $message = null)
    {

        if (!(is_array($var) && count($var) > 0)) {
            throw new AssertionException(
                null === $message
                    ? 'Failed asserting that variable is non-empty array!'
                    : $message,
                AssertionException::ERR_ASSERTION_FAILED
            );
        }

    }

    /**
     * @param      $var
     * @param null $message
     *
     * @throws AssertionException
     */
    public static function assertIsValidLiteralNameOrNull($var, $message = null)
    {

        if (is_null($var)) {
            return;
        }

        if (is_string($var) && preg_match('/^[a-zA-Z_\\$]([a-zA-Z0-9_\\$]+)?$/', $var)) {
            return;
        }

        throw new AssertionException(
            null === $message
                ? 'Value is not a valid string literal!'
                : $message,
            AssertionException::ERR_ASSERTION_FAILED
        );

    }

    /**
     * @param mixed       $var
     * @param null|string $message
     *
     * @throws AssertionException
     */
    public static function assertIsNonZeroPositiveInteger($var, $message = null)
    {
        if (!is_int($var) || $var < 1) {
            throw new AssertionException(
                null === $message
                    ? 'Expected int > 0!'
                    : $message,
                AssertionException::ERR_ASSERTION_FAILED
            );
        }
    }

    /**
     * @param      $var
     * @param null $message
     *
     * @throws AssertionException
     */
    public static function assertIsNonZeroPositiveIntegerOrNull($var, $message = null)
    {
        if (!is_null($var) && !(is_int($var) && $var > 0)) {
            throw new AssertionException(
                null === $message
                    ? 'Expected int > 0 | null!'
                    : $message,
                AssertionException::ERR_ASSERTION_FAILED
            );
        }
    }

    /**
     * @param       $var
     * @param array $oneOf
     * @param null  $message
     *
     * @throws AssertionException
     */
    public static function assertValueIsOneOf($var, array $oneOf, $message = null)
    {
        if (!in_array($var, $oneOf, true)) {
            throw new AssertionException(
                null === $message
                    ? 'Expected one of "' . implode(',', $oneOf) . '", got ' . json_encode($var)
                    : $message,
                AssertionException::ERR_ASSERTION_FAILED
            );
        }
    }

    /**
     * @param mixed       $var
     * @param int         $maxLength
     * @param string|null $message
     *
     * @throws AssertionException
     */
    public static function assertIsStringWithMaxLength($var, $maxLength, $message = null)
    {
        if (!is_string($var) || strlen($var) > $maxLength) {
            throw new AssertionException(
                null === $message
                    ? 'Expected string with max length ' . $maxLength
                    : $message,
                AssertionException::ERR_ASSERTION_FAILED
            );
        }
    }

    /**
     * @param mixed       $var
     * @param null|string $message
     *
     * @throws AssertionException
     */
    public static function assertIsBoolean($var, $message = null)
    {
        if (!is_bool($var)) {
            throw new AssertionException(
                null === $message
                    ? 'Expected boolean!'
                    : $message,
                AssertionException::ERR_ASSERTION_FAILED
            );
        }
    }

    /**
     * @param mixed       $var
     * @param int         $length
     * @param null|string $message
     *
     * @throws AssertionException
     */
    public static function assertIsStringWithLength($var, $length, $message = null)
    {
        if (!is_string($var) || strlen($var) !== $length) {
            throw new AssertionException(
                null === $message
                    ? 'Expected string with length of ' . $length . ' characters'
                    : $message,
                AssertionException::ERR_ASSERTION_FAILED
            );
        }
    }

    /**
     * @param mixed       $var
     * @param int         $minLength
     * @param int         $maxLength
     * @param string|null $message
     *
     * @throws AssertionException
     */
    public static function assertIsStringWithMinLengthAndMaxLength($var, $minLength, $maxLength, $message = null)
    {
        if (is_string($var)) {
            $len = strlen($var);
            if ($len >= $minLength && $len <= $maxLength) {
                return;
            }
        }

        throw new AssertionException(
            null === $message
                ? 'Expected string with minLength ' . $minLength . ' and maxLength ' . $maxLength
                : $message,
            AssertionException::ERR_ASSERTION_FAILED
        );
    }

    /**
     * @param mixed       $var
     * @param null|string $message
     *
     * @throws AssertionException
     */
    public static function assertIsArrayOrNull($var, $message = null)
    {

        if (!($var === null || is_array($var))) {
            throw new AssertionException(
                null === $message
                    ? 'Expected array|null'
                    : $message,
                AssertionException::ERR_ASSERTION_FAILED
            );
        }

    }

    /**
     * @param mixed       $var
     * @param string|null $message
     *
     * @throws AssertionException
     */
    public static function assertIsIntOrNull($var, $message = null)
    {
        if (null !== $var && !is_int($var)) {
            throw new AssertionException(
                null === $message
                    ? 'Expected int|null'
                    : $message,
                AssertionException::ERR_ASSERTION_FAILED
            );
        }
    }
}