$('#email').keypress(function (e) {

    var key = e.which;
    if (key == 13)  // the enter key code
    {
        $("#btn1").trigger('click');

    }
});

$("#btn1").click(function () {
    $("#btn1").prop('disabled', true);
    var email = $("#email").val();
    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
    var code = Math.floor((Math.random() * 100000) + 1);
    if (email == "")
        alert("Please provide valid Email!");
    else if (!isEmail(email)) {
        toastr["error"]("Email is not Valid!!!", "Validation Error");
        $("#email").val("");
    }
    else {

        $.ajax({
            url: "/Home/sendmail",
            data: { "email": email, "code": code },
            async: false,
            contentType: "application/json; charset=utf-8",
            datatype: JSON,
            success: successfunction,
            error: function (xhr, ajaxOption) {

                alert(xhr.responseText);
                alert(thrownError);
            }

        });

    }
});
function successfunction(x) {
    if (x == "Invalid")
        toastr["error"]("Email is not present in our Record! Try Again", "Error");
    else
    window.location.href = '/Home/ForgotPasswordContd';
    //..
}
$("#reset").click(function () {
    window.location.href = '/Home/Login';
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