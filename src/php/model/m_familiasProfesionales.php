<?php

class ModeloFamilias{
    public $conexion;
    /**
     * @function __construct
     * @description Constructor del modelo donde realizo la conexion con la base de datos
     */
    function __construct() {
        require_once __DIR__. '/../configdb.php';
        $this->conexion=new mysqli(HOSTNAME,USERNAME,PASSWORD,DATABASE);
    }
    /**
     * @function listar
     * @description Función para recoger los datos de las familias profesionales de la base de datos
     * @return mixed
     */
    function listar(){
        $sql="SELECT * FROM `familiasprofesionales`";
        $familiasProfesionales = array();
        if($resultado = $this->conexion->query($sql)){
            for($i=0;$i<$resultado->num_rows;$i++){
                $fila = $resultado->fetch_assoc();
                $familiasProfesionales[$i]=[
                    "id" => $fila['idFamilia'],
                    "nombre" => $fila['nombreFamilia'],
                ];
            }
            return $familiasProfesionales;
        }
        else{
            return 'Ha surgido un error';
        }
    }
}