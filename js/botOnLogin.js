chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        var host = tab.url;
        var reg = new RegExp("plemiona", "gi");
        if (reg.test(host)) {

            setTimeout(function () {
                menuPageLogin(tabId);
            }, 5);
        }
    }
});

var bot_on = '';
var username = '';
var password = '';
var nr_swiata = '';
var id_glownej_wioski = '';
var time_bot_off = '';
var logout = 0;
var processBotON = 0;
var time_wioski_premium = '';

function menuPageLogin(tabId) {
    if (processPage != '1') {
        setTimeout(function () {
            menuPageLogin(tabId);
        }, 100);
    }
    else {

        bot_on = localStorage.getItem('bot_on');
        username = localStorage.getItem('username');
        password = localStorage.getItem('password');
        nr_swiata = localStorage.getItem('nr_swiata');
        id_glownej_wioski = localStorage.getItem('id_glownej_wioski');
        time_bot_off = localStorage.getItem('time_bot_off');

        if (localStorage.getItem('logout') == null) {
            localStorage.setItem('logout', '0');
        }
        logout = localStorage.getItem('logout');

        if (localStorage.getItem('processBotON') == null) {
            localStorage.setItem('processBotON', '0');
        }
        processBotON = localStorage.getItem('processBotON');

        time_wioski_premium = localStorage.getItem('time_wioski_premium');

        if (bot_on == 1) {

            chrome.tabs.executeScript(tabId, {
                code: "setTimeout(function () {location.reload();}, 60000);"
            });

            if(localStorage.getItem('villagePremium') == null){
                localStorage.setItem('villagePremium', '0');
            }

            if((verifyTimeWioskiPremium() == 0) || (localStorage.getItem('villagePremium') == '1')) {

                setTimeout(function () {
                    checkRandomTime();
                }, 1);

                if (logout == '0') {
                    var reg2 = new RegExp("Nie " + username + "?", "gi");
                    var reg3 = new RegExp("Logowanie", "gi");
                    if (reg2.test(html) || reg3.test(html)) {
                        var reg2 = new RegExp("Nie " + username + "?", "gi");
                        var reg3 = new RegExp("Logowanie", "gi");
                        if (reg2.test(html)) {


                            setTimeout(function () {

                                chrome.tabs.update(tabId, {url: "https://www.plemiona.pl/page/play/pl" + nr_swiata + ""});

                            }, 500);

                        } else if (reg3.test(html)) {

                            chrome.tabs.executeScript(tabId, {
                                code: "$('#user').prop('value','" + username + "');"
                            });
                            chrome.tabs.executeScript(tabId, {
                                code: "$('#password').prop('value','" + password + "');"
                            });

                            chrome.tabs.executeScript(tabId, {
                                code: "$('.btn-login')[0].click();"
                            });
                        }
                    }
                    else {
                        processPage = 2;
                    }
                }
                else {
                    logout_pl(tabId);
                }
            }
            else{
                if((verifyTimeWioskiPremium() == 1) && (localStorage.getItem('villagePremium') == '0')){
                    loginWioskiPremium(tabId);
                }
            }
        }
    }
}

function logout_pl(tabId) {
    var reg2 = new RegExp("Nie " + username + "?", "gi");
    var reg3 = new RegExp("Logowanie", "gi");

    var testReg2 = reg2.test(html);
    var testReg3 = reg3.test(html);

    if (testReg2) {
        chrome.tabs.update(tabId, {url: "https://www.plemiona.pl/page/logout"});
    } else if (testReg3) {
        randomTimeLogin(tabId);
    } else {
        chrome.tabs.update(tabId, {url: "https://www.plemiona.pl/"});
    }
}

function checkRandomTime() {
    localStorage.setItem('checkSendOn', '0');
    localStorage.setItem('sendOn', '0');
    localStorage.setItem('freeTime', '0');

    $.ajax({
        type: 'GET',
        url: 'http://localhost/plemiona/index.php?jsconnect&get_time_sent_and_random',
        complete: function (response) {
            var jsonResponse = JSON.parse(response.responseText);
            var time_sent = jsonResponse.time_sent;
            var time_random_to_next_send = jsonResponse.time_random_to_next_send;
            var currentDate = new Date();
            if (currentDate.getTime() - time_sent >= time_random_to_next_send) {
                localStorage.setItem('sendOn', '1');
            }

            if (
                ((currentDate.getMinutes() >= 0) && (currentDate.getMinutes() <= 5)) ||
                ((currentDate.getMinutes() >= 20) && (currentDate.getMinutes() <= 25)) ||
                ((currentDate.getMinutes() >= 40) && (currentDate.getMinutes() <= 45)) ||
                ((currentDate.getMinutes() >= 54) && (currentDate.getMinutes() <= 59))
            ) {
                localStorage.setItem('freeTime', '1');
            }

            localStorage.setItem('checkSendOn', '1');
        }
    });

}

function randomTimeLogin(tabId) {
    if (localStorage.getItem('checkSendOn') == '0') {
        setTimeout(function () {
            randomTimeLogin(tabId);
        }, 10);
    }
    else {
        if ((localStorage.getItem('sendOn') == '1') || (localStorage.getItem('freeTime') == '1')) {
            localStorage.setItem('logout', '0');
            chrome.tabs.executeScript(tabId, {
                code: "setTimeout(function () {location.reload();}, 500);"
            });
        }
    }
}

function verifyTimeWioskiPremium() {
    if (time_wioski_premium == '0') {
        return 0;
    }
    var reg = new RegExp(",", "gi");
    if (!reg.test(time_wioski_premium)) {
        return checkBotOFFTime(time_wioski_premium);
    }
    else {
        var elementsRange = time_wioski_premium.split(',');
        for (var i = 0; i < elementsRange.length; i++) {
            if (checkBotOFFTime(elementsRange[i]) == 1) {
                return 1;
            }
        }
    }
    return 0;
}