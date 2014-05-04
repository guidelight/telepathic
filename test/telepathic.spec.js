describe( 'telepathic', function() {

    describe( 'path creation', function() {

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





















