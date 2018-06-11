<?php

require_once './farma_wioski.php';
require_once './lista_wiosek.php';
require_once './db_connect.php';
require_once './farma_wioskiRepo.php';

class lista_wiosekRepo
{
    public function getWioska($id_wioski)
    {
        global $db;

        $query = "SELECT * FROM lista_wiosek WHERE id_wioski=" . $id_wioski;
        $query = $db->getQuery($query);
        $wynik = $query->fetch(PDO::FETCH_BOTH);
        $id = $wynik['id'];
        $id_wioski = $wynik['id_wioski'];
        $nazwa = $wynik['nazwa'];
        $x = $wynik['x'];
        $y = $wynik['y'];
        $checked = $wynik['checked'];
        $ilosc_farmy = $wynik['ilosc_farmy'];
        $aktywna_farma = $wynik['aktywna_farma'];
        $liczba_pol_farma = $wynik['liczba_pol_farma'];
        $last_wsp_farma = $wynik['last_wsp_farma'];
        $array_wsp_farma = $wynik['array_wsp_farma'];
        $premium_on = $wynik['premium_on'];
        $max_cost_premium = $wynik['max_cost_premium'];
        $min_surowcow = $wynik['min_surowcow'];

        $farma_wioskiRepo = new farma_wioskiRepo();
        $arrayOfFarma = $farma_wioskiRepo->getAllFarma($id);
        $lista_wiosek = new lista_wiosek($id, $id_wioski, $nazwa, $x, $y, $checked, $ilosc_farmy, $aktywna_farma, $liczba_pol_farma, $last_wsp_farma, $array_wsp_farma, $premium_on, $max_cost_premium, $min_surowcow, $arrayOfFarma);

        return $lista_wiosek;
    }


    public function getAllWioski()
    {
        global $db;
        $arrayOfWioski = array();

        $query = "SELECT * FROM lista_wiosek";
        $query = $db->getQuery($query);
        while($wynik = $query->fetch(PDO::FETCH_BOTH)){
            $id_wioski = $wynik['id_wioski'];

            $arrayOfWioski[] = $this->getWioska($id_wioski);
        }

        return $arrayOfWioski;
    }


}