chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        var host = tab.url;
        var reg = new RegExp("plemiona", "gi");
        if (reg.test(host)) {

            setTimeout(function () {
                menuPageManage(tabId);
            }, 5);
        }
    }
});

function menuPageManage(tabId) {
    if (processPage != '2') {
        setTimeout(function () {
            menuPageManage(tabId);
        }, 100);
    }
    else {

        //calosc wykonywana tylko wtedy, gdy bot_on = 1

        chrome.tabs.executeScript(
            tabId, {
                code: "function test(){return document.getElementById('commands_incomings');} test();"
            },
            function (commands_incomings) {
                if (commands_incomings != '') {

                    chrome.tabs.executeScript(tabId, {file: "js/jquery-3.2.1.js"}, function () {
                        var reg = new RegExp('data-endtime=\\"(.*?)\\">(.*?)<\\/span>', "");
                        chrome.tabs.executeScript(
                            tabId, {
                                code: 'function test(){return $("#commands_incomings").html().match(' + reg + ');} test();'
                            },
                            function (results) {
                                var matches = results.toString().match(reg);
                                var timeer = matches[2].split(":");

                                var date = new Date(0, 0, 0, timeer[0], timeer[1], timeer[2]);

                                if (date.getDay() == 0 && date.getHours() == 0 && date.getMinutes() <= 3) {
                                    new Audio('http://www.mfiles.co.uk/mp3-downloads/gaudete-rejoice.mp3').play()
                                }
                            });
                    });
                }
            });

        chrome.tabs.executeScript(tabId, {file: "js/jquery-3.2.1.js"}, function () {
            chrome.tabs.executeScript(
                tabId, {
                    code: 'function test(){return $(".g-recaptcha").length;} test();'
                },
                function (result_recaptcha) {
                    if (parseInt(result_recaptcha) > 0 && (localStorage.getItem('bot_check_captcha') == '0')) {
                        $.ajax({
                            type: 'GET',
                            url: 'http://localhost/plemiona/index.php?jsconnect&ochrona_botowa_send_mail',
                            complete: function (response) {
                                localStorage.setItem('bot_check_captcha', '1');
                            }
                        });
                    }

                    if (parseInt(result_recaptcha) == 0) {
                        localStorage.setItem('bot_check_captcha', '0');
                        bot_on_start(tabId);
                    }
                });


            chrome.tabs.executeScript(
                tabId, {
                    code: 'function test(){return $("#incomings_amount").text();} test();'
                },
                function (incomings_amount) {

                    if ((incomings_amount != '0') && (localStorage.getItem('attack_on_me') == '0')) {
                        $.ajax({
                            type: 'GET',
                            url: 'http://localhost/plemiona/index.php?jsconnect&attack_on_me',
                            complete: function (response) {
                                localStorage.setItem('attack_on_me', '1');
                            }
                        });
                    }

                    if ((incomings_amount == '0') && (localStorage.getItem('attack_on_me') == '1')) {
                        localStorage.setItem('attack_on_me', '0');
                    }

                    if (localStorage.getItem('attack_on_me') == null) {
                        localStorage.setItem('attack_on_me', '0');
                    }
                });

        });
    }
}