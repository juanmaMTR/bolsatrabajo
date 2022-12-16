<?php
    class ControladorInstalacion{
        function __construct(){
            require_once './model/m_instalacion.php';
        }
        function instalacion($datos){
            if (isset($datos)) {
                if(!empty($datos['nombreUsuario'] && !empty($datos['passwd']) && !empty($datos['correo']))){
                    system('/opt/lampp/bin/mysql -u root < /opt/lampp/htdocs/21/sql/instalacion.sql', $retval);
                    $usuario = "'".$datos['nombreUsuario']."'";
                    $correo = "'".$datos['correo']."'";
                    $passwd = "'".password_hash($datos['passwd'], PASSWORD_DEFAULT)."'";
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