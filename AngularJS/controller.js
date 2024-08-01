function HelloController($scope, $location){
    $scope.greeting = { text: 'Hello'};
    $location.data = { 
        'longitude': '1.2335° S',
        'latitude': '36.6715° E'
    }
}