<?php

namespace JQL\Authorization;

use JQL\Assertion\Assertion;
use JQL\Controller;
use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\ValidationData;

class AuthorizationService
{

    const AUTHORIZATION_TOKEN_ROLE_FORM_ADMIN = 'admin';
    const AUTHORIZATION_TOKEN_ROLE_FORM_VIEWER = 'viewer';

    /**
     * @var Controller
     */
    private $controller;

    /**
     * AuthorizationService constructor.
     *
     * @param Controller $controller
     */
    public function __construct(Controller $controller)
    {
        $this->controller = $controller;
    }

    /**
     * @param string   $tokenType
     * @param int      $userId
     * @param int|null $formId
     *
     * @return string
     * @throws AuthorizationException
     */
    public function generateAuthenticationToken($tokenType, $userId, $formId)
    {

        if (!is_string($tokenType)) {
            throw new AuthorizationException(
                'Invalid argument: $tokenType: string expected!',
                AuthorizationException::ERR_INVALID_ARGUMENT
            );
        }

        if ($tokenType !== self::AUTHORIZATION_TOKEN_ROLE_FORM_ADMIN && $tokenType !== self::AUTHORIZATION_TOKEN_ROLE_FORM_VIEWER) {
            throw new AuthorizationException(
                'Invalid argument: $tokenType: unexpected value',
                AuthorizationException::ERR_INVALID_TOKEN_TYPE
            );
        }

        if (!is_int($userId) || $userId < 1) {
            throw new AuthorizationException(
                'Invalid argument: $userId: int > 0 expected',
                AuthorizationException::ERR_INVALID_ARGUMENT
            );
        }

        if (!is_int($formId) || $formId < 0) {
            throw new AuthorizationException(
                'Invalid argument: $formId: int >=0 expected!',
                AuthorizationException::ERR_INVALID_ARGUMENT
            );
        }

        $now = @time();

        $signer = new Sha256();

        $builder = (new Builder())
            ->setIssuer($issuer = $this->controller->config('server.name'))
            ->setId($this->controller->config('token.jti'), true)
            ->setIssuedAt($now)
            ->setNotBefore($now)
            ->setExpiration($now + $this->controller->config('token.ttl'))
            ->set('userId', $userId)
            ->set('formId', $formId)
            ->set('tokenType', $tokenType)
            ->set('issuer', $issuer)
            ->sign($signer, $this->controller->config('token.password'));

        return (string)$builder->getToken();

    }

    /**
     * @throws AuthorizationException
     */
    public function getAuthenticationToken()
    {

        try {

            $token = $this->controller->requestParam('auth');

            Assertion::assertTrue(!empty($token), 'This request requires authentication!');

            $parser = (new Parser())->parse((string)$token);
            $parser->getHeaders();
            $parser->getClaims();

            $data = new ValidationData();

            $data->setIssuer($this->controller->config('server.name'));
            $data->setId($this->controller->config('token.jti'));

            if (!$parser->validate($data)) {
                throw new AuthorizationException(
                    'Invalid authorization token!',
                    AuthorizationException::ERR_INVALID_AUTHORIZATION_TOKEN
                );
            }

            $userId = $parser->getClaim('userId');
            $formId = $parser->getClaim('formId');
            $tokenType = $parser->getClaim('tokenType');
            $issuer = $parser->getClaim('issuer');

            if ($issuer !== $this->controller->config('server.name')) {
                throw new AuthorizationException(
                    'Failed to validate issuer server!',
                    AuthorizationException::ERR_FAILED_VALIDATE_TOKEN_ISSUER
                );
            }

            return new AuthorizationToken($userId, $formId, $tokenType, $issuer);

        } catch (\Exception $e) {

            throw new AuthorizationException(
                'Failed to create authentication token!',
                AuthorizationException::ERR_UNAUTHORIZED_REQUEST,
                $e
            );

        }

    }

    /**
     * @throws AuthorizationException
     * @return AuthorizationToken
     */
    public function generateServerToServerAuthenticationToken()
    {

        try {

            $theirSecret = $this->controller->requestParam('secret', '(*@!(*&!(@*#&(!*@&#(IHASDKJHasaslkdu');

            $ourSecret = $this->controller->config('token.b2bSecret', 'as:kdj@*)i!p:sldaliu)!@*(#eiopjqwkl');

            if ($theirSecret !== $ourSecret) {

                throw new AuthorizationException(
                    'Failed to generate b2b authorization token: Secrets don\'t match!',
                    AuthorizationException::ERR_UNAUTHORIZED_REQUEST
                );

            }

            $userId = $this->controller->requestParam('user_id');
            $formId = $this->controller->requestParam('form_id');

            Assertion::assertTrue(is_numeric($userId), 'Invalid request argument: user_id');
            Assertion::assertTrue(is_numeric($formId), 'Invalid request argument: form_id');

            $userId = (int)$userId;
            $formId = (int)$formId;

            Assertion::assertTrue($userId >= 0, 'Invalid request argument: user_id');
            Assertion::assertTrue($formId >= 0, 'Invalid request argument: form_id');

            return new AuthorizationToken(
                $userId,
                $formId,
                AuthorizationService::AUTHORIZATION_TOKEN_ROLE_FORM_ADMIN,
                $this->controller->config('server.name')
            );

        } catch (\Exception $e) {

            throw new AuthorizationException(
                'Failed to create backend-to-backend authentication token!',
                AuthorizationException::ERR_CREATE_B2B_AUTHORIZATION_TOKEN,
                $e
            );

        }
    }
}