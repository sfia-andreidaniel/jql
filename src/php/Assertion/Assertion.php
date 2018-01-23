<?php

namespace JQL\Assertion;

class Assertion
{
    /**
     * @param      $var
     * @param null $message
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
     * @param      $var
     * @param      $key
     * @param null $message
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
     * @param      $var
     * @param      $key
     * @param null $message
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
}