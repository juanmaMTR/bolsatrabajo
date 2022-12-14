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
  require_once __DIR__. '/controller/c_familiasProfesionales.php';
  require_once './authentication/autenticacion.php';
  require_once './controller/c_instalacion.php';
  require_once __DIR__. '/controller/c_ciclos.php';
  require_once __DIR__. '/controller/c_idiomas.php';

  $controladorUsuarios = new ControladorUsuarios;
  $controladorlogin = new ControladorLogin;
  $controladorFamilias = new ControladorFamilias;
  $controladorCiclos = new ControladorCiclos;
  $controladorIdiomas = new ControladorIdiomas;
  $autenticacion = new Autenticacion;
  $instalacion = new ControladorInstalacion;
  switch ($datos['accion']) {
    case 'alta_usuarios':
      $controladorUsuarios->altaUsuarios($datos);
      break;
    case 'alta_ciclos_usuario':
      $controladorUsuarios->altaCiclosUsuario($datos);
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
    case 'autenticar_instalacion':
      $autenticacion->autenticarInstalacion();
      break;
    case 'instalacion':
      $instalacion->instalacion($datos);
      break;
    case 'borrar_usuario':
      $controladorUsuarios->borrarUsuario($datos);
      break;
    case 'buscar_usuario':
      $controladorUsuarios->buscarUsuario($datos);      
      break;
    case 'ordenar_ciclos':
      $controladorUsuarios->ordenarCiclos();      
      break;
    case 'ordenar_estado':
      $controladorUsuarios->ordenarEstado();      
      break;
    case 'ordenar_tipo':
      $controladorUsuarios->ordenarTipo();      
      break;
    case 'editar_usuario':
      $controladorUsuarios->editar_usuario($datos);
      break;
    case 'listarUsuario':
      $controladorUsuarios->listarUsuario($datos);
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
    case 'buscar_ciclo':
      $controladorCiclos->busquedaCiclos($datos);
      break;
    case 'borrarCiclo':
      $controladorCiclos->borrarCiclo($datos);
      break;
    case 'editarCiclo':
      $controladorCiclos->editarCiclo($datos);
      break;
    case 'altaIdiomas':
      $controladorIdiomas->altaIdiomas($datos);
    default:
      # code...
      break;
  }

?>