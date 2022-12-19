<?php
    require_once('./configdb.php');

    class ModeloInstalacion{
        function __construct(){
            $this->conex = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE);
        } 
        
        function instalacion($usuario, $correo, $passwd){
            $instalacion = "INSERT INTO usuarios (nombreUsuario, correo, password, tipo)VALUES (?,?,?,?);
";
            $tipo = 's';
            $preparar = $this->conex->prepare($instalacion);
            $preparar->bind_param("ssss", $usuario, $correo, $passwd, $tipo);
            $resultado = $preparar->execute();
            $preparar->close();
            return $resultado;
        }
    }

?>