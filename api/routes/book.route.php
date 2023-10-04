<?php
    require_once "./controllers/books.php";
    $object = new Books();

    function errorResponse($message = null){
        global $uri;
        $message = $message ? : "la ruta '$uri' es incorrecta";
        $response = [
            "status" => 404,
            "message" => $message,
        ];
        echo json_encode($response, http_response_code($response["status"]));
    }

    // echo '<pre>'.print_r("s".$my_route, true).'</pre>';

    if($method == "GET"){
        if(preg_match('/^product,\d+$/', $my_route)){
            // $object->getById($rutas[1]);
            return;
        }
        if($my_route == ""){
            $object->get();
            return;
        }
        // if(preg_match('/^product(,[^,]+)?(,picture,[^,]+|,picture)?$/', $my_route)){
        //     errorResponse("El identificador debe ser un número entero");
        //     return;
        // }
    }

    // insert into other table too
    if($method == "POST" && !isset($_POST["_method"])){
        if($my_route == ""){
            $object->create();
            return;
        }
    }
    
    if($method == "PUT" || (isset($_POST["_method"]) && $_POST["_method"] === "put")){
        // if(preg_match('/^product,\d+$/', $my_route)){
        //     $object->edit($rutas[1]);
        //     return;
        // }
    }

    if($method == "DELETE"){
        // if(preg_match('/^product,\d+$/', $my_route)){
        //     $object->delete($rutas[1]);
        //     return;
        // }
    }
    
    errorResponse("La ruta '$uri' es incorrecta");
?>