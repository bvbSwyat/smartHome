(function () {
    angular.module("mainApp", ['ui.router', 'ui.bootstrap', 'ngCookies', 'angular-bind-html-compile'])

    .run( [ '$rootScope', function ($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
            $rootScope.$previousState = from;
        });
      }]);
})();
