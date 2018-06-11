$(function(){
    waitForDefaultParams = 0;

    function getDefaultParamsTrue(){
        if(waitForDefaultParams != 1){
            setTimeout(function(){getDefaultParamsTrue();}, 100);
        }else{
            var bot_on = localStorage.getItem('bot_on');
            var username = localStorage.getItem('username');
            var password = localStorage.getItem('password');
            var nr_swiata = localStorage.getItem('nr_swiata');
            var id_glownej_wioski = localStorage.getItem('id_glownej_wioski');



            $(document).on("click", "#lista_wiosek", function(){
                show_lista_wiosek();
            });


            $(document).on("click", "#usun_wszystkie_wioski", function(){
                usun_wszystkie_wioski();
            });

            $(document).on("click", "#dodaj_wioski_auto", function(){
                dodaj_wioski_auto();
            });

            $(document).on("click", "#farma", function(){
                show_farma();
            });

            $(document).on("click", "#dodaj_wioske_farmy", function(){
                dodaj_wioske_farmy();
            });

            for(var j=0; j < 250; j++)
            {
                $(document).on("click", "#farma_usun_"+j, function(){
                    usun_wioske_farmy($(this).attr("id_farma"));
                });
            }

            $(document).on("click", "#aktualizacja_farmy", function(){
                aktualizacja_farmy();
            });

            $(document).on("click", "#auto_dodaj_farma", function(){
                auto_dodaj_farma();
            });


            $(document).on("click", "#premium_points", function(){
                show_premium_points();
            });

            $(document).on("click", "#update_pp", function(){
                update_pp();
            });

            $(document).on("click", "#wioski_premium", function(){
                show_wioski_premium();
            });

            for(var k=0; k < 150; k++)
            {
                $(document).on("click", "#delete_wioska_pp_"+k, function(){
                    usun_wioske_premium($(this).attr("id_wioski_premium"));
                });
            }

            $(document).on("click", "#dodaj_wioske_premium", function(){
                dodaj_wioske_premium();
            });

        }
    }
    setTimeout(function(){getDefaultParamsTrue();}, 5);

});

function show_lista_wiosek()
{
    $(".board").empty();

    var html_wioski = "<div class='div_center'><input type='submit' id='usun_wszystkie_wioski' value='Usun wszystkie wioski!' /><br /><input type='submit' id='dodaj_wioski_auto' value='Automatycznie dodaj twoje wioski!' /></div>";

    $.ajax({
        type: 'GET',
        url: 'http://localhost/plemiona/index.php?jsconnect&get_wszystkie_wioski',
        complete: function (response) {
            var jsonResponse = JSON.parse(response.responseText);
            var dane = jsonResponse.lista_wiosek;

            var wioski = dane.split('@');
            var wioski_length = wioski.length-1;
            html_wioski += "<tr align='center'><td>ID</td><td>ID wioski</td><td>Nazwa</td><td>Wspolrzedne</td></tr>";

            function show_wszytkie_wioski(i, wioski, wioski_length)
            {
                if(i<wioski_length)
                {
                    var this_wioska = wioski[i].split(',');
                    var id = this_wioska[0];
                    var id_wioski = this_wioska[1];
                    var nazwa = this_wioska[2];
                    var wsp = this_wioska[3]+"|"+this_wioska[4];
                    html_wioski += "<tr align='center'><td>"+id+"</td><td>"+id_wioski+"</td><td>"+nazwa+"</td><td>"+wsp+"</td></tr>";

                    i++;
                    show_wszytkie_wioski(i, wioski, wioski_length);
                }
                else
                {
                    $(".board").append("<table cellpadding='3' border='2' align='center'>"+html_wioski+"</table>");
                }
            }

            setTimeout(function(){ show_wszytkie_wioski(0, wioski, wioski_length); }, 0);


        }
    });
}

function usun_wszystkie_wioski()
{
    $.ajax({
        type: 'GET',
        url: 'http://localhost/plemiona/index.php?jsconnect&del_all_wioski',
        complete: function (response) {
            show_lista_wiosek();
            show_error("Usunieto wszystkie wioski!");
        }
    });
}


function dodaj_wioski_auto()
{
    show_error("Poczekaj, az aktualizacja sie zakonczy!", 20000);

    $.ajax({
        type: 'GET',
        url: 'http://localhost/plemiona/index.php?jsconnect&set_wioski_no_checked'
    });

    $.ajax({
        type: 'GET',
        url: "https://pl"+localStorage.getItem('nr_swiata')+".plemiona.pl/game.php?village="+localStorage.getItem('id_glownej_wioski')+"&screen=info_player",
        complete: function (response) {
            var dane = response.responseText;
            var reg = new RegExp('<a href=\\"\\/game.php\\?village='+localStorage.getItem('id_glownej_wioski')+'\\&amp\\;screen=info_village\\&amp\\;id=(.*?)\\">', "g");
            var myArray;
            var wioseczki = new Array();


            function getListOfIDWiosek(){
                if((myArray = reg.exec(dane)) !== null){
                    var id_wioski = myArray[1];
                    wioseczki.push(id_wioski);
                    setTimeout(function(){getListOfIDWiosek();}, 5);
                }
                else{
                    setTimeout(function(){
                        var i = 0;
                        dodaj_wioski_auto_take(wioseczki, i);
                    }, 10);
                }

            }

            setTimeout(function(){getListOfIDWiosek();}, 1);

        }
    });


}

function dodaj_wioski_auto_take(arrayOfIdWiosek, i){
    if(arrayOfIdWiosek.length > i)
    {
        var id_wioski = arrayOfIdWiosek[i];

        $.ajax({
            type: 'GET',
            url: "https://pl"+localStorage.getItem('nr_swiata')+".plemiona.pl/game.php?village="+localStorage.getItem('id_glownej_wioski')+"&screen=info_village&id="+id_wioski,
            complete: function (response) {
                var dane2 = response.responseText;

                var reg2 = new RegExp('<h2>(.*?)<\\/h2>', "g");
                var myArray2;
                myArray2 = reg2.exec(dane2);

                var reg3 = new RegExp('<\\/td><td>(.*?)\\|(.*?)<\\/td>', "g");
                var myArray3;
                myArray3 = reg3.exec(dane2);

                var reg4 = new RegExp('EmbeddedMap\\((.*?), (.*?), (.*?), (.*?), (.*?)\\)', "g");
                var myArray4;
                myArray4 = reg4.exec(dane2);

                var nazwa = myArray2[1];
                var x = myArray3[1];
                var y = myArray3[2];

                var id_wioski2 = myArray4[5];

                $.ajax({
                    type: 'POST',
                    url: 'http://localhost/plemiona/index.php?jsconnect&dodaj_wioski_auto',
                    data: {'id_wioski':id_wioski2, 'nazwa':nazwa,'x':x,'y':y},
                    complete: function (response) {
                        i++;
                        dodaj_wioski_auto_take(arrayOfIdWiosek, i);
                    }
                });

            }
        });

    }else{
        $.ajax({
            type: 'GET',
            url: 'http://localhost/plemiona/index.php?jsconnect&usun_wioski_no_checked',
            complete: function (response) {
                show_lista_wiosek();
                show_error("Poprawnie dodano wszystkie wioski automatycznie!");
            }
        });
    }
}

function show_farma()
{
    $(".board").empty();

    var macierz = "";


    $.ajax({
        type: 'GET',
        url: 'http://localhost/plemiona/index.php?jsconnect&macierz_farmy',
        complete: function (response) {

            var jsonResponse = JSON.parse(response.responseText);
            var dane = jsonResponse.macierz_farmy;

            var arr = dane.split('#');
            var zm = arr[0];

            var dane2 = zm.split('@');
            var id_wioski = dane2[0].split(',');
            var dane2_length = dane2.length;
            for(var i=1; i < dane2_length; i++)
            {
                macierz += "<tr align='center'>";
                if(i == 1)
                {
                    macierz += "<td></td>";
                }
                else if(i == 2)
                {
                    macierz += "<td>Aktywna farma:</td>";
                }
                else if(i == 3)
                {
                    macierz += "<td>Ilosc farmy LK:</td>";
                }
                else if(i == 4)
                {
                    macierz += "<td>Liczba pol farmy:</td>";
                }
                var dane3 = dane2[i].split(',');
                var dane3_length = dane3.length;

                for(var j=0; j < dane3_length; j++)
                {
                    if(i == 1)
                    {
                        macierz += "<td>"+dane3[j]+"</td>";
                    }
                    else if(i == 2)
                    {
                        var a = "";
                        if(dane3[j] == 1)
                        {
                            a = "checked";
                        }
                        macierz += "<td><input type='checkbox' id='akt_farma_"+id_wioski[j]+"' name='aktywna_farma' "+a+"></td>";
                    }
                    else if(i == 3)
                    {
                        macierz += "<td><input type='text' align='center' id='il_farma_"+id_wioski[j]+"' name='farma' maxlength='5' size='1' value='"+dane3[j]+"'></td>";
                    }
                    else if(i == 4)
                    {
                        macierz += "<td><input type='text' align='center' id='liczba_pol_farma_"+id_wioski[j]+"' name='liczba_pol_farma' maxlength='5' size='1' value='"+dane3[j]+"'></td>";
                    }
                }
                if(i == 1)
                {
                    macierz += "<td>Usun</td>";
                }
                else
                {
                    macierz += "<td></td>";
                }
                macierz += "</tr>";
            }

            var zm2 = arr[1];

            var dane4 = zm2.split('@');
            var dane4_length = dane4.length;

            var waitFormacierz = 0;



            for(var i=0; i < dane4_length; i++)
            {
                macierz += "<tr align='center'>";

                var dane5 = dane4[i].split(',');
                var dane5_length = dane5.length;

                for(var j=1; j < dane5_length; j++)
                {
                    if(j==1)
                    {
                        macierz += "<td>"+dane5[j]+"|"+dane5[j+1]+"</td>";
                        j++;
                    }
                    else
                    {
                        var a = "";
                        if(dane5[j] == 1)
                        {
                            a = "checked";
                        }
                        macierz += "<td><input type='checkbox' id='farma_check_"+id_wioski[j-3]+"_"+dane5[0]+"' name='farma_check' "+a+"></td>";
                    }

                    if(i+1 == dane4_length && j+1 == dane5_length){
                        waitFormacierz = 1;
                    }
                }
                macierz += "<td><input type='submit' id='farma_usun_"+i+"' id_farma='"+dane5[0]+"' value='Usun'></td>";
                macierz += "</tr>";
            }

            function showMacierzFarma(){
                if(waitFormacierz != 1 && dane4_length > 1){
                    setTimeout(function(){showMacierzFarma();}, 5);
                }
                else{
                    $(".board").append("<div class='div_center'>Podaj wspolrzedne: <input type='text' id='wsp_farma' value='' size='5' maxlength='10'>" +
                        "<input type='submit' id='dodaj_wioske_farmy' value='Dodaj wioske farmy!'><br /><br />" +
                        "<input type='submit' id='auto_dodaj_farma' value='Automatycznie dodaj farmy (po ilosci pol)'><br /><br />" +
                        "<input type='submit' id='aktualizacja_farmy' value='Aktualizuj'><br />" +
                        "<table cellpadding='3' border='2' align='center'>"+macierz+"</table></div>");
                }
            }

            setTimeout(function(){showMacierzFarma();}, 1);
        }
    });
}

function dodaj_wioske_farmy()
{
    $.ajax({
        type: 'POST',
        url: 'http://localhost/plemiona/index.php?jsconnect&add_wioska_farmy',
        data: {'wsp_farma':$("#wsp_farma").prop('value')},
        complete: function (response) {
            show_farma();
            show_error("Poprawnie dodano wioskę farmy!");
        }
    });
}

function usun_wioske_farmy(id_farma)
{
    $.ajax({
        type: 'POST',
        url: 'http://localhost/plemiona/index.php?jsconnect&usun_wioske_farmy',
        data: {'id_farma':id_farma},
        complete: function (response) {
            show_farma();
            show_error("Usunieto wioske farmy!");
        }
    });
}

function aktualizacja_farmy()
{
    show_error("Czekaj az proces aktualizacji sie skonczy! Nie przeladowuj strony!", 300000);
    var dane = "";
    var dane2 = "";
    var dane3 = "";

    for(var i=1; i<250; i++)
    {
        if(document.getElementById('akt_farma_'+i))
        {
            if($("#akt_farma_"+i).is(":checked") == true)
            {
                dane += i+",1@";
            }
            else
            {
                dane += i+",0@";
            }
        }

        if(document.getElementById('il_farma_'+i))
        {
            dane2 += i+","+$("#il_farma_"+i).prop('value')+"@";
        }

        if(document.getElementById('liczba_pol_farma_'+i))
        {
            dane3 += i+","+$("#liczba_pol_farma_"+i).prop('value')+"@";
        }
    }

    dane=dane.substr(0,dane.length-1);
    dane2=dane2.substr(0,dane2.length-1);
    dane3=dane3.substr(0,dane3.length-1);
    dane += "#";
    dane += dane2;
    dane += "#";
    dane += dane3;
    dane += "#";

    var waitForGetAllFarma = 0;

    for(var i=1; i<50; i++)
    {
        for(var j=1; j<250; j++)
        {
            if($("#farma_check_"+i+"_"+j).length)
            {
                if($("#farma_check_"+i+"_"+j).is(":checked") == true)
                {
                    dane += i+","+j+",1@";
                }
                else
                {
                    dane += i+","+j+",0@";
                }
            }
            if(i+1 == 50 && j+1 == 250){
                waitForGetAllFarma = 1;
            }
        }
    }

    function finishAntualizacja(){
        if(waitForGetAllFarma != 1){
            setTimeout(function(){finishAntualizacja();}, 5);
        }
        else{
            dane=dane.substr(0,dane.length-1);

            $.ajax({
                type: 'POST',
                url: 'http://localhost/plemiona/index.php?jsconnect&aktualizacja_farmy',
                data: {'aktualizacja_farmy':dane},
                complete: function (response) {
                    show_farma();
                    show_error("Poprawnie zaktualizowano farme!");
                }
            });

        }
    }

    setTimeout(function(){finishAntualizacja();}, 1);
}

function auto_dodaj_farma()
{
    show_error("Czekaj az wszystkie wioski farmy sie pobiora! Nie przeladowuj strony! Pamietaj, by aktualizowac to z wylaczonym botem!", 10000000);


    $.ajax({
        type: 'GET',
        url: 'http://localhost/plemiona/index.php?jsconnect&get_wsp_wiosek',
        complete: function (response) {

            var jsonResponse = JSON.parse(response.responseText);
            var dane = jsonResponse.wsp_wiosek;
            var arr = dane.split('#');
            var arr_length = arr.length-1;

            var wioski_barba = "";

            function get_wioski_auto(arr, arr_length, i, wioski_barba)
            {
                if(i<arr_length)
                {
                    var tab = arr[i].split('@');
                    var tab_length = tab.length;

                    var base = tab[0].split(',');
                    var id = base[0];
                    var id_wioski = base[1];

                    wioski_barba += id+"@";
                    var base2 = tab[1].split(',');
                    var base2_length = base2.length;

                    setTimeout(function() { check_czy_barba(0, base2, base2_length, arr, arr_length, i, wioski_barba); }, 0);
                }
                else
                {
                    $.ajax({
                        type: 'POST',
                        url: 'http://localhost/plemiona/index.php?jsconnect&set_wsp_barba',
                        data: {'wioski_barba':wioski_barba},
                        complete: function (response) {
                            show_error("Poprawnie dodano wszystkie wioski barba!");
                            show_farma();
                        }
                    });
                }
            }

            function check_czy_barba(j, base2, base2_length, arr, arr_length, i, wioski_barba)
            {
                if(j < base2_length)
                {
                    var id_wioski_check = base2[j];

                    $.ajax({
                        type: 'GET',
                        url: "https://pl"+localStorage.getItem('nr_swiata')+".plemiona.pl/game.php?village="+localStorage.getItem('id_glownej_wioski')+"&screen=info_village&id="+id_wioski_check,
                        complete: function (response) {
                            var jsonRsponse = response.responseText;

                            var reg1 = new RegExp('dne\\:<\\/td><td>(.*?)<\\/td>', "gi");
                            var myArray;
                            if(myArray = reg1.exec(jsonRsponse))
                            {
                                var reg = new RegExp("Osada koczownik","gi");
                                var reg2 = new RegExp("Wioska barbarzy","gi");
                                if(reg.test(jsonRsponse) || reg2.test(jsonRsponse))
                                {
                                    wioski_barba += myArray[1]+",";
                                }
                            }
                            j++;
                            setTimeout(function() { check_czy_barba(j, base2, base2_length, arr, arr_length, i, wioski_barba); }, 10);

                        }
                    });
                }
                else
                {
                    wioski_barba=wioski_barba.substr(0,wioski_barba.length-1);
                    wioski_barba += "#";
                    i++;
                    setTimeout(function() { get_wioski_auto(arr, arr_length, i, wioski_barba); }, 0);
                }
            }

            setTimeout(function() { get_wioski_auto(arr, arr_length, 0, wioski_barba); }, 0);
        }
    });
}


function show_premium_points()
{
    $(".board").empty();

    var html_wioski = "<div class='div_center'><input type='submit' id='update_pp' value='Aktualizuj' /><br /></div>";
    html_wioski += "<tr><td>Nazwa wioski</td><td>Aktywna sprzedaż pp</td><td>Max koszt za 1 pp(0-unlimited)</td><td>Min surowców(musi zostać)</td></tr>";

    $.ajax({
        type: 'GET',
        url: 'http://localhost/plemiona/index.php?jsconnect&get_start_farma',
        complete: function (response) {
            var jsonResponse = JSON.parse(response.responseText);
            var wioski = jsonResponse.listaWiosek;
            for(var i=0; i<wioski.length;i++){
                var id_wioski = wioski[i].id_wioski;
                var nazwa_wioski = wioski[i].nazwa;
                var premium_on = wioski[i].premium_on;
                var max_cost_premium = wioski[i].max_cost_premium;
                var min_surowcow = wioski[i].min_surowcow;
                var a = '';
                if(premium_on == '1'){
                    a = 'checked';
                }
                html_wioski += "<tr><td>"+nazwa_wioski+"</td>"+
                    "<td><input type='checkbox' id='premiumon_"+id_wioski+"' "+a+"></td>"+
                    "<td><input type='text' id='maxcostpremium_"+id_wioski+"' size='5' maxlength='6' value='"+max_cost_premium+"'></td>"+
                    "<td><input type='text' id='minsurowcow_"+id_wioski+"' size='5' maxlength='6' value='"+min_surowcow+"'></td></tr>";

            }
            $(".board").append("<table cellpadding='3' border='2' style='text-align: center; font-size: 13px' align='center'>"+html_wioski+"</table>");

        }
    });
}

function update_pp(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost/plemiona/index.php?jsconnect&get_start_farma',
        complete: function (response) {
            var arrayOfPremium = new Array();
            var jsonResponse = JSON.parse(response.responseText);
            var wioski = jsonResponse.listaWiosek;
            for(var i=0; i<wioski.length;i++){
                var id_wioski = wioski[i].id_wioski;

                var obj = new Object();
                obj.id_wioski = id_wioski;


                if($("#premiumon_"+id_wioski).is(":checked") == true)
                {
                    obj.premium_on = 1;
                }
                else
                {
                    obj.premium_on = 0;
                }

                obj.max_cost_premium = $("#maxcostpremium_"+id_wioski).prop('value');

                obj.min_surowcow = $("#minsurowcow_"+id_wioski).prop('value');

                var jsonString= obj;
                arrayOfPremium[i] = jsonString;
            }

            $.ajax({
                type: 'POST',
                url: 'http://localhost/plemiona/index.php?jsconnect&update_pp',
                data: {'wioski_pp':arrayOfPremium},
                complete: function (response) {
                    show_premium_points();
                    show_error("Poprawnie zaktualizowano premium!");
                }
            });
        }
    });
}


function show_wioski_premium(){
    $(".board").empty();

    var html_wioski = "<div class='div_center'>" +
        "Nr swiata: <input type='text' id='nr_swiata_premium' value='' size='6' maxlength='3' /><br />" +
        "ID wioski: <input type='text' id='id_wioski_premium' value='' size='6' maxlength='6' /><br />" +
        "<input type='submit' id='dodaj_wioske_premium' value='Dodaj wioske premium' /><br /><br />" +
        "</div>";

    html_wioski += "<tr><td>Nr swiata</td><td>ID wioski</td><td>Process</td><td>Usun</td></tr>";

    $.ajax({
        type: 'GET',
        url: 'http://localhost/plemiona/index.php?jsconnect&get_wioski_premium',
        complete: function (response) {
            var jsonResponse = JSON.parse(response.responseText);
            var wioski_premium = jsonResponse.wioski_premium;
            for(var i=0; i<wioski_premium.length;i++){
                var id = wioski_premium[i].id;
                var nr_swiata = wioski_premium[i].nr_swiata;
                var id_wioski = wioski_premium[i].id_wioski;
                var process = wioski_premium[i].process;


                html_wioski += "<tr><td>"+nr_swiata+"</td>"+
                    "<td>"+id_wioski+"</td>"+
                    "<td>"+process+"</td>"+
                    "<td><input type='submit' id='delete_wioska_pp_"+i+"' id_wioski_premium='"+id+"' value='Usun'></tr>";

            }
            $(".board").append("<table cellpadding='3' border='2' style='text-align: center; font-size: 13px' align='center'>"+html_wioski+"</table>");

        }
    });
}

function usun_wioske_premium(id_wioski_premium){
    $.ajax({
        type: 'POST',
        url: 'http://localhost/plemiona/index.php?jsconnect&usun_wioske_premium',
        data: {'id_wioski_premium':id_wioski_premium},
        complete: function (response) {
            show_wioski_premium();
            show_error("Usunieto wioske premium!");
        }
    });
}

function dodaj_wioske_premium()
{
    $.ajax({
        type: 'POST',
        url: 'http://localhost/plemiona/index.php?jsconnect&add_wioska_premium',
        data: {'nr_swiata_premium':$("#nr_swiata_premium").prop('value'), 'id_wioski_premium':$("#id_wioski_premium").prop('value')},
        complete: function (response) {
            show_wioski_premium();
            show_error("Poprawnie dodano wioskę premium!");
        }
    });
}

