<?php

class ModeloCiclos{
    public $conexion;
    /**
     * @function __construct
     * @description Constructo del modelo donde realizo la conexion con la base de datos
     */
    function __construct() {
        require_once __DIR__. '/../configdb.php';
        $this->conexion=new mysqli(HOSTNAME,USERNAME,PASSWORD,DATABASE);
    }

    function alta($nombre,$familiaProfesional){
        $sql = "INSERT INTO ciclos(nombreCiclo, idFamilia) VALUES ($nombre,$familiaProfesional);";
        if($this->conexion->query($sql)){
            return 'Ciclo dado de alta.';
        }else{
            return 'Ha surgido un error';
        }
    }
}