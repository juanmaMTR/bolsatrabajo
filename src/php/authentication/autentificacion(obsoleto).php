<?php

declare(strict_types = 1);

use Firebase\JWT\JWT;

require_once('../../../vendor/autoload.php');

$credencialesCorrectas = true;

if($credencialesCorrectas){
    // mirar https://github.com/vlucas/phpdotenv para poner la secret key en un .env
    $secretkey = 'test1234';

    $issuedAt = new DateTimeImmutable();
    $expire = $issuedAt->modify('+5 minutes')->getTimestamp();
    $serverName = "localhost";
    $username = "pepe";

    $data = [
        'iat' => $issuedAt->getTimestamp(),          // Issued at: fecha cuando el token se generó
        'iss'  => $serverName,                       // Issuer
        'nbf'  => $issuedAt->getTimestamp(),         // Not before
        'exp'  => $expire,                           // Expire
        'userName' => $username,                     // User name
    ];

    //encode el array a una cadena JWT
    echo JWT::encode(
        $data,
        $secretkey,
        'HS256'
    );
}