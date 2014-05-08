'use strict';

// jasmine test suite
describe( 'telepathic', function() {

    describe( 'api tests:', function() {

        beforeEach(module('guidelight.telepathic'));

        it('should properly register features',

            inject( function (telepathic) {

                var tele = telepathic;

                tele.routes( 'blog', 'blog/', [
                    { path: ':userid', route: { template: 'howdy' }}
                ]);

                tele.routes( 'article', 'story/', [
                    { path: ':aid', route: { template: 'howdy' }}
                ]);

                expect( tele.namespace('blog') ).toBe('blog/');
                expect( tele.namespace('article') ).toBe('story/');
            })
        );

        it('should generate feature paths from array of path elements',

            inject( function (telepathic) {

                var tele = telepathic;

                tele.routes( 'blog', 'blog/', [
                    { path: ':userid', route: { template: 'howdy' }},
                    { path: ':userid/:postid', route: { template: 'howdy' }},
                    { path: ':userid/:postid/details', route: { template: 'howdy' }},
                    { path: ':userid/:postid/edit', route: { template: 'howdy' }}
                ]);

                tele.routes( 'article', 'article/', [
                    { path: ':aid', route: { template: 'howdy' }},
                    { path: ':aid/edit', route: { template: 'howdy' }},
                    { path: ':aid/details', route: { template: 'howdy' }},
                    { path: ':aid/details/edit', route: { template: 'howdy' }}
                ]);

                expect( tele.path('blog', [243]) ).toBe('/blog/243');
                expect( tele.path('blog', ['243']) ).toBe('/blog/243');
                expect( tele.path('blog', '243') ).toBe('/blog/243');
                expect( tele.path('blog', '/243') ).toBe('/blog/243');
                expect( tele.path('blog', '///243') ).toBe('/blog/243');
                expect( tele.path('blog', '243/') ).toBe('/blog/243');
                expect( tele.path('blog', '/243/') ).toBe('/blog/243');
                expect( tele.path('blog', '/////243///') ).toBe('/blog/243');

                expect( tele.path('blog', [243, 73898]) ).toBe('/blog/243/73898');
                expect( tele.path('blog', [243, '73898']) ).toBe('/blog/243/73898');
                expect( tele.path('blog', ['243', 73898]) ).toBe('/blog/243/73898');
                expect( tele.path('blog', ['243', '73898']) ).toBe('/blog/243/73898');

                expect( tele.path('blog', [243, 73898, 'details']) ).toBe('/blog/243/73898/details');
                expect( tele.path('blog', [243, '73898', 'details']) ).toBe('/blog/243/73898/details');
                expect( tele.path('blog', ['243', 73898, 'details']) ).toBe('/blog/243/73898/details');
                expect( tele.path('blog', ['243', '73898', 'details']) ).toBe('/blog/243/73898/details');


            })
        );



    });
});
