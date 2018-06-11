<?php

require_once './JSconnect.php';

class controller 
{ 
    public function getWindow()
    {
        $jsconnect = new JSconnect();
 
        $jsconnect->getView();
    }
}
