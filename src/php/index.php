<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");
    header('Content-Type: application/json;');


    $json = file_get_contents('php://input');
    $datos = json_decode($json, true);
    
    switch ($datos["accion"]) {
        case 'comprobarSesion':
            # llamar al controlador inicio
            break;
        
        default:
            # code...
            break;
    }

?>