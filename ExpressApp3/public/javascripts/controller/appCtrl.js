var app;
(function (app) {
    var appCtrl = (function () {
        function appCtrl($scope, $location, $http) {
            this.$scope = $scope;
            $scope.requestList = new Array();
            $scope.formData = {};
            
            var getRequests = function () {
                $http.get('/service')
                .success(function (data) {
                    $scope.requestList = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
            };
            
            getRequests();
            
            $scope.AddRequest = function () {
                
                console.log($scope.formData);
                $http.post('/service', $scope.formData)
                .success(function (data) {
                    if (data) {
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        getRequests();
                        $location.url('home');
                    }
                    else
                        console.log('Item is not added');
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
            };
            $scope.AddNewRequest = function () {
                $location.url('add');
            };
            $scope.DeleteRequest = function (index) {
                $http.delete('/service/' + index)
                .success(function (data) {
                    if (data) {
                        getRequests();
                        $location.url('home');
                    }
                    else
                        console.log('Item is not deleted');
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
            };
            $scope.BackToHome = function () {
                $location.url('home');
            };
            $scope.ViewDetails = function (index) {
                $location.url('view/' + index.toString());
            };
        }
        appCtrl.$inject = [
            '$scope', '$location', '$http'
        ];
        return appCtrl;
    })();
    app.appCtrl = appCtrl;
})(app || (app = {}));
angular.module("myApp").controller('appCtrl', app.appCtrl);
