<?php
    /**
     * @file c_usuarios.php
     * @description Controlador de usuarios
     */

     class ControladorUsuarios {
        public $modelo;
        /**
         * @function __construct
         * @description Constructor de la clase donde instancio el modelo
         */
        function __construct() {
            require_once __DIR__. '/../model/m_usuarios.php';
            $this->modelo = new ModeloUsuarios();
        }
        /**
         * @function altaUsuarios
         * @description Función para dar de alta a los usuarios en la base de datos
         */
        function altaUsuarios($datos) {
            if(isset($datos['nombre'])){
                if(empty($datos['nombre'])){
                    echo json_encode("El nombre está vacío");
                }else{
                    $nombre = $datos['nombre'];
                }
            }else{
                echo json_encode("No existe el nombre");
            }
            if(isset($datos['apellidos'])){
                if(empty($datos['apellidos'])){
                    echo json_encode("El apellido está vacío");
                }else{
                    $apellidos = $datos['apellidos'];
                }
            }else{
                echo json_encode("No existe el apellido");
            }
            if(isset($datos['nombreUsuario'])){
                if(empty($datos['nombreUsuario'])){
                    echo json_encode("El nombre de usuario está vacío");
                }else{
                    $nombreUsuario = $datos['nombreUsuario'];
                    $password = $datos['nombreUsuario'];
                }
            }else{
                echo json_encode("No existe el nombre de usuario");
            }
            if(isset($datos['estado'])){
                if(empty($datos['estado'])){
                    echo json_encode("El estado está vacío");
                }else{
                    $estado = $datos['estado'];
                }
            }else{
                echo json_encode("No existe el estado");
            }
            if(isset($datos['dni'])){
                if(empty($datos['dni'])){
                    echo json_encode("El dni está vacío");
                }else{
                    $dni = $datos['dni'];
                }
            }else{
                echo json_encode("No existe el dni");
            }
            if(isset($datos['correo'])){
                if(empty($datos['correo'])){
                    echo json_encode("El correo está vacío");
                }else{
                    $correo = $datos['correo'];
                }
            }else{
                echo json_encode("No existe el correo");
            }
            $primeraVez= true;
            $this->modelo->alta($nombre,$apellidos,$nombreUsuario,$password,$estado,$dni,$correo,$primeraVez);
        }
     }


?>