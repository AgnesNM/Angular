import angular from 'angular';

angular.module('formExample', [])
.controller('ExampleController', [$scope, function($scope){
  $scope.master = {};
  $scope.update = function(user){
    $scope.master = angular.copy(user);
  };

  $scope.reset = function(){
    $scope.user = angular.copy($scope.master);
  };

  $scope.reset();
}]);
