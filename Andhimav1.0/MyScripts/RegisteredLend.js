//Code Inserted By Nikhil-----------------------------------------------------------------------------
var fID = -99;
var UserID;
var x = session_id;
var iii = 1;

var sessionperson = 0;

var annid;
jQuery(document).ready(function ($) {
    //-------------------------------Create Announcement Part--------------------------------------
    $(".submit").click(function () {
        var fname = $(".fname").val();
        var Lname = $(".Lname").val();
        var date = $(".date").val();
        var gender = $(".gender").val();
        alert(gender);
        var bloc = $(".bloc").val();
        var eloc = $(".eloc").val();
        var Amessage = $(".Amessage").val();
        var LendAmt = $(".LendAmt").val();
        var EndDate = $(".EndDate").val();
        var lmessage = $(".lmessage").val();
        var fileUpload = $("#uploadPic").get(0);
        var files = fileUpload.files;
        if (fname == "" || date == "" || gender == "" || bloc == "" || Amessage == "" || gender == null)
            alert("Mandatory Fields Cant be empty");
        else {
            var data1 = new FormData();
            data1.append("fname", fname);
            data1.append("Lname", Lname);
            data1.append("date", date);
            data1.append("gender", gender);
            data1.append("bloc", bloc);
            data1.append("eloc", eloc);
            data1.append("Amessage", Amessage);
            data1.append("LendAmt", LendAmt);
            data1.append("EndDate", EndDate);
            data1.append("lmessage", lmessage);
            data1.append("UserID", x);
            for (var i = 0; i < files.length; i++) {
                data1.append(files[i].name, files[i]);
            }
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Registered/Upload');
            xhr.send(data1);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    alert(xhr.responseText);
                }
            }
            return false;
        }

    });

    //-------------------------------------------------------------------------------------



    successfunctionauth1(x);


    //------------------------------------------------End Of Nikhil Code
    function successfunctionauth1(x) {
        sessionperson = x;
        $.ajax({
            url: "/Home/getNameofPerson",
            data: { "uid": sessionperson },
            async: false,
            contentType: "application/json; charset=utf-8",
            datatype: JSON,
            success: successfunctionauth2,
            error: function (xhr, ajaxOption) {
                toastr["error"]("Error!")
                alert(xhr.responseText);
                alert(thrownError);
            }

        });
        UserID = x;

        getUserLAH(x);
    }

    function successfunctionauth2(x) {
        var d = $.parseJSON(x);
        $('p#user-name').text(d[0].FirstName + " " + d[0].LastName);
    }
    var tabs = $('.cd-tabs');

    tabs.each(function () {
        var tab = $(this),
			tabItems = tab.find('ul.cd-tabs-navigation'),
			tabContentWrapper = tab.children('ul.cd-tabs-content'),
			tabNavigation = tab.find('nav');

        tabItems.on('click', 'a', function (event) {
            event.preventDefault();
            var selectedItem = $(this);
            if (!selectedItem.hasClass('selected')) {
                var selectedTab = selectedItem.data('content'),
					selectedContent = tabContentWrapper.find('li[data-content="' + selectedTab + '"]'),
					slectedContentHeight = selectedContent.innerHeight();

                tabItems.find('a.selected').removeClass('selected');
                selectedItem.addClass('selected');
                selectedContent.addClass('selected').siblings('li').removeClass('selected');
                //animate tabContentWrapper height when content changes 
                tabContentWrapper.animate({
                    'height': slectedContentHeight
                }, 200);
            }
        });

        //hide the .cd-tabs::after element when tabbed navigation has scrolled to the end (mobile version)
        checkScrolling(tabNavigation);
        tabNavigation.on('scroll', function () {
            checkScrolling($(this));
        });
    });

    $(window).on('resize', function () {
        tabs.each(function () {
            var tab = $(this);
            checkScrolling(tab.find('nav'));
            tab.find('.cd-tabs-content').css('height', 'auto');
        });
    });

    function checkScrolling(tabs) {
        var totalTabWidth = parseInt(tabs.children('.cd-tabs-navigation').width()),
		 	tabsViewport = parseInt(tabs.width());
        if (tabs.scrollLeft() >= totalTabWidth - tabsViewport) {
            tabs.parent('.cd-tabs').addClass('is-ended');
        } else {
            tabs.parent('.cd-tabs').removeClass('is-ended');
        }
    }





    $('#create-announcement-button').click(function ()  //on clicking create announcement
    {
        $('.mask').css("display", "block");
        $('.create-announcment').css("display", "block");
    });

    $('#cancel-announcement').click(function () // on clicking cancel button
    {
        $('.mask').css("display", "none");
        $('.create-announcment').css("display", "none");
    });

    $('#get-my-timeline').click(function () {
        window.location.href = '/TimeLine/Index';
    });


    $('#submit-announcement').click(function () {



        var fname = $('#create-announcement-firstName').val();
        var Lname = $('#create-announcement-lastName').val();
        var date = $('#create-announcement-date').val();
        var gender = $('#create-announcement-gender').val();
        var bloc = $('#create-announcement-bloc').val();
        var eloc = $('#create-announcement-eloc').val();
        var Amessage = $('#create-announcement-message').val();

        var LendAmt = $('#create-announcement-amount').val();
        var EndDate = $('#create-announcement-Edate').val();
        var lmessage = $('#create-announcement-lend-message').val();

        if ($('#ann-friends').css("display", "block")) {
            fID = $('#create-announcement-fid').val();

        }



        $.ajax({
            url: "/Registered/putUserAnnouncement",
            async: true,
            data: JSON.stringify({ "fname": fname, "Lname": Lname, "date": date, "gender": gender, "bloc": bloc, "eloc": eloc, "Amessage": Amessage, "LendAmt": LendAmt, "EndDate": EndDate, "lmessage": lmessage, "fID": fID, "UserID": UserID }),
            contentType: "application/json; charset=utf-8",
            type: 'post',
            datatype: 'json',
            success: successfunctionShowAnn,
            error: function (xhr, ajaxOption) {

                alert(xhr.responseText);
                alert(thrownError);
            }

        });

        function successfunctionShowAnn(x) {
            $('.create-announcment').css("display", "none");
            $('.mask').css("display", "none");

        }



    });

});

$(function () {
    if ($('#create-announcement-Anntype-private').click(function () {

               $('#ann-friends').css("display", "block");

    }));
})


$(function () {
    if ($('#create-announcement-anntype-public').click(function () {

               $('#ann-friends').css("display", "none");
               fID = -99;
    }));
})

function AnnouncementClicked(xx) {

    var id = $(xx).parent().parent().attr("id");


    $.ajax({
        url: "/Registered/clickedAnnouncementID",
        async: true,
        data: JSON.stringify({ "id": id }),//Sample announcementID
        contentType: "application/json; charset=utf-8",
        type: 'post',
        datatype: 'json',
        success: successfunctionClickAnn,
        error: function (xhr, ajaxOption) {

            alert(xhr.responseText);
            alert(thrownError);
        }

    });

    function successfunctionClickAnn() {
        window.location.href = '/Registered/RegisteredIndividual';
    }
}

function RegretClick(xx) {
    //var id = $(xx).getElementbyClassName(.attr("id");
    var id = $(xx).parent().parent().attr("id");

    $.ajax({
        url: "/Registered/RegretClicked",
        async: true,
        data: JSON.stringify({ "annID": id, "userID": x }),
        contentType: "application/json; charset=utf-8",
        type: 'post',
        datatype: 'json',
        success: successfunctionRegretClicked,
        error: function (xhr, ajaxOption) {

            alert(xhr.responseText);
            alert(thrownError);
        }

    });

    function successfunctionRegretClicked() {
    }
}

$(function () {

    $('#checkboxG1').click(function () {

        //if(!$('#checkboxG1').is(':checked'))
        //{
        //    $('#checkboxG2').attr('checked', false);
        //    $('.announcement-container').empty();
        //    getUserAnnouncement(UserID);

        //}

        if ($('#checkboxG2').is(':checked')) {
            $('#checkboxG2').attr('checked', false);
            $('.announcement-container').empty();
            getUserLAH(UserID);
        }


    });


    $('#checkboxG2').click(function () {

        if ($('#checkboxG1').is(':checked')) {
            $('#checkboxG1').attr('checked', false);
            $('.announcement-container').empty();
            getUserCreatedAnnouncement();

        }


    });

});

function getUserLAH(x) {

    $.ajax({
        url: "/Registered/getUserLAH",
        async: true,
        data: JSON.stringify({ "id": x }),
        contentType: "application/json; charset=utf-8",
        type: 'post',
        datatype: 'json',
        success: successfunctionShowAnn,
        error: function (xhr, ajaxOption) {

            alert(xhr.responseText);
            alert(thrownError);
        }

    });


    function successfunctionShowAnn(x) {
        var k = $.parseJSON(x);
        var adata = "";

        $.each(k, function (i, v) {
            adata = adata + '<div id="' + v + '" class="announcement-box"  style="border-top: 2px solid #E6ED1A;"><div class="announcement-head"><div class="announcement-author"><img src="../UserImages/' + ((iii++) % 10) + '.jpg" class="announcement-author-image"></img></div><div class="anoouncement-header-title"><h3>Condolances</h3></div><div class="read-more-icon" onClick="AnnouncementClicked(this);"><img src="../img/book.png" class="announcement-author-image"></img></div></div><div class="announcement-body"><img src="../UserImages/' + (((iii++) + 2) % 10) + '.jpg" class="announcement-person-image"></img></div><div class="announcement-foot" style="border-bottom: 2px solid #E6ED1A;"><div id="regret-smiley-icon" onClick="RegretClick(this);"><img src="../img/sad39.png" class="icon" alt="telephone icon" /></div><div id="comment-box-icon"><img src="../img/speechbubble10.png" class="icon" alt="Mobile icon"></img></div><div id="lend-a-hand-icon"><img src="../img/hand-gesture.png" class="icon" alt="Email icon" /></div><div id="share-icon"><img src="../img/share11.png" class="icon" alt="Location icon" /></div></div></div>';
            //$('.announcement-container').append(adata);

        });

        //adata = "<fieldset style='border:1px solid #4bc3a9;margin:20 0 20 0;border-radius:10px'><legend align='right' style='color:#16a085;padding-right:15px'>Shared with me</legend>" + adata + "</fieldset>";
        //$('.announcement-container').append(adata);

        getAllLAH(adata);
    }
}

function getAllLAH(adata) {
    $.ajax({
        url: "/Registered/getAllLAH",
        async: true,
        contentType: "application/json; charset=utf-8",
        type: 'post',
        datatype: 'json',
        success: successfunctionShowAnn,
        error: function (xhr, ajaxOption) {

            alert(xhr.responseText);
            alert(thrownError);
        }

    });

    function successfunctionShowAnn(x) {
        var k = $.parseJSON(x);
        //adata = adata + "<fieldset style='border:1px solid #4bc3a9;margin:20 0 20 0;border-radius:10px'><legend align='right' style='color:#16a085;padding-right:15px'>Shared with ALL</legend>";
        $.each(k, function (i, v) {
            adata = adata + '<div id="' + v + '" class="announcement-box"><div class="announcement-head"><div class="announcement-author"><img src="../UserImages/' + ((iii++) % 10) + '.jpg" class="announcement-author-image"></img></div><div class="anoouncement-header-title"><h3>Condolances</h3></div><div class="read-more-icon" onClick="AnnouncementClicked(this);"><img src="../img/book.png" class="announcement-author-image"></img></div></div><div class="announcement-body"><img src="../UserImages/' + (((iii++) + 2) % 10) + '.jpg" class="announcement-person-image"></img></div><div class="announcement-foot"  ><div id="regret-smiley-icon" onClick="RegretClick(this);"><img src="../img/sad39.png" class="icon" alt="telephone icon" /></div><div id="comment-box-icon"><img src="../img/speechbubble10.png" class="icon" alt="Mobile icon"></img></div><div id="lend-a-hand-icon"><img src="../img/hand-gesture.png" class="icon" alt="Email icon" /></div><div id="share-icon"><img src="../img/share11.png" class="icon" alt="Location icon" /></div></div></div>';
            //$('.announcement-container').append(adata);
            //alert(v);
        });

        // adata = adata + "</fieldset>";
        $('.announcement-container').append(adata);
    }
}

function getUserCreatedAnnouncement() {

    $.ajax({
        url: "/Registered/getUserCreatedAnnouncement",
        async: true,
        data: JSON.stringify({ "id": UserID }),
        contentType: "application/json; charset=utf-8",
        type: 'post',
        datatype: 'json',
        success: successfunctionShowAnn,
        error: function (xhr, ajaxOption) {

            alert(xhr.responseText);
            alert(thrownError);
        }

    });

    function successfunctionShowAnn(x) {
        var k = $.parseJSON(x);
        $.each(k, function (i, v) {
            var adata = '<div id="' + v + '" class="announcement-box"><div class="announcement-head"><div class="announcement-author"><img src="../UserImages/' + ((iii++) % 10) + '.jpg" class="announcement-author-image"></img></div><div class="anoouncement-header-title"><h3>Condolances</h3></div><div class="read-more-icon" onClick="AnnouncementClicked(this);"><img src="../img/book.png" class="announcement-author-image"></img></div></div><div class="announcement-body"><img src="../UserImages/' + (((iii++) + 2) % 10) + '.jpg" class="announcement-person-image"></img></div><div class="announcement-foot"><div id="regret-smiley-icon" onClick="RegretClick(this);"><img src="../img/sad39.png" class="icon" alt="telephone icon" /></div><div id="comment-box-icon"><img src="../img/speechbubble10.png" class="icon" alt="Mobile icon"></img></div><div id="lend-a-hand-icon"><img src="../img/hand-gesture.png" class="icon" alt="Email icon" /></div><div id="share-icon"><img src="../img/share11.png" class="icon" alt="Location icon" /></div></div></div>';
            $('.announcement-container').append(adata);
        });
    }


}