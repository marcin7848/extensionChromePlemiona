<?php

require_once "./config.php";

$host = "localhost";
$user = "root";
$pass = "KacZ1324";
$database_name = "plemiona";

class db_connect {
    private $pdo;
    private static $instance;

    public function __construct(){
        try{
          global $host, $user, $pass, $database_name;
          $this->pdo = new PDO('mysql:host='.$host.';dbname='.$database_name.'', $user, $pass);
          $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }catch(PDOException $e){
          exit('Połączenie nie mogło zostać utworzone: ' . $e->getMessage());
        }

    }

    public function getQuery($query){
         return $stmt = $this->pdo->query($query);
     }

}

$db = new db_connect();


?>
