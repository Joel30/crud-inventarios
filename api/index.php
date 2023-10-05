<?php

    // $uri = strtok($_SERVER['REQUEST_URI'], '?');
    $uri=isset($_GET["url"]) ? $_GET["url"] : "";
    
    $rutas = array_filter(explode("/",$uri));

    $ruta = array_shift($rutas);

    // echo '<pre>'.print_r($uri1, true).'</pre>';

    $my_route = implode(",", $rutas); 

    $method = $_SERVER['REQUEST_METHOD'];
    if (isset($method)) {

        require_once "./connection.php";

        if ($ruta == "article") {
            require_once "routes/article.route.php";
            return;
        }
        if ($ruta == "category") {
            require_once "routes/category.route.php";
            return;
        }
        if ($ruta == "sales") {
            require_once "routes/sales.route.php";
            return;
        }
        if ($ruta == "sales-detail") {
            require_once "routes/salesDetail.route.php";
            return;
        }
        if ($ruta == "warehouse") {
            require_once "routes/warehouse.route.php";
            return;
        }

        $response = [
            "message" => "La ruta no existe",
            "route" => $rutas[0]
        ];
        echo json_encode($response);
    } else {
        $response = [
            "status" => 400,
            "message" => "No se pudo reconer el método de la petición"
        ];
        echo json_encode($response, http_response_code($response["status"]) | JSON_UNESCAPED_UNICODE);
    }
?>