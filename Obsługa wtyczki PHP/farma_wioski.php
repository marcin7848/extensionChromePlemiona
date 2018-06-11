<?php


class farma_wioski
{
    public $id;
    public $x;
    public $y;


    public function __construct($id=null, $x=null, $y=null)
    {
        $this->id = $id;
        $this->x = $x;
        $this->y = $y;
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getX()
    {
        return $this->x;
    }


    public function setX($x)
    {
        $this->x = $x;
    }

    public function getY()
    {
        return $this->y;
    }

    public function setY($y)
    {
        $this->y = $y;
    }


}

?>