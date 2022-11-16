<?php
  session_set_cookie_params(0, "/21/", "");
  session_start();

  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: *");
  header('Content-Type: application/json;');

    

  $json = file_get_contents('php://input');
  $datos = json_decode($json, true); 

  require_once __DIR__. '/controller/c_usuarios.php';
  require_once __DIR__. '/controller/c_login.php';
  require_once './authentication/autenticacion.php';
  $controlador = new ControladorUsuarios;
  $controladorlogin = new ControladorLogin;
  $autenticacion = new Autenticacion;
  switch ($datos['accion']) {
    case 'alta_usuarios':
      $controlador->altaUsuarios($datos);
      break;
    case 'login':
      $controladorlogin->login($datos);
      break;
    case 'borrar_cookies':
      $controladorlogin->borrarCookies();
      break;
    case 'autenticar':
      $autenticacion->autenticar();
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