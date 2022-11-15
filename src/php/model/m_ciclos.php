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
    /**
     * @function alta
     * @description Función para dar de alta a los ciclos en la base de datos
     * @param string
     */
    function alta($nombre,$familiaProfesional){
        $sql = "INSERT INTO ciclos(nombreCiclo, idFamilia) VALUES ($nombre,$familiaProfesional);";
        if($this->conexion->query($sql)){
            return 'Ciclo dado de alta.';
        }else{
            return 'Ha surgido un error';
        }
    }
    /**
     * @function listar
     * @description Función para recoger los datos de los ciclos de la base de datos
     * @return mixed
     */
    function listar(){
        $sql= "SELECT * FROM `ciclos`;";
        $ciclos= array();
        if($resultado = $this->conexion->query($sql)){
            for($i=0;$i<$resultado->num_rows;$i++){
                $fila = $resultado->fetch_assoc();
                $ciclos[$i]=[
                    "nombreCiclo" => $fila['nombreCiclo'],
                    "idFamilia" => $fila['idFamilia']
                ];
            }
            return $ciclos;
        }
        else{
            return 'Ha surgido un error';
        }
    }
}