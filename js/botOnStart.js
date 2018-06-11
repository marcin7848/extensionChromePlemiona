function bot_on_start(tabId) {
    if (localStorage.getItem('checkSendOn') == '0') {
        setTimeout(function () {
            bot_on_start(tabId);
        }, 500);
    }
    else {
        if ((localStorage.getItem('sendOn') == '0') && (localStorage.getItem('freeTime') == '0')) {
            localStorage.setItem('logout', '1');
            chrome.tabs.executeScript(tabId, {
                code: "setTimeout(function () {location.reload();}, 500);"
            });
        }
        else {
            if (localStorage.getItem('freeTime') == '1') {
                setTimeout(function () {
                    premium_points(tabId);
                }, 100);
            }
            else if (localStorage.getItem('sendOn') == '1') {
                localStorage.setItem('premium_points_process', '0');
                localStorage.setItem('processPremium', '0');
                if (verifyBotOFFTime() == 1) {
                    setTimeout(function () {
                        getStartFarma(tabId);
                    }, 1);
                } else {
                    setTimeout(function () {
                        setTimeSend();
                    }, 1);
                }
            }
        }
    }

}

function verifyBotOFFTime() {
    if (time_bot_off == '0') {
        return 1;
    }
    var reg = new RegExp(",", "gi");
    if (!reg.test(time_bot_off)) {
        return checkBotOFFTime(time_bot_off);
    }
    else {
        var elementsRange = time_bot_off.split(',');
        for (var i = 0; i < elementsRange.length; i++) {
            if (checkBotOFFTime(elementsRange[i]) == 1) {
                return 1;
            }
        }
    }
    return 0;
}

function checkBotOFFTime(time_bot_off) {
    var timeRange = time_bot_off.split('-');
    var timeBefore = timeRange[0].split(':');
    var timeAfter = timeRange[1].split(':');

    var hoursBefore = timeBefore[0];
    var minutesBefore = timeBefore[1];

    var hoursAfter = timeAfter[0];
    var minutesAfter = timeAfter[1];

    var dateBefore = new Date(0, 0, 0, hoursBefore, minutesBefore, 0, 0);
    var dateAfter = new Date(0, 0, 0, hoursAfter, minutesAfter, 0, 0);

    var currentDate = new Date();
    var dateCurrent = new Date(0, 0, 0, currentDate.getHours(), currentDate.getMinutes(), 0, 0);

    if (dateBefore <= dateCurrent && dateCurrent <= dateAfter) {
        return 1;
    }

    return 0;
}


function setTimeSend() {
    var currentDate = new Date();
    var time_sent = currentDate.getTime();

    var time_random_to_next_send = rand(10, 15) * 60 * 1000;

    $.ajax({
        type: 'POST',
        url: 'http://localhost/plemiona/index.php?jsconnect&set_time_sent_and_random',
        data: {'time_sent': time_sent, 'time_random_to_next_send': time_random_to_next_send}
    });
}

function getStartFarma(tabId) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost/plemiona/index.php?jsconnect&get_start_farma',
        complete: function (response) {
            var jsonResponse = JSON.parse(response.responseText);
            sendFarma(tabId, 0, jsonResponse.listaWiosek);
        }
    });
}

function sendFarma(tabId, i, listaWiosek) {
    processBotON = localStorage.getItem('processBotON');
    if (processBotON == '0') { //wejscie na strone glowna danej wioski
        if (i < listaWiosek.length) {
            var id_wioski = listaWiosek[i].id_wioski;
            localStorage.setItem('processBotON', '1');
            localStorage.setItem('processBotON_i', i);
            chrome.tabs.update(tabId, {url: "https://pl" + nr_swiata + ".plemiona.pl/game.php?village=" + id_wioski + "&screen=overview"});
        }
        else {
            setTimeout(function () {
                setTimeSend();
            }, 1);
        }
    }

    if (processBotON == '1') { //sprawdzanie, czy dana wioska ma dobra ilosc LK
        i = localStorage.getItem('processBotON_i');
        var id_wioski = listaWiosek[i].id_wioski;

        var reg = new RegExp("Lekkich kawalerzyst", "gi");
        if (reg.test(html) && listaWiosek[i].aktywna_farma == 1) {
            var reg2 = new RegExp('<strong>(.*?)<\\/strong> Lekkich kawalerzyst', "g");
            var myArray;
            myArray = reg2.exec(html);
            var pobrana_ilosc_lk = myArray[1];
            var ilosc_lk = listaWiosek[i].ilosc_farmy;
            if (parseInt(pobrana_ilosc_lk) >= parseInt(ilosc_lk)) {
                localStorage.setItem('processBotON', '2');
                chrome.tabs.update(tabId, {url: "https://pl" + nr_swiata + ".plemiona.pl/game.php?village=" + id_wioski + "&screen=place"});
            }
            else {
                i++;
                localStorage.setItem('processBotON', '0');
                sendFarma(tabId, i, listaWiosek);
            }
        }
        else {
            i++;
            localStorage.setItem('processBotON', '0');
            sendFarma(tabId, i, listaWiosek);
        }

    }
    if (processBotON == '2') { //wszedles na plac danej wioski
        localStorage.setItem('processBotON', '0');
        i = localStorage.getItem('processBotON_i');
        var id_wioski = listaWiosek[i].id_wioski;
        var ilosc_farmy_lk = listaWiosek[i].ilosc_farmy;
        var last_wsp_farma = listaWiosek[i].last_wsp_farma;
        var array_wsp_farma = listaWiosek[i].array_wsp_farma;
        array_wsp_farma = array_wsp_farma.split(',');

        var actuallWspFarma = '';

        var checkactuallWspFarma = 0;

        if (last_wsp_farma == '0') {
            actuallWspFarma = array_wsp_farma[0];
            checkactuallWspFarma = 1;
        }
        else {
            for (var i = 0; i < array_wsp_farma.length; i++) {
                if (last_wsp_farma == array_wsp_farma[i]) {
                    if (array_wsp_farma[i + 1] != null) {
                        actuallWspFarma = array_wsp_farma[i + 1];
                        checkactuallWspFarma = 1;
                    } else {
                        $.ajax({
                            type: 'POST',
                            url: 'http://localhost/plemiona/index.php?jsconnect&set_array_wsp_farma_one',
                            data: {'id_wioski': id_wioski},
                            complete: function (response) {
                                var jsonResponse = JSON.parse(response.responseText);
                                actuallWspFarma = jsonResponse.wsp_farma;
                                checkactuallWspFarma = 1;
                            }
                        });
                    }
                    break;
                }
            }
        }

        function waitForChceckActuallWspFarma() {

            if (checkactuallWspFarma == 0) {
                setTimeout(function () {
                    waitForChceckActuallWspFarma();
                }, 10);
            }
            else {
                localStorage.setItem('processBotON', '3');
                localStorage.setItem('actuallWspFarma', actuallWspFarma);
                chrome.tabs.executeScript(tabId, {file: "js/jquery-3.2.1.js"}, function () {
                    chrome.tabs.executeScript(tabId, {
                        code: "$('#unit_input_light').prop('value','" + ilosc_farmy_lk + "');"
                    });
                    chrome.tabs.executeScript(tabId, {
                        code: "$('.target-input-field').prop('value','" + actuallWspFarma + "');"
                    });
                    chrome.tabs.executeScript(tabId, {
                        code: "$('#target_attack').click();"
                    });
                });
            }
        }

        setTimeout(function () {
            waitForChceckActuallWspFarma();
        }, 5);
    }
    if (processBotON == '3') { //okno potwierdzenia wyslania farmy
        localStorage.setItem('processBotON', '2');
        var actuallWspFarma = localStorage.getItem('actuallWspFarma');
        i = localStorage.getItem('processBotON_i');
        var id_wioski = listaWiosek[i].id_wioski;

        $.ajax({
            type: 'POST',
            url: "http://localhost/plemiona/index.php?jsconnect&zapisz_last_wsp",
            data: {'id_wioski': id_wioski, 'last_wsp': actuallWspFarma},
            complete: function (response) {
                localStorage.setItem('processBotON', '0');
                chrome.tabs.executeScript(tabId, {file: "js/jquery-3.2.1.js"}, function () {
                    chrome.tabs.executeScript(tabId, {
                        code: "$('#troop_confirm_go').click();"
                    });
                });
            }
        });

    }
}

function rand(min, max) {
    min = parseInt(min, 10);
    max = parseInt(max, 10);

    if (min > max) {
        var tmp = min;
        min = max;
        max = tmp;
    }

    return Math.floor(Math.random() * ( max - min + 1 ) + min);
}
