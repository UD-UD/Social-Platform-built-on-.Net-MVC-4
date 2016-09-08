angular.module('myApp', []).controller('personsCtrl', function ($scope) {
    var init = function () {

        $('#divCreate').show();
        $('#divShare').hide();
        $('#divCreateFooter').show();
        $('#divShareFooter').hide();
        $('#b1').focus();
    };
    init();
    $scope.clickNext = function () {
        $('#divCreate').hide();
        $('#divShare').show();
        $('#divCreateFooter').hide();
        $('#divShareFooter').show();
        $('#b2').focus();
    }
    $scope.click1 = function () {

        $('#divCreate').show();
        $('#divShare').hide();
        $('#divCreateFooter').show();
        $('#divShareFooter').hide();
    }
    $scope.click2 = function () {

        $('#divCreate').hide();
        $('#divShare').show();
        $('#divCreateFooter').hide();
        $('#divShareFooter').show();
    }
});