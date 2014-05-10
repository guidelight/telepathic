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

    var _html5Mode = false;
    var _hashPrefix = '';
    var _features = {};

    var _definedPaths = [];

    var _serverApiBase = '';

    // TODO: this should be in a util service
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

    var _makeQueryString = function (queryparams) {
        var qs = [];
        for(var param in queryparams) {
            if (queryparams.hasOwnProperty(param)) {
                qs.push(encodeURIComponent(param) + "=" + encodeURIComponent(queryparams[param]));
            }
        }
        return qs.length ? '?' + qs.join('&') : '';
    };

    var _makePath = function (elements) {
        if (!Array.isArray(elements)) {
            throw Error('makePath only accepts arrays');
        }

        var path = '';
        for (var i = 0, end = elements.length; i < end; i++) {
            // ignore empty elements
            if (elements[i] === '' || elements[i] === null || elements[i] === undefined || elements[i] === NaN) {
                continue;
            }
            if (typeof elements[i] === 'object') {
                return path + _makeQueryString(elements[i]);
            }
            var elem = _trimEnds(elements[i], '/');
            if (!elem) {
                continue;
            }
            path = path + '/' + elem;
        }
        return path;
    };


    var _notDefined = function (foo) {
        return foo === undefined || foo === null;
    }

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
                elems[i] = elements[i] + '';
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
            _serverApiBase = apiBasePath;
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



















