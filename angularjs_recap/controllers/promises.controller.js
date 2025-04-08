angular
	.module("root")
	.controller("TestController", TestController);

TestController.$inject = ["$q", "$log"];

function TestController($q, $log){
	
	var ctrl = this;

	ctrl.$onInit = function(){
		ctrl.ourPromise().then(function success(){
			$log.log("Our Promise has finished");
		});
	};

	ctrl.ourPromise = function (){
		var defer = $q.defer();

		$log.log("Do all of our stuff in here");

		return defer.promise;
	};
}



