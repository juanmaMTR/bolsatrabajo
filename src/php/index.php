<?php
  session_set_cookie_params(0, "/21/", $_SERVER['HTTP_HOST']);
  session_start();

  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: *");
  header('Content-Type: application/json;');


  $json = file_get_contents('php://input');
  $datos = json_decode($json, true); 

  require_once __DIR__. '/controller/c_usuarios.php';
  require_once __DIR__. '/controller/c_login.php';
  require_once __DIR__. '/controller/c_familiasProfesionales.php';
  require_once './authentication/autenticacion.php';
  require_once __DIR__. '/controller/c_ciclos.php';

  $controlador = new ControladorUsuarios;
  $controladorlogin = new ControladorLogin;
  $controladorFamilias = new ControladorFamilias;
  $controladorCiclos = new ControladorCiclos;
  $autenticacion = new Autenticacion;
  switch ($datos['accion']) {
    case 'alta_usuarios':
      $controlador->altaUsuarios($datos);
      break;
    case 'login':
      $controladorlogin->login($datos);
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
    case 'listadoFamiliasProfesionales':
      $controladorFamilias->listadoFamilias();
      break;
    case 'obtenerFamiliaProfesionalConId':
      $controladorFamilias->listarFamiliaConId($datos);
      break;
    case 'altaCiclos':
      $controladorCiclos->altaCiclos($datos);
      break;
    case 'listadoCiclos':
      $controladorCiclos->listadoCiclos();
      break;
    case 'borrarCiclo':
      $controladorCiclos->borrarCiclo($datos);
      break;
    default:
      # code...
      break;
  }

?>