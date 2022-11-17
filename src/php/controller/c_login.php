<?php
    use Firebase\JWT\JWT;

    require_once('../vendor/autoload.php');

    class ControladorLogin{
        
        function __construct(){
            require_once('./model/m_login.php');
            $this->m_login = new ModeloLogin;
        }

        function login($datos){

            $datosUsuario = $this->m_login->sacarUsuarioLogin($datos['inputUsuario']);
            print_r($datosUsuario);
            if ($datosUsuario['Existe'] == 1) {
                if($datos['inputUsuario'] == $datosUsuario['nombreUsuario'] && $datos['inputContrasenia'] == $datosUsuario['password']){
                    $arrayRespuesta['resultado'] = 'Sesión iniciada.';
                    $this->crearCookie($datos);
                    $this->crearSesion($datosUsuario);
                }else{
                    $arrayRespuesta['resultado'] = 'Contraseña incorrecta, inténtelo de nuevo.';
                }
            }else{
                $arrayRespuesta['resultado'] = 'Usuario no encontrado.';
            }           
          
        
            
            if (isset($arrayRespuesta)) {
                $jsonRespuesta = json_encode($arrayRespuesta);
                print_r($jsonRespuesta);
            }
        
            
        }
        function crearToken($datos){
            // mirar https://github.com/vlucas/phpdotenv para poner la secret key en un .env
            
            $datosUsuario = $this->m_login->sacarUsuarioLogin($datos['inputUsuario']);


            $secretkey = 'test1234';
            $user = $datosUsuario['nombreUsuario'];
            $type = $datosUsuario['tipo'];
    
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
        function crearCookie($datos){
            $jwt = $this->crearToken($datos);
            setcookie("token", $jwt, 0, "/21/", "", false, false);
        }
        function crearSesion($datosUsuario){
            $_SESSION['usuario'] = $datosUsuario['nombreUsuario'];
            $_SESSION['tipo'] = $datosUsuario['tipo'];

        }
        function borrarCookies(){
            setcookie('token', "", time() - 3600);
            setcookie('PHPSESSID', "", time() - 3600);
            session_destroy();
        }    
    }
    
?>