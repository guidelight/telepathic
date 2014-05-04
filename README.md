telepathic
==========

AngularJS $location wrapper that adds feature namespacing

**WIP**

The idea behind telepathic is to manage app 'feature' paths without worrying about collisions.  For example, a blog feature might namespace all paths with 'blog/'.  But, if it is to be considered reusable, then
it should just as easily be namespaced into something else.  There is a 'feature' and it's 'namespace'.  In this
case the feature is 'blog' and the namespace is 'blog/'.  We can move the namespace to 'features/blog/' if we need to by simply changing it's namespace and not having to track down every single path reference throughout an entire app and move it to another namespace.
