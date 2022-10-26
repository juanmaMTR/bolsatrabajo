<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: *");
  header('Content-Type: application/json;');

  
  $json = file_get_contents('php://input');
  $datos = json_decode($json, true); 
  

  require_once './controller/c_login.php';
  $controladorLogin = new ControladorLogin();

  switch ($datos['accion']) {
    case 'login':
        $controladorLogin->login($datos);
        break;
    
    default:

        break;
  }

?>