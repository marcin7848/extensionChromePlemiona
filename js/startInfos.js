
var html = '';
var processPage = 0;
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        processPage = 0;
        var host = tab.url;
        var reg = new RegExp("plemiona", "gi");
        if(reg.test(host)) {

            var getHTML = 0;
            chrome.tabs.executeScript(
                tabId,{
                    code:"var ps1 = document.getElementsByTagName('html')[0].innerHTML;function test(){return ps1;} test();"
                },
                function(results) {
                    html = results;
                    getHTML = 1;
            });

            var waitForSet = 0;
            if(localStorage.getItem('username') === null || localStorage.getItem('password') === null || localStorage.getItem('nr_swiata') === null) {
                waitForSet = 1;
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost/plemiona/index.php?jsconnect&get_userdata',
                    complete: function (response) {

                        var jsonResponse = JSON.parse(response.responseText);
                        localStorage.setItem('username', jsonResponse.username);
                        localStorage.setItem('password', jsonResponse.password);
                        localStorage.setItem('nr_swiata', jsonResponse.nr_swiata);
                        waitForSet = 0;
                    }
                });
            }

            var waitForSet2 = 0;
            function getStartInfos(){
                if(waitForSet === 1){
                    getStartInfos();
                }else{
                    $.ajax({
                        type: 'GET',
                        url: 'http://localhost/plemiona/index.php?jsconnect&get_bot_on',
                        complete: function (response) {

                            var jsonResponse = JSON.parse(response.responseText);
                            localStorage.setItem('bot_on', jsonResponse.bot_on);
                            waitForSet2++;
                        }
                    });

                    $.ajax({
                        type: 'GET',
                        url: 'http://localhost/plemiona/index.php?jsconnect&get_id_glownej_wioski',
                        complete: function (response) {

                            var jsonResponse = JSON.parse(response.responseText);
                            localStorage.setItem('id_glownej_wioski', jsonResponse.id_glownej_wioski);
                            waitForSet2++;
                        }
                    });

                    setTimeout(function(){gotStartInfos();}, 5);

                }
            }


            function gotStartInfos(){
                if(waitForSet2 !== 2 && getHTML !== 1){
                    setTimeout(function(){gotStartInfos();}, 1);
                }
                else{
                    processPage = 1;
                }
            }

            setTimeout(function(){getStartInfos();}, 5);



        }
    }
});