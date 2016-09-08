


    function check_empty() {
        if (document.getElementById('name').value == ""
        || document.getElementsByName('radio').value == ""
        || document.getElementById('msg').value == "") {



            alert("Fill All Fields !" + Category.value);


        }
        else {
            var uid = "8";
            var Name = document.getElementById('name').value;
            var Message = document.getElementById('msg').value;
            var Category = document.getElementsByName('radio');

            insertevent(uid, Name, Message, Category);
        }
    }

    function div_show() {
        document.getElementById('abc').style.display = "block";

    }


    function div_hide() {
        document.getElementById('abc').style.display = "none";

    }

   


    $(document).ready(function () {

        function insertevent(uid, Name, Message, Category) {
            $.ajax({
                url: "/TimeLine/insertEvent",
                data: { "uid": uid, "Name": Name, "Message": Message, "Category": Category },
                async: false,
                contentType: "application/json,charset=utf-8",
                dataType: "json",
                success: successInsert,
                error: function (xhr, ajaxOption, throwError) {

                    alert(xhr.responseText);
                    alert(throwError);
                }
            });
        }

        function successLoad(dataresult) {
            alert("Successfully Inserted");
        }

});

