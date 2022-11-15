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
}