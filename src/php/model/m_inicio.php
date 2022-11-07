<?php
    /**
     * @file m_inicio.php
     * @description Modelo de inio
     */

    class ModeloInicio {
        public $conexion;
        /**
         * @function __construct
         * @description Constructo del modelo donde realizo la conexion con la base de datos
         */
        function __construct() {
            require_once __DIR__. '/../configdb.php';
            $this->conexion=new mysqli(HOSTNAME,USERNAME,PASSWORD,DATABASE);
        }
    }
?>