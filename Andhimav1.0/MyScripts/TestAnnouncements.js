getAnnouncementDetails()
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
    var v = $.parseJSON(x);
    var srcImage = "/images/diya2.png";
    var srcAvatar = "/images/Icons/avatar83.png";
    var srcHand = "/images/Icons/hand-1.png";
    var href = "/UnRegistered/IndividualAnnouncement";
    var share = "/images/Icons/share41.png";
    var bubble = "/images/Icons/speech bubble10.png";
    $.each(v, function (i, d) {

        $('#divRow').append('<div class="item"><div class="mainimg"><img src="' + srcImage + '" style="width:100%;height:100%" /></div><div class="title"><label>Condolenses</label></div><div class="name"><label>' + d.DeceasedName + '</label></div><hr /><a href="' + href + '">...</a><br><a><img src="' + share + '" class="opacity_img" alt="Shares" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + bubble + '" class="opacity_img" alt="Condolences" width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="' + srcHand + '" class="opacity_img" alt="Condolences" width="20" height="20"></div>');

    });
}
function f(id) {
    //alert(nm);
    window.location.href = '/UnRegistered/IndividualAnnouncement?i=' + encodeURIComponent(id);
}
