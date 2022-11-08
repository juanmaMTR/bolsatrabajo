<?php
    session_start();
    require_once('../../../vendor/autoload.php');

    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    if(isset($_COOKIE['token'])){
        $jwtToken = $_COOKIE['token'];
        $secretKey = 'test1234';
        $decodedToken = (array) JWT::decode($jwtToken, new Key($secretKey, 'HS256'));
    }
    if (isset($decodedToken)) {
        if($decodedToken['userName'] == $_SESSION['usuario'] && $decodedToken['type'] == $_SESSION['tipo']){
            $response['Respuesta'] = 'OK'; 
        }else{
            $response['Respuesta'] = 'NOTOK';
        }
    }

    if (isset($response)) {
        echo json_encode($response);
    }else{
        $error['Respuesta'] = 'Error';
        echo json_encode($error);
    }

?>