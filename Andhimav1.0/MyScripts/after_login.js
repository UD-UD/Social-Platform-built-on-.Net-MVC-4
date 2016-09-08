var session_id;
var session_name;

//This Function is To load G+ api at the start
function onLoad() {
    gapi.load('auth2', function () {
        gapi.auth2.init();
    });
}

/// This Will Check if the user is logged in or not. 
///If he is then just Use Session_id at the start.
checksession();

successfunctionauth3(session_id);

function checksession() {

    $.ajax({
        url: "/Home/checksession",
        async: false,
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        success: successCheck,
        error: function (xhr, ajaxOption) {
            toastr["error"]("Error in creating User!")
            alert(xhr.responseText);
            alert(thrownError);
        }

    });

}
function successCheck(x) {
    if (x != "true")
        window.location.href = '/Home/Index';
    else
        ajaxEmailViaSession();
}
function ajaxEmailViaSession() {

    $.ajax({
        url: "/Home/getEmailViaSession",
        async: false,
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        success: successfunctionauth1,
        error: function (xhr, ajaxOption) {
            toastr["error"]("Error in creating User!")
            alert(xhr.responseText);
            alert(thrownError);
        }

    });

}
function successfunctionauth1(x) {
    session_id = x;
  }

function successfunctionauth3(x) {
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
}

function successfunctionauth2(x) {
    var d = $.parseJSON(x);
    session_name = d[0].FirstName + " " + d[0].LastName;
   }

jQuery(document).ready(function ($) {


    $("#user-image").click(function () {
         $(".dropdown-content").show();
    });
    $(document).click(function (e) {
        if ($(e.target).closest('#user-image').length != 0) return false;
        $('.dropdown-content').hide();
    });


    $(".logout").click(function () {
       
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            //ajax to revoke session
            alert('User signed out.');
            abandon();
        });
        abandon();
    });
    function abandon() {

        $.ajax({
            url: "/Home/abandon",
            async: false,
            contentType: "application/json; charset=utf-8",
            datatype: JSON,
            success: successabandon,
            error: function (xhr, ajaxOption) {
                toastr["error"]("Error in creating User!")
                alert(xhr.responseText);
                alert(thrownError);
            }

        });

    }
    function successabandon(x) {
        window.location.href = '/Home/Index';
    }
});
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}