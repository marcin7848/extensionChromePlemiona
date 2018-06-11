<?php
require_once './farma_wioski.php';
require_once './db_connect.php';

class farma_wioskiRepo
{

    public function getWspFarmy($id){
        global $db;

        $query = "SELECT * FROM farma_wioski WHERE id=".$id;
        $query = $db->getQuery($query);
        $wynik = $query->fetch(PDO::FETCH_BOTH);
        $id = $wynik['id'];
        $x = $wynik['x'];
        $y = $wynik['y'];

        $farma_wioski = new farma_wioski($id, $x, $y);

        return $farma_wioski;
    }


    public function getAllFarma($id){
        global $db;

        $arrayOfFarma = array();

        $query = "SELECT * FROM farma WHERE id_wioski=".$id;
        $query = $db->getQuery($query);
        while($wynik = $query->fetch(PDO::FETCH_BOTH)){

            $farma_wioski = $this->getWspFarmy($wynik['id_farma']);
            $arrayOfFarma[] = $farma_wioski;

        }

        return $arrayOfFarma;
    }

}

?>