(function () {
    angular.module("mainApp").controller("LoginController", function (RestApi, UserFactory, $state, $cookieStore, $rootScope) {
      var vm = this;

      // remove it and newer use  -it must be session in next release
      if ($cookieStore.get('isAuth')) {
        if ($rootScope.$previousState && $rootScope.$previousState.abstract) {
          $state.go('home.dashboard');
        }
        $state.go($rootScope.$previousState);
      }

      vm.user = {
        email: null,
        password: null  
      };
      vm.isError = false;

      vm.login = function () {
        RestApi.signIn(vm.user).then(function (data) {
          UserFactory.setUser(data.data);
          $state.go('home.dashboard');
        }, function (err) {
          vm.isError = true;
        });
      }

    })
})();
