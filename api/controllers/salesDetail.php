<?php

class SalesDetail
{
    private $name = "detalleventas";
    private $name_msg = "detalle de Ventas";

    private $db;
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
                "message" => "error al listar " . $this->name_msg,
                "info" => $this->db->error,
            ];
        }

        echo json_encode($this->res, http_response_code($this->res["status"]) | JSON_UNESCAPED_UNICODE);
        exit;
    }

    public function show($id){ 
        try {
            $quer=$this->db->prepare("SELECT * FROM $this->name WHERE id = $id");
            $quer->execute();
            $req =  $quer->get_result();

            $data = $req->fetch_assoc();

            $this->res = [
                "status" => 200,
                "rows" => $quer->affected_rows,
                "data" => $data,
            ];
        } catch (Throwable $th) {
            $this->res = [
                "status" => 500,
                "message" => "error al listar " . $this->name_msg,
                "info" => $this->db->error,
            ];
        }

        echo json_encode($this->res, http_response_code($this->res["status"]) | JSON_UNESCAPED_UNICODE);
        exit;
    }

    public function showBySales($sales_id){ 
        try {
            $name_art = "(SELECT nombre FROM articulos WHERE id = $this->name.articulos_id) AS nombre_articulo";

            $quer=$this->db->prepare("SELECT *, $name_art FROM $this->name WHERE ventas_id = $sales_id");
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
                "message" => "error al listar " . $this->name_msg,
                "info" => $this->db->error,
            ];
        }

        echo json_encode($this->res, http_response_code($this->res["status"]) | JSON_UNESCAPED_UNICODE);
        exit;
    }

    
    public function create(){

        require_once "getPost.php";
        $value = getPost($_POST, $this->db, $this->name);

        $insert_columns = $value["insert_columns"];
        $value_columns = $value["value_columns"];
        $prepare_marks = $value["prepare_marks"];
        $bind_types = $value["bind_types"];

        try {

            $quer=$this->db->prepare("INSERT INTO $this->name ($insert_columns) VALUES ($prepare_marks)");
            $quer->bind_param($bind_types, ...$value_columns);
            $quer->execute();

            if ($quer->affected_rows) {
                $newStock = (int) $_POST["currentstock"] - (int)$_POST["cantidad"];
                $art_id = $_POST["articulos_id"];
                $querArt=$this->db->prepare("UPDATE articulos SET stock = '$newStock'  WHERE id = $art_id");
                $querArt->execute();
            }

            $this->res = [
                "status" => 200, 
                "affected_rows" => $quer->affected_rows, 
                "id" => $quer->insert_id, 
                "data" => []
            ];
        } catch (Throwable $th) {
            $this->res = [
                "status" => 500,
                "message" => "error al insertar " . $this->name_msg,
                "info" => $this->db->error,
            ]; 
        }
        echo json_encode($this->res, http_response_code($this->res["status"]) | JSON_UNESCAPED_UNICODE);
        exit;
    }

    public function edit($id){    

        require_once "getPost.php";
        $value = getPost($_POST, $this->db, $this->name, $id);

        $value_columns = $value["value_columns"];
        $prepare_marks = $value["prepare_marks"];
        $bind_types = $value["bind_types"];

        try {
            $quer=$this->db->prepare("UPDATE $this->name SET $prepare_marks WHERE id = ?");
            $quer->bind_param($bind_types, ...$value_columns);
            $quer->execute();

            $this->res = [
                "status" => 200, 
                "affected_rows" => $quer->affected_rows,
                "id" => $id,
                "data" => []
            ];
        } catch (Throwable $th) {
            $this->res = [
                "status" => 500,
                "message" => "error al actualizar " . $this->name_msg,
                "info" => $this->db->error,
            ]; 
        }
        echo json_encode($this->res, http_response_code($this->res["status"]) | JSON_UNESCAPED_UNICODE);
        exit;
    }

    public function delete($id){
        try {
            $quer=$this->db->prepare("DELETE FROM $this->name WHERE id = ?");
            $quer->bind_param("i", $id);
            $quer->execute();

            $this->res = [
                "status" => 200, 
                "affected_rows" => $quer->affected_rows,
                "id" => $id,
            ];
        } catch (Throwable $th) {
            $this->res = [
                "status" => 500,
                "message" => "error al eliminar " . $this->name_msg,
                "info" => $this->db->error,
            ]; 
        }
        echo json_encode($this->res, http_response_code($this->res["status"]) | JSON_UNESCAPED_UNICODE);
    }
}

?>