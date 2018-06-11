var waitForDefaultParams = 0;

$(function(){
    waitForDefaultParams = 0;
    var waitForSet = 0;
    var bot_on = 0;
    var username = '';
    var password = '';
    var nr_swiata = '';
    var id_glownej_wioski = '';
    var time_bot_off = '';
    var time_wioski_premium = '';

    $.ajax({
        type: 'GET',
        url: 'http://localhost/plemiona/index.php?jsconnect&get_bot_on',
        complete: function (response) {
            var jsonResponse = JSON.parse(response.responseText);
            bot_on = jsonResponse.bot_on;
            waitForSet++;
        }
    });

    $.ajax({
        type: 'GET',
        url: 'http://localhost/plemiona/index.php?jsconnect&get_userdata',
        //data: {'exam_id':exam_id},
        complete: function (response) {

            var jsonResponse = JSON.parse(response.responseText);
            username = jsonResponse.username;
            password = jsonResponse.password;
            nr_swiata = jsonResponse.nr_swiata;
            waitForSet++;
        }
    });


    $.ajax({
        type: 'GET',
        url: 'http://localhost/plemiona/index.php?jsconnect&get_id_glownej_wioski',
        complete: function (response) {

            var jsonResponse = JSON.parse(response.responseText);
            id_glownej_wioski = jsonResponse.id_glownej_wioski;
            waitForSet++;
        }
    });

    $.ajax({
        type: 'GET',
        url: 'http://localhost/plemiona/index.php?jsconnect&get_time_bot_off',
        complete: function (response) {
            var jsonResponse = JSON.parse(response.responseText);
            time_bot_off = jsonResponse.time_bot_off;
            waitForSet++;
        }
    });

    $.ajax({
        type: 'GET',
        url: 'http://localhost/plemiona/index.php?jsconnect&get_time_wioski_premium',
        complete: function (response) {
            var jsonResponse = JSON.parse(response.responseText);
            time_wioski_premium = jsonResponse.time_wioski_premium;
            waitForSet++;
        }
    });

    var phpNotActive = 0;
    function getDefaultParams(){
        if(waitForSet !== 5){
            phpNotActive++;
            if(phpNotActive > 1000){
                show_error("Nie można połączyć z PHP!", 2000000);
                return 0;
            }
            setTimeout(function(){getDefaultParams();}, 5);
        }
        else{
            if(bot_on == 0) {
                $("#div_bot_on").css('backgroundColor', '#990000');
                $("#text_bot_on").text("OFF");
            }
            else{
                $("#div_bot_on").css('backgroundColor', '#339900');
                $("#text_bot_on").text("ON");
            }

            $("#username").attr('value',username);
            $("#password").attr('value',password);
            $("#nr_swiata").attr('value',nr_swiata);
            $("#id_glownej_wioski").attr('value',id_glownej_wioski);
            $("#time_bot_off").attr('value',time_bot_off);
            $("#time_wioski_premium").attr('value',time_wioski_premium);

            waitForDefaultParams = 1;
        }
    }

    setTimeout(function(){getDefaultParams();}, 1);

    $(document).on("click", "#div_bot_on", function(){
        click_bot_on(bot_on);
    });


    $(document).on("click", "#zapisz_glowne", function(){
        editStartMenuDeatils();
    });


});

function click_bot_on(bot_on)
{
    var a = 0;
    if(bot_on == 0)
    {
        a = 1;
    }

    $.ajax({
        type: 'POST',
        url: 'http://localhost/plemiona/index.php?jsconnect&set_bot_on',
        data: {'bot_on':a},
        complete: function (response) {
            location.reload();
        }
    });

}

function show_error(p, time=3000)
{
    $("#error").text(p);
    setTimeout(function(){$("#error").text("");}, time);
}


function editStartMenuDeatils()
{
    var username = $("#username").prop('value');
    var password = $("#password").prop('value');
    var nr_swiata = $("#nr_swiata").prop('value');
    var id_glownej_wioski = $("#id_glownej_wioski").prop('value');
    var time_bot_off = $("#time_bot_off").prop('value');
    var time_wioski_premium = $("#time_wioski_premium").prop('value');

    $.ajax({
        type: 'POST',
        url: 'http://localhost/plemiona/index.php?jsconnect&set_userdata',
        data: {'username':username, 'password':password, 'nr_swiata':nr_swiata},
        complete: function (response) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            localStorage.setItem('nr_swiata', nr_swiata);

            $.ajax({
                type: 'POST',
                url: 'http://localhost/plemiona/index.php?jsconnect&set_id_glownej_wioski',
                data: {'id_glownej_wioski':id_glownej_wioski},
                complete: function (response2) {

                    $.ajax({
                        type: 'POST',
                        url: 'http://localhost/plemiona/index.php?jsconnect&set_time_bot_off',
                        data: {'time_bot_off':time_bot_off},
                        complete: function (response3) {
                            localStorage.setItem('time_bot_off', time_bot_off);

                            $.ajax({
                                type: 'POST',
                                url: 'http://localhost/plemiona/index.php?jsconnect&set_time_wioski_premium',
                                data: {'time_wioski_premium':time_wioski_premium},
                                complete: function (response3) {
                                    localStorage.setItem('time_wioski_premium', time_wioski_premium);
                                    location.reload();
                                }
                            });

                        }
                    });
                }
            });
        }
    });

}