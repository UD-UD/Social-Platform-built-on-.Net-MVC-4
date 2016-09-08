function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
$('#password').keypress(function (e) {
    
    var key = e.which;
    if (key == 13)  // the enter key code
    {
         $("#submitBtn1").trigger('click');
   
    }
});
$("#submitBtn1").click(function () {
    var uname = document.getElementById('username').value;
    var string1 = document.getElementById('password').value;
    if (uname == "" || string1 == "") {
        toastr["error"]("Please fill both fields!","Validation Error")
    }
    else {
    //    if (!isEmail(email)) {
      //      toastr["error"]("Email is not Valid!!!", "Validation Error");
        //}
        //else {
            validateUser(uname, string1);

        //}
    }
    //ajax1(string1);

});
$("#forgot").click(function () {
        window.location.href = '/Home/Forgot';
});
function validateUser(uname, pw) {
    $.ajax({
        url: "/Home/ValidateUser",
        data: { "uname": uname, "pw": pw,},
        async: false,
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        success: successfunction,
        error: function (xhr, ajaxOption) {
            toastr["error"]("Invalid Credentials!")
            alert(xhr.responseText);
            alert(thrownError);
        }

    });
}
function successfunction(x) {
   
    if (x == "true") {
        window.location.href = '/Registered/Index';
    }
    else {
        toastr["error"]("Invalid Credentials!")
        $('#username').val("");
        $('#password').val("");
    }
   // 
}
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