<?php
    require_once('./configdb.php');

    class ModeloInstalacion{
        function __construct(){
            $this->conex = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE);
        } 
        
        function instalacion($usuario, $correo, $passwd){
            $instalacion = "INSERT INTO usuarios (nombreUsuario, correo, password, tipo)VALUES ($usuario, $correo, $passwd, 's');
";
            $resultado = $this->conex->query($instalacion);
            return $resultado;
        }
    }

?>