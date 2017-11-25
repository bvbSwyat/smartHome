(function () {
    angular.module("mainApp", ['ui.router', 'ui.bootstrap', 'ngCookies', 'angular-bind-html-compile'])

    .config( ['$httpProvider', function ($httpProvider) {

         $httpProvider.interceptors.push(function($q) {
          return {
           'request': function(config) {
               console.log(config)
               config.headers['accept'] = 'Authorization';
               config.headers['Authorization'] = new Date();
               return config;
            },

            'response': function(response) {
               return response;
            }
          };
        });
        // $httpProvider.defaults.headers.post['XSRF-AUTH'] =
        //     "some accessToken to be generated later";
    }])


    .run( [ '$rootScope', function ($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
            $rootScope.$previousState = from;
        });
      }]);
})();
