'use strict';

var tele = angular.module('guidelight.telepathic', ['ngRoute']);

/**
*   Provides an AngularJS $location wrapper that adds feature namespacing
*/
tele.provider( 'tele',
[
    '$routeProvider', '$locationProvider'
,
function ($routeProvider, $locationProvider) {

    var html5Mode = false;
    var hashPrefix = '';
    var _features = {};

    // TODO: this should be in a util service
    var _trimEnds = function (str, trimChar) {
        if (!str || !trimChar) {
            throw Error('can\'t trim an empty string');
        }
        while (str[0] === '/') {
            str = str.slice(1);
        }
        while (str.slice(-1) === '/') {
            str = str.slice(0, str.length -1);
        }
        return str;
    };

    var _makePath = function (elements) {
        if (!Array.isArray(elements)) {
            throw Error('makePath only accepts arrays');
        }

        var path = ''
        for (var i = 0, end = elements.length; i < end; i++) {
            // ignore empty elements
            if (!elements[i]) {
                continue;
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
            $routeProvider.when(
                _makePath([namespace, routeDefs[i].path]),
                routeDefs[i].route
            );
        }
    };

    var _defaultRoute = function (path) {
        $routeProvider.otherwise({ redirectTo: path });
    }

    var _prefix = function () {
        return html5Mode ? '' : '#!';
    }

    var _getPath = function (feature, elements) {
        var namespace = _features[feature];
        if (!namespace) {
            throw Error('Telepathic: invalid feature name: ' + feature);
        }
        // force into an array
        var elems = [];
        if (typeof elements === 'string') {
            elems = elements.split('/');
        } else if (Array.isArray(elements)) {
            for (var i = 0, end = elements.length; i < end; i++) {
                elems[i] = elements[i] + '';
            }
        }
        return _makePath([].concat(namespace, elems));
    };


    return {
        html5Mode: function (mode) {
            html5Mode = mode;
            $locationProvider.html5Mode(mode);
        },
        hashPrefix: function (prefix) {
            hashPrefix = prefix;
            $locationProvider.hashPrefix(prefix);
        },
        $get : ['$location', function($location) {
            return {
                /**
                *   Get/Set routes for the named feature.
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

                path: function (feature, elements) {
                    if (feature) {
                        $location.path(_getPath(feature, elements));
                    }
                    return $location.path();
                },
                link: function (feature, elements) {
                    return _prefix() + _getPath(feature, elements);
                }

            };
        }]
    };
}]);






















