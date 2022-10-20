<?php
    
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");
    header('Content-Type: application/json;');


    $json = file_get_contents('php://input');
    $datos = json_decode($json, true);        

    
    if ($datos['inputUsuario'] == 'hola' and $datos['inputContrasenia'] == 'hola') {
        $arrayRespuesta['resultado'] = 'Sesión iniciada';
    }else{
        $arrayRespuesta['resultado'] = 'Error';
    }    
    
  

    
    if (isset($arrayRespuesta)) {
        $jsonRespuesta = json_encode($arrayRespuesta);
        print_r($jsonRespuesta);
    }

    
?>