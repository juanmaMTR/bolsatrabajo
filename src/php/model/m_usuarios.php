<?php
    /**
     * @file m_usuarios
     * @description Modelo de usuarios
     */

    class ModeloUsuarios {
        public $conexion;
        /**
         * @function __construct
         * @description Constructo del modelo donde realizo la conexion con la base de datos
         */
        function __construct() {
            require_once __DIR__. '/../configdb.php';
            $this->conexion=new mysqli(HOSTNAME,USERNAME,PASSWORD,DATABASE);
        }
        /**
         * @function alta
         * @description Función para dar de alta a los usuarios en la base de datos
         */
        function alta($nombre,$apellidos,$nombreUsuario,$password,$estado,$dni,$correo,$tipo){
            $sql = "INSERT INTO usuarios(nombreUsuario, estado, dni, correo, password, tipo, nombre, apellidos, primeraVez) VALUES ($nombreUsuario,$estado,$dni,$correo,$password,$tipo,$nombre,$apellidos,true);";
            if($this->conexion->query($sql)){
                return 'Usuario dado de alta.';
            }else{
                return 'Ha surgido un error';
            }
        }
        /**
         * @function listar
         * @description Función para recoger los datos de los usuarios de la base de datos
         */
        function listar(){
            $sql= "SELECT * FROM `usuarios` WHERE tipo != 's' and tipo != 't';";
            //$sql= "SELECT * FROM `usuarios` WHERE tipo != 's';"; para cuando es administrador
            $usuarios= array();
            if($resultado = $this->conexion->query($sql)){
                for($i=0;$i<$resultado->num_rows;$i++){
                    $fila = $resultado->fetch_assoc();
                    $usuarios[$i]=[
                        "nombreUsuario" => $fila['nombreUsuario'],
                        "estado" => $fila['estado'],
                        "dni" => $fila['dni'],
                        "correo" => $fila['correo'],
                        "nombre" => $fila['nombre'],
                        "apellidos" => $fila['apellidos'],
                        "primeraVez" => $fila['primeraVez']
                    ];
                }
                return $usuarios;
            }
        }
    }

?>