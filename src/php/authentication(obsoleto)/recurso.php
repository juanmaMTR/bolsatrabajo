<?php

declare(strict_types=1);

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once('../../../vendor/autoload.php');


if (! preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
    header('HTTP/1.0 400 Bad Request');
    echo 'Token not found in request';
    exit;
}

$jwt = $matches[1];
if (! $jwt) {
    header('HTTP/1.0 400 Bad Request');
    exit;
}

$secretKey  = 'test1234';
JWT::$leeway += 60;
$token = JWT::decode((string)$jwt, new Key($secretKey, 'HS256'));
$now = new DateTimeImmutable();
$serverName = "localhost";

if ($token->iss !== $serverName ||
    $token->nbf > $now->getTimestamp() ||
    $token->exp < $now->getTimestamp())
{
    header('HTTP/1.1 401 Unauthorized');
    exit;
}

printf("Current timestamp is %s", (new \DateTimeImmutable())->getTimestamp());