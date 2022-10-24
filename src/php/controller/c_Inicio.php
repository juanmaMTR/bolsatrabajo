<?php

class c_inicio{
    public function __construct()
    {
      require_once __DIR__ . "/../modelo/m_Inicio.php";
      $this->conexion = new M_Etapas();
      header("Access-Control-Allow-Origin:*");
      header('Content-Type: application/json; charset=utf-8');
    }
  
  
}