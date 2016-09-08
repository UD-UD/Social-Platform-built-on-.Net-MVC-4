$("#btn1").click(function () {
    var email=$('#mail').val();
    var code = $('#code').val();
        $.ajax({
            url: "/Home/getMail",
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
});
function successfunction(x) {
    var newpw = $("#confirmpw").val();
    $.ajax({
        url: "/Home/ResetPw",
        data: { "email": x, "pw": newpw },
        async: false,
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        success: successfunction1,
        error: function (xhr, ajaxOption) {

            alert(xhr.responseText);
            alert(thrownError);
        }

    });
}
function successfunction1(x) {
    toastr["success"]("Password Reset Successful!")
    setTimeout(function () {
        window.location.href = '/Home/Login';
    }, 200);
}
toastr.options = {
    "closeButton": false,
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