# telepathic
==========

AngularJS $location and $routeProvider wrapper that adds 'feature' namespacing.

The idea behind telepathic is to manage the paths associated witha a browser app's 'features' without worrying about collisions.  For example, a blog feature might namespace all paths with 'blog/'.  But it could also be namespaced into paths starting with 'myblog/' or any other namespace.  So, a 'feature' has a 'namespace'.  In this
example, the feature is 'blog' and the namespace is 'blog/'.  We can move the namespace to 'public/blog/' if we need to by simply changing it's namespace and not having to track down every single path reference throughout an entire app - in directives, in templates, in controllers and services - and move it to another namespace.

As an added benefit of this approach, '''telepathic''' also provides methods for constructing server urls for web services or simple pages.  If, for example, you have an api for blog content, you may have your web api versioned and rooted in, say, '/api/v1'.  Similar to browser features and namespaces, you can set this up as feature 'blog' and namespace '/api/v1/blog'.

## Installation
First add the bower package:
<pre>
bower install --save telepathic
</pre>

Next, add a dependency reference to 'guidelight.telepathic' in your module, and configure telepathic just like angular's $locationProvider:
<pre>
'use strict';

var app = angular.module( 'myAwesomeModule'
    ,
    [   'ngRoute'
    ,   'ngSanitize'
    ,   'ui.select2'
    ...
    ,   'guidelight.telepathic'
]);

app.config(['telepathicProvider', function (telepathic) {
    telepathic.html5Mode(false);
    telepathic.hashPrefix('!');
}]);
</pre>

Set up routes for your features:
<pre>
app.run(['telepathic', function (tele) {

    // routes for the feature 'demo', which is being namespaced into 'demo/'
    tele.routes( 'demo', 'demo/', [
        { path: '/index',                           route: {templateUrl: 'partials/landing-page.html'} },
        { path: '/get-started',                     route: {templateUrl: 'partials/get-started.html' } },
        { path: '/forms',                           route: {templateUrl: 'partials/forms.html'       } },
    ]);

    // set up the application-wide default route
    tele.defaultRoute('/demo/index');

}]);
</pre>

Telepathic provides methods for you to create links, as well as ways of immediately changing the page location.  For links, use the link() method:
<pre>
{{tele.link('demo', ['get-started'])}}
</pre>

Use it in place of $location.path() in code to immediately go to that route:
<pre>
tele.path('demo', ['get-started']);
</pre>

## Examples
Using the simple blog example above, let's say we have created a blog feature (a set of directives, controllers, services, etc.) and are using the following paths throughout the feature:
- blog/:userid  - list of blog posts
- blog/:userid/details - details about this blogger
- blog/:userid/:postid - detailed view of one blog post

We've set up routes for these paths and using them in $location.path statements throughout the code.  Changing them is a pain.  But, if we abstract the root of these paths by calling it a namespace and giving the namespace a label, which we will call 'feature', then we can change everything all at once:

We set up routes almost exactly like in angular:

<pre>
tele.routes( 'blog', 'blog/', [
    { path: ':userid', route: { same options as in angulars $routeProvider }},
    { path: ':userid/details', route: { }},
    { path: ':userid/:postid', route: { }}
]);
</pre>

And access routes using an array of elements like this:
<pre>
tele.path('blog', [a_userid]);
tele.path('blog', [a_userid, a_postid]);
</pre>

or with strings like this:
<pre>
tele.path('blog', a_userid);
tele.path('blog', a_userid + '/' + a_postid);
</pre>

If we reuse our blog feature in a new site that already has the 'blog/' namespace used for a different purpose (e.g. the organization has a section called 'Bi-Lateral Omniscient Goodies'), then we can move the routes to a new namespace by changing one value for the entire feature:
<pre>
tele.routes( 'blog', 'userblog/', [
    { path: ':userid', route: { same options as in angulars $routeProvider }},
    { path: ':userid/details', route: { }},
    { path: ':userid/:postid', route: { }}
]);
</pre>
