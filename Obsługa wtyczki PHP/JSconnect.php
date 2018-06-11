<?php
require_once './lista_wiosekRepo.php';
require_once './wioski_premiumRepo.php';

class JSconnect
{
    private $html;

    public function getView()
    {
        set_time_limit(0);
        $this->controller();
        echo $this->html;
    }

    private function controller()
    {
        if (isset($_GET['get_bot_on'])) {
            $this->get_bot_on();
        }
        if (isset($_GET['set_bot_on'])) {
            $this->set_bot_on();
        }
        if (isset($_GET['get_userdata'])) {
            $this->get_userdata();
        }
        if (isset($_GET['set_userdata'])) {
            $this->set_userdata();
        }
        if (isset($_GET['get_id_glownej_wioski'])) {
            $this->get_id_glownej_wioski();
        }
        if (isset($_GET['set_id_glownej_wioski'])) {
            $this->set_id_glownej_wioski();
        }
        if (isset($_GET['get_wszystkie_wioski'])) {
            $this->get_wszystkie_wioski();
        }
        if (isset($_GET['del_all_wioski'])) {
            $this->del_all_wioski();
        }
        if (isset($_GET['dodaj_wioski_auto'])) {
            $this->dodaj_wioski_auto();
        }
        if (isset($_GET['usun_wioski_no_checked'])) {
            $this->usun_wioski_no_checked();
        }
        if (isset($_GET['set_wioski_no_checked'])) {
            $this->set_wioski_no_checked();
        }
        if (isset($_GET['macierz_farmy'])) {
            $this->macierz_farmy();
        }
        if (isset($_GET['add_wioska_farmy'])) {
            $this->add_wioska_farmy();
        }
        if (isset($_GET['usun_wioske_farmy'])) {
            $this->usun_wioske_farmy();
        }
        if (isset($_GET['aktualizacja_farmy'])) {
            $this->aktualizacja_farmy();
        }
        if (isset($_GET['get_start_farma'])) {
            $this->get_start_farma();
        }
        if (isset($_GET['zapisz_last_wsp'])) {
            $this->zapisz_last_wsp();
        }
        if (isset($_GET['ochrona_botowa_send_mail'])) {
            $this->ochrona_botowa_send_mail();
        }
        if (isset($_GET['get_time_sent_and_random'])) {
            $this->get_time_sent_and_random();
        }
        if (isset($_GET['set_time_sent_and_random'])) {
            $this->set_time_sent_and_random();
        }
        if (isset($_GET['get_wsp_wiosek'])) {
            $this->get_wsp_wiosek();
        }
        if (isset($_GET['set_wsp_barba'])) {
            $this->set_wsp_barba();
        }
        if (isset($_GET['attack_on_me'])) {
            $this->attack_on_me();
        }
        if (isset($_GET['get_time_bot_off'])) {
            $this->get_time_bot_off();
        }
        if (isset($_GET['set_time_bot_off'])) {
            $this->set_time_bot_off();
        }
        if (isset($_GET['set_array_wsp_farma'])) {
            $this->set_array_wsp_farma();
        }
        if (isset($_GET['set_array_wsp_farma_one'])) {
            $this->set_array_wsp_farma_one();
        }
        if (isset($_GET['update_pp'])) {
            $this->update_pp();
        }
        if (isset($_GET['get_wioski_premium'])) {
            $this->get_wioski_premium();
        }
        if (isset($_GET['usun_wioske_premium'])) {
            $this->usun_wioske_premium();
        }
        if (isset($_GET['add_wioska_premium'])) {
            $this->add_wioska_premium();
        }
        if (isset($_GET['get_time_wioski_premium'])) {
            $this->get_time_wioski_premium();
        }
        if (isset($_GET['set_time_wioski_premium'])) {
            $this->set_time_wioski_premium();
        }
        if (isset($_GET['set_premium_process'])) {
            $this->set_premium_process();
        }
    }

    private function get_bot_on()
    {
        global $db;
        $query = "SELECT * FROM config WHERE config_name='bot_on'";
        $query = $db->getQuery($query);
        $wynik = $query->fetch(PDO::FETCH_BOTH);
        $this->html = json_encode(array('bot_on' => $wynik['config_value']));

    }

    private function get_userdata()
    {
        global $db;
        $query = "SELECT * FROM config WHERE config_name='username'";
        $query = $db->getQuery($query);
        $wynik = $query->fetch(PDO::FETCH_BOTH);
        $username = $wynik['config_value'];

        $query = "SELECT * FROM config WHERE config_name='password'";
        $query = $db->getQuery($query);
        $wynik = $query->fetch(PDO::FETCH_BOTH);
        $password = $wynik['config_value'];

        $query = "SELECT * FROM config WHERE config_name='nr_swiata'";
        $query = $db->getQuery($query);
        $wynik = $query->fetch(PDO::FETCH_BOTH);
        $nr_swiata = $wynik['config_value'];

        $this->html = json_encode(array('username' => $username, 'password' => $password, 'nr_swiata' => $nr_swiata));

    }

    private function set_userdata()
    {
        global $db;


        $query1 = "UPDATE config SET config_value='" . $_POST['username'] . "' WHERE config_name='username'";
        $query1 = $db->getQuery($query1);
        $query2 = "UPDATE config SET config_value='" . $_POST['password'] . "' WHERE config_name='password'";
        $query2 = $db->getQuery($query2);
        $query3 = "UPDATE config SET config_value='" . $_POST['nr_swiata'] . "' WHERE config_name='nr_swiata'";
        $query3 = $db->getQuery($query3);
    }

    private function set_bot_on()
    {
        global $db;

        $query = "UPDATE config SET config_value='" . $_POST['bot_on'] . "' WHERE config_name='bot_on'";
        $query = $db->getQuery($query);
    }

    private function get_id_glownej_wioski()
    {
        global $db;
        $query = "SELECT * FROM config WHERE config_name='id_glownej_wioski'";
        $query = $db->getQuery($query);
        $wynik = $query->fetch(PDO::FETCH_BOTH);
        $this->html = json_encode(array('id_glownej_wioski' => $wynik['config_value']));

    }

    private function set_id_glownej_wioski()
    {
        global $db;

        $query = "UPDATE config SET config_value='" . $_POST['id_glownej_wioski'] . "' WHERE config_name='id_glownej_wioski'";
        $query = $db->getQuery($query);
    }

    private function get_wszystkie_wioski()
    {
        global $db;
        $query = "SELECT * FROM lista_wiosek";
        $query = $db->getQuery($query);
        $lista = '';

        while ($wynik = $query->fetch(PDO::FETCH_BOTH)) {
            $lista .= $wynik['id'] . "," . $wynik['id_wioski'] . "," . $wynik['nazwa'] . "," . $wynik['x'] . "," . $wynik['y'] . "@";
        }
        $this->html = json_encode(array("lista_wiosek" => $lista));
    }


    private function del_all_wioski()
    {
        global $db;
        $query = "TRUNCATE TABLE lista_wiosek;";
        $query = $db->getQuery($query);
        $query = "TRUNCATE TABLE farma;";
        $query = $db->getQuery($query);
        $query = "TRUNCATE TABLE farma_wioski;";
        $query = $db->getQuery($query);
    }

    private function dodaj_wioski_auto()
    {
        global $db;
        $id_wioski = $_POST['id_wioski'];
        $nazwa = $_POST['nazwa'];
        $x = $_POST['x'];
        $y = $_POST['y'];

        $query = "SELECT * FROM lista_wiosek WHERE id_wioski = '" . $id_wioski . "'";
        $query = $db->getQuery($query);
        if (!$wynik = $query->fetch(PDO::FETCH_BOTH)) {
            $query = "INSERT INTO lista_wiosek (`id`, `id_wioski`, `nazwa`, `x`, `y`, `checked`, `ilosc_farmy`, `aktywna_farma`, `liczba_pol_farma`, `last_wsp_farma`, `array_wsp_farma`, `premium_on`, `max_cost_premium`, `min_surowcow`) VALUES ('', '" . $id_wioski . "', '" . $nazwa . "', '" . $x . "', '" . $y . "', '0', '0', '0', '0', '0', '0', '0', '0', '0')";
            $query = $db->getQuery($query);
        } else {
            $query = "UPDATE lista_wiosek SET nazwa='" . $nazwa . "' WHERE id_wioski='" . $id_wioski . "'";
            $query = $db->getQuery($query);
        }

        $query = "UPDATE lista_wiosek SET checked='1' WHERE id_wioski='" . $id_wioski . "'";
        $query = $db->getQuery($query);

    }

    private function set_wioski_no_checked()
    {
        global $db;
        $query = "UPDATE lista_wiosek SET checked='0'";
        $query = $db->getQuery($query);
    }

    private function usun_wioski_no_checked()
    {
        global $db;

        $query = "SELECT * FROM lista_wiosek WHERE checked='0'";
        $query = $db->getQuery($query);
        while ($wynik = $query->fetch(PDO::FETCH_BOTH)) {
            $query1 = "DELETE FROM farma WHERE id_wioski='" . $wynik['id'] . "'";
            $query1 = $db->getQuery($query1);
        }

        $query = "DELETE FROM lista_wiosek WHERE checked='0'";
        $query = $db->getQuery($query);
    }

    private function macierz_farmy()
    {
        global $db;
        $query = "SELECT * FROM lista_wiosek";
        $query = $db->getQuery($query);

        $id = '';
        $nazwy = '';
        $aktywna_farma = '';
        $ilosc_farmy = '';
        $liczba_pol_farma = '';

        while ($wynik = $query->fetch(PDO::FETCH_BOTH)) {
            $id .= $wynik['id'] . ",";
            $nazwy .= $wynik['nazwa'] . ",";
            $aktywna_farma .= $wynik['aktywna_farma'] . ",";
            $ilosc_farmy .= $wynik['ilosc_farmy'] . ",";
            $liczba_pol_farma .= $wynik['liczba_pol_farma'] . ",";
        }

        $id = substr($id, 0, -1);
        $nazwy = substr($nazwy, 0, -1);
        $aktywna_farma = substr($aktywna_farma, 0, -1);
        $ilosc_farmy = substr($ilosc_farmy, 0, -1);
        $liczba_pol_farma = substr($liczba_pol_farma, 0, -1);

        $lista = $id . '@' . $nazwy . '@' . $aktywna_farma . '@' . $ilosc_farmy . '@' . $liczba_pol_farma . '#';


        $farma = '';
        $query = "SELECT * FROM farma_wioski";
        $query = $db->getQuery($query);
        while ($wynik = $query->fetch(PDO::FETCH_BOTH)) {
            $farma .= $wynik['id'] . ',' . $wynik['x'] . ',' . $wynik['y'];

            $query1 = "SELECT * FROM lista_wiosek";
            $query1 = $db->getQuery($query1);
            while ($wynik1 = $query1->fetch(PDO::FETCH_BOTH)) {
                $query2 = "SELECT * FROM farma WHERE id_wioski='" . $wynik1['id'] . "' AND id_farma='" . $wynik['id'] . "'";
                $query2 = $db->getQuery($query2);
                if ($wynik2 = $query2->fetch(PDO::FETCH_BOTH)) {
                    $farma .= ',1';
                } else {
                    $farma .= ',0';
                }
            }
            $farma .= '@';

        }

        $farma = substr($farma, 0, -1);

        $lista .= $farma;

        $this->html = json_encode(array("macierz_farmy" => $lista));
    }

    private function add_wioska_farmy()
    {
        global $db;
        $wsp = explode("|", $_POST['wsp_farma']);
        $query = "SELECT * FROM farma_wioski WHERE x='" . $wsp[0] . "' AND y='" . $wsp[1] . "'";
        $query = $db->getQuery($query);
        if (!$wynik = $query->fetch(PDO::FETCH_BOTH)) {
            $query = "INSERT INTO farma_wioski (`id`, `x`, `y`) VALUES ('', '" . $wsp[0] . "', '" . $wsp[1] . "')";
            $query = $db->getQuery($query);
        }
    }

    private function usun_wioske_farmy()
    {
        global $db;
        $query4 = "DELETE FROM farma WHERE id_farma='" . $_POST['id_farma'] . "'";
        $query4 = $db->getQuery($query4);

        $query4 = "DELETE FROM farma_wioski WHERE id='" . $_POST['id_farma'] . "'";
        $query4 = $db->getQuery($query4);
    }

    private function aktualizacja_farmy()
    {
        global $db;

        $dane = explode("#", $_POST['aktualizacja_farmy']);

        $akt_farma = explode("@", $dane[0]);
        $ile_akt_farma = count($akt_farma);

        for ($i = 0; $i < $ile_akt_farma; $i++) {
            $aktywna_farma = explode(",", $akt_farma[$i]);
            $query = "UPDATE lista_wiosek SET aktywna_farma='" . $aktywna_farma[1] . "' WHERE id = '" . $aktywna_farma[0] . "'";
            $query = $db->getQuery($query);
        }

        $ile_farma = explode("@", $dane[1]);
        $count_ile_farma = count($ile_farma);

        for ($i = 0; $i < $count_ile_farma; $i++) {
            $ile_frm = explode(",", $ile_farma[$i]);
            $query = "UPDATE lista_wiosek SET ilosc_farmy='" . $ile_frm[1] . "' WHERE id = '" . $ile_frm[0] . "'";
            $query = $db->getQuery($query);
        }

        $liczba_pol_farma = explode("@", $dane[2]);
        $count_ile_pol_farma = count($liczba_pol_farma);

        for ($i = 0; $i < $count_ile_pol_farma; $i++) {
            $lp_pol_fama = explode(",", $liczba_pol_farma[$i]);
            $query = "UPDATE lista_wiosek SET liczba_pol_farma='" . $lp_pol_fama[1] . "' WHERE id = '" . $lp_pol_fama[0] . "'";
            $query = $db->getQuery($query);
        }

        $macierz = explode("@", $dane[3]);
        $count_macierz = count($macierz);

        for ($i = 0; $i < $count_macierz; $i++) {
            $macierz_farmy = explode(",", $macierz[$i]);

            if ($macierz_farmy[2] == '1') {
                $query2 = "SELECT * FROM farma WHERE id_wioski='" . $macierz_farmy[0] . "' AND id_farma='" . $macierz_farmy[1] . "'";
                $query2 = $db->getQuery($query2);
                if (!$wynik2 = $query2->fetch(PDO::FETCH_BOTH)) {
                    $query3 = "INSERT INTO farma (`id`, `id_wioski`, `id_farma`) VALUES ('', '" . $macierz_farmy[0] . "', '" . $macierz_farmy[1] . "')";
                    $query3 = $db->getQuery($query3);
                }
            } else {
                $query2 = "SELECT * FROM farma WHERE id_wioski='" . $macierz_farmy[0] . "' AND id_farma='" . $macierz_farmy[1] . "'";
                $query2 = $db->getQuery($query2);
                if ($wynik2 = $query2->fetch(PDO::FETCH_BOTH)) {
                    $query3 = "DELETE FROM farma WHERE id_wioski='" . $macierz_farmy[0] . "' AND id_farma='" . $macierz_farmy[1] . "'";
                    $query3 = $db->getQuery($query3);
                }
            }
        }

        $this->set_array_wsp_farma();

    }

    private function get_start_farma()
    {
        $lista_wiosekRepo = new lista_wiosekRepo();
        $arrayOfWioski = $lista_wiosekRepo->getAllWioski();

        $this->html = json_encode(array('listaWiosek' => $arrayOfWioski));

    }

    private function zapisz_last_wsp()
    {
        global $db;

        $query = "UPDATE lista_wiosek SET last_wsp_farma='" . $_POST['last_wsp'] . "' WHERE id_wioski = '" . $_POST['id_wioski'] . "'";
        $query = $db->getQuery($query);

    }

    private function ochrona_botowa_send_mail()
    {
        require 'phpmailer/class.phpmailer.php';

        $mail = new PHPMailer(true); //New instance, with exceptions enabled

        $body = "Ochrona botowa - wejdz na plemiona i zrob capatche!";

        $mail->IsSMTP();                           // tell the class to use SMTP
        $mail->SMTPAuth = true;                  // enable SMTP authentication
        $mail->Port = 465;                    // set the SMTP server port
        $mail->Host = "smtp.gmail.com"; // SMTP server
        $mail->Username = "marcin7848@gmail.com";     // SMTP server username
        $mail->Password = "KacZ987@KM";            // SMTP server password

        $mail->IsSendmail();  // tell the class to use Sendmail

        $mail->AddReplyTo("marcin7848@gmail.com", "First Last");

        $mail->From = "marcin7848@gmail.com";
        $mail->FromName = "Ochrona botowa!";

        $to = "marcin7848@gmail.com";

        $mail->AddAddress($to);

        $mail->Subject = "Ochrona botowa!";

        $mail->AltBody = ""; // optional, comment out and test
        $mail->WordWrap = 80; // set word wrap

        $mail->MsgHTML($body);

        $mail->IsHTML(false); // send as HTML

        $mail->Send();

    }

    private function get_time_sent_and_random()
    {
        global $db;

        $query = "SELECT * FROM config WHERE config_name='time_sent'";
        $query = $db->getQuery($query);
        $wynik = $query->fetch(PDO::FETCH_BOTH);
        $time_sent = $wynik['config_value'];

        $query = "SELECT * FROM config WHERE config_name='time_random_to_next_send'";
        $query = $db->getQuery($query);
        $wynik = $query->fetch(PDO::FETCH_BOTH);
        $time_random_to_next_send = $wynik['config_value'];

        $this->html = json_encode(array("time_sent" => $time_sent, "time_random_to_next_send" => $time_random_to_next_send));
    }

    private function set_time_sent_and_random()
    {
        global $db;

        $query = "UPDATE config SET config_value='" . $_POST['time_sent'] . "' WHERE config_name = 'time_sent'";
        $query = $db->getQuery($query);

        $query = "UPDATE config SET config_value='" . $_POST['time_random_to_next_send'] . "' WHERE config_name = 'time_random_to_next_send'";
        $query = $db->getQuery($query);
    }

    private function get_wsp_wiosek()
    {
        set_time_limit(0);
        global $db;

        $query = "SELECT * FROM config WHERE config_name='nr_swiata'";
        $query = $db->getQuery($query);
        $wynik = $query->fetch(PDO::FETCH_BOTH);
        $nr_swiata = $wynik['config_value'];


        $id_wiosek_barba = "";
        $query = "SELECT * FROM lista_wiosek";
        $query = $db->getQuery($query);

        while ($wynik = $query->fetch(PDO::FETCH_BOTH)) {
            $id = $wynik['id'];
            $id_wioski = $wynik['id_wioski'];
            $x = $wynik['x'];
            $y = $wynik['y'];
            $liczba_pol_farma = $wynik['liczba_pol_farma'];

            $x -= $liczba_pol_farma;
            $y -= $liczba_pol_farma;
            $poczatkowe_y = $y;

            $id_wiosek_barba .= $id . "," . $id_wioski . "@";

            for ($i = 0; $i <= $liczba_pol_farma * 2; $i++) {
                for ($j = 0; $j <= $liczba_pol_farma * 2; $j++) {

                    $curl = curl_init("http://pl.twstats.com/pl" . $nr_swiata . "/index.php?page=rankings&mode=villages");
                    curl_setopt($curl, CURLOPT_HEADER, 1);
                    curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER["HTTP_USER_AGENT"]);
                    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
                    curl_setopt($curl, CURLOPT_POST, true);
                    $postVars = array('x' => $x,
                        'y' => $y);
                    curl_setopt($curl, CURLOPT_POSTFIELDS, $postVars);

                    $dw = curl_exec($curl);

                    preg_match_all("/<tr class=\"r1\">(.*?)<td>(.*?)<\/td>(.*?)<td><a href=(.*?)>(.*?)<\/a><\/td>(.*?)<td>(.*?)<\/td>/s", $dw, $res);

                    if (!empty($res[2][0]) && !empty($res[7][0])) {
                        $id_farma = $res[2][0];
                        $owner = $res[7][0];

                        $id_wiosek_barba .= $id_farma . ",";
                    }
                    $y++;
                }
                $x++;
                $y = $poczatkowe_y;
            }
            $id_wiosek_barba = substr($id_wiosek_barba, 0, -1);
            $id_wiosek_barba .= "#";

        }

        $this->html = json_encode(array("wsp_wiosek" => $id_wiosek_barba));
    }

    private function set_wsp_barba()
    {
        global $db;

        $query = "TRUNCATE TABLE farma;";
        $query = $db->getQuery($query);
        $query = "TRUNCATE TABLE farma_wioski;";
        $query = $db->getQuery($query);

        $wioski_barba = explode("#", $_POST['wioski_barba']);
        $count_wioski_barba = count($wioski_barba);

        for ($i = 0; $i < $count_wioski_barba - 1; $i++) {
            $this_wioska = explode("@", $wioski_barba[$i]);
            $id = $this_wioska[0]; //id wioski w liscie wiosek

            $wsp_barba = explode(",", $this_wioska[1]);
            $count_wsp_barba = count($wsp_barba);
            for ($j = 0; $j < $count_wsp_barba; $j++) {
                $wsp = explode("|", $wsp_barba[$j]);
                $x = $wsp[0];
                $y = $wsp[1];

                $query = "SELECT * FROM farma_wioski WHERE x='" . $x . "' AND y='" . $y . "'";
                $query = $db->getQuery($query);
                if (!$wynik = $query->fetch(PDO::FETCH_BOTH)) {
                    $query = "INSERT INTO farma_wioski (`id`, `x`, `y`) VALUES ('', '" . $x . "', '" . $y . "')";
                    $query = $db->getQuery($query);
                }

                $query = "SELECT * FROM farma_wioski WHERE x='" . $x . "' AND y='" . $y . "'";
                $query = $db->getQuery($query);
                $wynik = $query->fetch(PDO::FETCH_BOTH);
                $id_barba = $wynik['id'];

                $query3 = "INSERT INTO farma (`id`, `id_wioski`, `id_farma`) VALUES ('', '" . $id . "', '" . $id_barba . "')";
                $query3 = $db->getQuery($query3);

            }

        }

        $this->set_array_wsp_farma();

    }

    private function attack_on_me()
    {
        require 'phpmailer/class.phpmailer.php';

        $mail = new PHPMailer(true); //New instance, with exceptions enabled

        $body = "Ktos cie atakuje w plemionach! Sprawdz to szybko!";

        $mail->IsSMTP();                           // tell the class to use SMTP
        $mail->SMTPAuth = true;                  // enable SMTP authentication
        $mail->Port = 465;                    // set the SMTP server port
        $mail->Host = "smtp.gmail.com"; // SMTP server
        $mail->Username = "marcin7848@gmail.com";     // SMTP server username
        $mail->Password = "KacZ987@KM";            // SMTP server password

        $mail->IsSendmail();  // tell the class to use Sendmail

        $mail->AddReplyTo("marcin7848@gmail.com", "First Last");

        $mail->From = "marcin7848@gmail.com";
        $mail->FromName = "Atak w plemionach!";

        $to = "marcin7848@gmail.com";

        $mail->AddAddress($to);

        $mail->Subject = "Atak w plemionach!";

        $mail->AltBody = ""; // optional, comment out and test
        $mail->WordWrap = 80; // set word wrap

        $mail->MsgHTML($body);

        $mail->IsHTML(false); // send as HTML

        $mail->Send();

    }


    private function get_time_bot_off()
    {
        global $db;
        $query = "SELECT * FROM config WHERE config_name='time_bot_off'";
        $query = $db->getQuery($query);
        $wynik = $query->fetch(PDO::FETCH_BOTH);
        $this->html = json_encode(array('time_bot_off' => $wynik['config_value']));

    }

    private function set_time_bot_off()
    {
        global $db;

        $query = "UPDATE config SET config_value='" . $_POST['time_bot_off'] . "' WHERE config_name='time_bot_off'";
        $query = $db->getQuery($query);
    }

    private function set_array_wsp_farma()
    {
        global $db;

        $lista_wiosekRepo = new lista_wiosekRepo();
        $arrayOfWioski = $lista_wiosekRepo->getAllWioski();
        for ($i = 0; $i < count($arrayOfWioski); $i++) {
            $id_wioski = $arrayOfWioski[$i]->id_wioski;
            $arrayOfFarma = $arrayOfWioski[$i]->arrayOfFarma;
            shuffle($arrayOfFarma);

            $newArrayOfFarma = '';
            for ($j = 0; $j < count($arrayOfFarma); $j++) {
                $x = $arrayOfFarma[$j]->x;
                $y = $arrayOfFarma[$j]->y;

                $wsp = $x . '|' . $y;

                $newArrayOfFarma .= $wsp . ',';
            }

            $newArrayOfFarma = substr($newArrayOfFarma, 0, -1);

            $query = "UPDATE lista_wiosek SET last_wsp_farma='0', array_wsp_farma ='" . $newArrayOfFarma . "' WHERE id_wioski='" . $id_wioski . "'";
            $db->getQuery($query);

        }
    }

    private function set_array_wsp_farma_one()
    {
        global $db;

        $lista_wiosekRepo = new lista_wiosekRepo();
        $arrayOfWioski = $lista_wiosekRepo->getWioska($_POST['id_wioski']);

        $id_wioski = $arrayOfWioski->id_wioski;
        $arrayOfFarma = $arrayOfWioski->arrayOfFarma;
        shuffle($arrayOfFarma);

        $newArrayOfFarma = '';
        for ($j = 0; $j < count($arrayOfFarma); $j++) {
            $x = $arrayOfFarma[$j]->x;
            $y = $arrayOfFarma[$j]->y;

            $wsp = $x . '|' . $y;

            $newArrayOfFarma .= $wsp . ',';
        }

        $newArrayOfFarma = substr($newArrayOfFarma, 0, -1);

        $query = "UPDATE lista_wiosek SET last_wsp_farma='0', array_wsp_farma ='" . $newArrayOfFarma . "' WHERE id_wioski='" . $id_wioski . "'";
        $db->getQuery($query);

        $arrayOfWioski = $lista_wiosekRepo->getWioska($_POST['id_wioski']);
        $array_wsp_farma = $arrayOfWioski->array_wsp_farma;

        $array_wsp_farma = explode(",", $array_wsp_farma);

        $this->html = json_encode(array('wsp_farma' => $array_wsp_farma[0]));
    }


    public function update_pp()
    {
        global $db;
        $wioski_pp = $_POST['wioski_pp'];


        for ($i = 0; $i < count($wioski_pp); $i++) {
            $id_wioski = $wioski_pp[$i]['id_wioski'];
            $premium_on = $wioski_pp[$i]['premium_on'];
            $max_cost_premium = $wioski_pp[$i]['max_cost_premium'];
            $min_surowcow = $wioski_pp[$i]['min_surowcow'];

            $query = "UPDATE lista_wiosek SET premium_on='" . $premium_on . "', max_cost_premium='" . $max_cost_premium . "', min_surowcow='" . $min_surowcow . "' WHERE id_wioski='" . $id_wioski . "'";
            $db->getQuery($query);

        }

    }


    private function get_wioski_premium()
    {
        $wioski_premium = new wioski_premiumRepo();
        $arrayOfWioski = $wioski_premium->getAllWioskiPremium();

        $this->html = json_encode(array('wioski_premium' => $arrayOfWioski));

    }

    private function usun_wioske_premium()
    {
        global $db;
        $query4 = "DELETE FROM wioski_premium WHERE id='" . $_POST['id_wioski_premium'] . "'";
        $db->getQuery($query4);

    }

    private function add_wioska_premium()
    {
        global $db;

        $query = "INSERT INTO wioski_premium (`id`, `nr_swiata`, `id_wioski`, `process`) VALUES ('', '" . $_POST['nr_swiata_premium'] . "', '" . $_POST['id_wioski_premium'] . "', '0')";
        $db->getQuery($query);

    }


    private function get_time_wioski_premium()
    {
        global $db;
        $query = "SELECT * FROM config WHERE config_name='time_wioski_premium'";
        $query = $db->getQuery($query);
        $wynik = $query->fetch(PDO::FETCH_BOTH);
        $this->html = json_encode(array('time_wioski_premium' => $wynik['config_value']));

    }

    private function set_time_wioski_premium()
    {
        global $db;

        $query = "UPDATE config SET config_value='" . $_POST['time_wioski_premium'] . "' WHERE config_name='time_wioski_premium'";
        $query = $db->getQuery($query);
    }

    private function set_premium_process()
    {
        global $db;
        $query = "UPDATE wioski_premium SET process='" . $_POST['premium_process'] . "' WHERE id='" . $_POST['premium_id'] . "'";
        $db->getQuery($query);
    }

}