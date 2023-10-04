<?php


class Books
{
    private $db;
    private $name = "books";
    private $res;
    public function __construct()
    {
        $this->db = new Conecction();
    }

    public function get(){


        try {

            $quer=$this->db->prepare("SELECT * FROM $this->name");
            $quer->execute();
            $req =  $quer->get_result();

            $data = $req->fetch_all(MYSQLI_ASSOC);

            $this->res = [
                "status" => 200,
                "rows" => $quer->affected_rows,
                "data" => $data,
            ];
        } catch (Throwable $th) {
            $this->res = [
                "status" => 500,
                "message" => "error al listar Libros",
                "info" => $this->db->error,
            ];
        }

        
        echo json_encode($this->res, http_response_code($this->res["status"]) | JSON_UNESCAPED_UNICODE);
        exit;
    }

    // public function show($id){ 
    //     try {        
    //         $consulta = $this->db->query("SELECT * FROM product WHERE idproduct = $id");
    //         $data = $this->db->assoc($consulta);
    //         $this->res = [
    //             "status" => 200,
    //             "rows" => $this->db->rows($consulta),
    //             "data" => $data,
    //         ];
    //     } catch (Throwable $th) {
    //         $this->res = [
    //             "status" => 500,
    //             "message" => "error al listar product",
    //             "info" => $this->db->error,
    //         ];
    //     }
    //     echo json_encode($this->res, http_response_code($this->res["status"]));
    // }

    
    public function create(){

        $title = $_POST["title"];
        $author = $_POST["author"];
        $category = $_POST["category"];
        $price = $_POST["price"];

        try {
            $quer=$this->db->prepare("INSERT INTO books (title, author, category, price) VALUES (?, ?, ?, ?)");
            $quer->bind_param("ssss", $title, $author, $category, $price);
            $quer->execute();

            $this->res = [
                "status" => 200, 
                "affected_rows" => $quer->affected_rows, 
                "id" => $quer->insert_id, 
                "data" => []
            ];
        } catch (Throwable $th) {
            $this->res = [
                "status" => 500,
                "message" => "error al insertar Libros",
                "info" => $this->db->error,
            ]; 
        }
        echo json_encode($this->res, http_response_code($this->res["status"]));
    }

//     public function edit($id_product){        
//         $objectV = new Validation("product");
//         $res_v = $objectV->isNumber($id_product, "id");
//         if ($res_v !== true){
//             echo json_encode($res_v, http_response_code($res_v["status"]));
//             return;
//         }

//         $rules = [
//             "nameproduct" => ["require"],
//             "codeproduct" => ["require", "string"],
//             "detailsproduct" => ["require", "string"],
//             "subcategory_idsubcategory" => ["require", "number"]
//         ];

//         $table_columns = $objectV->getColumsData();
    
//         $validValues = $objectV->validValuesInsertion($table_columns, "PUT");
//         $form_fields = $validValues["form_fields"];
//         $value_marks = $validValues["value_columns"];
//         $prepare_marks = $validValues["prepare_marks"];
//         $bind_types = $validValues["bind_types"];

//         array_push($value_marks, $id_product);

//         $errors = $objectV->validate($rules, $form_fields, $table_columns);

//         if ($errors) {
//             $this->res = $errors;
//         } else {
//             try {
//                 $quer=$this->db->prepare("UPDATE product SET $prepare_marks WHERE idproduct = ?");
//                 $quer->bind_param($bind_types."i", ...$value_marks);
//                 $quer->execute();

//                 $this->res = [
//                     "status" => 200, 
//                     "affected_rows" => $quer->affected_rows,
//                     "id" => $id_product,
//                     "data" => $form_fields
//                 ];
//             } catch (Throwable $th) {
//                 $this->res = [
//                     "status" => 500,
//                     "message" => "error al actualizar product",
//                     "info" => $this->db->error,
//                 ]; 
//             }
//         }
//         echo json_encode($this->res, http_response_code($this->res["status"]));

//     }

//     public function delete($id_product){
//         $objectV = new Validation("product");
//         $res_v = $objectV->isNumber($id_product, "id");
//         if ($res_v !== true){
//             echo json_encode($res_v, http_response_code($res_v["status"]));
//             return;
//         }

//         try {
//             $quer=$this->db->prepare("DELETE FROM product WHERE idproduct = ?");
//             $quer->bind_param("i", $id_product);
//             $quer->execute();

//             $this->res = [
//                 "status" => 200, 
//                 "affected_rows" => $quer->affected_rows,
//                 "id" => $id_product,
//             ];
//         } catch (Throwable $th) {
//             $this->res = [
//                 "status" => 500,
//                 "message" => "error al eliminar product",
//                 "info" => $this->db->error,
//             ]; 
//         }
//         echo json_encode($this->res, http_response_code($this->res["status"]));
//     }
}

?>