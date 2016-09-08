function startApp() {
    gapi.load('auth2', function () {
        gapi.client.load('plus', 'v1').then(function () {
            gapi.signin2.render('signin-button', {
                scope: 'profile',
                fetch_basic_profile: true
            });
            gapi.auth2.init({
                fetch_basic_profile: true,
                scope: 'profile'
            }).then(
                  function () {
                      auth2 = gapi.auth2.getAuthInstance();
                      auth2.isSignedIn.listen(function () {
                          console.log(auth2.currentUser.get());
                          var profile = auth2.currentUser.get().getBasicProfile();
                          facebook_authentication(profile.getName(), profile.getEmail());
                      });
                      auth2.then(function (resp) {
                          // console.log(auth2.currentUser.get());
                          var profile = auth2.currentUser.get().getBasicProfile();
                          if (profile != null)
                              facebook_authentication(profile.getName(), profile.getEmail());
                      });
                  });
        });
    });
}

function facebook_authentication(username, emailadd) {

    $.ajax({
        url: "/Home/facebook_authenticaton",
        data: { "username": username, "emailadd": emailadd, },
        async: false,
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        success: successfunctionauth,
        error: function (xhr, ajaxOption) {
            toastr["error"]("Error in creating User!")
            alert(xhr.responseText);
            alert(thrownError);
        }

    });

}
function successfunctionauth(x) {
    toastr["success"]("You Are Authorized", "Welcome!!");
    window.location.href = '/Registered/Index';
}


$(document).ready(function ($) {

    $('html, body').animate({
        scrollTop: $("#slide1").offset().top
    }, 500);

    document.onkeydown = checkKey;

    function checkKey(e) {

        e = e || window.event;

        if (e.keyCode == '38') {

            var positionCurrent1 = $(document).scrollTop();
            for (j = 0; j < parPosition.length; j++) {
                if (positionCurrent1 <= parPosition[j])
                    break;
            }


            if (j > 0) {
                $('html, body').animate({
                    scrollTop: $("#slide" + (j)).offset().top
                }, 500);
            }
        }
        else if (e.keyCode == '40') {
            var positionCurrent1 = $(document).scrollTop();
            for (j = 0; j < parPosition.length; j++) {
                if (positionCurrent1 <= parPosition[j])
                    break;
            }

            if (j < 4) {
                $('html, body').animate({
                    scrollTop: $("#slide" + (j + 2)).offset().top
                }, 500);
            }
        }


    }

    checksession();

    function checksession() {

        $.ajax({
            url: "/Home/checksession",
            async: false,
            contentType: "application/json; charset=utf-8",
            datatype: JSON,
            success: successCheck,
            error: function (xhr, ajaxOption) {
                toastr["error"]("Error in creating User!")
                alert(xhr.responseText);
                alert(thrownError);
            }

        });

    }
    function successCheck(x) {
        if (x == "true")
            window.location.href = '/Registered/Index';
    }
    $(".register").click(function () {
        $('html, body').animate({
            scrollTop: $("#slide1").offset().top
        }, 500);

    });
    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        alert('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        alert('Name: ' + profile.getName());
        alert('Image URL: ' + profile.getImageUrl());
        alert('Email: ' + profile.getEmail());
    }


  

    var profiles = [["Condolenses", "Suresh", 4, 5, 6],
                ["Regrets", "Nikhil", 8, 5, 6],
                ["Deep Regret", "Ujjal", 4, 20, 6],
                ["Rest in Peace", "Nikunj", 30, 5, 6],
                ["Condolenses", "Kumar", 10, 5, 12],
                ["Rest in Peace", "Ramesh", 4, 5, 6],
                ["Deep Regret", "Jai Singh", 4, 5, 6],
                 ["Regrets", "Jeena", 8, 5, 6],
                  ["Regrets", "Marna", 8, 5, 6],
                   ["Regrets", "Batman", 8, 5, 6]];

    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
    $('#username').keypress(function (e) {

        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $("#submitBtn").trigger('click');

        }
    });

    $('#submitBtn').click(function () {

        var uname = $('#username').val();
        var pw = $('#password').val();
        var email = $('#email').val();
        var s = "";
        if (uname == "" || pw == "" || email == "") {
            if (uname == "") {
                s = s + "username ";
            }
            if (pw == "") {
                if (s.length > 1)
                    s = s + " , password ";
                else
                    s = s + "password ";


            }
            if (email == "") {
                if (s.length > 1)
                    s = s + " , email ";
                else
                    s = s + "email ";

            }
            s = s + "cannot be empty";
            toastr["error"](s, "Authentication Failed");
        }
        else {
            if (!isEmail(email)) {
                toastr["error"]("Email is not Valid!!!", "Validation Error");
            }
            else {
                insertUser(uname, pw, email);
            }

        }
        //...

    });
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    shuffle(profiles);
    //alert(profiles);
    var x = '<div class="name">' + profiles[0][0] + '</div><hr /><div class="pic"></div><div class="nameOfPerson">' + profiles[0][1] + '</div><hr /><div class="buttons">' + profiles[0][2] + ' ' + profiles[0][3] + ' ' + profiles[0][4] + '</div>';
    var y = '<div class="name">' + profiles[1][0] + '</div><hr /><div class="pic"></div><div class="nameOfPerson">' + profiles[1][1] + '</div><hr /><div class="buttons">' + profiles[1][2] + ' ' + profiles[1][3] + ' ' + profiles[1][4] + '</div>';
    var z = '<div class="name">' + profiles[2][0] + '</div><hr /><div class="pic"></div><div class="nameOfPerson">' + profiles[2][1] + '</div><hr /><div class="buttons">' + profiles[2][2] + ' ' + profiles[2][3] + ' ' + profiles[2][4] + '</div>';
    $("#one").append(x);
    $("#two").append(y);
    $("#three").append(z);
    $('html, body').animate({
        scrollTop: $("#slide1").offset().top
    }, 500);

    //$('.signup').addClass('animated wobble');

    var parPosition = [];
    var YoudivOffst = $('#slide4').offset().top;

    $('.par').each(function () {
        parPosition.push($(this).offset().top);
    });

    $('a').click(function () {
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
        return false;
    });

    $('.vNav ul li a').click(function () {
        $('.vNav ul li a').removeClass('active');
        $(this).addClass('active');
    });

    $('.vNav a').hover(function () {
        $(this).find('.label').show();
    }, function () {
        $(this).find('.label').hide();
    });

    var lastScrollTop = 0;
    $(document).scroll(function () {
        var position = $(document).scrollTop(),
                index;
        for (var i = 0; i < parPosition.length; i++) {
            if (position <= parPosition[i]) {
                index = i;
                break;
            }
        }

        if (position >= (YoudivOffst - 5)) {

            $(".userimage").show("slow", "swing");
        }


        $('.vNav ul li a').removeClass('active');
        $('.vNav ul li a:eq(' + index + ')').addClass('active');
    });

    $('.vNav ul li a').click(function () {
        $('.vNav ul li a').removeClass('active');
        $(this).addClass('active');
    });
    $('.inputdata').parallax({
        speed: 0.35
    });
    $('#slide1').parallax({
        speed: 0.30
    });
    $('#slide2').parallax({
        speed: 0.25
    });
    $('#slide3').parallax({
        speed: 0.20
    });
    $('#slide4').parallax({
        speed: 0.25
    });
    $('#slide5').parallax({
        speed: 0.25
    });

    // This is called with the results from from FB.getLoginStatus().
    function statusChangeCallback(response) {
        //alert('statusChangeCallback');
        //  alert(response.status);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            // alert("connected");
            testAPI();
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            document.getElementById('status').innerHTML = 'Please log ' +
              'into this app.';
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            document.getElementById('status').innerHTML = 'Please log ' +
              'into Facebook.';
        }
    }

    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    function checkLoginState() {
        FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
        });
    }

    window.fbAsyncInit = function () {
        FB.init({
            appId: '100642920303336',
            cookie: true,  // enable cookies to allow the server to access 
            // the session
            xfbml: true,  // parse social plugins on this page
            version: 'v2.5' // use version 2.2
        });

        // Now that we've initialized the JavaScript SDK, we call 
        // FB.getLoginStatus().  This function gets the state of the
        // person visiting this page and can return one of three states to
        // the callback you provide.  They can be:
        //
        // 1. Logged into your app ('connected')
        // 2. Logged into Facebook, but not your app ('not_authorized')
        // 3. Not logged into Facebook and can't tell if they are logged into
        //    your app or not.
        //
        // These three cases are handled in the callback function.

        FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
        });

    };

    // Load the SDK asynchronously
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Here we run a very simple test of the Graph API after login is
    // successful.  See statusChangeCallback() for when this call is made.
    function testAPI() {
        // alert('Welcome!  Fetching your information.... ');
        FB.api('/me', { fields: 'name,email' }, function (response) {
            facebook_authentication(response.name, response.email);
        });
    }


    

});
function insertUser(uname, pw, email) {

    $.ajax({
        url: "/Home/InsertUser",
        data: { "uname": uname, "pw": pw, "email": email, },
        async: false,
        contentType: "application/json; charset=utf-8",
        datatype: JSON,
        success: successfunction,
        error: function (xhr, ajaxOption) {
            toastr["error"]("Error in creating User!", "Unsuccessful");
            alert(xhr.responseText);
            alert(thrownError);
        }

    });
    function successfunction(x) {
        if (x != 0) {
            window.location.href = '/Registered/Index';
            toastr["success"]("Registration Successful!")
            
        }
        else {
            toastr["error"]("Username or Email already exists!")
            $('#username').val("");
            $('#password').val("");
            $('#email').val("");
        }
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
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}