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

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('$scope.grade', function(){

    var $scope, controller;

    beforeEach(function(){
      $scope = {};
        controller = $controller('PasswordController', { $scope: $scope });
      });

    it("sets the strength to 'strong' if the password length is >8 chars", function(){
      $scope.password = 'longerthaneightchars';
      $scope.grade();
      expect($scope.strength).toEqual('strong');
    });

    it('sets the strength to "weak" if the password length <3 chars', function(){
      $scope.password = 'a';
      $scope.grade();
      expect($scope.strength).toEqual('weak');
    })
  });
});
