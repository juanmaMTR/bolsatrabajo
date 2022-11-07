<?php
  /**
   * @file c_inicio.php
   * @description Controlador de inicio
   */
  class ControladorInicio{
    public $modelo;
    /**
     * @function __construct
     * @description Constructor de la clase donde instancio el modelo
     */
    function __construct() {
        require_once __DIR__. '/../model/m_inicio.php';
        $this->modelo = new ModeloInicio();
  }
  
}