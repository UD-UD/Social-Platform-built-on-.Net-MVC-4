angular.module('myApp', []).controller('personsCtrl', function ($scope) {
    $scope.persons = [
        { name: 'Jani', src: "/images/diya.png", regretCount: 120 },
        { name: 'Hege', src: "/images/diya2.png", regretCount: 50 },
        { name: 'Kai', src: "/images/diya.png", regretCount: 101 }
    ];
    $scope.clickRegisterSignin = function () {
        toastr["error"]("Register or Sign in First!","Wait");
    }
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