<?php

class ControladorIdiomas{
    public $modelo;
    /**
     * @function __construct
     * @description Constructor del controlador donde realizo la conexion con el modelo
     */
    function __construct() {
        require_once __DIR__. '/../model/m_idiomas.php';
        $this->modelo = new ModeloIdiomas;
    }
    /**
     * @function altaIdiomas
     * @description Función para dar de alta a los idiomas en la base de datos
     * @param mixed $datos
     */
    function altaIdiomas($datos){
        if(isset($datos['idioma'])){
            if(empty(trim($datos['idioma'])) || strlen($datos['idioma']) > 200){
                print_r(json_encode("El idioma está vacío o contiene muchos caracteres"));
                die();
            }else{
                $idioma = "'".$datos['idioma']."'";
            }
        }else{
            print_r(json_encode("No existe el idioma"));
            die();
        }
        if(isset($datos['certificacion'])){
            if(empty(trim($datos['certificacion'])) || strlen($datos['certificacion']) > 50){
                print_r(json_encode("La certificación está vacía o contiene muchos caracteres"));
                die();
            }else{
                if($datos['certificacion'] == "Ninguna")
                    $certificacion = null;
                else
                    $certificacion = "'".$datos['certificacion']."'";
            }
        }else{
            print_r(json_encode("No existe la certificación"));
            die();
        }
        if(isset($datos['nivelOral'])){
            if($datos['nivelOral']>=3){
                print_r(json_encode("El nivel oral no puede ser mayor que 2"));
                die();
            }else{
                $nivelOral = intval($datos['nivelOral']);
            }
        }else{
            print_r(json_encode("No existe el nivel oral"));
            die();
        }
        if(isset($datos['nivelEscrito'])){
            if($datos['nivelEscrito']>=3){
                print_r(json_encode("El nivel escrito no puede ser mayor que 2"));
                die();
            }else{
                $nivelEscrito = intval($datos['nivelEscrito']);
            }
        }else{
            print_r(json_encode("No existe el nivel escrito"));
            die();
        }
        if(isset($datos['nivelEscucha'])){
            if($datos['nivelEscucha']>=3){
                print_r(json_encode("El nivel de escucha no puede ser mayor que 2"));
                die();
            }else{
                $nivelEscucha = intval($datos['nivelEscucha']);
            }
        }else{
            print_r(json_encode("No existe el nivel de escucha"));
            die();
        }
        $respuesta = $this->modelo->alta($idioma, $certificacion, $nivelOral, $nivelEscrito, $nivelEscucha);
        print_r(json_encode($respuesta));
    }
}