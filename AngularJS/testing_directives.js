var app = angular.module('myApp', []);

app.directive('aGreatEye', function(){
    return{
        restrict:'E',
        replace:true,
        template:'<h1>lidless, wreathed in flame, {{ 1 + 1 }} times </h1>'
    };
});

describe('Unit testing great quotes', function(){
    var $compile,
        $rootScope;

    beforeEach(module('myApp'));

    beforeEach(inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Replaces the element with the appropriate content', function(){
        var element = $compile("<a-great-eye></a-great-eye>")($rootScope);
        $rootScope.$digest();

        expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
    });
});