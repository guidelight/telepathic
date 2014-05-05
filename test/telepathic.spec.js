'use strict';

// jasmine test suite
describe( 'telepathic', function() {

    describe( 'path creation', function() {

        var tele;

        // make the app
        beforeEach(module('guidelight.telepathic'));

        // make controller and scope
        /*
        beforeEach(angular.mock.inject( function ($rootScope, $controller) {
            scope = $rootScope.$new();
            $controller('MainCtrl', {$scope: scope});
        }));
        */
        beforeEach(angular.mock.inject( function (_telepathic_) {
            tele = _telepathic_
        }))

        it('should correctly make paths with the correct slashes',
            inject( function (tele) {
                expect( tele.path('feature', ['a']) ).toBe('/a');
                expect( tele.path('feature', ['a', 'b']) ).toBe('/a/b');
                expect( tele.path('feature', ['abc', 'def']) ).toBe('/abc/def');
                expect( tele.path('feature', ['/abc', 'def']) ).toBe('/abc/def');
                expect( tele.path('feature', ['abc', '/def']) ).toBe('/abc/def');
                expect( tele.path('feature', ['/abc', '/def']) ).toBe('/abc/def');
                expect( tele.path('feature', ['abc/', 'def']) ).toBe('/abc/def');
                expect( tele.path('feature', ['abc', 'def/']) ).toBe('/abc/def');
                expect( tele.path('feature', ['abc/', 'def/']) ).toBe('/abc/def');
                expect( tele.path('feature', ['/abc/', 'def']) ).toBe('/abc/def');
                expect( tele.path('feature', ['abc', '/def/']) ).toBe('/abc/def');
                expect( tele.path('feature', ['/abc/', '/def']) ).toBe('/abc/def');
                expect( tele.path('feature', ['abc/', '/def/']) ).toBe('/abc/def');
                expect( tele.path('feature', ['//abc', 'def']) ).toBe('/abc/def');
                expect( tele.path('feature', ['abc', '//def']) ).toBe('/abc/def');
                expect( tele.path('feature', ['abc//', 'def']) ).toBe('/abc/def');
                expect( tele.path('feature', ['abc', 'def//']) ).toBe('/abc/def');
                expect( tele.path('feature', ['//abc', '//def']) ).toBe('/abc/def');
                expect( tele.path('feature', ['//abc//', 'def']) ).toBe('/abc/def');
                expect( tele.path('feature', ['//abc//', '//def']) ).toBe('/abc/def');
                expect( tele.path('feature', ['//abc//', 'def//']) ).toBe('/abc/def');
                expect( tele.path('feature', ['//abc//', '//def//']) ).toBe('/abc/def');
                expect( tele.path('feature', ['////////////////abc', '////////////////def']) ).toBe('/abc/def');
                expect( tele.path('feature', ['//////////////abc//////////////', '//////////////def///////////////']) ).toBe('/abc/def');
            })
        );
    });
});





















