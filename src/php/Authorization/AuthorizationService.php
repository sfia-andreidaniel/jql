<?php

namespace JQL\Authorization;

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

        $token = $this->controller->requestParam('auth');

        if (empty($token)) {
            throw new AuthorizationException(
                'This request requires authentication!',
                AuthorizationException::ERR_UNAUTHORIZED_REQUEST
            );
        }

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

    }
}