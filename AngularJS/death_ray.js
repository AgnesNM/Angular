function DeathrayMenuController($scope) {
    $scope.menuState.show = false;
    // $scope.stun.show = false;
    // $scope.disintegrate.show = false;
    // $scope.erase.show = false;

    $scope.toggleMenu = function () {
        $scope.menuState.show = !$scope.menuState.show
    };

    // $scope.stun = function (){
    //     $scope.stun.show = !$scope.stun.show
    // }

    // $scope.disintegrate = function (){
    //     $scope.disintegrate.show = !$scope.disintegrate.show
    // }

    // $scope.erase = function (){
    //     $scope.erase.show = !$scope.erase.show
    // }
}
