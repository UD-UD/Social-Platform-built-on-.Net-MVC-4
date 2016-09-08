var commentsArray = [];
var userData = [];


$('p#user-name').text(session_name);
//int announcementID = 1;

$(document).ready(function ()
{
   
    $('#comment-box-icon').click(function ()
    {
   
        if ($('.lend-a-hand-container').css("display", "block"))
            $('.lend-a-hand-container').css("display", "none");
        if ($('.comment-box').css('display') == 'none')
        {
            $('.comment-box').css("display", "block");
            $('body').animate({ scrollTop: $('body').prop("scrollHeight") }, 200);
        }
        else
            $('.comment-box').css("display", "none");
    });

    $('#lend-a-hand-icon').click(function ()
    {
        if ($('.comment-box').css("display", "block"))
            $('.comment-box').css("display", "none");
        if ($('.lend-a-hand-container').css('display') == 'none')
        {
            $('.lend-a-hand-container').css("display", "block");
            $('body').animate({ scrollTop: $('body').prop("scrollHeight") }, 200);
        }
        else
            $('.lend-a-hand-container').css("display", "none");
    });

    $('#More-LAH').click(function () {
        if ($('.row5').css('display') == 'none') {
            $('.row5').css("display", "block").fadeIn(500);
            $('.lend-a-hand-container').css("height", "auto");
            $('.row4').find('div').removeClass('down').addClass('up').fadeIn(500);
            $('body').animate({ scrollTop: $('body').prop("scrollHeight") }, 500);
        }
        else {
            $('.row5').css("display", "none").fadeOut(500);
            $('.lend-a-hand-container').css("height", "auto");
            $('.row4').find('div').removeClass('up').addClass('down').fadeIn(500);
        }

    });

    $(function () {
        if ($('.row5').css('display') == 'none')
            $('.lend-a-hand-container').css("height", "auto");
    });


    getIndividualDetails();    
    getUserData();

});

function getUserData()
{
        successfunction1("abcd");
        getComments();
}

function successfunction1(data)
{
    userData = {
        profilePictureURL: '../img/user.png',
        roundProfilePictures: true,
        textareaRows: 1,
        spinnerIconURL: 'img/spinner.gif',
        upvoteIconURL: 'img/upvote-icon.png',
        replyIconURL: 'img/reply-icon.png',
        noCommentsIconURL: 'img/footsteps.png'
    };
}

function getIndividualDetails()
{
     $.ajax({
        url: "/Registered/individualAnnouncementDetails",
        async: true,
        contentType: "application/json; charset=utf-8",
        type: 'post',
        datatype: 'json',
        success: successfunctionIndividual,
        error: function (xhr, ajaxOption) {

            alert(xhr.responseText);
            alert(thrownError);
        }

    });
    function getdatetime(x) {
        var date1 = new Date(parseInt(x.substr(6)));
        var month = date1.getMonth() + 1;
        var day = date1.getDate();
        var year = date1.getFullYear();
        var date3 = day + "/" + month + "/" + year;
        return date3
    }

    function successfunctionIndividual(data)
    {
        
        var x = $.parseJSON(data);
       
        $.each(x, function (a, v) {
            $('#Person-Name').text(v.FirstName + " " + v.LastName);
            $('#Person-DOB').find('span').text(getdatetime(v.DateOfBirth));
            $('#Person-DOD').find('span').text(getdatetime(v.DateOfDemise));
            $('#Person-Shared').find('span').text(v.UserName);
            $('#Message-ann-text').text(v.AnnouncementText);
            $('#regret-smiley-icon').find('span').text(v.RegretCount);
            $('#share-icon').find('span').text(v.NumberOfShares);
        });
    }
}

function getComments()
{
    $.ajax({
        url: "/Registered/getAllComments",
        async: true,
        contentType: "application/json; charset=utf-8",
        type:'post',
        datatype:'json',
        success: successfunction,
        error: function (xhr, ajaxOption) {

            alert(xhr.responseText);
            alert(thrownError);
        }

    });


    function successfunction(data)
    {
        
        var x=$.parseJSON(data);
      
        $.each(x, function (a, v)
        {
           

            commentsArray.push({
                "id": v.commentID,
                "parent": v.parent,
                "created":getdatetime(v.createdDate),
                "modified":getdatetime(v.modifiedDate),
                "content": v.message,
                "fullname": v.userName,
                "profile_picture_url": "https://app.viima.com/static/media/user_profiles/user-icon.png",
                "created_by_admin": false,
                "created_by_current_user": false,
                "moderation_pending": false,
                "upvote_count": v.UpVoteCount,
                "user_has_upvoted": false
            });
        });      
        showComments();
    }

    function getdatetime(x) {
        
        var date1 = new Date(parseInt(x.substr(6)));
        var month = date1.getMonth() + 1;
        var day = date1.getDate();
        var year = date1.getFullYear();
        var date3 = month + "/" + day + "/" + year;
        return date3
    }
}

function showComments()
{
 
    $(function ()
    {
        
        $('#comments-container').comments({
            profilePictureURL: '../img/user.png',
            roundProfilePictures: true,
            textareaRows: 1,
            spinnerIconURL: '../img/spinner.gif',
            upvoteIconURL: '../img/upvote-icon.png',
            replyIconURL: '../img/reply-icon.png',
            noCommentsIconURL: '../img/footsteps.png',
            enableReplying: false,
            getComments: function (success, error) {
                setTimeout(function ()
                {
                   
                    success(commentsArray);
                }, 500);
            },
            putComment: function (commentJSON, success, error)
            {
                //setTimeout(function () {
                //    success(data);
                //}, 200)
               // var date = ((commentJSON.modified).getMonth() + 1) + '/' + (commentJSON.modified).getDate() + '/' + (commentJSON.modified).getFullYear();
                alert("hello");
                
                $.ajax({
                    url: "/Registered/updateComment",
                    async: true,
                    data: JSON.stringify({ "UserID": session_id, "ParentID": commentJSON.parent, "AnnouncementID": 1, "CommentsText": commentJSON.content, "CreatedDateTime": commentJSON.created, "ModifiedDateTime": commentJSON.created, "UpVoteCount": 0 }),//Sample announcementID
                    contentType: "application/json; charset=utf-8",
                    type: 'post',
                    datatype: 'json',
                    success: function () {
                        alert("Update Comment");
                        success(commentJSON);
                    },
                    error: function (xhr, ajaxOption) {

                        alert(xhr.responseText);
                        alert(thrownError);
                    }
                });


            },
            deleteComment: function (data, success, error) {
                setTimeout(function () {
                    success();
                }, 200)
            },
            upvoteComment: function (data, success, error) {
                //setTimeout(function () {
                //    success(data);
                //}, 200)
            
                $.ajax({
                    url: "/Registered/updateVote",
                    async: true,
                    data: JSON.stringify({ "UserID": session_id, "UpVoteCount": data.upvote_count }),//Sample announcementID
                    contentType: "application/json; charset=utf-8",
                    type: 'post',
                    datatype: 'json',
                    success: function () {
                        success(data);
                        
                    },
                    error: function (xhr, ajaxOption) {

                        alert(xhr.responseText);
                        alert(thrownError);
                    }
                });
            },
            postComment: function(commentJSON, success, error) 
            {
                alert("hello post");

                var p = (commentJSON.parent != null) ? commentJSON.parent : 0;
                    $.ajax({
                        url: "/Registered/AddComment",
                        async: true,
                        data: JSON.stringify({ "UserID":session_id, "ParentID": p, "AnnouncementID": 1, "CommentsText": commentJSON.content, "CreatedDateTime": commentJSON.created, "ModifiedDateTime": commentJSON.modified, "UpVoteCount": 0 }),//Sample announcementID
                        contentType: "application/json; charset=utf-8",
                        type: 'post',
                        datatype: 'json',
                        success: function () {
                            success(commentJSON);
                        },
                        error: function (xhr, ajaxOption) {

                            alert(xhr.responseText);
                            alert(thrownError);
                        }
                    });
            }
        });
       

        
    });
}

/*---------------------------------------------LEND A HAND JavaScript--------------------------------------------*/
$("#readmore").click(function () {
    $(".details").fadeToggle(1000);
});

$("#lend-a-hand-icon").click(function () {
    $.ajax({
        url: "/Registered/getLah",
        async: true,
        contentType: "application/json; charset=utf-8",
        type: 'post',
        datatype: 'json',
        success: function (x)
        {          
            var k = $.parseJSON(x);
            alert(k[0].amount);
            $('#PledgeAmt').text(k[0].amountPledge);
            alert(k[0].amountPledge);
            //$('#Endate').text(getdatetime(k.EndDate));
            $('#lend-a-hand-message').text(k[0].LAH_message + "");
            alert(k[0].LAH_message + "");

            var funded = (k[0].amount / k[0].amountPledge) * 100;
            init_progressbar(funded);
            
        },
        error: function (xhr, ajaxOption) {

            alert(xhr.responseText);
            alert(thrownError);
        }
    });

    function getdatetime(x)
    {

        var date1 = new Date(parseInt(x.substr(6)));
        var month = date1.getMonth() + 1;
        var day = date1.getDate();
        var year = date1.getFullYear();
        var date3 = day + "/" + month + "/" + year;
        return date3
    }


    
});



function init_progressbar(funded) {
    var progressbar = $("#progressbar"),
      progressLabel = $(".progress-label");

    progressbar.progressbar({
        value: false,
        change: function () {
            progressLabel.text(progressbar.progressbar("value") + "%");
        },
        complete: function () {
            progressLabel.text("Complete!");
        }
    });

    function progress() {
        var val = progressbar.progressbar("value") || 0;

        progressbar.progressbar("value", val + 2);

        if (val < funded) {
            setTimeout(progress, 80);
        }
    }

    setTimeout(progress, 2000);
}

$(".donate").on("click", function () {
   
    var target = $(this);
    var amt;
    if (target.is("#amt-option1"))
    {
        amt = $('#amt-option1').find('p').text();
    }

    if (target.is("#amt-option2")) {
        amt = $('#amt-option2').find('p').text();
    }

    if (target.is("#amt-option3")) {
        amt = $('#amt-option3').find('p').text();
    }

    if (target.is("#amt-option4")) {
        amt = $('#amt-option4').find('p').text();
    }

     
    
    $('.lend-a-hand-popup').find('p').text(amt);
    $('.lend-a-hand-popup').css('display','block');
});

$('#user-home-button').click(function () {
    window.location.href = '/Registered/Index'
});

