import angular from 'angular';

angular.module('plunker', [])
.controller('StartUpController', function($scope) {
  $scope.funding = {
    startingEstimate: 0,
    needed: 0
  };

  $scope.computeNeeded = function() {
    $scope.funding.needed = $scope.funding.startingEstimate * 10;
  };

  $scope.$watch('funding.startingEstimate', computeNeeded);
});