<?php

namespace JQL\Authorization;

use JQL\Controller;
use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer\Hmac\Sha256;

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
            ->setIssuer($this->controller->config('server.name'))
            ->setId($this->controller->config('token.jti'), true)
            ->setIssuedAt($now)
            ->setNotBefore($now)
            ->setExpiration($now + $this->controller->config('token.ttl'))
            ->set('userId', $userId)
            ->set('formId', $formId)
            ->set('tokenType', $tokenType)
            ->sign($signer, $this->controller->config('token.password'));

        return (string)$builder->getToken();

    }
}