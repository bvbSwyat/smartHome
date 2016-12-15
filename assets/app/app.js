(function () {
    angular.module("mainApp", ['ui.router', 'ui.bootstrap', 'ngCookies'])
    
    .run( [ '$rootScope', function ($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
            $rootScope.$previousState = from;
        });
      }]);
})();
