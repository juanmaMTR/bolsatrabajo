<?php
    class ControladorInstalacion{
        function __construct(){
            require_once './model/m_instalacion.php';
        }
        function instalacion($datos){
            if (isset($datos)) {
                if(!empty($datos['nombreUsuario'] && !empty($datos['correo']))){
                    system('/opt/lampp/htdocs/21/bash/instalador.sh 2>&1', $retval);
                    $usuario = "'".$datos['nombreUsuario']."'";
                    $correo = "'".$datos['correo']."'";
                    $passwd = "'".password_hash($datos['nombreUsuario'], PASSWORD_DEFAULT)."'";
                    $m_instalacion = new ModeloInstalacion;
                    $resultado = $m_instalacion->instalacion($usuario, $correo, $passwd);
                    if($resultado == 1){
                        $response['Respuesta'] = "Instalación completada.";
                    }else{
                        $response['Respuesta'] = "Error en la instalación.";
                    }
                }else{
                    $response['Respuesta'] = "Rellene todos los campos.";
                }
            }else{
                $response['Respuesta'] = "No existen datos.";
            }
            echo json_encode($response);
        }
    }
    
?>