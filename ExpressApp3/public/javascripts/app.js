var app;
(function (app) {
    angular.module('myApp', ['ngRoute']).
        config(config);
    config.$inject = ["$routeProvider"];
    function config($routeProvider) {
        $routeProvider.
            when('/home', {
            templateUrl: 'views/home.html'
        }).
            when('/add', {
            templateUrl: 'views/addrequest.html'
        }).
            when('/view/:requestid', {
            templateUrl: 'views/viewrequest.html',
            controller: function ($scope, $routeParams) {
                $scope.RequestDetail = $scope.requestList[$routeParams['requestid']];
            }
        }).
            otherwise({
            redirectTo: '/home'
        });
    }
})(app || (app = {}));
