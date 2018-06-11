<?php

class lista_wiosek
{
    public $id;
    public $id_wioski;
    public $nazwa;
    public $x;
    public $y;
    public $checked;
    public $ilosc_farmy;
    public $aktywna_farma;
    public $liczba_pol_farma;
    public $last_wsp_farma;
    public $array_wsp_farma;
    public $premium_on;
    public $max_cost_premium;
    public $min_surowcow;

    public $arrayOfFarma;


    public function __construct($id=null, $id_wioski=null, $nazwa=null, $x=null, $y=null, $checked=null,
                                $ilosc_farmy=null, $aktywna_farma=null, $liczba_pol_farma=null,
                                $last_wsp_farma=null, $array_wsp_farma=null, $premium_on=null,
                                $max_cost_premium=null, $min_surowcow=null, $arrayOfFarma=null)
    {
        $this->id = $id;
        $this->id_wioski = $id_wioski;
        $this->nazwa = $nazwa;
        $this->x = $x;
        $this->y = $y;
        $this->checked = $checked;
        $this->ilosc_farmy = $ilosc_farmy;
        $this->aktywna_farma = $aktywna_farma;
        $this->liczba_pol_farma = $liczba_pol_farma;
        $this->last_wsp_farma = $last_wsp_farma;
        $this->array_wsp_farma = $array_wsp_farma;
        $this->premium_on = $premium_on;
        $this->max_cost_premium = $max_cost_premium;
        $this->min_surowcow = $min_surowcow;
        $this->arrayOfFarma = $arrayOfFarma;

    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }


    public function getIdWioski()
    {
        return $this->id_wioski;
    }


    public function setIdWioski($id_wioski)
    {
        $this->id_wioski = $id_wioski;
    }


    public function getNazwa()
    {
        return $this->nazwa;
    }


    public function setNazwa($nazwa)
    {
        $this->nazwa = $nazwa;
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


    public function getChecked()
    {
        return $this->checked;
    }


    public function setChecked($checked)
    {
        $this->checked = $checked;
    }


    public function getIloscFarmy()
    {
        return $this->ilosc_farmy;
    }


    public function setIloscFarmy($ilosc_farmy)
    {
        $this->ilosc_farmy = $ilosc_farmy;
    }


    public function getAktywnaFarma()
    {
        return $this->aktywna_farma;
    }


    public function setAktywnaFarma($aktywna_farma)
    {
        $this->aktywna_farma = $aktywna_farma;
    }


    public function getLiczbaPolFarma()
    {
        return $this->liczba_pol_farma;
    }


    public function setLiczbaPolFarma($liczba_pol_farma)
    {
        $this->liczba_pol_farma = $liczba_pol_farma;
    }


    public function getLastWspFarma()
    {
        return $this->last_wsp_farma;
    }


    public function setLastWspFarma($last_wsp_farma)
    {
        $this->last_wsp_farma = $last_wsp_farma;
    }

    public function getArrayOfFarma()
    {
        return $this->arrayOfFarma;
    }

    public function setArrayOfFarma($arrayOfFarma)
    {
        $this->arrayOfFarma = $arrayOfFarma;
    }

    public function getArrayWspFarma()
    {
        return $this->array_wsp_farma;
    }

    public function setArrayWspFarma($array_wsp_farma)
    {
        $this->array_wsp_farma = $array_wsp_farma;
    }


    public function getPremiumOn()
    {
        return $this->premium_on;
    }

    public function setPremiumOn($premium_on)
    {
        $this->premium_on = $premium_on;
    }

    public function getMaxCostPremium()
    {
        return $this->max_cost_premium;
    }

    public function setMaxCostPremium($max_cost_premium)
    {
        $this->max_cost_premium = $max_cost_premium;
    }

    public function getMinSurowcow()
    {
        return $this->min_surowcow;
    }

    public function setMinSurowcow($min_surowcow)
    {
        $this->min_surowcow = $min_surowcow;
    }


}