



google.charts.load('current', { packages: ["orgchart"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    $.ajax({
        url: "/TimeLine/getTree",
        data: {},
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


    var datatab = new google.visualization.DataTable();
    datatab.addColumn('string', 'Name');
    datatab.addColumn('string', 'Parent');
    datatab.addColumn('string', 'ToolTip');



    $.each(value, function (i, data) {


        var memberId = data.memberId.toString();
        var memberName = data.memberName.toString();
        var parentId = data.parentId;
        var lname = data.lname;
        var rship = data.rship;
        var name = memberName + " " + lname;

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


        datatab.addRows([
          [{ v: memberName, f: name + '<div style="color:blue">DOB :' + DOB + '</div><img src = "~/Pictures/' + (i + 1) + '.jpg" /></div><div style="color:green">DOD :' + DOD + '</div>' }, parentId, rship]]);




    });


    var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
    chart.draw(datatab, { allowHtml: true });

}