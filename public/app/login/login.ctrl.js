(function () {
    angular.module("mainApp").controller("LoginController", function (RestApi, UserFactory, $state, $cookieStore) {
      var vm = this;


      if ($cookieStore.get('isAuth')) {
        $state.go('user.usergroup');
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
