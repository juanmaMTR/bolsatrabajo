<?php
    require_once('./config.php');

    class ModeloLogin{
        function __construct(){
            $this->conex = new mysqli(SERVER, USER, PW, DB);
        } 
        
        function sacarUsuarioLogin($user){
            $validarUsuario = "SELECT * FROM usuarios WHERE nombreUsuario = '$user';";
            $resultado = $this->conex->query($validarUsuario);
            $usuarioSacado = $resultado->fetch_assoc();
            //Compara los valores en el array buscando si hay coincidencias, si no las hay, saca la diferencia. 
            if(isset($usuarioSacado)){
                $usuarioSacado = array_diff_key($usuarioSacado,
                                                                ["idUsuario" => 'nada'],
                                                                ["estado" => 'nada'],
                                                                ["dni" => 'nada'],
                                                                ["correo" => 'nada'],
                                                                ["nombre" => 'nada'],
                                                                ["apellidos" => 'nada'],
                                                                ["primeraVez" => 'nada']);
                                                            }
            $encuentraUsuario = $resultado->num_rows;
            $usuarioSacado['Existe'] = $encuentraUsuario;
            return $usuarioSacado;
        }
    }

?>