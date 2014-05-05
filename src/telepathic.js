'use strict';

var tele = angular.module('guidelight.telepathic');

/**
*   Provides an AngularJS $location wrapper that adds feature namespacing
*/
tele.provider( 'telepathic',
[
    '$routeProvider', '$locationProvider', '$location'
,
function ($routeProvider, $locationProvider, $location) {

    var _features = {};

    // TODO: this should be in to util service
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

        if (elements[0] !== _config.featureRoot) {
            elements.unshift(_config.featureRoot);
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
            throw Error('Telepathic: Cannot redfined a feature\' namespace');
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


    return {
        html5Mode: function (mode) {
            $locationProvider.html5Mode(mode);
        },
        hashPrefix: function (prefix) {
            $locationProvider.hashPrefix(prefix);
        },
        $get : function() {
            return {
                config: function (config) {
                    if (!config) {
                        return _config;
                    }
                    _config = config;
                },

                /**
                *   Get/Set routes for the named feature.
                */
                routes: function (feature, namespace, routeDefs) {
                    _defineRoutes(feature, namespace, routeDefs);
                    return this;
                },

                defaultRoute: function (path) {
                    _setDefaultRoute(path);
                    return this;
                },

                getPath: function (feature, elements) {
                    var namespace = _features[feature];
                    if (!namespace) {
                        throw Error('Telepathic: invalid feature name: ' + feature);
                    }
                    // force into an array
                    var elems = [];
                    if (typeof elements === 'string') {
                        elems = elements.split('/');
                    } else if (Array.isArray(elements)) {
                        elems = elements;
                    }
                    return _makePath(elems.unshift(namespace));
                },

                path: function (feature, elements) {
                    $location.path(this.getPath(feature, elements));
                }
            };
        }
    };
}]);
