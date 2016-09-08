$(document).ready(function(){   


var treejson = [];

var uid = session_id;


drawTree(uid);

function drawTree(uid) {

    $.ajax({
        url: "/TimeLine/getTree",
        data: { "uid": uid },
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successLoad,
        error: function (xhr, ajaxOption, throwError) {

            alert(xhr.responseText);
            alert(throwError);
        }
    });
}

function successLoad(dataresult) {

   
    var value = $.parseJSON(dataresult);


    $.each(value, function (i, data) {


        var memberId = data.memberId;
        var memberName = data.memberName.toString();

        var pid = data.pid;
        if (pid == 0) {
            var parentId = null;
        }
        else {
            var parentId = pid;
        }
        
        var lname = data.lname;
        var rship = data.rship;
        var name = memberName + " " + lname;

        var uindex = data.uindex;

        a = /\/Date\((\d*)\)\//.exec(data.DOB);
        if (a) {
            var dt = new Date(+a[1]);

            var DOB = dt.toDateString();
        }


        b = /\/Date\((\d*)\)\//.exec(data.DOD);
        if (b) {
            var dt1 = new Date(+b[1]);

            var DOD = dt1.toDateString();
        }

        
        treejson.push({
            "id": memberId,
    "parentId": parentId,
    "name": name,
    "relation": rship,
    "DOB": DOB,
    "DOD": DOD,
    "uindex":uindex,
    "image": '/Pictures/'+(i+1)+'.jpg'
        });

    });


    $("#ftree").getOrgChart({
        theme: "monica",
        primaryColumns: ["name", "relation", "DOB", "DOD"],
        imageColumn: "image",
        gridView: true,
        color: "green",
        dataSource: treejson,


       
    });


    $("#ftree").getOrgChart("setBoxColor", 6, "green");

}


   
$("#ftree").on("updateEvent", function (event, sender, args) {
    
    

    var names = args.data.name;
    nm = names.split(' ');
    var fname = nm[0];
    var lname = nm[1];
    var rship = args.data.relation;
    var DOB = args.data.DOB;
    var DOD = args.data.DOD;
    var uindex = args.data.uindex;

   
    updateNode(uindex,fname,lname,rship,DOB,DOD);
});





$("#ftree").on("removeEvent", function (event, sender, args) {
   
    var uindex = args.data.uindex;
    removeNode(uindex);
});


function updateNode(uindex, fname, lname,rship, DOB, DOD) {

    $.ajax({
        url: "/TimeLine/updateTree",
        type: "post",
        data: JSON.stringify({"uid": uindex, "fname" : fname,"lname": lname,"rship": rship,"DOB": DOB, "DOD" : DOD }),
        async: false,
        contentType: "application/json; charset=utf-8",
        success: successUpdate,
        error: function (xhr, ajaxOption, throwError) {

            alert(xhr.responseText);
            alert(throwError);
        }
    });
}


function successUpdate(dataresult) {
    location.reload();
}

function removeNode(uindex) {

    $.ajax({
        url: "/TimeLine/remNodeTree",
        type: "post",
        data: JSON.stringify({"uid": uindex }),
        async: false,
        contentType: "application/json; charset=utf-8",
        success: successDel,
        error: function (xhr, ajaxOption, throwError) {

            alert(xhr.responseText);
            alert(throwError);
        }
    });
}


function successDel(dataresult) {
    location.reload();
}

});