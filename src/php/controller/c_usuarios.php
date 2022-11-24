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
            $this->modelo = new ModeloUsuarios;
        }
        /**
         * @function altaUsuarios
         * @description Función para dar de alta a los usuarios en la base de datos
         * @param mixed $datos
         */
        function altaUsuarios($datos) {
            if(isset($datos['nombre'])){
                if(empty($datos['nombre'])){
                    print_r(json_encode("El nombre está vacío"));
                    die();
                }else{
                    $nombre = "'".$datos['nombre']."'";
                }
            }else{
                print_r(json_encode("No existe el nombre"));
                die();
            }
            if(isset($datos['apellidos'])){
                if(empty($datos['apellidos'])){
                    print_r(json_encode("El apellido está vacío"));
                    die();
                }else{
                    $apellidos = "'".$datos['apellidos']."'";
                }
            }else{
                print_r(json_encode("No existe el apellido"));
                die();
            }
            if(isset($datos['nombreUsuario'])){
                if(empty($datos['nombreUsuario']) || strpos($datos['nombreUsuario'], " ")){
                    print_r(json_encode("El nombre de usuario está vacío o contiene espacios en blanco"));
                    die();
                }else{
                    $nombreUsuario = "'".$datos['nombreUsuario']."'";
                    $password = "'".password_hash($datos['nombreUsuario'], PASSWORD_BCRYPT)."'";
                }
            }else{
                print_r(json_encode("No existe el nombre de usuario"));
                die();
            }
            if(isset($datos['estado'])){
                if(empty($datos['estado'])){
                    print_r(json_encode("El estado está vacío"));
                    die();
                }else{
                    $estado = $datos['estado'];
                }
            }else{
                print_r(json_encode("No existe el estado"));
                die();
            }
            if(isset($datos['dni'])){
                if(empty($datos['dni'])){
                    print_r(json_encode("El dni está vacío"));
                    die();
                }else{
                    $dni = "'".$datos['dni']."'";
                }
            }else{
                print_r(json_encode("No existe el dni"));
                die();
            }
            if(isset($datos['correo'])){
                if(empty($datos['correo'])){
                    print_r(json_encode("El correo está vacío"));
                    die();
                }else{
                    $correo = "'".$datos['correo']."'";
                }
            }else{
                print_r(json_encode("No existe el correo"));
                die();
            }
            if(isset($datos['tipo'])){
                $tipo = "'".$datos['tipo']."'";
            }else{
                $tipo = "'".'a'."'";
            }
            $respuesta=$this->modelo->alta($nombre,$apellidos,$nombreUsuario,$password,$estado,$dni,$correo,$tipo);
            print_r(json_encode($respuesta));
        }
        /**
         * @function borrarUsuario
         * @description Función para borrar el usuario
         * @param mixed $datos
         */
        function borrarUsuario($datos){
            if(isset($datos['nombreUsuario'])){
                if(empty($datos['nombreUsuario'])){
                    echo "El nombre de usuario está vacío";
                    die();
                }else{
                    $nombreUsuario = "'".$datos['nombreUsuario']."'";
                }
            }else{
                echo "No existe el nombre de usuario";
                die();
            }
            $respuesta = $this->modelo->borrar($nombreUsuario);
            print_r(json_encode($respuesta));
        }      
        /**
         *  @function listarUsuario
         *  @description Función para listar un usuario
         *  @param  mixed $datos
         */
        function buscarUsuario($datos){            
            if(isset($datos['nombreUsuario'])){
                $nombreUsuario = $datos['nombreUsuario'];
                $tipo = $datos['tipo'];
            }else{
                $nombreUsuario = null;
                $tipo = $datos['tipo'];
            }
            $usuarios = $this->modelo->buscarUsuario($nombreUsuario, $tipo);
            print_r(json_encode($usuarios));
        }
        /**
         * @function editar_usuario
         * @description Función para editar un usuario
         * @param mixed $datos
         */
        function editar_usuario($datos){
            if(isset($datos['nombre'])){
                if(empty($datos['nombre'])){
                    print_r(json_encode("El nombre está vacío"));
                    die();
                }else{
                    $nombre = "'".$datos['nombre']."'";
                }
            }else{
                print_r(json_encode("No existe el nombre"));
                die();
            }
            if(isset($datos['apellidos'])){
                if(empty($datos['apellidos'])){
                    print_r(json_encode("El apellido está vacío"));
                    die();
                }else{
                    $apellidos = "'".$datos['apellidos']."'";
                }
            }else{
                print_r(json_encode("No existe el apellido"));
                die();
            }
            if(isset($datos['nombreUsuario'])){
                if(empty($datos['nombreUsuario']) || strpos($datos['nombreUsuario'], " ")){
                    print_r(json_encode("El nombre de usuario está vacío o contiene espacios en blanco"));
                    die();
                }else{
                    $nombreUsuario = "'".$datos['nombreUsuario']."'";
                }
            }else{
                print_r(json_encode("No existe el nombre de usuario"));
                die();
            }
            if(isset($datos['estado']) && $datos['estado'] != 'Abrir menú'){
                if(empty($datos['estado'])){
                    print_r(json_encode("El estado está vacío"));
                    die();
                }else{
                    $estado = $datos['estado'];
                }
            }else{
                print_r(json_encode("No existe el estado"));
                die();
            }
            if(isset($datos['dni'])){
                if(empty($datos['dni'])){
                    print_r(json_encode("El dni está vacío"));
                    die();
                }else{
                    $dni = "'".$datos['dni']."'";
                }
            }else{
                print_r(json_encode("No existe el dni"));
                die();
            }
            if(isset($datos['correo'])){
                if(empty($datos['correo'])){
                    print_r(json_encode("El correo está vacío"));
                    die();
                }else{
                    $correo = "'".$datos['correo']."'";
                }
            }else{
                print_r(json_encode("No existe el correo"));
                die();
            }
            if(isset($datos['nombreUsuarioAntiguo'])){
                if(empty($datos['nombreUsuarioAntiguo'])){
                    print_r(json_encode("El nombre de usuario antiguo está vacío"));
                    die();
                }else{
                    $nombreUsuarioAntiguo = "'".$datos['nombreUsuarioAntiguo']."'";
                }
            }else{
                print_r(json_encode("No existe el nombre de usuario antiguo"));
            }
            $respuesta = $this->modelo->actualizar($nombre,$apellidos,$nombreUsuario,$estado,$dni,$correo,$nombreUsuarioAntiguo);
            print_r(json_encode($respuesta));
        }
        /**
         * @function listarUsuario
         * @description Función para listar un usuario con el nombre
         * @param mixed $datos
         */
        function listarUsuario($datos){
            if(isset($datos['nombre'])){
                if(empty($datos['nombre'])){
                    print_r(json_encode("El nombre está vacío"));
                    die();
                }else{
                    $nombre = "'".$datos['nombre']."'";
                }
            }else{
                print_r(json_encode("No existe el nombre"));
                die();
            }
            $respuesta = $this->modelo->listar($nombre);
            print_r(json_encode($respuesta));
        }
     }


?>