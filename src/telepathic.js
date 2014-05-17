'use strict';

var tele = angular.module('guidelight.telepathic', ['ngRoute']);

/**
*   Provides an AngularJS $location and $routeProvider wrapper that adds feature namespacing
*/
tele.provider( 'tele',
[
    '$routeProvider', '$locationProvider'
,
function ($routeProvider, $locationProvider) {

    // browser-sde: html5Mode and hashPrefix - same as $locationProvider
    var _html5Mode = false;
    var _hashPrefix = '';

    // browser-sde: a hash of the registered features
    var _features = {};

    // browser-sde: a list of all the paths defined on all routes
    var _definedPaths = [];

    // server-side: the default root path on the server for all service urls
    var _serverApiBase = '';


    // TODO: this should be in a util service
    // given a string str, and a trim character trimChar, remove all instances of trimChar
    // from both ends of str
    var _trimEnds = function (str, trimChar) {
        if (!str || !trimChar) {
            throw Error('can\'t trim an empty string');
        }
        while (str[0] === '/') {
            str = str.slice(1);
        }
        //console.log(str);
        while (str.slice(-1) === '/') {
            str = str.slice(0, str.length - 1);
        }
        return str;
    };

    // given a hash of property/values in queryparams, convert them into a query string
    // returns empty string if hash is empty, or query string with '?' already prefixed
    var _makeQueryString = function (queryparams) {
        var qs = [];
        for(var param in queryparams) {
            if (queryparams.hasOwnProperty(param) && _isValidPathElement(queryparams[param]) ) {
                qs.push(encodeURIComponent(param) + "=" + encodeURIComponent(queryparams[param]));
            }
        }
        return qs.length ? '?' + qs.join('&') : '';
    };

    var _notDefined = function (foo) {
        return foo === undefined || foo === null;
    };

    var _isValidPathElement = function (element) {
        return element !== '' && element !== null && element !== undefined && element !== NaN;
    };


    // converts one or more ordered elements into a path, possibly with a query string
    // the given elements parameter must be an array
    var _makePath = function (elements) {
        if (!Array.isArray(elements)) {
            throw Error('makePath only accepts arrays');
        }
        var path = '';
        var elem = '';
        for (var i = 0, end = elements.length; i < end; i++) {
            // ignore invalid elements
            if (!_isValidPathElement(elements[i])) {
                continue;
            }
            if (typeof elements[i] === 'object') {
                // query string must be the terminal element
                return path + _makeQueryString(elements[i]);
            } else {
                elem = _trimEnds((elements[i] + ''), '/');
            }
            if (!elem) {
                continue;
            }
            path = path + '/' + elem;
        }
        return path;
    };


    var _defineRoutes = function (feature, namespace, routeDefs) {
        if (_notDefined(feature) || _notDefined(namespace) || _notDefined(routeDefs) || !Array.isArray(routeDefs)) {
            throw Error('Telepathic: Incorrect or missing parameters for _defineRoutes');
        }
        if (_features[feature] && _features[feature] !== namespace) {
            throw Error('Telepathic: Cannot redfined a feature\'s namespace');
        }
        _features[feature] = namespace;

        for (var i = 0, end = routeDefs.length; i < end; i++) {
            var definedPath = _makePath([namespace, routeDefs[i].path]);
            _definedPaths.push(definedPath);
            $routeProvider.when(
                definedPath,
                routeDefs[i].route
            );
        }
    };

    var _defaultRoute = function (path) {
        $routeProvider.otherwise({ redirectTo: path });
    }

    var _prefix = function () {
        return _html5Mode ? '' : '#!';
    }

    var _forceToArrayOfStrings = function (elements) {
        var elems = [];
        if (typeof elements === 'string') {
            elems = elements.split('/');
        } else if (Array.isArray(elements)) {
            for (var i = 0, end = elements.length; i < end; i++) {
                if (_isValidPathElement(elements[i])) {
                    elems.push(elements[i] + '');
                }
            }
        }
        return elems;
    };

    var _getPath = function (feature, elements) {
        var namespace = _features[feature];
        if (!namespace) {
            throw Error('Telepathic: invalid feature name: ' + feature);
        }
        return _makePath([].concat(namespace, _forceToArrayOfStrings(elements)));
    };


    return {
        html5Mode: function (mode) {
            _html5Mode = mode;
            $locationProvider.html5Mode(mode);
        },
        hashPrefix: function (prefix) {
            _hashPrefix = prefix;
            $locationProvider.hashPrefix(prefix);
        },
        serverBase: function (apiBasePath) {
            _serverApiBase = _trimEnds(apiBasePath, '/');
        },
        $get : ['$location', function($location) {
            return {
                /**
                *   Browser-side feature and route registration, and path/link generation
                */
                routes: function (feature, namespace, routeDefs) {
                    _defineRoutes(feature, namespace, routeDefs);
                    return this;
                },
                defaultRoute: function (path) {
                    _defaultRoute(path);
                    return this;
                },

                features: function () {
                    return _features;
                },
                namespace: function (feature) {
                    return _features[feature];
                },
                definedPaths: function () {
                    return _definedPaths;
                },

                path: function (feature, elements) {
                    if (feature) {
                        $location.path(_getPath(feature, elements));
                    }
                    return $location.path();
                },
                link: function (feature, elements) {
                    return _prefix() + _getPath(feature, elements);
                },
                activePath: function () {
                    return $location.path();
                },

                /**
                *   Server path generation, e.g. for a web service api
                */
                apiPath: function (feature, elements, queryparams) {
                    return _makePath([].concat(_serverApiBase, feature, _forceToArrayOfStrings(elements), queryparams));
                }

            };
        }]
    };
}]);



















