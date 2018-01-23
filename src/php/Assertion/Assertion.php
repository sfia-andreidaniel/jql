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
     * @param      $var
     * @param null $message
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
}