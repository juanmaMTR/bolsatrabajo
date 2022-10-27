<?php
    use Firebase\JWT\JWT;

    require_once('../../vendor/autoload.php');

    class ControladorLogin{
        
        function login($datos){

            if ($datos['inputUsuario'] == 'hola' and $datos['inputContrasenia'] == 'hola') {
                $arrayRespuesta['resultado'] = 'Sesión iniciada';
                $this->crearCookie();
            }else{
                $arrayRespuesta['resultado'] = 'Error';
            }    
            
          
        
            
            if (isset($arrayRespuesta)) {
                $jsonRespuesta = json_encode($arrayRespuesta);
                print_r($jsonRespuesta);
            }
        
            
        }
        function crearToken(){
            // mirar https://github.com/vlucas/phpdotenv para poner la secret key en un .env
            
            $secretkey = 'test1234';
            $user = "pepe";
            $type = "admin";
    
            $data = [
                'userName' => $user,
                'type' => $type
            ];
    
            //encode el array a una cadena JWT
            $jwt = JWT::encode(
                $data,
                $secretkey,
                'HS256'
            );
            
            return $jwt;
        }
        function crearCookie(){

            $jwt = $this->crearToken();
            setcookie("token", $jwt, 0, "/", secure:true);
        }       
    }
    
?>