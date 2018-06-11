function loginWioskiPremium(tabId) {

    var reg = new RegExp("Zapami(.*?)taj mnie", "gi");
    if (reg.test(html)) {
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
    else {
        getWioskiPremium(tabId);
    }
}
var i = 0;

function getWioskiPremium(tabId) {
    if (localStorage.getItem('villagePremium_i') == null) {
        localStorage.setItem('villagePremium_i', 0);
    }
    if (localStorage.getItem('villagePremiumProcess') == null) {
        localStorage.setItem('villagePremiumProcess', '0');
    }
    if (localStorage.getItem('detailProcessPremium') == null) {
        localStorage.setItem('detailProcessPremium', '0');
    }
    i = localStorage.getItem('villagePremium_i');
    $.ajax({
        type: 'GET',
        url: 'http://localhost/plemiona/index.php?jsconnect&get_wioski_premium',
        complete: function (response) {
            var jsonResponse = JSON.parse(response.responseText);
            startWioskiPremium(tabId, jsonResponse.wioski_premium);
        }
    });
}

function startWioskiPremium(tabId, wioski_premium) {

    if (i < wioski_premium.length) {
        getParamsWioskiPremium(tabId, wioski_premium);
    } else {
        localStorage.setItem('villagePremium', '0'); //tutaj na 1 by zablokowac po wszystkich wiosakch
        localStorage.setItem('villagePremium_i', 0);
        localStorage.setItem('villagePremiumProcess', '0');
        chrome.tabs.update(tabId, {url: "https://plemiona.pl/"});
    }
}

var premium_id = 0;
var premium_nr_swiata = 0;
var premium_id_wioski = 0;
var premium_process = 0;
var villagePremiumProcess = 0;

function getParamsWioskiPremium(tabId, wioski_premium) {
    villagePremiumProcess = localStorage.getItem('villagePremiumProcess');
    premium_id = wioski_premium[i].id;
    premium_nr_swiata = wioski_premium[i].nr_swiata;
    premium_id_wioski = wioski_premium[i].id_wioski;
    premium_process = wioski_premium[i].process;
    if (villagePremiumProcess == '0') { //wejdz na glowna danej wioski
        localStorage.setItem('villagePremiumProcess', '1');
        localStorage.setItem('detailProcessPremium', '0');
        chrome.tabs.update(tabId, {url: "https://www.plemiona.pl/page/play/pl" + premium_nr_swiata + ""});
    }

    if (villagePremiumProcess == '1') {
        doPremiumProcess(tabId);
    }
}

function doPremiumProcess(tabId) {
    var detailProcessPremium = localStorage.getItem('detailProcessPremium');

    if (detailProcessPremium == '0') {
        localStorage.setItem('detailProcessPremium', '1');
        chrome.tabs.update(tabId, {url: "https://pl" + premium_nr_swiata + ".plemiona.pl/game.php?village=" + premium_id_wioski + "&screen=main"});
    }
    else {
        if (premium_process == 0) { //zbuduj tartak poziom 1
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "wood", "1", 1);
        }

        if (premium_process == 1) { //wykonaj zadanie 1 - rozbudowa tartak do poziom 1
            localStorage.setItem('detailProcessPremium', '0');
            wykonajZadanie(tabId, '1010', 2);
        }

        if (premium_process == 2) { //rozbuduj ciegielnie poziom 1
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "stone", "1", 3);
        }
        if (premium_process == 3) { //rozbuduj hute żelaza poziom 1
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "iron", "1", 4);
        }

        if (premium_process == 4) { //wykonaj zadanie 2 - cegielnia i huta żelaza poziom 1
            localStorage.setItem('detailProcessPremium', '0');
            wykonajZadanie(tabId, '1020', 5);
        }

        if (premium_process == 5) { //tartak na poziom 2
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "wood", "2", 6);
        }
        if (premium_process == 6) { //cegielnia na poziom 2
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "stone", "2", 7);
        }
        if (premium_process == 7) { //wykonaj zadanie 3 - tartak i cegielnia poziom 2
            localStorage.setItem('detailProcessPremium', '0');
            wykonajZadanie(tabId, '1030', 8);
        }
        if(premium_process == 8){ //ratusz na poziom 2
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "main", "2", 9);
        }
        if(premium_process == 9){ //wykonaj zadanie 4 - ratusz poziom 2
            localStorage.setItem('detailProcessPremium', '0');
            wykonajZadanie(tabId, '1040', 10);
        }
        if(premium_process == 10){ //ratusz na poziom 3
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "main", "3", 11);
        }
        if(premium_process == 11){ //tartak na poziom 3
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "wood", "3", 12);
        }
        if(premium_process == 12) { //cegielnia na poziom 3
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "stone", "3", 13);
        }
        if(premium_process == 13){ //koszary na poziom 1
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "barracks", "1", 14);
        }
        if(premium_process == 14){ //wykonaj zadanie 5 - ratusz poziom 3 i koszary poziom 1
            localStorage.setItem('detailProcessPremium', '0');
            wykonajZadanie(tabId, '1050', 15);
        }
        if(premium_process == 15){ //koszary na poziom 2
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "barracks", "2", 16);
        }
        if(premium_process == 16){ //wykonaj zadanie 6 - tartak i cegnielnia poziom 3, koszary poziom 2
            localStorage.setItem('detailProcessPremium', '0');
            wykonajZadanie(tabId, '1060', 17);
        }
        if(premium_process == 17){ //spichlerz na poziom 2
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "storage", "2", 18);
        }
        if(premium_process == 18){ //zagroda na poziom 2
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "farm", "2", 19);
        }
        if (premium_process == 19) { //rozbuduj hute żelaza poziom 2
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "iron", "2", 20);
        }
        if(premium_process == 20){ //market na poziom 1
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "market", "1", 21);
        }
        if(premium_process == 21){ //spichlerz na poziom 3
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "storage", "3", 22);
        }
        if(premium_process == 22){ //tartak na poziom 4
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "wood", "4", 23);
        }
        if(premium_process == 23){ //cegielnia na poziom 4
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "stone", "4", 24);
        }
        if(premium_process == 24){ //huta żelaza na poziom 3
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "iron", "3", 25);
        }
        if(premium_process == 25){ //tartak na poziom 5
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "wood", "5", 26);
        }
        if(premium_process == 26){ //cegielnia na poziom 5
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "stone", "5", 27);
        }
        if(premium_process == 27){ //tartak na poziom 6
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "wood", "6", 28);
        }
        if(premium_process == 28){ //cegielnia na poziom 6
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "stone", "6", 29);
        }
        if(premium_process == 29){ //huta żelaza na poziom 4
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "iron", "4", 30);
        }
        if(premium_process == 30){ //spichlerz na poziom 4
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "storage", "4", 31);
        }
        if(premium_process == 31){ //market na poziom 2
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "market", "2", 32);
        }
        if(premium_process == 32){ //tartak na poziom 7
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "wood", "7", 33);
        }
        if(premium_process == 33){ //cegielnia na poziom 7
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "stone", "7", 34);
        }
        if(premium_process == 34){ //spichlerz na poziom 5
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "storage", "5", 35);
        }
        if(premium_process == 35){ //tartak na poziom 8
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "wood", "8", 36);
        }
        if(premium_process == 36){ //cegielnia na poziom 8
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "stone", "8", 37);
        }
        if(premium_process == 37){ //huta żelaza na poziom 5
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "iron", "5", 38);
        }
        if(premium_process == 38){ //spichlerz na poziom 6
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "storage", "6", 39);
        }
        if(premium_process == 39){ //spichlerz na poziom 7
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "storage", "7", 40);
        }
        if(premium_process == 40){ //tartak na poziom 9
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "wood", "9", 41);
        }
        if(premium_process == 41){ //cegielnia na poziom 9
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "stone", "9", 42);
        }
        if(premium_process == 42){ //huta żelaza na poziom 6
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "iron", "6", 43);
        }
        if(premium_process == 43){ //tartak na poziom 10
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "wood", "10", 44);
        }
        if(premium_process == 44){ //cegielnia na poziom 10
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "stone", "10", 45);
        }
        if(premium_process == 45){ //huta żelaza na poziom 7
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "iron", "7", 46);
        }
        if(premium_process == 46){ //spichlerz na poziom 8
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "storage", "8", 47);
        }
        if(premium_process == 47){ //spichlerz na poziom 9
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "storage", "9", 48);
        }
        if(premium_process == 48){ //spichlerz na poziom 10
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "storage", "10", 49);
        }
        if(premium_process == 49){ //spichlerz na poziom 11
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "storage", "11", 50);
        }
        if(premium_process == 50){ //spichlerz na poziom 12
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "storage", "12", 51);
        }
        if(premium_process == 51){ //spichlerz na poziom 13
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "storage", "13", 52);
        }
        if(premium_process == 52){ //spichlerz na poziom 14
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "storage", "14", 53);
        }
        if(premium_process == 53){ //spichlerz na poziom 15
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "storage", "15", 54);
        }
        if(premium_process == 54){ //market na poziom 3
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "market", "3", 55);
        }
        if(premium_process == 55){ //market na poziom 4
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "market", "4", 56);
        }
        if(premium_process == 56){ //market na poziom 5
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "market", "5", 57);
        }
        if(premium_process == 57){ //market na poziom 6
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "market", "6", 58);
        }
        if(premium_process == 58){ //tartak na poziom 11
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "wood", "11",59);
        }
        if(premium_process == 59){ //cegielnia na poziom 11
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "stone", "11", 60);
        }
        if(premium_process == 60){ //huta żelaza na poziom 8
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "iron", "8", 61);
        }
        if(premium_process == 61){ //tartak na poziom 12
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "wood", "12",62);
        }
        if(premium_process == 62){ //cegielnia na poziom 12
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "stone", "12", 63);
        }
        if(premium_process == 63){ //huta żelaza na poziom 9
            localStorage.setItem('detailProcessPremium', '0');
            rozbudowaBudynku(tabId, "iron", "9", 64);
        }
        
        if(premium_process == 64){
            localStorage.setItem('detailProcessPremium', '0');


            //przejdź do następnej wioski
            localStorage.setItem('villagePremiumProcess', '0');
            localStorage.setItem('villagePremium_i', parseInt(i) + 1);
            chrome.tabs.update(tabId, {url: "https://plemiona.pl/"});
        }
    }
}

function checkFullQueneBuildings(tabId) {
    var count = String(html).split('buildorder_wall').length - 1;

    if (count >= 2) {
        localStorage.setItem('villagePremiumProcess', '0');
        localStorage.setItem('villagePremium_i', parseInt(i)+ 1);
        chrome.tabs.update(tabId, {url: "https://plemiona.pl/"});
    }

    return 1;
}

function setPremiumProcess(premium_process_set) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost/plemiona/index.php?jsconnect&set_premium_process',
        data: {'premium_process': premium_process_set, 'premium_id': premium_id}
    });
}

function rozbudowaBudynku(tabId, nazwa_budynku, poziom_budynku, set_premium_process) {
    if (checkFullQueneBuildings(tabId) == 1) {
        chrome.tabs.executeScript(tabId, {file: "js/jquery-3.2.1.js"}, function () {
            chrome.tabs.executeScript(
                tabId, {
                    code: 'function test(){return $("#main_buildrow_'+nazwa_budynku+'").find(".inactive").text();} test();'
                },
                function (html_main_buildrow) {
                    if (html_main_buildrow == '') {

                        //da sie rozbudowac
                        setPremiumProcess(set_premium_process);
                        chrome.tabs.executeScript(tabId, {
                            code: "var href = $('#main_buildlink_" + nazwa_budynku + "_" + poziom_budynku + "').attr('href'); window.location.href = href;"
                        });
                    }
                    else {
                        //nie da sie rozbudowac
                        //przejdz do nastepnej wioski

                        localStorage.setItem('villagePremiumProcess', '0');
                        localStorage.setItem('villagePremium_i', parseInt(i) + 1);
                        chrome.tabs.update(tabId, {url: "https://plemiona.pl/"});
                    }

                });
        });

    }
}

function wykonajZadanie(tabId, nr_zadania, set_premium_process){
    chrome.tabs.executeScript(tabId, {file: "js/jquery-3.2.1.js"}, function () {
        chrome.tabs.executeScript(
            tabId, {
                code: ' $("#quest_'+nr_zadania+'").click(); '
            },
            function (result) {
                setTimeout(function () {
                    chrome.tabs.executeScript(
                        tabId, {
                            code: 'function test(){return $(".popup_box_content").html();} test();'
                        },
                        function (html_popup_box_content) {
                            var count = String(html_popup_box_content).split('Gotowe').length - 1;
                            if (count >= 1) {
                                setPremiumProcess(set_premium_process);
                                chrome.tabs.executeScript(tabId, {
                                    code: "$('.btn-confirm-yes')[0].click();"
                                });
                                setTimeout(function () {
                                    chrome.tabs.executeScript(tabId, {
                                        code: "location.reload();"
                                    });
                                }, 500);
                            } else {
                                localStorage.setItem('villagePremiumProcess', '0');
                                localStorage.setItem('villagePremium_i', parseInt(i) + 1);
                                chrome.tabs.update(tabId, {url: "https://plemiona.pl/"});
                            }
                        });
                }, 1000);
            });
    });
}