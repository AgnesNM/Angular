# AngularJS (1.x) Crash Course

## Core AngularJS Concepts
### 1. Modules

Modules are containers for different parts of your application:

```javascript

// Creating a module
var app = angular.module('myApp', []);  // [] contains dependencies

// Getting a reference to an existing module
var existingApp = angular.module('myApp');

```

### 2. Controllers

Controllers manage the application's data and behavior:

```javascript

app.controller('MainController', function($scope) {
  $scope.message = 'Hello World';
  
  $scope.changeMessage = function() {
    $scope.message = 'New message';
  };
});
```

### 3. $scope vs. Controller As syntax

The newer "Controller As" syntax (which you saw in your code example):

``` javascript

app.controller('MainController', function() {
  var ctrl = this;
  ctrl.message = 'Hello World';
  
  ctrl.changeMessage = function() {
    ctrl.message = 'New message';
  };
});

```

**HTML usage:**

``` html

<div ng-controller="MainController as main">
  {{ main.message }}
  <button ng-click="main.changeMessage()">Update</button>
</div>
```

### 4. Directives

Built-in directives:

- _ng-app_: Initializes an Angular application
- _ng-model_: Binds input to a variable
- _ng-repeat_: Iterates over collections
- _ng-if_, _ng-show_, _ng-hide_: Conditional rendering
- _ng-click_: Handles click events

**Custom directive example:**

```javascript

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
```

### 5. Services & Factories

Services are singletons for sharing data and functionality:

```javascript

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

```

### 6. Dependency Injection

AngularJS uses dependency injection extensively:

```javascript

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
```

### 7. Promises with $q

``` javascript

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
```

### 8. Component-Based Architecture

In later versions of AngularJS (1.5+), components were introduced:

``` javascript

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
```

**Usage:**

```html

<user-card user="mainCtrl.currentUser" on-update="mainCtrl.saveUser(user)"></user-card>
```

### 9. Lifecycle Hooks

Important lifecycle hooks in components:

- _$onInit_: When the controller is initialized
- _$onChanges_: When bound inputs change
- _$onDestroy_: When the component is destroyed
- _$postLink_: After the component's element and children are linked

### 10. Routing with ngRoute or UI-Router

_ngRoute example_:

```javascript

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
```

**UI-Router (more powerful):**

```javascript

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
```

## Practical Tips for Horizon Development

- **Understand the module structure**: First identify which modules your code needs to interact with
- **Follow existing patterns**: Look at similar components/controllers in the codebase
- **Component communication**:
    (a) _Parent to child:_ Pass data as bindings
    (b) _Child to parent_: Use callbacks passed as bindings
    (c)  _Unrelated components_: Use services
- **Testing**: AngularJS uses Jasmine and Karma for unit testing

**Common Gotchas**:
- Scope inheritance can be tricky - use Controller As syntax
- Two-way binding performance issues with large collections
- Circular dependencies between services
- Not properly cleaning up event listeners in $onDestroy

### Quick Reference: Common AngularJS Services

- **$http**: Ajax requests
- **$q**: Promise handling
- **$timeout & $interval**: Timing functions
- **$log**: Logging
- **$filter**: Apply filters programmatically
- **$compile**: Compile HTML with Angular
- **$rootScope**: Application-wide scope
- **$location**: URL manipulation

This crash course should give you a solid foundation to start contributing to Horizon. Remember that AngularJS has a specific way of thinking about application architecture that can take some time to adjust to, especially if you're coming from more modern frameworks.

## Understanding Scope and $scope in AngularJS
### What is Scope in AngularJS?
In AngularJS, a scope is a JavaScript object that serves as the binding layer between the HTML view and the JavaScript controller. It provides the execution context for expressions in the view and acts as a glue between the controller and the view.
### Key Characteristics of $scope
#### 1. Hierarchical Structure
Scopes are organized in a hierarchical structure that mimics the DOM structure:

- _$rootScope_ sits at the top of the hierarchy (created when the application starts)
- _Child scopes_ are created for controllers, certain directives, and other components. Child scopes either inherit from their parent scope (prototypal inheritance) or create isolated scopes

```javascript
$rootScope
    |
    ├── Controller A $scope
    |       └── Directive X $scope
    |
    └── Controller B $scope
            ├── Controller C $scope (nested controller)
            └── Directive Y $scope (with isolated scope)

```
#### 2. Scope Inheritance
By default, scopes inherit prototypically from their parent scope:

```javascript

app.controller('ParentController', function($scope) {
  $scope.user = {name: 'John'};
});

app.controller('ChildController', function($scope) {
  // $scope.user is available here through inheritance
  // Modifying $scope.user.name changes it in parent too
  
  // But setting $scope.user = {} creates a new property
  // on child scope, not affecting parent
});
```

```html
<div ng-controller="ParentController">
  Parent: {{user.name}}
  <div ng-controller="ChildController">
    Child: {{user.name}}
  </div>
</div>

```
#### 3. Watchers and Digest Cycle
$scope contains Angular's change detection mechanism:

- **$watch**: Monitors expressions for changes
- **$digest**: Processes all watchers of the current scope and its children
- **$apply**: Executes a function in Angular context and triggers a digest cycle

```javascript

$scope.$watch('user.name', function(newValue, oldValue) {
  console.log('Name changed from', oldValue, 'to', newValue);
});

// When integrating with non-Angular code:
$scope.$apply(function() {
  $scope.user.name = 'Updated by external code';
});
```
### Common Uses of $scope
#### 1. Exposing Data to the View

```javascript

app.controller('UserController', function($scope) {
  $scope.user = {
    name: 'John Doe',
    email: 'john@example.com'
  };
});
```

```html
<div ng-controller="UserController">
  <h1>{{user.name}}</h1>
  <p>{{user.email}}</p>
</div>

```

#### 2. Handling Events

```javascript
app.controller('FormController', function($scope) {
  $scope.submitForm = function() {
    console.log('Form submitted with:', $scope.formData);
    // Process form data
  };
});

```

```html
<div ng-controller="FormController">
  <form ng-submit="submitForm()">
    <input ng-model="formData.name">
    <button type="submit">Submit</button>
  </form>
</div>

```
#### 3. Communication Between Controllers

```javascript
// Parent controller
app.controller('AppController', function($scope) {
  $scope.notifyAll = function(message) {
    $scope.$broadcast('notification', message);
  };
});

// Child controller
app.controller('NotificationController', function($scope) {
  $scope.$on('notification', function(event, message) {
    $scope.message = message;
  });
});

```
### "Controller As" Syntax vs $scope Injection
As AngularJS evolved, "Controller As" syntax was introduced as a recommended alternative to $scope.

#### Traditional $scope approach

```javascript
app.controller('UserController', function($scope) {
  $scope.user = {name: 'John'};
  $scope.updateUser = function() {
    $scope.user.name = 'Updated';
  };
});
```
```html
<div ng-controller="UserController">
  {{user.name}}
  <button ng-click="updateUser()">Update</button>
</div>

```
#### "Controller As" approach:
```javascript
app.controller('UserController', function() {
  var vm = this;  // or ctrl = this
  vm.user = {name: 'John'};
  vm.updateUser = function() {
    vm.user.name = 'Updated';
  };
});
```
```html
<div ng-controller="UserController as userCtrl">
  {{userCtrl.user.name}}
  <button ng-click="userCtrl.updateUser()">Update</button>
</div>

```
### Benefits of "Controller As" syntax:

- Avoids scope inheritance issues
- Makes the controller's binding more explicit in the HTML
- Closer to how components work in newer versions of Angular
- More aligned with JavaScript class-based approaches

#### Common $scope Pitfalls

**1. The "Dot Rule"**
- Always use object properties when binding to scope to avoid inheritance issues

```javascript
// Problematic:
$scope.name = 'John';

// Better:
$scope.user = {name: 'John'};

```

**2. Overusing $watch**
- Excessive watchers can impact performance. Use them sparingly and consider one-time bindings (::) when possible
  
```html
<!-- One-time binding -->
<span>{{::user.id}}</span>

<!-- Regular binding -->
<span>{{user.name}}</span>
```

**3. Using $scope Where Not Needed**
- In directives and components, consider using isolated scopes or "Controller As" syntax for cleaner code.

_When Building Horizon Components/When working with existing Horizon code_

- Check if the component uses traditional $scope injection or "Controller As" syntax
- Be aware of scope inheritance when modifying shared data
- Use $emit, $broadcast, and $on for component communication when needed
- Leverage built-in lifecycle hooks like $onInit, $onChanges, $onDestroy
- Properly clean up watchers and event listeners in $onDestroy to prevent memory leaks

Understanding scope is crucial for working with AngularJS applications, as it's one of the core concepts that makes the framework tick.

