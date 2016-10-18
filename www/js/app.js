var app = angular.module('myapp', ['ngRoute','uiSwitch']);
var url = 'https://internetswitch.herokuapp.com/switch';

app.controller('LightController', ['$scope', '$http', function($scope, $http) {

    $http.get(url)
        .then(function(response) {
            if (response.data.switch == "on") {
                $scope.enabled = true;
                $scope.currenticonURL = '/static/assets/bulbon.png';
            } else {
                $scope.enabled = false;
                $scope.currenticonURL = '/static/assets/bulboff.png';
            }
        });

    $scope.change = function() {
        var result = "";
        
        if ($scope.enabled == true) {
            result = "on";
            $scope.currenticonURL = '/static/assets/bulbon.png';
        } else {
            result = "off";
            $scope.currenticonURL = '/static/assets/bulboff.png';
        }

        var parameter = JSON.stringify({ action: result });
        $http.post(url, parameter).
            success(function(data, status, headers, config) {
                console.log(data);
            }).
            error(function(data, status, headers, config) {
                console.log(status);
            });
    };



}]);

