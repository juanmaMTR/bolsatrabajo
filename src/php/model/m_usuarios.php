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
         * @description Función para dar de alta a los usuarios
         */
        function alta($nombre,$apellidos,$nombreUsuario,$password,$estado,$dni,$correo,$tipo){
            $sql = "INSERT INTO usuarios(nombreUsuario, estado, dni, correo, password, tipo, nombre, apellidos, primeraVez) VALUES ($nombreUsuario,$estado,$dni,$correo,$password,$tipo,$nombre,$apellidos,true);";
            echo $sql;
            $this->conexion->query($sql);
        }
    }

?>