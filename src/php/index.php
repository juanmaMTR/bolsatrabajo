<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: *");
  header('Content-Type: application/json;');

  $json = file_get_contents('php://input');
  $datos = json_decode($json, true); 
  echo json_encode("sdasdasdas");
  switch ($datos['accion']) {
    case 'alta_usuarios':
        $datosRespuesta["respuesta"]= "LLego alta usuario";
        echo json_encode($datosRespuesta);
        break;
    
    default:
        # code...
        break;
  }

?>