'use strict';

// jasmine test suite
describe( 'telepathic', function() {

    // shamelessly lifted from the angular location spec
    function initService(html5Mode, hashPrefix, serverBase, supportHistory) {
        return module(function($provide, teleProvider){
            teleProvider.html5Mode(html5Mode);
            teleProvider.hashPrefix(hashPrefix);
            teleProvider.serverBase(serverBase);
            $provide.value('$sniffer', {history: supportHistory});
        });
    }

    beforeEach(function () {
        module('guidelight.telepathic');
    });

/*-----------------------------------------------------------------------------
    TELEPATHIC BROWSER PATH GENERATION TESTS
*/
    describe( 'non-html5Mode PATH tests:', function() {

        beforeEach(initService(false, '!', 'api/v1', true));

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

                expect( tele.path('blog') ).toBe('/blog');
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

        beforeEach(initService(true, '!', 'api/v1', true));

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

                expect( tele.path('blog') ).toBe('/blog');
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
    TELEPATHIC BROWSER LINK GENERATION TESTS
*/
    describe( 'non-html5Mode LINK tests:', function() {

        beforeEach(initService(false, '!', 'api/v1', true));

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

                expect( tele.link('blog') ).toBe('#!/blog');
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

        beforeEach(initService(true, '!', 'api/v1', true));

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

                expect( tele.link('blog') ).toBe('/blog');
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


    describe( 'element arrays with functions', function() {

        beforeEach(initService(true, '!', 'api/v1', true));

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

        it('should generate a link from an array of elements with a function',

            inject( function (tele) {

                expect( tele.link('blog', [
                    function () { return 243; }
                ]) ).toBe('/blog/243');

                expect( tele.link('blog', [
                    function () { return '243'; }
                ]) ).toBe('/blog/243');

                expect( tele.link('blog', [
                    function () { return 243; },
                    function () { return 73898; }
                ]) ).toBe('/blog/243/73898');

                expect( tele.link('blog', [
                    function () { return 243; },
                    function () { return '73898'; }
                ]) ).toBe('/blog/243/73898');

                expect( tele.link('blog', [
                    function () { return 243; },
                    'foo',
                    function () { return '73898'; }
                ]) ).toBe('/blog/243/foo/73898');

                expect( tele.link('blog', [
                    'bar',
                    function () { return 243; },
                    'foo',
                    function () { return '73898'; }
                ]) ).toBe('/blog/bar/243/foo/73898');

                expect( tele.link('blog', [
                    'bar',
                    function () { return 243; },
                    'foo',
                    function () { return '73898'; },
                    'baz'
                ]) ).toBe('/blog/bar/243/foo/73898/baz');



            })
        );

    });

/*-----------------------------------------------------------------------------
    TELEPATHIC BROWSER PATH DUMP
*/
    describe( 'browser definedPaths tests:', function() {

        beforeEach(initService(true, '!', 'api/v1', true));

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

        it('should save all routing paths',

            inject( function (tele) {

                var paths = tele.definedPaths();

                for (var i = 0, end = paths.length; i < end; i++) {
                    console.log(paths[i]);
                }

                expect( paths.length ).toBe(8);
            })
        );



    });




/*-----------------------------------------------------------------------------
    TELEPATHIC SERVER PATH GENERATION TESTS
*/
    describe( 'server path tests:', function() {

        beforeEach(initService(true, '!', 'api/v1', true));

        it('should generate server paths correctly from feature, elements and queryparams',

            inject( function (tele) {

                expect( tele.apiPath('models') ).toBe('/api/v1/models');
                expect( tele.apiPath('models', [1]) ).toBe('/api/v1/models/1');
                expect( tele.apiPath('models', [234]) ).toBe('/api/v1/models/234');
                expect( tele.apiPath('models', ['new']) ).toBe('/api/v1/models/new');
                expect( tele.apiPath('models', [], {}) ).toBe('/api/v1/models');
                expect( tele.apiPath('models', [1], {}) ).toBe('/api/v1/models/1');
                expect( tele.apiPath('models', [234], {}) ).toBe('/api/v1/models/234');
                expect( tele.apiPath('models', ['new'], {}) ).toBe('/api/v1/models/new');
                expect( tele.apiPath('models', [], {foo: 'f'}) ).toBe('/api/v1/models?foo=f');
                expect( tele.apiPath('models', [1], {foo: false, bar: 'baz'}) ).toBe('/api/v1/models/1?foo=false&bar=baz');
            })
        );
    });


});








































