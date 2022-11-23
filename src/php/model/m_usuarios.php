<?php
    /**
     * @file m_usuarios
     * @description Modelo de usuarios
     */

    class ModeloUsuarios {
        public $conexion;
        /**
         * @function __construct
         * @description Constructo del modelo donde realizo la conexion con la base de datos
         */
        function __construct() {
            require_once __DIR__. '/../configdb.php';
            $this->conexion=new mysqli(HOSTNAME,USERNAME,PASSWORD,DATABASE);
        }
        /**
         * @function alta
         * @description Función para dar de alta a los usuarios en la base de datos
         * @param  mixed $nombre
         * @param  mixed $apellidos
         * @param  mixed $nombreUsuario
         * @param  mixed $password
         * @param  mixed $estado
         * @param  mixed $dni
         * @param  mixed $correo
         * @param  mixed $tipo
         * @return string
         */        
        function alta($nombre,$apellidos,$nombreUsuario,$password,$estado,$dni,$correo,$tipo){
            //return [$nombre,$apellidos,$nombreUsuario,$password,$estado,$dni,$correo,$tipo];
            $sql = "INSERT INTO usuarios(nombreUsuario, estado, dni, correo, password, tipo, nombre, apellidos, primeraVez) VALUES ($nombreUsuario,$estado,$dni,$correo,$password,$tipo,$nombre,$apellidos,true);";
            if($this->conexion->query($sql)){
                return 'Usuario dado de alta.';
            }else{
                return 'Ha surgido un error';
            }
        }
        /**
         * @function borrar
         * @description Función para eliminar un usuario de la base de datos
         * @param string $nombreUsuario
         * @return string
         */
        function borrar($nombreUsuario){
            $sql = "DELETE FROM `usuarios` WHERE nombreUsuario =". $nombreUsuario.";";
            if($this->conexion->query($sql)){
                return 'Usuario eliminado correctamente';
            }else{
                return 'Ha surgido un error';
            }
        }

        function listar(){
            $sql = "SELECT nombreCiclo FROM ciclos;";

            $resultado = $this->conexion->query($sql);
            while($ciclo = $resultado->fetch_assoc()){
                $ciclos[] = $ciclo;
            }

            return $ciclos;
        }

        /**
         * @function buscarUsuario
         * @description Función para recoger los datos de un usuario de la base de datos
         * @param string $nombreUsuario
         * @return mixed
         */
        function buscarUsuario($nombreUsuario, $tipo){
            
            if (empty($nombreUsuario) and $tipo == 's') {
                $sql= "SELECT * FROM `usuarios` WHERE tipo != 's';";
            }elseif(empty($nombreUsuario) and $tipo == 't'){
                $sql= "SELECT * FROM usuarios WHERE tipo !='s' and tipo !='t';";
            }

            
            if($tipo == 's'){
                $sql = "SELECT * FROM usuarios WHERE tipo !='s' and nombreUsuario LIKE '%$nombreUsuario%';";
            }elseif ($tipo == 't') {
                $sql = "SELECT * FROM usuarios WHERE tipo !='s' and tipo !='t' and nombreUsuario LIKE '%$nombreUsuario%';";
            }
           

            if($resultado = $this->conexion->query($sql)){
                for($i=0;$i<$resultado->num_rows;$i++){
                    $fila = $resultado->fetch_assoc();
                    $usuarios[$i]=[
                        "nombreUsuario" => $fila['nombreUsuario'],
                        "estado" => $fila['estado'],
                        "dni" => $fila['dni'],
                        "correo" => $fila['correo'],
                        "nombre" => $fila['nombre'],
                        "apellidos" => $fila['apellidos'],
                        "primeraVez" => $fila['primeraVez']
                    ];
                }
                if (isset($usuarios)) {
                    return $usuarios;
                }else{
                    return 'Usuario no encontrado';
                }
            }else{
                return 'Ha surgido un error';
            }
        }
                
        /**
         * @function actualizar
         * @description Funcion para actualizar los datos de la base de datos de un usuario
         * @param  mixed $nombre
         * @param  mixed $apellidos
         * @param  mixed $nombreUsuario
         * @param  mixed $estado
         * @param  mixed $dni
         * @param  mixed $correo
         * @return void
         */
        function actualizar($nombre,$apellidos,$nombreUsuario,$estado,$dni,$correo,$nombreUsuarioAntiguo){
            $sql = "UPDATE `usuarios` SET `nombreUsuario`=$nombreUsuario,`estado`=$estado,`dni`=$dni,`correo`=$correo,`nombre`=$nombre,`apellidos`=$apellidos WHERE nombreUsuario = $nombreUsuarioAntiguo;";
            if($this->conexion->query($sql)){
                return 'El usuario se ha actualizado correctamente';
            }else{
                return 'Ha surgido un error';
            }
        }
    }

?>