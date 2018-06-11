<?php
require_once './db_connect.php';
require_once './wioski_premium.php';

class wioski_premiumRepo
{
    public function getWioskaPremium($id_wioski)
    {
        global $db;

        $query = "SELECT * FROM wioski_premium WHERE id_wioski=" . $id_wioski;
        $query = $db->getQuery($query);
        $wynik = $query->fetch(PDO::FETCH_BOTH);
        $id = $wynik['id'];
        $nr_swiata = $wynik['nr_swiata'];
        $id_wioski = $wynik['id_wioski'];
        $process = $wynik['process'];

        $wioski_premium = new wioski_premium($id, $nr_swiata, $id_wioski, $process);

        return $wioski_premium;
    }

    public function getAllWioskiPremium()
    {
        global $db;
        $arrayOfWioskiPremium = array();

        $query = "SELECT * FROM wioski_premium";
        $query = $db->getQuery($query);
        while($wynik = $query->fetch(PDO::FETCH_BOTH)){
            $id_wioski = $wynik['id_wioski'];

            $arrayOfWioskiPremium[] = $this->getWioskaPremium($id_wioski);
        }

        return $arrayOfWioskiPremium;
    }

}