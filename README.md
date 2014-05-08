telepathic
==========

AngularJS $location wrapper that adds feature namespacing

The idea behind telepathic is to manage app 'feature' paths without worrying about collisions.  For example, a blog feature might namespace all paths with 'blog/'.  But, if it is to be considered reusable, then
it should just as easily be namespaced into something else.  There is a 'feature' and it's 'namespace'.  In this
case the feature is 'blog' and the namespace is 'blog/'.  We can move the namespace to 'features/blog/' if we need to by simply changing it's namespace and not having to track down every single path reference throughout an entire app and move it to another namespace.

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
