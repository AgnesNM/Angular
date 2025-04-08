AngularJS (1.x) Crash Course

Here's a focused crash course on AngularJS to help you contribute to Horizon effectively. This covers the essential components and concepts you'll need to understand.
Core AngularJS Concepts
1. Modules

Modules are containers for different parts of your application:

javascript

// Creating a module
var app = angular.module('myApp', []);  // [] contains dependencies

// Getting a reference to an existing module
var existingApp = angular.module('myApp');

2. Controllers

Controllers manage the application's data and behavior:

javascript

app.controller('MainController', function($scope) {
  $scope.message = 'Hello World';
  
  $scope.changeMessage = function() {
    $scope.message = 'New message';
  };
});

3. $scope vs. Controller As syntax

The newer "Controller As" syntax (which you saw in your code example):

javascript

app.controller('MainController', function() {
  var ctrl = this;
  ctrl.message = 'Hello World';
  
  ctrl.changeMessage = function() {
    ctrl.message = 'New message';
  };
});

HTML usage:

html

<div ng-controller="MainController as main">
  {{ main.message }}
  <button ng-click="main.changeMessage()">Update</button>
</div>

4. Directives

Built-in directives:

    ng-app: Initializes an Angular application
    ng-model: Binds input to a variable
    ng-repeat: Iterates over collections
    ng-if, ng-show, ng-hide: Conditional rendering
    ng-click: Handles click events

Custom directive example:

javascript

app.directive('myDirective', function() {
  return {
    restrict: 'E',  // Element
    templateUrl: 'template.html',
    scope: {
      // Isolated scope
      name: '=',    // Two-way binding
      title: '@',   // Text binding
      onSave: '&'   // Function binding
    },
    controller: function($scope) {
      // Directive logic
    },
    link: function(scope, element, attrs) {
      // DOM manipulation
    }
  };
});

5. Services & Factories

Services are singletons for sharing data and functionality:

javascript

// Service
app.service('DataService', function($http) {
  this.getData = function() {
    return $http.get('/api/data');
  };
});

// Factory
app.factory('DataFactory', function($http) {
  return {
    getData: function() {
      return $http.get('/api/data');
    }
  };
});

6. Dependency Injection

AngularJS uses dependency injection extensively:

javascript

app.controller('ExampleController', ['$scope', '$http', 'DataService', 
  function($scope, $http, DataService) {
    // Use injected dependencies
  }
]);

// Alternatively with $inject for minification safety
function ExampleController($scope, $http, DataService) {
  // Controller logic
}
ExampleController.$inject = ['$scope', '$http', 'DataService'];
app.controller('ExampleController', ExampleController);

7. Promises with $q

javascript

app.service('AsyncService', function($q, $http) {
  this.getData = function() {
    var deferred = $q.defer();
    
    $http.get('/api/data')
      .then(function(response) {
        deferred.resolve(response.data);
      })
      .catch(function(error) {
        deferred.reject(error);
      });
    
    return deferred.promise;
  };
  
  // Modern approach (preferred)
  this.getDataBetter = function() {
    return $http.get('/api/data')
      .then(function(response) {
        return response.data;
      });
  };
});

8. Component-Based Architecture

In later versions of AngularJS (1.5+), components were introduced:

javascript

app.component('userCard', {
  templateUrl: 'user-card.html',
  bindings: {
    user: '<',       // One-way binding
    onUpdate: '&'    // Function binding
  },
  controller: function() {
    var ctrl = this;
    
    ctrl.$onInit = function() {
      // Initialize component
    };
    
    ctrl.updateUser = function() {
      ctrl.onUpdate({user: ctrl.user});
    };
  }
});

Usage:

html

<user-card user="mainCtrl.currentUser" on-update="mainCtrl.saveUser(user)"></user-card>

9. Lifecycle Hooks

Important lifecycle hooks in components:

    $onInit: When the controller is initialized
    $onChanges: When bound inputs change
    $onDestroy: When the component is destroyed
    $postLink: After the component's element and children are linked

10. Routing with ngRoute or UI-Router

ngRoute example:

javascript

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home.html',
      controller: 'HomeController'
    })
    .when('/users/:id', {
      templateUrl: 'user-detail.html',
      controller: 'UserDetailController'
    })
    .otherwise({
      redirectTo: '/'
    });
});

UI-Router (more powerful):

javascript

app.config(function($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home.html',
      controller: 'HomeController'
    })
    .state('user', {
      url: '/users/:id',
      templateUrl: 'user-detail.html',
      controller: 'UserDetailController',
      resolve: {
        // Pre-load data
        userData: function($stateParams, UserService) {
          return UserService.getUser($stateParams.id);
        }
      }
    });
});

Practical Tips for Horizon Development

    Understand the module structure: First identify which modules your code needs to interact with
    Follow existing patterns: Look at similar components/controllers in the codebase
    Component communication:
        Parent to child: Pass data as bindings
        Child to parent: Use callbacks passed as bindings
        Unrelated components: Use services
    Testing: AngularJS uses Jasmine and Karma for unit testing
    Common Gotchas:
        Scope inheritance can be tricky - use Controller As syntax
        Two-way binding performance issues with large collections
        Circular dependencies between services
        Not properly cleaning up event listeners in $onDestroy

Quick Reference: Common AngularJS Services

    $http: Ajax requests
    $q: Promise handling
    $timeout & $interval: Timing functions
    $log: Logging
    $filter: Apply filters programmatically
    $compile: Compile HTML with Angular
    $rootScope: Application-wide scope
    $location: URL manipulation

This crash course should give you a solid foundation to start contributing to Horizon. Remember that AngularJS has a specific way of thinking about application architecture that can take some time to adjust to, especially if you're coming from more modern frameworks.


