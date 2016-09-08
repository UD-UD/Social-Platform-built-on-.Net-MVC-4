$(document).ready(function(){   


    var uid = session_id;



    loadtimeline(uid);




    function loadtimeline(uid) {
        $.ajax({
            url: "/TimeLine/getUserTimeLine",
            data: { "uid": uid },
            async: false,
            contentType: "application/json,charset=utf-8",
            dataType: "json",
            success: successLoad,
            error: function (xhr, ajaxOption, throwError) {

                alert(xhr.responseText);
                alert(throwError);
            }
        });
    }

    function successLoad(dataresult) {
    
        var event1 = "anguish_event";
        var event2 = "dismay_event";
        var event3 = "grief_event";
        var event4 = "shock_event";
        var event5 = "sorrowful_event";

    
        var icon1 = "event_icn icon-star-1";
        var icon2 = "event_icn icon-star-2";
        var icon3 = "event_icn icon-star-3";
        var icon4 = "event_icn icon-star-4";
        var icon5 = "event_icn icon-star-5";

        var icon;
        var event;


        var value = $.parseJSON(dataresult);
        $.each(value, function (i, data) {

            if (data.PostType == 1 || data.PostType == 2) {
          
            
                a = /\/Date\((\d*)\)\//.exec(data.date);
                if (a) {
                    var dt = new Date(+a[1]);

                    var date = dt.toDateString();

                   
                }
            

                if (data.Category == 1) {
                    icon = icon1;
                    event = event1;
                }
                else if (data.Category == 2) {
                    icon = icon2;
                    event = event2;
                }
                else if (data.Category == 3) {
                    icon = icon3;
                    event = event3;
                }
                else if (data.Category == 4) {
                    icon = icon4;
                    event = event4;
                }
                else if (data.Category == 5) {
                    icon = icon5;
                    event = event5;
                }

                $('<li class=\"item ' + event + '\"> <div class=\"' + icon + '\"></div><div class=\"event_content\"><h2>To ' + data.ToWhom + '</h2><p>' + data.postcontent + '</p></div><div class=\"event_date\">' + date + '</div></li>').prependTo("#timeline");
            }

            else if (data.PostType == 3)
            {
                a = /\/Date\((\d*)\)\//.exec(data.date);
                if (a) {
                    var dt = new Date(+a[1]);

                    var date = dt.toDateString();
                    
                }
           


            
                //$('<li class=\"' + event + '\"> <div class=\"' + icon + '\"></div><div class=\"event_content\"><h2>John </h2> <div class=\"video-container\"><iframe frameborder=\"0\" src=\"'+data.vidlink+'\" ></iframe></div><p>' + data.postcontent + '</p></div><div class=\"event_date\">01/09/1997</div></li>').prependTo("#timeline");
        
                $('<li class=\"item ' + event + '\"> <div class=\"' + icon + '\"></div><div class=\"event_content\"><h2>To ' + data.ToWhom + '</h2>  <div><iframe width=\"340\" height=\"160\" src=\"' + data.vidlink + '\" frameborder=\"0\" allowfullscreen></iframe> <p>' + data.postcontent + '</p></div> </div><div class=\"event_date\">' + date + '</div></li>').prependTo("#timeline");
        
            }


        });
    }


    $("#add").click(function () {
        alert("add");
        //$("#timeline").prepend('<li class=\"grief_event\" id=\"timeline\"> <div class=\"event_icn icon-star-1\"></div><div class=\"event_content\"><h2>John</h2><p>	Joined the science class in with emphasis on Computer Science and Robotics. There I built the schools first site in HTML and a little robot that extinguishes a small candle. </a></p></div><div class=\"event_date\">01/09/1997</div></li>');

        $('<li class=\"grief_event\"> <div class=\"event_icn icon-star-1\"></div><div class=\"event_content\"><h2>John 55</h2><p>	Joined the science class in with emphasis on Computer Science and Robotics. There I built the schools first site in HTML and a little robot that extinguishes a small candle. </a></p></div><div class=\"event_date\">01/09/1997</div></li>').prependTo("#timeline");

    });

    $('#addevent').click(function () {
        window.location.href = '/TimeLine/Form';
    })

    $('#create-event-button').click(function ()  //on clicking create event
    {
        $('.mask').css("display", "block");
        $('.create-event').css("display", "block");

    });

    $('#cancel-event').click(function () // on clicking cancel button
    {
        $('.mask').css("display", "none");
        $('.create-event').css("display", "none");
    });


    $(".submit").click(function () {



        var fname = $(".fname").val();

        var cat = $(".category").val();

        var emessage = $(".emessage").val();

        var type = $(".type").val();

        var vlink ;

        if (type == 2) {
            var fileUpload = $("#uploadPic").get(0);
            var files = fileUpload.files;
        }
        if (type == 3) {
            vlink = $("#vidlink").val();
        }
        if (fname == "" || cat == null || emessage == "")

        { alert("Mandatory Fields Cant be empty"); }

        else
        {
            var uid = session_id;
        
            insertevent(uid, fname, emessage, cat, type, vlink);

        }


    });






function insertevent(uid, fname, emessage, cat, type, vlink) {
    $.ajax({
        url: "/TimeLine/insertEvent",
        async: false,
        type: "post",
        data: JSON.stringify({ "Uid": uid, "Name": fname, "Message": emessage, "Category": cat, "Type": type, "Vlink": vlink }),
        contentType: "application/json,charset=utf-8",
        success: successInsert,
        error: function (xhr, ajaxOption, throwError) {
            alert(ajaxOption);
           alert(xhr.responseText);
            alert(throwError);
            
        }
    });
}

function successInsert(x) {
    location.reload();
}


var typeSel = document.getElementById("messagetype");
typeSel.onchange = function () {
    

    if (this.value == 1) {
        document.getElementById("uploadPic").disabled = true;
        document.getElementById("vidlink").disabled = true;
    }
    else if (this.value == 2) {
        document.getElementById("uploadPic").disabled = false;
        document.getElementById("vidlink").disabled = true;
    }
    else if (this.value == 3) {
        document.getElementById("uploadPic").disabled = true;
        document.getElementById("vidlink").disabled = false;
    }

}

});