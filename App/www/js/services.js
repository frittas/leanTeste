angular.module('app.services', [])

    .factory('baseRest', function ($http, $q, ApiEndpoint) {        
       
        return {
            dataService: function () {

                return {

                    get: function (params, cache) {
                        return $http.get(ApiEndpoint.url + params.url, { cache: cache });
                    },
                    post: function (params) {
                        return $http.post(ApiEndpoint.url + params.url, params.data, { cache: false });
                    },
                    put: function (params) {
                        return $http.put(ApiEndpoint.url + params.url, params.data, { cache: false });
                    },
                    delete: function (params) {
                        return $http.delete(ApiEndpoint.url + params.url, params.data, { cache: false });
                    },
                };
            }
        };

    });

