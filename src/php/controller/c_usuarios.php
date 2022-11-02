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
                    echo "El nombre está vacío";
                    die();
                }else{
                    $nombre = "'".$datos['nombre']."'";
                }
            }else{
                echo "No existe el nombre";
                die();
            }
            if(isset($datos['apellidos'])){
                if(empty($datos['apellidos'])){
                    echo "El apellido está vacío";
                    die();
                }else{
                    $apellidos = "'".$datos['apellidos']."'";
                }
            }else{
                echo "No existe el apellido";
                die();
            }
            if(isset($datos['nombreUsuario'])){
                if(empty($datos['nombreUsuario'])){
                    echo "El nombre de usuario está vacío";
                    die();
                }else{
                    $nombreUsuario = "'".$datos['nombreUsuario']."'";
                    $password = "'".$datos['nombreUsuario']."'";
                }
            }else{
                echo "No existe el nombre de usuario";
                die();
            }
            if(isset($datos['estado'])){
                if(empty($datos['estado'])){
                    echo "El estado está vacío";
                    die();
                }else{
                    $estado = $datos['estado'];
                }
            }else{
                echo "No existe el estado";
                die();
            }
            if(isset($datos['dni'])){
                if(empty($datos['dni'])){
                    echo "El dni está vacío";
                    die();
                }else{
                    $dni = "'".$datos['dni']."'";
                }
            }else{
                echo "No existe el dni";
                die();
            }
            if(isset($datos['correo'])){
                if(empty($datos['correo'])){
                    echo "El correo está vacío";
                    die();
                }else{
                    $correo = "'".$datos['correo']."'";
                }
            }else{
                echo "No existe el correo";
                die();
            }
            if(isset($datos['tipo'])){
                $tipo = "'".$datos['tipo']."'";
            }else{
                $tipo = "'".'a'."'";
            }
            $respuesta=$this->modelo->alta($nombre,$apellidos,$nombreUsuario,$password,$estado,$dni,$correo,$tipo);
            echo $respuesta;
        }
        /**
         * @function listadoUsuarios
         * @description Funcion para listar los usuarios
         */
        function listadoUsuarios(){
            $usuarios = $this->modelo->listar();
            print_r(json_encode($usuarios)) ;
        }
     }


?>