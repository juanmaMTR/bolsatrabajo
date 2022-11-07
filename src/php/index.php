<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: *");
  header('Content-Type: application/json;');

  $json = file_get_contents('php://input');
  $datos = json_decode($json, true); 

  require_once __DIR__. '/controller/c_usuarios.php';
  $controlador = new ControladorUsuarios();
  switch ($datos['accion']) {
    case 'alta_usuarios':
      $controlador->altaUsuarios($datos);
      break;
    case 'listado_usuarios':
      $controlador->listadoUsuarios();
      break;
    case 'borrar_usuario':
      $controlador->borrarUsuario($datos);
      break;
    case 'listar_usuario':
      $controlador->listarUsuario($datos);
      break;
    case 'editar_usuario':
      $controlador->editar_usuario($datos);
      break;
    default:
      # code...
      break;
  }

?>