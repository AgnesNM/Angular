var students = [{ name: "Mary Contrary", id: "1" },
{ name: "Jack Sprat", id: "2" }, { name: "Jill Hill", id: "3" }
]

function StudentListController($scope) {
    $scope.students = students;

    $scope.insertTom = function () {
        $scope.students.splice(1, 0, { name: "Tom Thumb", id:'4'});
    }
}