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
            if(empty(trim($datos['nombre'])) || strlen($datos['nombre']) > 100){
                print_r(json_encode("El nombre está vacío o contiene muchos caracteres"));
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
    /**
     * @function busquedaCiclos
     * @description Función para listar los ciclos de la base de datos
     * @param mixed $datos
     */
    function busquedaCiclos($datos){
        if(isset($datos['nombreCiclo'])){
            $nombreCiclo = $datos['nombreCiclo'];
        }else{
            $nombreCiclo = null;
        }
        $respuesta = $this->modelo->buscar($nombreCiclo);
        print_r(json_encode($respuesta));
    }
    /**
     * @function borrarCiclo
     * @description Función para borrar un ciclo de la base de datos
     * @param mixed $datos
     */
    function borrarCiclo($datos){
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
        $respuesta = $this->modelo->borrar($nombre);
        print_r(json_encode($respuesta));
    }
    /**
     * @function editarCiclo
     * @description Función para editar un ciclo de la base de datos
     * @param mixed $datos
     */
    function editarCiclo($datos){
        if(isset($datos['nombre'])){
            if(empty(trim($datos['nombre'])) || strlen($datos['nombre']) > 100){
                print_r(json_encode("El nombre está vacío o contiene muchos caracteres"));
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
        if(isset($datos['nombreAnterior'])){
            if(empty($datos['nombreAnterior'])){
                print_r(json_encode("El nombre antiguo está vacío"));
                die();
            }else{
                $nombreAnterior = "'".$datos['nombreAnterior']."'";
            }
        }else{
            print_r(json_encode("No existe el nombre antiguo"));
            die();
        }
        $respuesta = $this->modelo->editar($nombre, $familiaProfesional,$nombreAnterior);
        print_r(json_encode($respuesta));
    }
}