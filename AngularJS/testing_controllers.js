angular.module('app', [])
.controller('PasswordController', function ($scope){
  $scope.password = '';
  $scope.grade = function () {
    var size = $scope.password.length;
    if (size > 8) {
      $scope.strength = 'strong';
    } else if (size > 3){
      $scope.strength = 'medium';      
    } else {
      $scope.strength = 'weak';
    }
  };
});

describe('PasswordController', function(){
  beforeEach(module('app'));

  var $controller, $rootScope;

  beforeEach(inject(function(_$controller_, _$rootScope_){
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));

  describe('$scope.grade', function(){
    it("sets the strength to 'strong' if the password length is >8 chars", function(){
      var $scope = $rootScope.new();
      var controller = $controller('PasswordController', {
        $scope:$scope
      });
      $scope.password = 'longerthaneightcars';
      $scope.grade();
      expect($scope.strength).toEqual('strong');
    });
  });
});
