(function () {
    angular.module("mainApp").controller("LoginController", function (RestApi, UserFactory, $state, $cookieStore, $rootScope) {
      var vm = this;

      console.log($cookieStore.get('isAuth'))
      if ($cookieStore.get('isAuth')) {
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
          $state.go('user.usergroup');
        }, function (err) {
          vm.isError = true;
        });
      }

    })
})();
