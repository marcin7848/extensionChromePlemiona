<?php

class wioski_premium
{
    public $id;
    public $nr_swiata;
    public $id_wioski;
    public $process;

    public function __construct($id=null, $nr_swiata=null, $id_wioski=null, $process=null){
        $this->id = $id;
        $this->nr_swiata = $nr_swiata;
        $this->id_wioski = $id_wioski;
        $this->process = $process;
    }


    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getNrSwiata()
    {
        return $this->nr_swiata;
    }


    public function setNrSwiata($nr_swiata)
    {
        $this->nr_swiata = $nr_swiata;
    }

    public function getIdWioski()
    {
        return $this->id_wioski;
    }

    public function setIdWioski($id_wioski)
    {
        $this->id_wioski = $id_wioski;
    }

    public function getProcess()
    {
        return $this->process;
    }

    public function setProcess($process)
    {
        $this->process = $process;
    }


}