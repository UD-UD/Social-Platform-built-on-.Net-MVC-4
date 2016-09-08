//angular.module('myApp', []).controller('personsCtrl', function ($scope) {
//    $scope.persons = [
//        { name: 'Jani', src: "/images/diya.png", regretCount: 120 },
//        { name: 'Hege', src: "/images/diya2.png", regretCount: 50 },
//        { name: 'Kai', src: "/images/diya.png", regretCount: 101 },
//        { name: 'Mini', src: "/images/diya2.png", regretCount: 95 },
//        { name: 'Jobes', src: "/images/diya.png", regretCount: 155 },
//        { name: 'Bush', src: "/images/diya2.png", regretCount: 45 }
//    ];
//    $scope.clickRegisterSignin=function()
//    {
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
    var srcImage = "/images/diya.png";
    var srcAvatar = "/images/Icons/avatar83.png";
    var srcHand = "/images/Icons/hand-1.png";
    var href = "/UnRegistered/IndividualAnnouncement";
    var share = "/images/Icons/share41.png";
    var bubble = "/images/Icons/speech bubble10.png";
    $.each(v, function (i, d) {

        $('#divRow').append('<section class="col-sm-3"><div style="padding-left: 20px;padding-right:10px; padding-bottom:10px;padding-top:10px"><div style="border: 1px solid white; width: 300px; height: 300px; background-color: white; float:left" id="divBox" onclick=f((this).getElementsByClassName("clsID")[0].innerHTML)><img src="' + srcAvatar + '" width="15" height="15" style="float: left; background-color: #CFCDCD" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="clsNm" style="font-weight: bold; font-size: 15px; color: #9b9797;">' + d.DeceasedName + '</label><label class="clsID" style="color:white">' + d.AnnouncementID + '</label><hr /><img src="' + srcImage + '" style="padding-left:50px" alt="photo" width="250" height="160"><br /><div style="float:right;font-weight:bold"><a href="' + href + '">...</a></div><hr /><a><label id="labelRegretCount" style="padding-left:10px"> ' + d.RegretCount + ' regrets</label></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + share + '" class="opacity_img" alt="Shares" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + bubble + '" class="opacity_img" alt="Condolences" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + srcHand + '" class="opacity_img" alt="Condolences" width="20" height="20"></div></div></section>');
        //    arr.push({
        //        "DeceasedName": d.DeceasedName,
        //        "DateOfDemise": d.DateOfDemise,
        //        "Gender": d.Gender,
        //        "Image": d.Image,
        //        "AnnouncementText": d.AnnouncementText,
        //        "NumberOfShares": d.NumberOfShares,
        //        "ContentImage": d.ContentImage,
        //        "DateOfBirth": d.DateOfBirth,
        //        "RegretCount": d.RegretCount,
        //        "CreatedUserName": d.CreatedUserName,
        //        "ProfileImage": d.ProfileImage
        //    });

    });
    if (document.getElementById("divRow").innerHTML == "") {
        toastr["error"]("No Data!", "Empty")
    }
}
function f(id) {
    window.location.href = '/UnRegistered/IndividualAnnouncement?i=' + encodeURIComponent(id);
}

$("#checkboxM").change(function () {
    var chF = document.getElementById("checkboxF");
    var chM = document.getElementById("checkboxM");
    var nm = $("#tbFilterName").val();
    var fD = $("#fDate").val();
    var tD = $("#tDate").val();

    //if (!this.checked && !chF.checked) {
    //    document.getElementById("divRow").innerHTML = "";
    //    getAnnouncementDetails();
    //}
    //if (!this.checked && chF.checked) {
    //    document.getElementById("divRow").innerHTML = "";
    //    getFemaleAnnouncementDetails();
    //}
    //if (this.checked && !chF.checked) {
    //    document.getElementById("divRow").innerHTML = "";
    //    getMaleAnnouncementDetails();
    //}
    //if (this.checked && chF.checked) {
    //    document.getElementById("divRow").innerHTML = "";
    //    getAnnouncementDetails();
    //}
    if (fD == "" && tD == "") {
        document.getElementById("divRow").innerHTML = "";
        if (!chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNm(nm);
        }
        if (!chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getFemaleAnnouncementDetailsFilterGenNm(nm);
        }
        if (chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getMaleAnnouncementDetailsFilterGenNm(nm);
        }
        if (chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNm(nm);
        }
    }
    else if (fD != "" && tD == "") {
        document.getElementById("divRow").innerHTML = "";
        if (!chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmFDt(nm, fD);
        }
        if (!chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getFemaleAnnouncementDetailsFilterGenNmFDt(nm, fD);
        }
        if (chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getMaleAnnouncementDetailsFilterGenNmFDt(nm, fD);
        }
        if (chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmFDt(nm, fD);
        }
    }
    else if (fD == "" && tD != "") {
        document.getElementById("divRow").innerHTML = "";
        if (!chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmTDt(nm, tD);
        }
        if (!chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getFemaleAnnouncementDetailsFilterGenNmTDt(nm, tD);
        }
        if (chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getMaleAnnouncementDetailsFilterGenNmTDt(nm, tD);
        }
        if (chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmTDt(nm, tD);
        }
    }
    else {
        document.getElementById("divRow").innerHTML = "";
        if (!chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmDt(nm, fD, tD);
        }
        if (!chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getFemaleAnnouncementDetailsFilterGenNmDt(nm, fD, tD);
        }
        if (chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getMaleAnnouncementDetailsFilterGenNmDt(nm, fD, tD);
        }
        if (chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmDt(nm, fD, tD);
        }
    }
});

$("#checkboxF").change(function () {
    var chF = document.getElementById("checkboxF");
    var chM = document.getElementById("checkboxM");
    var nm = $("#tbFilterName").val();
    var fD = $("#fDate").val();
    var tD = $("#tDate").val();
    //if (!this.checked && !ch.checked) {
    //    document.getElementById("divRow").innerHTML = "";
    //    getAnnouncementDetails();
    //}
    //if (!this.checked && ch.checked) {
    //    document.getElementById("divRow").innerHTML = "";
    //    getMaleAnnouncementDetails();
    //}
    //if (this.checked && !ch.checked) {
    //    document.getElementById("divRow").innerHTML = "";
    //    getFemaleAnnouncementDetails();
    //}
    //if (this.checked && ch.checked) {
    //    document.getElementById("divRow").innerHTML = "";
    //    getAnnouncementDetails();
    //}
    if (fD == "" && tD == "") {
        document.getElementById("divRow").innerHTML = "";
        if (!chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNm(nm);
        }
        if (!chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getFemaleAnnouncementDetailsFilterGenNm(nm);
        }
        if (chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getMaleAnnouncementDetailsFilterGenNm(nm);
        }
        if (chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNm(nm);
        }
    }
    else if (fD != "" && tD == "") {
        document.getElementById("divRow").innerHTML = "";
        if (!chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmFDt(nm, fD);
        }
        if (!chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getFemaleAnnouncementDetailsFilterGenNmFDt(nm, fD);
        }
        if (chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getMaleAnnouncementDetailsFilterGenNmFDt(nm, fD);
        }
        if (chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmFDt(nm, fD);
        }
    }
    else if (fD == "" && tD != "") {
        document.getElementById("divRow").innerHTML = "";
        if (!chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmTDt(nm, tD);
        }
        if (!chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getFemaleAnnouncementDetailsFilterGenNmTDt(nm, tD);
        }
        if (chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getMaleAnnouncementDetailsFilterGenNmTDt(nm, tD);
        }
        if (chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmTDt(nm, tD);
        }
    }
    else {
        document.getElementById("divRow").innerHTML = "";
        if (!chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmDt(nm, fD, tD);
        }
        if (!chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getFemaleAnnouncementDetailsFilterGenNmDt(nm, fD, tD);
        }
        if (chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getMaleAnnouncementDetailsFilterGenNmDt(nm, fD, tD);
        }
        if (chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmDt(nm, fD, tD);
        }
    }
});

function getMaleAnnouncementDetails() {

    $.ajax({
        url: "/UnRegistered/GetMaleAnnouncementDetails",
        //data: { "name": name, "toDate": toDate, "fromDate": fromDate, },
        async: false,
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        success: successfunctionM,
        error: function (xhr, ajaxOption) {

            alert(xhr.responseText);
            alert(thrownError);
        }

    });
}

function successfunctionM(x) {
    //window.location.href = '/Registered/Index';
    //alert(x);
    var v = $.parseJSON(x);
    //alert(v);
    //var arr=[];
    //alert("a");
    var srcImage = "/images/diya.png";
    var srcAvatar = "/images/Icons/avatar83.png";
    var srcHand = "/images/Icons/hand-1.png";
    var href = "/UnRegistered/IndividualAnnouncement";
    var share = "/images/Icons/share41.png";
    var bubble = "/images/Icons/speech bubble10.png";
    $.each(v, function (i, d) {

        $('#divRow').append('<section class="col-sm-3"><div style="padding-left: 20px;padding-right:10px; padding-bottom:10px;padding-top:10px"><div style="border: 1px solid white; width: 300px; height: 300px; background-color: white; float:left" id="divBox" onclick=f((this).getElementsByClassName("clsID")[0].innerHTML)><img src="' + srcAvatar + '" width="15" height="15" style="float: left; background-color: #CFCDCD" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="clsNm" style="font-weight: bold; font-size: 15px; color: #9b9797;">' + d.DeceasedName + '</label><label class="clsID" style="color:white">' + d.AnnouncementID + '</label><hr /><img src="' + srcImage + '" style="padding-left:50px" alt="photo" width="250" height="160"><br /><div style="float:right;font-weight:bold"><a href="' + href + '">...</a></div><hr /><a><label id="labelRegretCount" style="padding-left:10px"> ' + d.RegretCount + ' regrets</label></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + share + '" class="opacity_img" alt="Shares" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + bubble + '" class="opacity_img" alt="Condolences" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + srcHand + '" class="opacity_img" alt="Condolences" width="20" height="20"></div></div></section>');
        //    arr.push({
        //        "DeceasedName": d.DeceasedName,
        //        "DateOfDemise": d.DateOfDemise,
        //        "Gender": d.Gender,
        //        "Image": d.Image,
        //        "AnnouncementText": d.AnnouncementText,
        //        "NumberOfShares": d.NumberOfShares,
        //        "ContentImage": d.ContentImage,
        //        "DateOfBirth": d.DateOfBirth,
        //        "RegretCount": d.RegretCount,
        //        "CreatedUserName": d.CreatedUserName,
        //        "ProfileImage": d.ProfileImage
        //    });

    });
    if (document.getElementById("divRow").innerHTML == "") {
        toastr["error"]("No Data!", "Empty")
    }
}

function getFemaleAnnouncementDetails() {

    $.ajax({
        url: "/UnRegistered/GetFemaleAnnouncementDetails",
        //data: { "name": name, "toDate": toDate, "fromDate": fromDate, },
        async: false,
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        success: successfunctionF,
        error: function (xhr, ajaxOption) {

            alert(xhr.responseText);
            alert(thrownError);
        }

    });
}

function successfunctionF(x) {
    //window.location.href = '/Registered/Index';
    //alert(x);
    var v = $.parseJSON(x);
    //alert(v);
    //var arr=[];
    //alert("a");
    var srcImage = "/images/diya.png";
    var srcAvatar = "/images/Icons/avatar83.png";
    var srcHand = "/images/Icons/hand-1.png";
    var href = "/UnRegistered/IndividualAnnouncement";
    var share = "/images/Icons/share41.png";
    var bubble = "/images/Icons/speech bubble10.png";
    $.each(v, function (i, d) {

        $('#divRow').append('<section class="col-sm-3"><div style="padding-left: 20px;padding-right:10px; padding-bottom:10px;padding-top:10px"><div style="border: 1px solid white; width: 300px; height: 300px; background-color: white; float:left" id="divBox" onclick=f((this).getElementsByClassName("clsID")[0].innerHTML)><img src="' + srcAvatar + '" width="15" height="15" style="float: left; background-color: #CFCDCD" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="clsNm" style="font-weight: bold; font-size: 15px; color: #9b9797;">' + d.DeceasedName + '</label><label class="clsID" style="color:white">' + d.AnnouncementID + '</label><hr /><img src="' + srcImage + '" style="padding-left:50px" alt="photo" width="250" height="160"><br /><div style="float:right;font-weight:bold"><a href="' + href + '">...</a></div><hr /><a><label id="labelRegretCount" style="padding-left:10px"> ' + d.RegretCount + ' regrets</label></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + share + '" class="opacity_img" alt="Shares" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + bubble + '" class="opacity_img" alt="Condolences" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + srcHand + '" class="opacity_img" alt="Condolences" width="20" height="20"></div></div></section>');

    });
    if (document.getElementById("divRow").innerHTML == "") {
        toastr["error"]("No Data!", "Empty")
    }
}

$("#tbFilterName").keyup(function () {
    //if (e.which == 13) {
    var nm = $("#tbFilterName").val();
    //alert(nm);
    var chM = document.getElementById("checkboxM");
    var chF = document.getElementById("checkboxF");

    var fD = $("#fDate").val();
    var tD = $("#tDate").val();

    if (fD == "" && tD == "") {
        document.getElementById("divRow").innerHTML = "";
        if (!chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNm(nm);
        }
        if (!chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getFemaleAnnouncementDetailsFilterGenNm(nm);
        }
        if (chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getMaleAnnouncementDetailsFilterGenNm(nm);
        }
        if (chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNm(nm);
        }
    }
    else if (fD != "" && tD == "") {
        document.getElementById("divRow").innerHTML = "";
        if (!chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmFDt(nm, fD);
        }
        if (!chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getFemaleAnnouncementDetailsFilterGenNmFDt(nm, fD);
        }
        if (chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getMaleAnnouncementDetailsFilterGenNmFDt(nm, fD);
        }
        if (chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmFDt(nm, fD);
        }
    }
    else if (fD == "" && tD != "") {
        document.getElementById("divRow").innerHTML = "";
        if (!chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmTDt(nm, tD);
        }
        if (!chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getFemaleAnnouncementDetailsFilterGenNmTDt(nm, tD);
        }
        if (chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getMaleAnnouncementDetailsFilterGenNmTDt(nm, tD);
        }
        if (chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmTDt(nm, tD);
        }
    }
    else {
        document.getElementById("divRow").innerHTML = "";
        if (!chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmDt(nm, fD, tD);
        }
        if (!chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getFemaleAnnouncementDetailsFilterGenNmDt(nm, fD, tD);
        }
        if (chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getMaleAnnouncementDetailsFilterGenNmDt(nm, fD, tD);
        }
        if (chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmDt(nm, fD, tD);
        }
    }
});

function getAnnouncementDetailsFilterGenNm(nm) {

    $.ajax({
        url: "/UnRegistered/GetAnnouncementDetailsFilterGenNm",
        data: { "name": nm + '%' },
        async: false,
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        success: successfunctionFilterGenNm,
        error: function (xhr, ajaxOption) {

            alert(xhr.responseText);
            alert(thrownError);
        }

    });
}

function successfunctionFilterGenNm(x) {
    var v = $.parseJSON(x);
    var srcImage = "/images/diya.png";
    var srcAvatar = "/images/Icons/avatar83.png";
    var srcHand = "/images/Icons/hand-1.png";
    var href = "/UnRegistered/IndividualAnnouncement";
    var share = "/images/Icons/share41.png";
    var bubble = "/images/Icons/speech bubble10.png";
    $.each(v, function (i, d) {
        $('#divRow').append('<section class="col-sm-3"><div style="padding-left: 20px;padding-right:10px; padding-bottom:10px;padding-top:10px"><div style="border: 1px solid white; width: 300px; height: 300px; background-color: white; float:left" id="divBox" onclick=f((this).getElementsByClassName("clsID")[0].innerHTML)><img src="' + srcAvatar + '" width="15" height="15" style="float: left; background-color: #CFCDCD" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="clsNm" style="font-weight: bold; font-size: 15px; color: #9b9797;">' + d.DeceasedName + '</label><label class="clsID" style="color:white">' + d.AnnouncementID + '</label><hr /><img src="' + srcImage + '" style="padding-left:50px" alt="photo" width="250" height="160"><br /><div style="float:right;font-weight:bold"><a href="' + href + '">...</a></div><hr /><a><label id="labelRegretCount" style="padding-left:10px"> ' + d.RegretCount + ' regrets</label></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + share + '" class="opacity_img" alt="Shares" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + bubble + '" class="opacity_img" alt="Condolences" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + srcHand + '" class="opacity_img" alt="Condolences" width="20" height="20"></div></div></section>');
    });
    if (document.getElementById("divRow").innerHTML == "") {
        toastr["error"]("No Data!", "Empty")
    }
}

function getFemaleAnnouncementDetailsFilterGenNm(nm) {

    $.ajax({
        url: "/UnRegistered/GetFemaleAnnouncementDetailsFilterGenNm",
        data: { "name": nm + '%' },
        async: false,
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        success: successfunctionFemaleFilterGenNm,
        error: function (xhr, ajaxOption) {

            alert(xhr.responseText);
            alert(thrownError);
        }

    });
}

function successfunctionFemaleFilterGenNm(x) {
    var v = $.parseJSON(x);
    var srcImage = "/images/diya.png";
    var srcAvatar = "/images/Icons/avatar83.png";
    var srcHand = "/images/Icons/hand-1.png";
    var href = "/UnRegistered/IndividualAnnouncement";
    var share = "/images/Icons/share41.png";
    var bubble = "/images/Icons/speech bubble10.png";
    $.each(v, function (i, d) {
        $('#divRow').append('<section class="col-sm-3"><div style="padding-left: 20px;padding-right:10px; padding-bottom:10px;padding-top:10px"><div style="border: 1px solid white; width: 300px; height: 300px; background-color: white; float:left" id="divBox" onclick=f((this).getElementsByClassName("clsID")[0].innerHTML)><img src="' + srcAvatar + '" width="15" height="15" style="float: left; background-color: #CFCDCD" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="clsNm" style="font-weight: bold; font-size: 15px; color: #9b9797;">' + d.DeceasedName + '</label><label class="clsID" style="color:white">' + d.AnnouncementID + '</label><hr /><img src="' + srcImage + '" style="padding-left:50px" alt="photo" width="250" height="160"><br /><div style="float:right;font-weight:bold"><a href="' + href + '">...</a></div><hr /><a><label id="labelRegretCount" style="padding-left:10px"> ' + d.RegretCount + ' regrets</label></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + share + '" class="opacity_img" alt="Shares" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + bubble + '" class="opacity_img" alt="Condolences" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + srcHand + '" class="opacity_img" alt="Condolences" width="20" height="20"></div></div></section>');
    });
    if (document.getElementById("divRow").innerHTML == "") {
        toastr["error"]("No Data!", "Empty")
    }
}

function getMaleAnnouncementDetailsFilterGenNm(nm) {

    $.ajax({
        url: "/UnRegistered/GetMaleAnnouncementDetailsFilterGenNm",
        data: { "name": nm + '%' },
        async: false,
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        success: successfunctionMaleFilterGenNm,
        error: function (xhr, ajaxOption) {

            alert(xhr.responseText);
            alert(thrownError);
        }

    });
}

function successfunctionMaleFilterGenNm(x) {
    var v = $.parseJSON(x);
    var srcImage = "/images/diya.png";
    var srcAvatar = "/images/Icons/avatar83.png";
    var srcHand = "/images/Icons/hand-1.png";
    var href = "/UnRegistered/IndividualAnnouncement";
    var share = "/images/Icons/share41.png";
    var bubble = "/images/Icons/speech bubble10.png";
    $.each(v, function (i, d) {
        $('#divRow').append('<section class="col-sm-3"><div style="padding-left: 20px;padding-right:10px; padding-bottom:10px;padding-top:10px"><div style="border: 1px solid white; width: 300px; height: 300px; background-color: white; float:left" id="divBox" onclick=f((this).getElementsByClassName("clsID")[0].innerHTML)><img src="' + srcAvatar + '" width="15" height="15" style="float: left; background-color: #CFCDCD" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="clsNm" style="font-weight: bold; font-size: 15px; color: #9b9797;">' + d.DeceasedName + '</label><label class="clsID" style="color:white">' + d.AnnouncementID + '</label><hr /><img src="' + srcImage + '" style="padding-left:50px" alt="photo" width="250" height="160"><br /><div style="float:right;font-weight:bold"><a href="' + href + '">...</a></div><hr /><a><label id="labelRegretCount" style="padding-left:10px"> ' + d.RegretCount + ' regrets</label></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + share + '" class="opacity_img" alt="Shares" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + bubble + '" class="opacity_img" alt="Condolences" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + srcHand + '" class="opacity_img" alt="Condolences" width="20" height="20"></div></div></section>');
    });
    if (document.getElementById("divRow").innerHTML == "") {
        toastr["error"]("No Data!", "Empty")
    }
}

$("#fDate").change(function () {
    var fD = $("#fDate").val();
    var tD = $("#tDate").val();
    var nm = $("#tbFilterName").val();
    var chM = document.getElementById("checkboxM");
    var chF = document.getElementById("checkboxF");
    if (fD != "" && tD != "") {
        document.getElementById("divRow").innerHTML = "";
        if (!chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmDt(nm, fD, tD);
        }
        if (!chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getFemaleAnnouncementDetailsFilterGenNmDt(nm, fD, tD);
        }
        if (chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getMaleAnnouncementDetailsFilterGenNmDt(nm, fD, tD);
        }
        if (chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmDt(nm, fD, tD);
        }
    }
    else if (fD != "" && tD == "") {
        document.getElementById("divRow").innerHTML = "";
        if (!chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmFDt(nm, fD);
        }
        if (!chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getFemaleAnnouncementDetailsFilterGenNmFDt(nm, fD);
        }
        if (chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getMaleAnnouncementDetailsFilterGenNmFDt(nm, fD);
        }
        if (chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmFDt(nm, fD);
        }
    }
});

$("#tDate").change(function () {
    var fD = $("#fDate").val();
    var tD = $("#tDate").val();
    var nm = $("#tbFilterName").val();
    var chM = document.getElementById("checkboxM");
    var chF = document.getElementById("checkboxF");
    if (fD != "" && tD != "") {
        document.getElementById("divRow").innerHTML = "";
        if (!chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmDt(nm, fD, tD);
        }
        if (!chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getFemaleAnnouncementDetailsFilterGenNmDt(nm, fD, tD);
        }
        if (chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getMaleAnnouncementDetailsFilterGenNmDt(nm, fD, tD);
        }
        if (chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmDt(nm, fD, tD);
        }
    }
    else if (fD == "" && tD != "") {
        document.getElementById("divRow").innerHTML = "";
        if (!chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmTDt(nm, tD);
        }
        if (!chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getFemaleAnnouncementDetailsFilterGenNmTDt(nm, tD);
        }
        if (chM.checked && !chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getMaleAnnouncementDetailsFilterGenNmTDt(nm, tD);
        }
        if (chM.checked && chF.checked) {
            document.getElementById("divRow").innerHTML = "";
            getAnnouncementDetailsFilterGenNmTDt(nm, tD);
        }
    }
});

function getAnnouncementDetailsFilterGenNmDt(nm, fD, tD) {

    $.ajax({
        url: "/UnRegistered/GetAnnouncementDetailsFilterGenNmDt",
        data: { "name": nm + '%', "fDate": fD, "tDate": tD },
        async: false,
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        success: successfunctionFilterGenNmDt,
        error: function (xhr, ajaxOption) {

            alert(xhr.responseText);
            alert(thrownError);
        }

    });
}

function successfunctionFilterGenNmDt(x) {
    var v = $.parseJSON(x);
    var srcImage = "/images/diya.png";
    var srcAvatar = "/images/Icons/avatar83.png";
    var srcHand = "/images/Icons/hand-1.png";
    var href = "/UnRegistered/IndividualAnnouncement";
    var share = "/images/Icons/share41.png";
    var bubble = "/images/Icons/speech bubble10.png";
    $.each(v, function (i, d) {
        $('#divRow').append('<section class="col-sm-3"><div style="padding-left: 20px;padding-right:10px; padding-bottom:10px;padding-top:10px"><div style="border: 1px solid white; width: 300px; height: 300px; background-color: white; float:left" id="divBox" onclick=f((this).getElementsByClassName("clsID")[0].innerHTML)><img src="' + srcAvatar + '" width="15" height="15" style="float: left; background-color: #CFCDCD" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="clsNm" style="font-weight: bold; font-size: 15px; color: #9b9797;">' + d.DeceasedName + '</label><label class="clsID" style="color:white">' + d.AnnouncementID + '</label><hr /><img src="' + srcImage + '" style="padding-left:50px" alt="photo" width="250" height="160"><br /><div style="float:right;font-weight:bold"><a href="' + href + '">...</a></div><hr /><a><label id="labelRegretCount" style="padding-left:10px"> ' + d.RegretCount + ' regrets</label></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + share + '" class="opacity_img" alt="Shares" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + bubble + '" class="opacity_img" alt="Condolences" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + srcHand + '" class="opacity_img" alt="Condolences" width="20" height="20"></div></div></section>');
    });
    if (document.getElementById("divRow").innerHTML == "") {
        toastr["error"]("No Data!", "Empty")
    }
}

function getFemaleAnnouncementDetailsFilterGenNmDt(nm, fD, tD) {

    $.ajax({
        url: "/UnRegistered/GetFemaleAnnouncementDetailsFilterGenNmDt",
        data: { "name": nm + '%', "fDate": fD, "tDate": tD },
        async: false,
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        success: successfunctionFemaleFilterGenNmDt,
        error: function (xhr, ajaxOption) {

            alert(xhr.responseText);
            alert(thrownError);
        }

    });
}

function successfunctionFemaleFilterGenNmDt(x) {
    var v = $.parseJSON(x);
    var srcImage = "/images/diya.png";
    var srcAvatar = "/images/Icons/avatar83.png";
    var srcHand = "/images/Icons/hand-1.png";
    var href = "/UnRegistered/IndividualAnnouncement";
    var share = "/images/Icons/share41.png";
    var bubble = "/images/Icons/speech bubble10.png";
    $.each(v, function (i, d) {
        $('#divRow').append('<section class="col-sm-3"><div style="padding-left: 20px;padding-right:10px; padding-bottom:10px;padding-top:10px"><div style="border: 1px solid white; width: 300px; height: 300px; background-color: white; float:left" id="divBox" onclick=f((this).getElementsByClassName("clsID")[0].innerHTML)><img src="' + srcAvatar + '" width="15" height="15" style="float: left; background-color: #CFCDCD" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="clsNm" style="font-weight: bold; font-size: 15px; color: #9b9797;">' + d.DeceasedName + '</label><label class="clsID" style="color:white">' + d.AnnouncementID + '</label><hr /><img src="' + srcImage + '" style="padding-left:50px" alt="photo" width="250" height="160"><br /><div style="float:right;font-weight:bold"><a href="' + href + '">...</a></div><hr /><a><label id="labelRegretCount" style="padding-left:10px"> ' + d.RegretCount + ' regrets</label></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + share + '" class="opacity_img" alt="Shares" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + bubble + '" class="opacity_img" alt="Condolences" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + srcHand + '" class="opacity_img" alt="Condolences" width="20" height="20"></div></div></section>');
    });
    if (document.getElementById("divRow").innerHTML == "") {
        toastr["error"]("No Data!", "Empty")
    }
}

function getMaleAnnouncementDetailsFilterGenNmDt(nm, fD, tD) {

    $.ajax({
        url: "/UnRegistered/GetMaleAnnouncementDetailsFilterGenNmDt",
        data: { "name": nm + '%', "fDate": fD, "tDate": tD },
        async: false,
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        success: successfunctionMaleFilterGenNmDt,
        error: function (xhr, ajaxOption) {

            alert(xhr.responseText);
            alert(thrownError);
        }

    });
}

function successfunctionMaleFilterGenNmDt(x) {
    var v = $.parseJSON(x);
    var srcImage = "/images/diya.png";
    var srcAvatar = "/images/Icons/avatar83.png";
    var srcHand = "/images/Icons/hand-1.png";
    var href = "/UnRegistered/IndividualAnnouncement";
    var share = "/images/Icons/share41.png";
    var bubble = "/images/Icons/speech bubble10.png";
    $.each(v, function (i, d) {
        $('#divRow').append('<section class="col-sm-3"><div style="padding-left: 20px;padding-right:10px; padding-bottom:10px;padding-top:10px"><div style="border: 1px solid white; width: 300px; height: 300px; background-color: white; float:left" id="divBox" onclick=f((this).getElementsByClassName("clsID")[0].innerHTML)><img src="' + srcAvatar + '" width="15" height="15" style="float: left; background-color: #CFCDCD" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="clsNm" style="font-weight: bold; font-size: 15px; color: #9b9797;">' + d.DeceasedName + '</label><label class="clsID" style="color:white">' + d.AnnouncementID + '</label><hr /><img src="' + srcImage + '" style="padding-left:50px" alt="photo" width="250" height="160"><br /><div style="float:right;font-weight:bold"><a href="' + href + '">...</a></div><hr /><a><label id="labelRegretCount" style="padding-left:10px"> ' + d.RegretCount + ' regrets</label></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + share + '" class="opacity_img" alt="Shares" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + bubble + '" class="opacity_img" alt="Condolences" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + srcHand + '" class="opacity_img" alt="Condolences" width="20" height="20"></div></div></section>');
    });
    if (document.getElementById("divRow").innerHTML == "") {
        toastr["error"]("No Data!", "Empty")
    }
}

function getAnnouncementDetailsFilterGenNmFDt(nm, fD) {

    $.ajax({
        url: "/UnRegistered/GetAnnouncementDetailsFilterGenNmFDt",
        data: { "name": nm + '%', "fDate": fD },
        async: false,
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        success: successfunctionFilterGenNmFDt,
        error: function (xhr, ajaxOption) {

            alert(xhr.responseText);
            alert(thrownError);
        }

    });
}

function successfunctionFilterGenNmFDt(x) {
    var v = $.parseJSON(x);
    var srcImage = "/images/diya.png";
    var srcAvatar = "/images/Icons/avatar83.png";
    var srcHand = "/images/Icons/hand-1.png";
    var href = "/UnRegistered/IndividualAnnouncement";
    var share = "/images/Icons/share41.png";
    var bubble = "/images/Icons/speech bubble10.png";
    $.each(v, function (i, d) {
        $('#divRow').append('<section class="col-sm-3"><div style="padding-left: 20px;padding-right:10px; padding-bottom:10px;padding-top:10px"><div style="border: 1px solid white; width: 300px; height: 300px; background-color: white; float:left" id="divBox" onclick=f((this).getElementsByClassName("clsID")[0].innerHTML)><img src="' + srcAvatar + '" width="15" height="15" style="float: left; background-color: #CFCDCD" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="clsNm" style="font-weight: bold; font-size: 15px; color: #9b9797;">' + d.DeceasedName + '</label><label class="clsID" style="color:white">' + d.AnnouncementID + '</label><hr /><img src="' + srcImage + '" style="padding-left:50px" alt="photo" width="250" height="160"><br /><div style="float:right;font-weight:bold"><a href="' + href + '">...</a></div><hr /><a><label id="labelRegretCount" style="padding-left:10px"> ' + d.RegretCount + ' regrets</label></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + share + '" class="opacity_img" alt="Shares" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + bubble + '" class="opacity_img" alt="Condolences" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + srcHand + '" class="opacity_img" alt="Condolences" width="20" height="20"></div></div></section>');
    });
    if (document.getElementById("divRow").innerHTML == "") {
        toastr["error"]("No Data!", "Empty")
    }
}

function getFemaleAnnouncementDetailsFilterGenNmFDt(nm, fD) {

    $.ajax({
        url: "/UnRegistered/GetFemaleAnnouncementDetailsFilterGenNmFDt",
        data: { "name": nm + '%', "fDate": fD },
        async: false,
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        success: successfunctionFemaleFilterGenNmFDt,
        error: function (xhr, ajaxOption) {

            alert(xhr.responseText);
            alert(thrownError);
        }

    });
}

function successfunctionFemaleFilterGenNmFDt(x) {
    var v = $.parseJSON(x);
    var srcImage = "/images/diya.png";
    var srcAvatar = "/images/Icons/avatar83.png";
    var srcHand = "/images/Icons/hand-1.png";
    var href = "/UnRegistered/IndividualAnnouncement";
    var share = "/images/Icons/share41.png";
    var bubble = "/images/Icons/speech bubble10.png";
    $.each(v, function (i, d) {
        $('#divRow').append('<section class="col-sm-3"><div style="padding-left: 20px;padding-right:10px; padding-bottom:10px;padding-top:10px"><div style="border: 1px solid white; width: 300px; height: 300px; background-color: white; float:left" id="divBox" onclick=f((this).getElementsByClassName("clsID")[0].innerHTML)><img src="' + srcAvatar + '" width="15" height="15" style="float: left; background-color: #CFCDCD" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="clsNm" style="font-weight: bold; font-size: 15px; color: #9b9797;">' + d.DeceasedName + '</label><label class="clsID" style="color:white">' + d.AnnouncementID + '</label><hr /><img src="' + srcImage + '" style="padding-left:50px" alt="photo" width="250" height="160"><br /><div style="float:right;font-weight:bold"><a href="' + href + '">...</a></div><hr /><a><label id="labelRegretCount" style="padding-left:10px"> ' + d.RegretCount + ' regrets</label></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + share + '" class="opacity_img" alt="Shares" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + bubble + '" class="opacity_img" alt="Condolences" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + srcHand + '" class="opacity_img" alt="Condolences" width="20" height="20"></div></div></section>');
    });
    if (document.getElementById("divRow").innerHTML == "") {
        toastr["error"]("No Data!", "Empty")
    }
}

function getMaleAnnouncementDetailsFilterGenNmFDt(nm, fD) {

    $.ajax({
        url: "/UnRegistered/GetMaleAnnouncementDetailsFilterGenNmFDt",
        data: { "name": nm + '%', "fDate": fD },
        async: false,
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        success: successfunctionMaleFilterGenNmFDt,
        error: function (xhr, ajaxOption) {

            alert(xhr.responseText);
            alert(thrownError);
        }

    });
}

function successfunctionMaleFilterGenNmFDt(x) {
    var v = $.parseJSON(x);
    var srcImage = "/images/diya.png";
    var srcAvatar = "/images/Icons/avatar83.png";
    var srcHand = "/images/Icons/hand-1.png";
    var href = "/UnRegistered/IndividualAnnouncement";
    var share = "/images/Icons/share41.png";
    var bubble = "/images/Icons/speech bubble10.png";
    $.each(v, function (i, d) {
        $('#divRow').append('<section class="col-sm-3"><div style="padding-left: 20px;padding-right:10px; padding-bottom:10px;padding-top:10px"><div style="border: 1px solid white; width: 300px; height: 300px; background-color: white; float:left" id="divBox" onclick=f((this).getElementsByClassName("clsID")[0].innerHTML)><img src="' + srcAvatar + '" width="15" height="15" style="float: left; background-color: #CFCDCD" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="clsNm" style="font-weight: bold; font-size: 15px; color: #9b9797;">' + d.DeceasedName + '</label><label class="clsID" style="color:white">' + d.AnnouncementID + '</label><hr /><img src="' + srcImage + '" style="padding-left:50px" alt="photo" width="250" height="160"><br /><div style="float:right;font-weight:bold"><a href="' + href + '">...</a></div><hr /><a><label id="labelRegretCount" style="padding-left:10px"> ' + d.RegretCount + ' regrets</label></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + share + '" class="opacity_img" alt="Shares" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + bubble + '" class="opacity_img" alt="Condolences" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + srcHand + '" class="opacity_img" alt="Condolences" width="20" height="20"></div></div></section>');
    });
    if (document.getElementById("divRow").innerHTML == "") {
        toastr["error"]("No Data!", "Empty")
    }
}


function getAnnouncementDetailsFilterGenNmTDt(nm, tD) {

    $.ajax({
        url: "/UnRegistered/GetAnnouncementDetailsFilterGenNmTDt",
        data: { "name": nm + '%', "tDate": tD },
        async: false,
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        success: successfunctionFilterGenNmTDt,
        error: function (xhr, ajaxOption) {

            alert(xhr.responseText);
            alert(thrownError);
        }

    });
}

function successfunctionFilterGenNmTDt(x) {
    var v = $.parseJSON(x);
    var srcImage = "/images/diya.png";
    var srcAvatar = "/images/Icons/avatar83.png";
    var srcHand = "/images/Icons/hand-1.png";
    var href = "/UnRegistered/IndividualAnnouncement";
    var share = "/images/Icons/share41.png";
    var bubble = "/images/Icons/speech bubble10.png";
    $.each(v, function (i, d) {
        $('#divRow').append('<section class="col-sm-3"><div style="padding-left: 20px;padding-right:10px; padding-bottom:10px;padding-top:10px"><div style="border: 1px solid white; width: 300px; height: 300px; background-color: white; float:left" id="divBox" onclick=f((this).getElementsByClassName("clsID")[0].innerHTML)><img src="' + srcAvatar + '" width="15" height="15" style="float: left; background-color: #CFCDCD" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="clsNm" style="font-weight: bold; font-size: 15px; color: #9b9797;">' + d.DeceasedName + '</label><label class="clsID" style="color:white">' + d.AnnouncementID + '</label><hr /><img src="' + srcImage + '" style="padding-left:50px" alt="photo" width="250" height="160"><br /><div style="float:right;font-weight:bold"><a href="' + href + '">...</a></div><hr /><a><label id="labelRegretCount" style="padding-left:10px"> ' + d.RegretCount + ' regrets</label></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + share + '" class="opacity_img" alt="Shares" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + bubble + '" class="opacity_img" alt="Condolences" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + srcHand + '" class="opacity_img" alt="Condolences" width="20" height="20"></div></div></section>');
    });
    if (document.getElementById("divRow").innerHTML == "") {
        toastr["error"]("No Data!", "Empty")
    }
}

function getFemaleAnnouncementDetailsFilterGenNmTDt(nm, tD) {

    $.ajax({
        url: "/UnRegistered/GetFemaleAnnouncementDetailsFilterGenNmTDt",
        data: { "name": nm + '%', "tDate": tD },
        async: false,
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        success: successfunctionFemaleFilterGenNmTDt,
        error: function (xhr, ajaxOption) {

            alert(xhr.responseText);
            alert(thrownError);
        }

    });
}

function successfunctionFemaleFilterGenNmTDt(x) {
    var v = $.parseJSON(x);
    var srcImage = "/images/diya.png";
    var srcAvatar = "/images/Icons/avatar83.png";
    var srcHand = "/images/Icons/hand-1.png";
    var href = "/UnRegistered/IndividualAnnouncement";
    var share = "/images/Icons/share41.png";
    var bubble = "/images/Icons/speech bubble10.png";
    $.each(v, function (i, d) {
        $('#divRow').append('<section class="col-sm-3"><div style="padding-left: 20px;padding-right:10px; padding-bottom:10px;padding-top:10px"><div style="border: 1px solid white; width: 300px; height: 300px; background-color: white; float:left" id="divBox" onclick=f((this).getElementsByClassName("clsID")[0].innerHTML)><img src="' + srcAvatar + '" width="15" height="15" style="float: left; background-color: #CFCDCD" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="clsNm" style="font-weight: bold; font-size: 15px; color: #9b9797;">' + d.DeceasedName + '</label><label class="clsID" style="color:white">' + d.AnnouncementID + '</label><hr /><img src="' + srcImage + '" style="padding-left:50px" alt="photo" width="250" height="160"><br /><div style="float:right;font-weight:bold"><a href="' + href + '">...</a></div><hr /><a><label id="labelRegretCount" style="padding-left:10px"> ' + d.RegretCount + ' regrets</label></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + share + '" class="opacity_img" alt="Shares" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + bubble + '" class="opacity_img" alt="Condolences" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + srcHand + '" class="opacity_img" alt="Condolences" width="20" height="20"></div></div></section>');
    });
    if (document.getElementById("divRow").innerHTML == "") {
        toastr["error"]("No Data!", "Empty")
    }
}

function getMaleAnnouncementDetailsFilterGenNmTDt(nm, tD) {

    $.ajax({
        url: "/UnRegistered/GetMaleAnnouncementDetailsFilterGenNmTDt",
        data: { "name": nm + '%', "tDate": tD },
        async: false,
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        success: successfunctionMaleFilterGenNmTDt,
        error: function (xhr, ajaxOption) {

            alert(xhr.responseText);
            alert(thrownError);
        }

    });
}

function successfunctionMaleFilterGenNmTDt(x) {
    var v = $.parseJSON(x);
    var srcImage = "/images/diya.png";
    var srcAvatar = "/images/Icons/avatar83.png";
    var srcHand = "/images/Icons/hand-1.png";
    var href = "/UnRegistered/IndividualAnnouncement";
    var share = "/images/Icons/share41.png";
    var bubble = "/images/Icons/speech bubble10.png";
    $.each(v, function (i, d) {
        $('#divRow').append('<section class="col-sm-3"><div style="padding-left: 20px;padding-right:10px; padding-bottom:10px;padding-top:10px"><div style="border: 1px solid white; width: 300px; height: 300px; background-color: white; float:left" id="divBox" onclick=f((this).getElementsByClassName("clsID")[0].innerHTML)><img src="' + srcAvatar + '" width="15" height="15" style="float: left; background-color: #CFCDCD" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="clsNm" style="font-weight: bold; font-size: 15px; color: #9b9797;">' + d.DeceasedName + '</label><label class="clsID" style="color:white">' + d.AnnouncementID + '</label><hr /><img src="' + srcImage + '" style="padding-left:50px" alt="photo" width="250" height="160"><br /><div style="float:right;font-weight:bold"><a href="' + href + '">...</a></div><hr /><a><label id="labelRegretCount" style="padding-left:10px"> ' + d.RegretCount + ' regrets</label></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + share + '" class="opacity_img" alt="Shares" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + bubble + '" class="opacity_img" alt="Condolences" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + srcHand + '" class="opacity_img" alt="Condolences" width="20" height="20"></div></div></section>');
    });
    if (document.getElementById("divRow").innerHTML == "") {
        toastr["error"]("No Data!", "Empty")
    }
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