<?php
    class Conecction extends mysqli{

        public function __construct(){
            try {
                parent::__construct("localhost", "root", "root", "inventarios");
            } catch (Throwable $e) {
                if($this->connect_errno){
                    $res = [
                        "message" => "connection failed",
                        "info" => mysqli_connect_error(),
                        "status" => 500
                    ];

                    die(json_encode($res, http_response_code($res["status"]) | JSON_UNESCAPED_UNICODE)
                );

                }
            }
        }
    }
?>