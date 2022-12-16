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
            system('/opt/lampp/bin/mysql -u root -e "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = \'BolsaTrabajo\'" | grep BolsaTrabajo > /dev/null 2>&1', $retval);
           
            $response['Respuesta'] = $retval;

            echo json_encode($response);
        }
    }

?>