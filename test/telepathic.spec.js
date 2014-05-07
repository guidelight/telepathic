'use strict';

// jasmine test suite
describe( 'telepathic', function() {

    describe( 'feature registration', function() {

        beforeEach(module('guidelight.telepathic'));

        it('should properly register features',

            inject( function (telepathic) {

                var tele = telepathic;
                tele.routes( 'blog', 'blog/', [
                    { path: ':userid', route: { template: 'howdy' }},
                    { path: ':userid/details', route: { template: 'howdy' }},
                    { path: ':userid/:postid', route: { template: 'howdy' }}
                ]);

                expect( tele.namespace('blog') ).toBe('blog/');

            })
        );
    });
});
