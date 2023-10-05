<?php
    require_once "./controllers/salesDetail.php";
    $object = new SalesDetail();

    function errorResponse($message = null){
        global $uri;
        $message = $message ? : "la ruta '$uri' es incorrecta";
        $response = [
            "status" => 404,
            "message" => $message,
        ];
        echo json_encode($response, http_response_code($response["status"]));
    }

    if($method == "GET"){
        if(preg_match('/^\d+$/', $my_route)){
            $object->show($rutas[0]);
            return;
        }
        if($my_route == ""){
            $object->get();
            return;
        }
    }

    if($method == "POST" && !isset($_POST["_method"])){
        if($my_route == ""){
            $object->create();
            return;
        }
    }
    
    if($method == "PUT" || (isset($_POST["_method"]) && $_POST["_method"] === "put")){
        if(preg_match('/^\d+$/', $my_route)){
            $object->edit($rutas[0]);
            return;
        }
    }

    if($method == "DELETE"){
        if(preg_match('/^\d+$/', $my_route)){
            $object->delete($rutas[0]);
            return;
        }
    }
    
    errorResponse("La ruta '$uri' es incorrecta");
?>