<?php

namespace JQL\Authorization;

class AuthorizationToken
{
    /**
     * @var int
     */
    private $userId;

    /**
     * @var int|null
     */
    private $formId;

    /**
     * @var string
     */
    private $role;

    /**
     * @var string
     */
    private $issuer;

    /**
     * AuthorizationToken constructor.
     *
     * @param int      $userId
     * @param int|null $formId
     * @param          $role
     * @param          $issuer
     */
    public function __construct($userId, $formId, $role, $issuer)
    {
        $this->userId = $userId;
        $this->formId = empty($formId)
            ? null
            : $formId;
        $this->role = $role;
        $this->issuer = $issuer;
    }

    /**
     * @return int
     */
    public function getUserId()
    {
        return $this->userId;
    }

    /**
     * @return int|null
     */
    public function getFormId()
    {
        return $this->formId;
    }

    /**
     * @return string
     */
    public function getRole()
    {
        return $this->role;
    }

    /**
     * @return string
     */
    public function getIssuer()
    {
        return $this->issuer;
    }

}