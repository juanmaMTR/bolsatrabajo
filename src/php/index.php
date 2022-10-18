<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");

$datosRecibidos = json_decode(file_get_contents("php://input"));
//echo json_encode($datosRecibidos->nombre);

?>