var imgpath1 = "";
var sessionperson = 0;
$("#nameetcedit").hide();
$("#personaledit").hide();
$("#profedit").hide();
$("#eduedit").hide();
$("#savename").click(function () {
    var fname = $("#fname1").val();
    var lname = $("#lname1").val();
    var gender = $("#gender1").val();
    var bdate = $("#bDate1").val();
    var contact = $("#phn1").val();

    if (fname == "")
        alert("Please Enter First Name");
    else {
        //alert(fname);
        document.getElementById("fname").value = fname;
        document.getElementById("lname").value = lname;
        document.getElementById("gender").value = gender;
        document.getElementById("bdate").value = bdate;
        document.getElementById("phn").value = contact;
        if (lname == "")
            lname = " ";
        if (gender == "")
           gender = " ";
        if (bdate == "")
            bdate = '1900-01-01';
        if (contact == "")
            contact = " ";

        updateProfile(fname, lname, gender, bdate, contact);
        $("#nameetcedit").hide();
        $("#nameetc").show();
        window.location.href = '/Profile/Index';
    }
    
    //updateImage();

});
ajaxEmailViaSession();
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

    //Over Here you can Get the email add of registered user.
}
function successfunctionauth2(x) {
    var d = $.parseJSON(x);
    if (d[0].LastName != null) {
        $('p#user-name').text(d[0].FirstName + " " + d[0].LastName);
    }
    else
        $('p#user-name').text(d[0].FirstName);
    if (d[0].ProfileImageURL != null) {
        var imgpath = "../img/ProfileImages/" + d[0].ProfileImageURL;
        $('#user-image').prop('href', imgpath);
        //$('#user-image').attr('src', imgpath);
    }
    else {

    }
}
getPersonalDetails();
function getPersonalDetails() {

    $.ajax({
        url: "/Profile/getPersonal",
        data: { "uid": sessionperson },
        //type: "POST",
        async: false,
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        success: successfunction2,
        error: function (xhr, ajaxOption) {

            alert(xhr.responseText);
            alert(thrownError);
        }

    });
}

function successfunction2(x) {
    var d = $.parseJSON(x);
    document.getElementById("fname").value = d[0].FirstName;
    document.getElementById("lname").value = d[0].LastName;
    document.getElementById("gender").value = d[0].Gender;
    
    if (d[0].BirthDate != '') {
        var a = /\/Date\((\d*)\)\//.exec(d[0].BirthDate);
        
        if (a) {
            var dt = new Date(+a[1]);

            var date = dt.toDateString();

        }
        else
            var date = "";//
    }
   
    document.getElementById("bdate").value = date;
    document.getElementById("phn").value = d[0].ContactNumber;
    document.getElementById("fname1").value = d[0].FirstName;
    document.getElementById("lname1").value = d[0].LastName;
    document.getElementById("gender1").value = d[0].Gender;
    document.getElementById("bDate1").value = date;
    document.getElementById("phn1").value = d[0].ContactNumber;
    if (d[0].ProfileImageURL != null) {
        var imgpath = "../img/ProfileImages/" + d[0].ProfileImageURL;
        $('#dp').attr('src', imgpath);
    }
    else {
       
    }
    if (d[0].ProfileImageURL != null) {
        var imgpath = "../img/ProfileImages/" + d[0].ProfileImageURL;
        $('#image').attr('src', imgpath);
        $('#image1').attr('src', imgpath);
        $('#user-image').attr('src', imgpath);
    }
    else {

    }
    

}
//
$("#cancel").click(function () {
    document.getElementById("fname1").value = document.getElementById("fname").value;
    document.getElementById("lname1").value = document.getElementById("lname").value;
    document.getElementById("gender1").value = document.getElementById("gender").value;
    document.getElementById("bDate1").value = document.getElementById("bdate").value;
    document.getElementById("phn1").value = document.getElementById("phn").value;
    $("#nameetcedit").hide();
    $("#nameetc").show();
});
$("#nameofperson").click(function () {
    $("#nameetc").hide();
    $("#nameetcedit").show();
});
$("#personbtn").click(function () {
    $("#personal").hide();
    $("#personaledit").show();
});
$("#profbtn").click(function () {
    $("#prof").hide();
    $("#profedit").show();
});
$("#edubtn").click(function () {
    $("#edu").hide();
    $("#eduedit").show();
});

$("#saveper").click(function () {
    document.getElementById("name1").value = document.getElementById("name1edit").value;
    document.getElementById("email1").value = document.getElementById("email1edit").value;
    $("#personaledit").hide();
    $("#personal").show();
});
$("#saveprof").click(function () {
    document.getElementById("name2").value = document.getElementById("name2edit").value;
    document.getElementById("email2").value = document.getElementById("email2edit").value;
    $("#profedit").hide();
    $("#prof").show();
});
$("#saveedu").click(function () {
    document.getElementById("name3").value = document.getElementById("name3edit").value;
    document.getElementById("email3").value = document.getElementById("email3edit").value;
    $("#eduedit").hide();
    $("#edu").show();
});
$(document).ready(function () {
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {

                $('#image').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#file").change(function () {
        readURL(this);
    });
});

function updateImage() {
    alert("hey");
    $.ajax({
        url: "/Profile/updateimage",
        data: { "imagepath": imgpath1 },
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
function successfunction(x) {
    alert("Heeehawww");
    //..
}
function updateProfile(fname, lname, gender, bdate, contact) {
    $.ajax({
        url: "/Profile/updateProfile",
        data: { "uid": sessionperson, "fname": fname, "lname": lname, "bdate": bdate, "gender": gender, "num": contact },
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
    //..
}
var data = [
    {
        value: 50,
        color: "#008000",
        highlight: "#004d00",
        label: "Visited"
    },
    {
        value: 300,
        color: "#e5e5e5",
        highlight: "#cbcbcb",
        label: "Unvisited"
    },

]
var ctx = document.getElementById("myChart").getContext("2d");
var myDoughnutChart = new Chart(ctx).Doughnut(data);