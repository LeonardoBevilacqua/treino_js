<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 

$clientes = json_decode(file_get_contents('clientes.json'),true);
$pedidos = json_decode(file_get_contents('pedidos.json'),true);

$data = [];

if (isset($_GET["cod_cliente"])) {
   foreach ($clientes as $key => $value) {
      if ($value["cod_cliente"] == $_GET["cod_cliente"]) {   
         $cod_cliente = $value["cod_cliente"];

         $value["pedidos"] = [];
         $pedidos_filtrado = array_filter($pedidos, function ($pedido) use ($cod_cliente)
         {
            return $pedido["cod_cliente"] == $cod_cliente;
         });

         foreach ($pedidos_filtrado as $k => $v) {
            $pedido = [
               "codigo" => $v["codigo"],
               "cod_item" => $v["cod_item"],
               "denominacao" => get_item_denominacao($v["cod_item"]),
               "quantidade_comprada" => $v["quantidade_comprada"],
               "data" => $v["data"]
            ];

            array_push($value["pedidos"], $pedido);
         }      
         array_push($data, $value);
      }
   }
}else{
   foreach ($clientes as $key => $value) {
      $cod_cliente = $value["cod_cliente"];

      $value["pedidos"] = [];
      $pedidos_filtrado = array_filter($pedidos, function ($pedido) use ($cod_cliente)
      {
         return $pedido["cod_cliente"] == $cod_cliente;
      });

      foreach ($pedidos_filtrado as $k => $v) {
         $pedido = [
            "codigo" => $v["codigo"],
            "cod_item" => $v["cod_item"],
            "denominacao" => get_item_denominacao($v["cod_item"]),
            "quantidade_comprada" => $v["quantidade_comprada"],
            "data" => $v["data"]
         ];

         array_push($value["pedidos"], $pedido);
      }
      array_push($data, $value);
   }
}

function get_item_denominacao($cod_item)
{
   $itens = json_decode(file_get_contents('itens.json'),true);
   foreach ($itens as $key => $value) {
      if ($value["cod_item"] == $cod_item) {
         return $value["denominacao"];
      }
   }
}

echo json_encode($data);
