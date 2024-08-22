import angular from 'angular';

// angular.module('plunker', [])
// .controller('StartUpController', function($scope) {
//   $scope.funding = {
//     startingEstimate: 0,
//     needed: 0
//   };

//   $scope.computeNeeded = function() {
//     $scope.funding.needed = $scope.funding.startingEstimate * 10;
//   };

//   $scope.$watch('funding.startingEstimate', computeNeeded);
// });

angular.module('plunker', [])
.controller('StartUpController', function($scope) {
  $scope.computeNeeded = function (){
    $scope.needed = $scope.startingEstimate * 10;
  };

  $scope.requestFunding = function (){
    if ($scope.startingEstimate > 100){
      window.alert($scope.needed);
    }
    else {
      window.alert("Please get more customers first.");
    }
  };

  $scope.reset = function (){
    $scope.startingEstimate = 0;
  };
});