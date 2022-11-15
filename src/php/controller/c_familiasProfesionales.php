<?php

class ControladorFamilias{
    public $modelo;
    /**
     * @function __construct
     * @description Constructor de la clase donde instancio el modelo
     */
    function __construct() {
        require_once __DIR__. '/../model/m_familiasProfesionales.php';
        $this->modelo = new ModeloFamilias;
    }
    /**
     * @function listadoFamilias
     * @description Función para listar las familias profesionales
     */
    function listadoFamilias() {
        $resultado = $this->modelo->listar();
        print_r(json_encode($resultado));
    }
    /**
     * @function listarFamiliaConId
     * @description Función para listar una familia profesional concreta con el id
     * @param mixed $datos
     */
    function listarFamiliaConId($datos){
        if(isset($datos['id'])){
            if(empty($datos['id'])){
                print_r(json_encode("El id está vacío"));
                die();
            }else{
                $id = intval($datos['id']);
            }
        }else{
            print_r(json_encode("No existe el id"));
            die();
        }
        $resultado = $this->modelo->listarConId($id);
        print_r(json_encode($resultado));
    }
}