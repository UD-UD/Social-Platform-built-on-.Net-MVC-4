//angular.module('myApp', []).controller('personCtrl', function ($scope) {
//    $scope.person = [
//        { name: 'John Richard Lindsay', src: "/images/PXPR4389800.jpg", birthyear: 1958, deathyear: 2010, birthdate: '10-July-1958', deathdate: '15-Sept-2010', sharedBy: 'Kenedy Williams', description: 'John Richard Lindsay died peacefully 14th October laukaemia. Much loved by Tub and Southerly and many friends. Funeral at St. Margaret\'s Church, Fernhurt, 6th November at 2:45 p.m. Enquiries 01428643524', regretCount: 120, condolenceCount: 10, lendHandCount: 1, shareCount: 5 },
//        { name: 'Hege', src: "/images/diya2.png", birthyear: 1958, deathyear: 2010, birthdate: '10-July-1958', deathdate: '15-Sept-2010', sharedBy: 'Kenedy Williams', description: 'John Richard Lindsay died peacefully 14th October laukaemia. Much loved by Tub and Southerly and many friends. Funeral at St. Margaret\'s Church, Fernhurt, 6th November at 2:45 p.m. Enquiries 01428643524', regretCount: 120, condolenceCount: 10, lendHandCount: 1, shareCount: 5 },
//        { name: 'Kai', src: "/images/Icons/avatar83.png", birthyear: 1958, deathyear: 2010, birthdate: '10-July-1958', deathdate: '15-Sept-2010', sharedBy: 'Kenedy Williams', description: 'John Richard Lindsay died peacefully 14th October laukaemia. Much loved by Tub and Southerly and many friends. Funeral at St. Margaret\'s Church, Fernhurt, 6th November at 2:45 p.m. Enquiries 01428643524', regretCount: 120, condolenceCount: 10, lendHandCount: 1, shareCount: 5 },
//        { name: 'Mini', src: "/images/Icons/avatar83.png", birthyear: 1958, deathyear: 2010, birthdate: '10-July-1958', deathdate: '15-Sept-2010', sharedBy: 'Kenedy Williams', description: 'John Richard Lindsay died peacefully 14th October laukaemia. Much loved by Tub and Southerly and many friends. Funeral at St. Margaret\'s Church, Fernhurt, 6th November at 2:45 p.m. Enquiries 01428643524', regretCount: 120, condolenceCount: 10, lendHandCount: 1, shareCount: 5 },
//        { name: 'Jobes', src: "/images/diya.png", birthyear: 1958, deathyear: 2010, birthdate: '10-July-1958', deathdate: '15-Sept-2010', sharedBy: 'Kenedy Williams', description: 'John Richard Lindsay died peacefully 14th October laukaemia. Much loved by Tub and Southerly and many friends. Funeral at St. Margaret\'s Church, Fernhurt, 6th November at 2:45 p.m. Enquiries 01428643524', regretCount: 120, condolenceCount: 10, lendHandCount: 1, shareCount: 5 },
//        { name: 'Bush', src: "/images/Icons/avatar83.png", birthyear: 1958, deathyear: 2010, birthdate: '10-July-1958', deathdate: '15-Sept-2010', sharedBy: 'Kenedy Williams', description: 'John Richard Lindsay died peacefully 14th October laukaemia. Much loved by Tub and Southerly and many friends. Funeral at St. Margaret\'s Church, Fernhurt, 6th November at 2:45 p.m. Enquiries 01428643524', regretCount: 120, condolenceCount: 10, lendHandCount: 1, shareCount: 5 }
//    ];
//    $scope.clickRegret = function () {
//        $scope.person[0].regretCount += 1;
//    }
//    $scope.clickRegisterSignin = function () {
//        alert("Register or Sign in First!");
//    }
//});


//var arr = [];

//getAnnouncementDetails();
function getAnnouncementDetails() {

    $.ajax({
        url: "/UnRegistered/GetAnnouncementDetails",
        //data: { "name": name, "toDate": toDate, "fromDate": fromDate, },
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
    //window.location.href = '/Registered/Index';
    //alert(x);
    var v = $.parseJSON(x);
    //alert(v);
    //var arr=[];
    //alert("a");
    var srcImage = "/images/PXPR4389800.jpg";
    var srcAvatar = "/images/Icons/avatar83.png";
    var srcHand = "/images/Icons/hand-1.png";
    var srcRegret = "/images/Icons/sad53.png";
    var srcConImage = "/images/MyCondolences.png";
    var href = "/UnRegistered/IndividualAnnouncement";
    var share = "/images/Icons/share41.png";
    var bubble = "/images/Icons/speech bubble10.png";

    splitquerystring();
    var id;
    //var queryString = new Array();
    function splitquerystring() {
        //if (queryString.length == 0) {

        if (window.location.search.split('?').length > 1) {
            var params = window.location.search.split('?')[1];
            //for (var i = 0; i < params.length; i++) {
            //var key = params[i].split('=')[0];
            id = decodeURIComponent(params.split('=')[1]);
            //queryString[key] = value;
            //}
        }
        //}
        //if (queryString["name"] != null) {
        //    var data = "<u>Values from QueryString</u><br /><br />";
        //    data += "<b>Name:</b> " + queryString["name"];
        //    alert(data);
        //}
    };
    $.each(v, function (i, d) {
        if (d.AnnouncementID == id) {
            var bD = new Date(parseInt((d.DateOfBirth).substr(6)));
            var dD = new Date(parseInt((d.DateOfDemise).substr(6)));
            bD = bD + "";
            dD = dD + "";
            var bDate = bD.substring(3, 15);
            var dDate = dD.substring(3, 15);
            bYear = bD.substring(10, 15);
            dYear = dD.substring(10, 15);
            $('#divDiv').append('<br /><br /><div class="row"><aside class="col-sm-1"></aside><section class="col-sm-5"><div style="border: 1px solid white ;width:460px;height:150px;background-color:white"><section class="col-sm-3"><img src="' + srcAvatar + '" class="img-circle" alt="Photo" width="150" height="140"></section><aside class="col-sm-2"></aside><section class="col-sm-6"><div class="row" style="color:white">********</div><div class="row"><label id="lName">' + d.DeceasedName + '</label></div><div class="row"><label id="lBirthDeath">(' + bYear + '-' + dYear + ')</label></div></section></div></section><section class="col-sm-5"><div style="border: 1px solid white ;width:450px;height:150px;background-color:white;text-align:center"><div class="row" style="color:white">********</div><div class="row"><label>Date of Birth</label><label id="lBirth" style="font-weight:lighter">&nbsp;&nbsp;&nbsp;' + bDate + '</label></div><div class="row"><label>Date of Demise</label><label id="lDemise" style="font-weight:lighter">&nbsp;&nbsp;&nbsp;' + dDate + '</label></div><div class="row"><label>Shared by</label><label id="lSharedBy" style="font-weight:lighter">&nbsp;&nbsp;&nbsp;' + d.CreatedUserName + '</label></div></div></section></div><br /><div class="row"><aside class="col-sm-1"></aside><section class="col-sm-10"><div style="border: 1px solid white ;width:1030px;height:200px;background-color:white"><div class="col-sm-4"><img src="' + srcConImage + '" alt="Image" width="450" height="190"></div><aside class="col-sm-2"></aside><section class="col-sm-6"><div class="row" style="color:white">********</div><div class="row"><label id="lDescription" style="font-weight:lighter">' + d.AnnouncementText + '</label></div><div class="row" style="color:white">********</div><div class="row"><aside class="col-sm-1"></aside><section class="col-sm-10"><div class="col-sm-3"><img src="' + srcRegret + '" class="opacity_img" alt="Regrets" width="20" height="20" onclick="clickRegisterSignin()"><label id="lRegret" style="font-weight:lighter">(' + d.RegretCount + ')</label></div><div class="col-sm-3"><img src="' + bubble + '" class="opacity_img" alt="Condolences" width="20" height="20" onclick="clickRegisterSignin()"></div><div class="col-sm-3"><img src="' + srcHand + '" class="opacity_img" alt="Lend a Hand" width="20" height="20" onclick="clickRegisterSignin()"></div><div class="col-sm-3"><img src="' + share + '" class="opacity_img" alt="Shares" width="20" height="20" onclick="clickRegisterSignin()"><label id="lShare" style="font-weight:lighter">(' + d.NumberOfShares + ')</label></div></section></div></section></div></section></div>');
        }
    });
}

function clickRegisterSignin() {
    //alert("Register or Sign in First!");
        toastr["error"]("Register or Sign in First!", "Unregistered");
}

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "100",
    "hideDuration": "100",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}