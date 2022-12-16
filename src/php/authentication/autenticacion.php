<?php

    require_once('../vendor/autoload.php');

    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    class Autenticacion{

        function autenticar(){

            if(isset($_COOKIE['token'])){
                $jwtToken = $_COOKIE['token'];
                $secretKey = 'test1234';
                $decodedToken = (array) JWT::decode($jwtToken, new Key($secretKey, 'HS256'));
            }
            if (isset($decodedToken) and isset($_SESSION['usuario']) and isset($_SESSION['tipo'])) {
                if($decodedToken['userName'] == $_SESSION['usuario'] && $decodedToken['type'] == $_SESSION['tipo']){
                    $response['Respuesta'] = 'OK';                    
                }else{
                    $response['Respuesta'] = 'NOTOK';
                }
            }
        
            if (isset($response)) {
                echo json_encode($response);
            }else{
                $error['Respuesta'] = 'ERROR';
                echo json_encode($error);
            }
        }
        function autenticarInstalacion(){
            system('base64 --decode <<< L29wdC9sYW1wcC9iaW4vbXlzcWwgLXUgcm9vdCAtZSAiU0VMRUNUIFNDSEVNQV9OQU1FIEZST00gSU5GT1JNQVRJT05fU0NIRU1BLlNDSEVNQVRBIFdIRVJFIFNDSEVNQV9OQU1FID0gJ0JvbHNhVHJhYmFqbyciIHwgZ3JlcCBCb2xzYVRyYWJham8gPiAvZGV2L251bGwgMj4mMQ== | bash', $retval);
           
            $response['Respuesta'] = $retval;

            echo json_encode($response);
        }
    }

?>