<?php
    function getPost($form_columns, $db, $name, $id = ""){
        $schema = $name;

        $request = $db->query("SELECT COLUMN_NAME AS item FROM information_schema.columns WHERE table_schema = 'inventarios' AND table_name = '$name'")->fetch_all(MYSQLI_ASSOC);

        $form_keys = array_keys($form_columns);
        $columns = array();
        foreach ($request as $key => $value) {
            if(in_array($value["item"], $form_keys)){
                $columns[$value["item"]] = $form_columns[$value["item"]];
            }
        }
        // echo json_encode($request);
        if($columns) {
            if ($id) {
                $name_columns = array_keys($columns);
                $value_columns = array_values($columns);
                array_push($value_columns, $id);

                $bind_types = str_repeat("s", count($columns))."i";
                $prepare_marks = "";
                foreach ($name_columns as $value) {
                    $prepare_marks .= $value." = ?, ";
                }
                $prepare_marks = substr($prepare_marks, 0, -2);

                return [
                    "prepare_marks" => $prepare_marks,
                    "bind_types" => $bind_types,
                    "value_columns" => $value_columns,
                ];
            }
            return [
                "insert_columns" => implode(", ", array_keys($columns)),
                "value_columns" => array_values($columns),
                "prepare_marks" => implode(',', array_fill(0, count($columns), '?')),
                "bind_types" => str_repeat("s", count($columns)),
            ];

        } else {
            $res = [
                "message" => "se require al menos una columna",
                "status" => 200
            ];
            die(json_encode($res, http_response_code($res["status"])));
        }
    }

?>