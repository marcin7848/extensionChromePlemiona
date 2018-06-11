function premium_points(tabId) {
    if (localStorage.getItem('premium_points_process') == null) {
        localStorage.setItem('premium_points_process', '0');
    }
    if (localStorage.getItem('processPremium') == null) {
        localStorage.setItem('processPremium', '0');
    }

    if (localStorage.getItem('premium_points_process') == '0') {
        setTimeout(function () {
            getWioskiDane(tabId);
        }, 1);
    }

}
var processPremium = 0;

function getWioskiDane(tabId) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost/plemiona/index.php?jsconnect&get_start_farma',
        complete: function (response) {
            var jsonResponse = JSON.parse(response.responseText);
            getPP(tabId, 0, jsonResponse.listaWiosek);
        }
    });
}

function getPP(tabId, i, listaWiosek) {
    processPremium = localStorage.getItem('processPremium');
    if (processPremium == '0') { //sprawdzenie, czy dana wioska ma aktywowaną sprzedaż surowców
        if (i < listaWiosek.length) {
            var premium_on = listaWiosek[i].premium_on;
            if (premium_on == 1) {
                var id_wioski = listaWiosek[i].id_wioski;
                localStorage.setItem('processPremium', '1');
                localStorage.setItem('processPremium_i', i);
                chrome.tabs.update(tabId, {url: "https://pl" + nr_swiata + ".plemiona.pl/game.php?village=" + id_wioski + "&screen=market&mode=exchange"});
            }
            else {
                i++;
                localStorage.setItem('processPremium', '0');
                getPP(tabId, i, listaWiosek);
            }
        }
        else {
            var id_wioski = listaWiosek[0].id_wioski;
            localStorage.setItem('processPremium', '0');
            localStorage.setItem('premium_points_process', '1');
            chrome.tabs.update(tabId, {url: "https://pl" + nr_swiata + ".plemiona.pl/game.php?village=" + id_wioski + "&screen=overview"});

        }
    }


    if (processPremium == '1') {
        start_check_pp(tabId, "wood" , listaWiosek);
    }

    if (processPremium == '2'){
        start_check_pp(tabId, "stone" , listaWiosek);
    }
    if (processPremium == '3'){
        start_check_pp(tabId, "iron" , listaWiosek);
    }
}

function start_check_pp(tabId, nazwa_surowca , listaWiosek){
    var i = localStorage.getItem('processPremium_i');
    var max_cost_premium = listaWiosek[i].max_cost_premium;

    if (max_cost_premium == 0) {
        max_cost_premium = 100000000;
    }

    chrome.tabs.executeScript(tabId, {file: "js/jquery-3.2.1.js"}, function () {
        var reg = new RegExp('alt=\\"\\"> (.*?)<\\/div>', "g");
        chrome.tabs.executeScript(
            tabId, {
                code: 'function test(){var myArray; myArray = ' + reg + '.exec($("#premium_exchange_rate_'+nazwa_surowca+'").html());var kurs = myArray[1]; return kurs;} test();'
            },
            function (result_kurs) {
                if (parseInt(result_kurs) <= max_cost_premium) {
                    sell_pp(tabId, nazwa_surowca, listaWiosek);
                }
                else {
                    var processPremiumINT = parseInt(processPremium);
                    processPremiumINT += 1;
                    if(processPremiumINT == 4){
                        localStorage.setItem('processPremium', '0');
                        i++;
                        setTimeout(function () {getPP(tabId, i, listaWiosek);}, 100);
                    }
                    else{
                        localStorage.setItem('processPremium', processPremiumINT);
                        chrome.tabs.executeScript(tabId, {
                            code: "setTimeout(function () {location.reload();}, 1000);"
                        });
                    }
                }

            });
    });
}


function sell_pp(tabId, nazwa_surowca, listaWiosek) {
    var i = localStorage.getItem('processPremium_i');
    chrome.tabs.executeScript(tabId, {file: "js/jquery-3.2.1.js"}, function () {

        var getAllParams = 0;
        var kurs = 0;
        var stan = 0;
        var pojemnosc = 0;
        var w_spichlerzu = 0;
        var ilosc_kupcow = 0;

        var min_surowcow_musi_zostac = listaWiosek[i].min_surowcow;
        var max_do_sprzedania = 0;

        var reg = new RegExp('alt=\\"\\"> (.*?)<\\/div>', "g");
        chrome.tabs.executeScript(
            tabId, {
                code: 'function test(){var myArray; myArray = ' + reg + '.exec($("#premium_exchange_rate_' + nazwa_surowca + '").html());var kurs_wood = myArray[1]; return kurs_wood;} test();'
            },
            function (result_kurs) {
                kurs = parseInt(result_kurs);

                chrome.tabs.executeScript(
                    tabId, {
                        code: 'function test(){return $("#premium_exchange_stock_' + nazwa_surowca + '").text();} test();'
                    },
                    function (result_stan) {
                        stan = parseInt(result_stan);

                        chrome.tabs.executeScript(
                            tabId, {
                                code: 'function test(){return $("#premium_exchange_capacity_' + nazwa_surowca + '").text();} test();'
                            },
                            function (result_pojemnosc) {
                                pojemnosc = parseInt(result_pojemnosc);

                                chrome.tabs.executeScript(
                                    tabId, {
                                        code: 'function test(){return $("#' + nazwa_surowca + '").text();} test();'
                                    },
                                    function (result_ilosc_w_spichlerzu) {
                                        w_spichlerzu = parseInt(result_ilosc_w_spichlerzu);

                                        max_do_sprzedania = w_spichlerzu - min_surowcow_musi_zostac;

                                        chrome.tabs.executeScript(
                                            tabId, {
                                                code: 'function test(){return $("#market_merchant_available_count").text();} test();'
                                            },
                                            function (result_ilosc_kupcow) {
                                                ilosc_kupcow = parseInt(result_ilosc_kupcow);

                                                getAllParams = 1;

                                            });

                                    });

                            });

                    });

            });

        function waitForAllParams(){
            if(getAllParams == 0){
                setTimeout(function () {
                    waitForAllParams();
                }, 100);
            }else{
                if((stan < pojemnosc) && (max_do_sprzedania > 0)){
                    var do_sprzedania;
                    for(do_sprzedania=0; do_sprzedania <= max_do_sprzedania; do_sprzedania+=kurs){}
                    do_sprzedania -= kurs;

                    if(do_sprzedania >= pojemnosc-stan){
                        do_sprzedania = pojemnosc-stan;
                    }

                    max_do_sprzedania  = do_sprzedania;

                    if(max_do_sprzedania > 0) {
                        chrome.tabs.executeScript(
                            tabId, {
                                code: '$("input[name=sell_' + nazwa_surowca + ']").prop("value", ' + do_sprzedania + ');'
                            },
                            function (result) {
                                chrome.tabs.executeScript(
                                    tabId, {
                                        code: '$("input[value*=Kalkuluj]").click();'
                                    },
                                    function (results) {
                                        var reg2 = new RegExp('Potrzebujesz kupc(.*?)\\: (.*?)<', "g");
                                        setTimeout(function () {
                                            chrome.tabs.executeScript(
                                                tabId, {
                                                    code: "var myArray; var html = document.getElementsByTagName('html')[0].innerHTML; myArray = " + reg2 + ".exec(html); var ilosc_potrzebnych_kupcow = myArray[2]; function test(){return ilosc_potrzebnych_kupcow;} test();"
                                                },
                                                function (result_ilosc_potrzebnych_kupcow) {
                                                    var ilosc_potrzebnych_kupcow = parseInt(result_ilosc_potrzebnych_kupcow);
                                                    if (ilosc_kupcow - ilosc_potrzebnych_kupcow >= 0) {
                                                        chrome.tabs.executeScript(
                                                            tabId, {
                                                                code: '$(".btn.evt-confirm-btn.btn-confirm-yes").click();'
                                                            },
                                                            function (results) {
                                                                var processPremiumINT = parseInt(processPremium);
                                                                processPremiumINT += 1;
                                                                if (processPremiumINT == 4) {
                                                                    localStorage.setItem('processPremium', '0');
                                                                    i++;
                                                                    setTimeout(function () {
                                                                        getPP(tabId, i, listaWiosek);
                                                                    }, 100);
                                                                }
                                                                else {
                                                                    localStorage.setItem('processPremium', processPremiumINT);
                                                                    chrome.tabs.executeScript(tabId, {
                                                                        code: "setTimeout(function () {location.reload();}, 1000);"
                                                                    });
                                                                }
                                                            });
                                                    }
                                                    else {
                                                        chrome.tabs.executeScript(tabId, {
                                                            code: "$('.btn.evt-cancel-btn.btn-confirm-no').click();"
                                                        });
                                                        max_do_sprzedania -= kurs;
                                                        waitForAllParams();
                                                    }
                                                });
                                        }, 1000);


                                    });

                            });
                    }
                    else{
                        var processPremiumINT = parseInt(processPremium);
                        processPremiumINT += 1;
                        if(processPremiumINT == 4){
                            localStorage.setItem('processPremium', '0');
                            i++;
                            setTimeout(function () {getPP(tabId, i, listaWiosek);}, 100);
                        }
                        else{
                            localStorage.setItem('processPremium', processPremiumINT);
                            chrome.tabs.executeScript(tabId, {
                                code: "setTimeout(function () {location.reload();}, 1000);"
                            });
                        }
                    }
                }
                else{
                    var processPremiumINT = parseInt(processPremium);
                    processPremiumINT += 1;
                    if(processPremiumINT == 4){
                        localStorage.setItem('processPremium', '0');
                        i++;
                        setTimeout(function () {getPP(tabId, i, listaWiosek);}, 100);
                    }
                    else{
                        localStorage.setItem('processPremium', processPremiumINT);
                        chrome.tabs.executeScript(tabId, {
                            code: "setTimeout(function () {location.reload();}, 1000);"
                        });
                    }
                }




            }
        }

        setTimeout(function () {
            waitForAllParams();
        }, 100);



    });
}