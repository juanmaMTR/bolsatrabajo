<?php

class ControladorCiclos{
    public $modelo;
    /**
     * @function __construct
     * @description Constructor de la clase donde instancio el modelo
     */
    function __construct() {
        require_once __DIR__. '/../model/m_ciclos.php';
        $this->modelo = new ModeloCiclos;
    }
    /**
     * @function altaCiclos
     * @description Función para dar de alta a los ciclos en la base de datos
     * @param mixed $datos
     */
    function altaCiclos($datos){
        if(isset($datos['nombre'])){
            if(empty($datos['nombre'])){
                print_r(json_encode("El nombre está vacío"));
                die();
            }else{
                $nombre = "'".$datos['nombre']."'";
            }
        }else{
            print_r(json_encode("No existe el nombre"));
            die();
        }
        if(isset($datos['familiaProfesional'])){
            if(empty($datos['familiaProfesional'])){
                print_r(json_encode("La familia profesional está vacía"));
                die();
            }else{
                $familiaProfesional = intval($datos['familiaProfesional']);
            }
        }else{
            print_r(json_encode("No existe la familia profesional"));
            die();
        }
        $respuesta = $this->modelo->alta($nombre, $familiaProfesional);
        print_r(json_encode($respuesta));
    }
}