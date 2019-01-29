<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
$data = file_get_contents('clientes.json');
$data = json_decode($data,true);

if (isset($_GET["cod_cliente"])) {
   $filtered_Data = [];
   foreach ($data as $key => $value) {
      if ($value["cod_cliente"] == $_GET["cod_cliente"]) {         
         array_push($filtered_Data, $value);
      }
   }
   $data = $filtered_Data;
}

echo json_encode($data);
