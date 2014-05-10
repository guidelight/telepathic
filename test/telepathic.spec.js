'use strict';

// jasmine test suite
describe( 'telepathic', function() {

    function initService(html5Mode, hashPrefix, supportHistory) {
        return module(function($provide, teleProvider){
            teleProvider.html5Mode(html5Mode);
            teleProvider.hashPrefix(hashPrefix);
            $provide.value('$sniffer', {history: supportHistory});
        });
    }

    beforeEach(function () {
        module('guidelight.telepathic');
    });

/*-----------------------------------------------------------------------------
    TELEPATHIC PATH GENERATION TESTS
*/
    describe( 'non-html5Mode PATH tests:', function() {

        beforeEach(initService(false, '!', true));

        beforeEach(
            inject( function (tele) {

                tele.routes( 'blog', 'blog/', [
                    { path: ':userid', route: { template: 'howdy' }},
                    { path: ':userid/:postid', route: { template: 'howdy' }},
                    { path: ':userid/:postid/details', route: { template: 'howdy' }},
                    { path: ':userid/:postid/edit', route: { template: 'howdy' }}
                ]);

                tele.routes( 'article', 'story/', [
                    { path: ':aid', route: { template: 'howdy' }},
                    { path: ':aid/edit', route: { template: 'howdy' }},
                    { path: ':aid/details', route: { template: 'howdy' }},
                    { path: ':aid/details/edit', route: { template: 'howdy' }}
                ]);
            })
        );

        it('should properly register features',

            inject( function (tele) {

                expect( tele.namespace('blog') ).toBe('blog/');
                expect( tele.namespace('article') ).toBe('story/');
            })
        );

        it('should generate non-html5Mode feature PATHS from array of path elements',

            inject( function (tele) {

                expect( tele.path('blog', [243]) ).toBe('/blog/243');
                expect( tele.path('blog', ['243']) ).toBe('/blog/243');

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

        it('should generate non-html5Mode feature PATHS from a string',

            inject( function (tele) {

                expect( tele.path('blog', '243') ).toBe('/blog/243');
                expect( tele.path('blog', '/243') ).toBe('/blog/243');
                expect( tele.path('blog', '///243') ).toBe('/blog/243');
                expect( tele.path('blog', '243/') ).toBe('/blog/243');
                expect( tele.path('blog', '/243/') ).toBe('/blog/243');
                expect( tele.path('blog', '/////243///') ).toBe('/blog/243');

                expect( tele.path('blog', '243/73898') ).toBe('/blog/243/73898');
                expect( tele.path('blog', '/243/73898') ).toBe('/blog/243/73898');
                expect( tele.path('blog', '////243////73898////') ).toBe('/blog/243/73898');

                expect( tele.path('blog', '243/73898/details') ).toBe('/blog/243/73898/details');
                expect( tele.path('blog', '/243/73898/details/') ).toBe('/blog/243/73898/details');
                expect( tele.path('blog', '///243///73898//details//////') ).toBe('/blog/243/73898/details');
            })
        );
    });

    describe( 'html5Mode PATH tests:', function() {

        beforeEach(initService(true, '!', true));

        beforeEach(
            inject( function (tele) {

                tele.routes( 'blog', 'blog/', [
                    { path: ':userid', route: { template: 'howdy' }},
                    { path: ':userid/:postid', route: { template: 'howdy' }},
                    { path: ':userid/:postid/details', route: { template: 'howdy' }},
                    { path: ':userid/:postid/edit', route: { template: 'howdy' }}
                ]);

                tele.routes( 'article', 'story/', [
                    { path: ':aid', route: { template: 'howdy' }},
                    { path: ':aid/edit', route: { template: 'howdy' }},
                    { path: ':aid/details', route: { template: 'howdy' }},
                    { path: ':aid/details/edit', route: { template: 'howdy' }}
                ]);
            })
        );

        it('should properly register features',

            inject( function (tele) {

                expect( tele.namespace('blog') ).toBe('blog/');
                expect( tele.namespace('article') ).toBe('story/');
            })
        );

        it('should generate html5Mode feature PATH from array of path elements',

            inject( function (tele) {

                expect( tele.path('blog', [243]) ).toBe('/blog/243');
                expect( tele.path('blog', ['243']) ).toBe('/blog/243');

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

        it('should generate html5Mode feature PATH from a string',

            inject( function (tele) {

                expect( tele.path('blog', '243') ).toBe('/blog/243');
                expect( tele.path('blog', '/243') ).toBe('/blog/243');
                expect( tele.path('blog', '///243') ).toBe('/blog/243');
                expect( tele.path('blog', '243/') ).toBe('/blog/243');
                expect( tele.path('blog', '/243/') ).toBe('/blog/243');
                expect( tele.path('blog', '/////243///') ).toBe('/blog/243');

                expect( tele.path('blog', '243/73898') ).toBe('/blog/243/73898');
                expect( tele.path('blog', '/243/73898') ).toBe('/blog/243/73898');
                expect( tele.path('blog', '////243////73898////') ).toBe('/blog/243/73898');

                expect( tele.path('blog', '243/73898/details') ).toBe('/blog/243/73898/details');
                expect( tele.path('blog', '/243/73898/details/') ).toBe('/blog/243/73898/details');
                expect( tele.path('blog', '///243///73898//details//////') ).toBe('/blog/243/73898/details');
            })
        );
    });


/*-----------------------------------------------------------------------------
    TELEPATHIC LINK GENERATION TESTS
*/
    describe( 'non-html5Mode LINK tests:', function() {

        beforeEach(initService(false, '!', true));

        beforeEach(
            inject( function (tele) {

                tele.routes( 'blog', 'blog/', [
                    { path: ':userid', route: { template: 'howdy' }},
                    { path: ':userid/:postid', route: { template: 'howdy' }},
                    { path: ':userid/:postid/details', route: { template: 'howdy' }},
                    { path: ':userid/:postid/edit', route: { template: 'howdy' }}
                ]);

                tele.routes( 'article', 'story/', [
                    { path: ':aid', route: { template: 'howdy' }},
                    { path: ':aid/edit', route: { template: 'howdy' }},
                    { path: ':aid/details', route: { template: 'howdy' }},
                    { path: ':aid/details/edit', route: { template: 'howdy' }}
                ]);
            })
        );

        it('should properly register features',

            inject( function (tele) {

                expect( tele.namespace('blog') ).toBe('blog/');
                expect( tele.namespace('article') ).toBe('story/');
            })
        );

        it('should generate non-html5Mode feature LINK from array of path elements',

            inject( function (tele) {

                expect( tele.link('blog', [243]) ).toBe('#!/blog/243');
                expect( tele.link('blog', ['243']) ).toBe('#!/blog/243');

                expect( tele.link('blog', [243, 73898]) ).toBe('#!/blog/243/73898');
                expect( tele.link('blog', [243, '73898']) ).toBe('#!/blog/243/73898');
                expect( tele.link('blog', ['243', 73898]) ).toBe('#!/blog/243/73898');
                expect( tele.link('blog', ['243', '73898']) ).toBe('#!/blog/243/73898');

                expect( tele.link('blog', [243, 73898, 'details']) ).toBe('#!/blog/243/73898/details');
                expect( tele.link('blog', [243, '73898', 'details']) ).toBe('#!/blog/243/73898/details');
                expect( tele.link('blog', ['243', 73898, 'details']) ).toBe('#!/blog/243/73898/details');
                expect( tele.link('blog', ['243', '73898', 'details']) ).toBe('#!/blog/243/73898/details');
            })
        );

        it('should generate non-html5Mode feature LINK from a string',

            inject( function (tele) {

                expect( tele.link('blog', '243') ).toBe('#!/blog/243');
                expect( tele.link('blog', '/243') ).toBe('#!/blog/243');
                expect( tele.link('blog', '///243') ).toBe('#!/blog/243');
                expect( tele.link('blog', '243/') ).toBe('#!/blog/243');
                expect( tele.link('blog', '/243/') ).toBe('#!/blog/243');
                expect( tele.link('blog', '/////243///') ).toBe('#!/blog/243');

                expect( tele.link('blog', '243/73898') ).toBe('#!/blog/243/73898');
                expect( tele.link('blog', '/243/73898') ).toBe('#!/blog/243/73898');
                expect( tele.link('blog', '////243////73898////') ).toBe('#!/blog/243/73898');

                expect( tele.link('blog', '243/73898/details') ).toBe('#!/blog/243/73898/details');
                expect( tele.link('blog', '/243/73898/details/') ).toBe('#!/blog/243/73898/details');
                expect( tele.link('blog', '///243///73898//details//////') ).toBe('#!/blog/243/73898/details');
            })
        );
    });

    describe( 'html5Mode LINK tests:', function() {

        beforeEach(initService(true, '!', true));

        beforeEach(
            inject( function (tele) {

                tele.routes( 'blog', 'blog/', [
                    { path: ':userid', route: { template: 'howdy' }},
                    { path: ':userid/:postid', route: { template: 'howdy' }},
                    { path: ':userid/:postid/details', route: { template: 'howdy' }},
                    { path: ':userid/:postid/edit', route: { template: 'howdy' }}
                ]);

                tele.routes( 'article', 'story/', [
                    { path: ':aid', route: { template: 'howdy' }},
                    { path: ':aid/edit', route: { template: 'howdy' }},
                    { path: ':aid/details', route: { template: 'howdy' }},
                    { path: ':aid/details/edit', route: { template: 'howdy' }}
                ]);
            })
        );

        it('should properly register features',

            inject( function (tele) {

                expect( tele.namespace('blog') ).toBe('blog/');
                expect( tele.namespace('article') ).toBe('story/');
            })
        );

        it('should generate html5Mode feature LINK from array of link elements',

            inject( function (tele) {

                expect( tele.link('blog', [243]) ).toBe('/blog/243');
                expect( tele.link('blog', ['243']) ).toBe('/blog/243');

                expect( tele.link('blog', [243, 73898]) ).toBe('/blog/243/73898');
                expect( tele.link('blog', [243, '73898']) ).toBe('/blog/243/73898');
                expect( tele.link('blog', ['243', 73898]) ).toBe('/blog/243/73898');
                expect( tele.link('blog', ['243', '73898']) ).toBe('/blog/243/73898');

                expect( tele.link('blog', [243, 73898, 'details']) ).toBe('/blog/243/73898/details');
                expect( tele.link('blog', [243, '73898', 'details']) ).toBe('/blog/243/73898/details');
                expect( tele.link('blog', ['243', 73898, 'details']) ).toBe('/blog/243/73898/details');
                expect( tele.link('blog', ['243', '73898', 'details']) ).toBe('/blog/243/73898/details');
            })
        );

        it('should generate html5Mode feature LINK from a string',

            inject( function (tele) {

                expect( tele.link('blog', '243') ).toBe('/blog/243');
                expect( tele.link('blog', '/243') ).toBe('/blog/243');
                expect( tele.link('blog', '///243') ).toBe('/blog/243');
                expect( tele.link('blog', '243/') ).toBe('/blog/243');
                expect( tele.link('blog', '/243/') ).toBe('/blog/243');
                expect( tele.link('blog', '/////243///') ).toBe('/blog/243');

                expect( tele.link('blog', '243/73898') ).toBe('/blog/243/73898');
                expect( tele.link('blog', '/243/73898') ).toBe('/blog/243/73898');
                expect( tele.link('blog', '////243////73898////') ).toBe('/blog/243/73898');

                expect( tele.link('blog', '243/73898/details') ).toBe('/blog/243/73898/details');
                expect( tele.link('blog', '/243/73898/details/') ).toBe('/blog/243/73898/details');
                expect( tele.link('blog', '///243///73898//details//////') ).toBe('/blog/243/73898/details');
            })
        );
    });


});
