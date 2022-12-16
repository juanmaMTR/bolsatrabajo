<?php

class ModeloIdiomas{
    public $conexion;
    /**
     * @function __construct
     * @description Constructo del modelo donde realizo la conexion con la base de datos
     */
    function __construct() {
        require_once __DIR__. '/../configdb.php';
        $this->conexion=new mysqli(HOSTNAME,USERNAME,PASSWORD,DATABASE);
    }

    function alta($idioma, $certificacion, $nivelOral, $nivelEscrito, $nivelEscucha){
        if(isset($certificacion)){
            $sql = "INSERT INTO idioma(titulo, certificacionOficial, nivelOral, nivelEscrito, nivelEscucha) VALUES ($idioma, $certificacion, $nivelOral, $nivelEscrito, $nivelEscucha);";
        }else{
            $sql = "INSERT INTO idioma(titulo, certificacionOficial, nivelOral, nivelEscrito, nivelEscucha) VALUES ($idioma, null, $nivelOral, $nivelEscrito, $nivelEscucha);";
        }
        if($resultado = $this->conexion->query($sql)){
            return 'Idioma dado de alta correctamente.';
        }else{
            return 'Ha surgido un error';
        }
    }
}