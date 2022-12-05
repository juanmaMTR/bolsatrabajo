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
                $id = $this->conexion->insert_id;             
                return array(
                    "Resultado" => "Usuario dado de alta correctamente.",
                    "idUsuario" => $id
                );
            }else{
                return array(
                    "Resultado" => "Ha surgido un error."
                );
            }
        }

        /**
         * @function altaCiclosUsuario
         * @description Función para dar de alta los ciclos asociados a usuarios en la base de datos
         * @param mixed $idCiclo
         * @param mixed $idUsuario
         * @return mixed
         */

        function altaCiclosUsuario($idCiclo, $idUsuario){
            $sql = "INSERT INTO ciclos_usuarios VALUES($idCiclo, $idUsuario);";
            if($this->conexion->query($sql)){
                return "Ciclo dado de alta en el usuario.";
            }else{
                return "Error en la consulta.";
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
        /**
         * @function buscarUsuario
         * @description Función para recoger los datos de un usuario de la base de datos
         * @param string $nombreUsuario
         * @param string $tipo
         * @return mixed
         */
        function buscarUsuario($nombreUsuario, $tipo){
            
            if($tipo == 's'){
                $sql = "SELECT nombreUsuario, tipo, estado, dni, correo, nombre, apellidos, primeraVez, nombreCiclo FROM `usuarios` LEFT JOIN `ciclos_usuarios` ON usuarios.idUsuario = ciclos_usuarios.idUsuario LEFT JOIN `ciclos` ON ciclos_usuarios.idCiclo = ciclos.idCiclo WHERE tipo != 's' and nombreUsuario LIKE '%$nombreUsuario%';";
            }elseif ($tipo == 't') {
                $sql = "SELECT nombreUsuario, estado, dni, correo, nombre, apellidos, primeraVez, nombreCiclo FROM `usuarios` LEFT JOIN `ciclos_usuarios` ON usuarios.idUsuario = ciclos_usuarios.idUsuario LEFT JOIN `ciclos` ON ciclos_usuarios.idCiclo = ciclos.idCiclo WHERE tipo !='s' and tipo !='t' and nombreUsuario LIKE '%$nombreUsuario%';";
            }
            
            if (empty($nombreUsuario) and $tipo == 's') {
                $sql= "SELECT nombreUsuario, tipo, estado, dni, correo, nombre, apellidos, primeraVez, nombreCiclo FROM `usuarios` LEFT JOIN `ciclos_usuarios` ON usuarios.idUsuario = ciclos_usuarios.idUsuario LEFT JOIN `ciclos` ON ciclos_usuarios.idCiclo = ciclos.idCiclo WHERE tipo != 's';";
            }elseif(empty($nombreUsuario) and $tipo == 't'){
                $sql= "SELECT nombreUsuario, estado, dni, correo, nombre, apellidos, primeraVez, nombreCiclo FROM `usuarios` LEFT JOIN `ciclos_usuarios` ON usuarios.idUsuario = ciclos_usuarios.idUsuario LEFT JOIN `ciclos` ON ciclos_usuarios.idCiclo = ciclos.idCiclo WHERE tipo !='s' and tipo !='t';";
            }

            if($resultado = $this->conexion->query($sql)){
                for($i=0;$i<$resultado->num_rows;$i++){
                    $fila = $resultado->fetch_assoc();
                    $usuarios[$i]=[
                        "nombreUsuario" => $fila['nombreUsuario'],
                        "tipo" => $fila['tipo'],
                        "estado" => $fila['estado'],
                        "dni" => $fila['dni'],
                        "correo" => $fila['correo'],
                        "nombre" => $fila['nombre'],
                        "apellidos" => $fila['apellidos'],
                        "primeraVez" => $fila['primeraVez'],
                        "nombreCiclo" => $fila['nombreCiclo']
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
         * @function ordenarCiclos
         * @description Función para ordenar por ciclos los usuarios de la base de datos más ciclos
         * @return mixed
         */

        function ordenarCiclos(){
            $sql = "SELECT nombreUsuario, tipo, estado, dni, correo, nombre, apellidos, primeraVez, nombreCiclo FROM `usuarios` LEFT JOIN `ciclos_usuarios` ON usuarios.idUsuario = ciclos_usuarios.idUsuario LEFT JOIN `ciclos` ON ciclos_usuarios.idCiclo = ciclos.idCiclo WHERE tipo != 's' ORDER BY `ciclos`.`nombreCiclo` DESC;";
            if($resultado = $this->conexion->query($sql)){
                for($i=0;$i<$resultado->num_rows;$i++){
                    $fila = $resultado->fetch_assoc();
                    $usuarios[$i]=[
                        "nombreUsuario" => $fila['nombreUsuario'],
                        "tipo" => $fila['tipo'],
                        "estado" => $fila['estado'],
                        "dni" => $fila['dni'],
                        "correo" => $fila['correo'],
                        "nombre" => $fila['nombre'],
                        "apellidos" => $fila['apellidos'],
                        "primeraVez" => $fila['primeraVez'],
                        "nombreCiclo" => $fila['nombreCiclo']
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
         * @function ordenarEstado
         * @description Función para ordenar por estado los usuarios de la base de datos más ciclos
         * @return mixed
         */

        function ordenarEstado(){
            $sql = "SELECT nombreUsuario, tipo, estado, dni, correo, nombre, apellidos, primeraVez, nombreCiclo FROM `usuarios` LEFT JOIN `ciclos_usuarios` ON usuarios.idUsuario = ciclos_usuarios.idUsuario LEFT JOIN `ciclos` ON ciclos_usuarios.idCiclo = ciclos.idCiclo WHERE tipo != 's' ORDER BY estado DESC;";
            if($resultado = $this->conexion->query($sql)){
                for($i=0;$i<$resultado->num_rows;$i++){
                    $fila = $resultado->fetch_assoc();
                    $usuarios[$i]=[
                        "nombreUsuario" => $fila['nombreUsuario'],
                        "tipo" => $fila['tipo'],
                        "estado" => $fila['estado'],
                        "dni" => $fila['dni'],
                        "correo" => $fila['correo'],
                        "nombre" => $fila['nombre'],
                        "apellidos" => $fila['apellidos'],
                        "primeraVez" => $fila['primeraVez'],
                        "nombreCiclo" => $fila['nombreCiclo']
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
         * @function ordenarTipo
         * @description Función para ordenar por tipo los usuarios de la base de datos más ciclos
         * @return mixed
         */
        function ordenarTipo(){
            $sql = "SELECT nombreUsuario, tipo, estado, dni, correo, nombre, apellidos, primeraVez, nombreCiclo FROM `usuarios` LEFT JOIN `ciclos_usuarios` ON usuarios.idUsuario = ciclos_usuarios.idUsuario LEFT JOIN `ciclos` ON ciclos_usuarios.idCiclo = ciclos.idCiclo WHERE tipo != 's' ORDER BY tipo DESC;";
            if($resultado = $this->conexion->query($sql)){
                for($i=0;$i<$resultado->num_rows;$i++){
                    $fila = $resultado->fetch_assoc();
                    $usuarios[$i]=[
                        "nombreUsuario" => $fila['nombreUsuario'],
                        "tipo" => $fila['tipo'],
                        "estado" => $fila['estado'],
                        "dni" => $fila['dni'],
                        "correo" => $fila['correo'],
                        "nombre" => $fila['nombre'],
                        "apellidos" => $fila['apellidos'],
                        "primeraVez" => $fila['primeraVez'],
                        "nombreCiclo" => $fila['nombreCiclo']
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