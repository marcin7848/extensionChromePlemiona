<?php

header('Content-Type: application/json');

require_once './db_connect.php';
require_once './controller.php';

$controller = new controller();
$controller->getWindow();

/*
$curl=curl_init("http://plemiona.pl/");
        curl_setopt($curl,CURLOPT_HEADER,1);
        curl_setopt($curl,CURLOPT_USERAGENT,"Mozilla/5.0 (Windows NT 10.0; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0");
        curl_setopt($curl,CURLOPT_REFERER,"http://plemiona.pl/");
        curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
         
        curl_setopt($curl, CURLOPT_COOKIESESSION, TRUE);
      
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST,  0);
        
        curl_setopt($curl,CURLOPT_ENCODING , "gzip");
        curl_setopt($curl, CURLOPT_COOKIEJAR, "D:\cookies_plemiona.txt");
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "GET");
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, Array("Content-Type: text/html; charset=utf-8",
                                                    "GET / HTTP/1.1",
                                                     "Host: www.plemiona.pl",
                                                     "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*\/*;q=0.8",
            "Accept-Language: pl,en-US;q=0.7,en;q=0.3",
            "Upgrade-Insecure-Requests: 1"));
               
        $dw=curl_exec($curl);
       //echo $dw;

preg_match_all('/^Set-Cookie:\s*([^\r\n]*)/mi', $dw, $ms);
// print_r($result);
$cookies = array();
foreach ($ms[1] as $m) {
    list($name, $value) = explode('=', $m, 2);
    $cookies[$name] = $value;
}
print_r($cookies);
*/
/*
$curl=curl_init("http://plemiona.pl/page/auth");
curl_setopt($curl,CURLOPT_HEADER,1);
curl_setopt($curl,CURLOPT_USERAGENT,$_SERVER["HTTP_USER_AGENT"]);
curl_setopt($curl,CURLOPT_REFERER,"http://plemiona.pl/");
curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
        
curl_setopt($curl, CURLOPT_COOKIESESSION, TRUE);
curl_setopt($curl,CURLOPT_ENCODING , "gzip");
        
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST,  0);
 
//curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
//curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
//curl_setopt($curl, CURLOPT_CAINFO, "C:\Users\Marcin\Desktop\COMODORSACertificationAuthority.crt");

//curl_setopt($curl, CURLOPT_COOKIEFILE, "D:\cookies_plemiona.txt");
curl_setopt($curl, CURLOPT_COOKIEJAR, "D:\cookies_plemiona1.txt");
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, TRUE);

curl_setopt($curl, CURLOPT_HTTPHEADER, Array("Content-Type: application/x-www-form-urlencoded",
                                             "X-Requested-With: XMLHttpRequest",
                                             "POST /page/auth HTTP/1.1", 
                                             "Host: www.plemiona.pl",
                                             "Accept: *\/*",
                                             "Accept-Language: pl,en-US;q=0.7,en;q=0.3",
                                             "Content-Length: 48"));
curl_setopt($curl, CURLOPT_POST, true);
$postVars = array('username' => urlencode('Smugas'), 
                  'password' => urlencode('132456'), 
                  'remember' => urlencode('0'));
curl_setopt($curl, CURLOPT_POSTFIELDS, $postVars);        
$dw=curl_exec($curl);
echo $dw;
*/
?>


