(function () {
    angular.module("mainApp").controller("LoginController", function (RestApi, UserFactory, $state) {
      var vm = this;

      vm.user = {
        email: null,
        password: null
      };
      vm.isError = false;

      vm.login = function () {
        RestApi.signIn(vm.user).then(function (data) {
          UserFactory.setUser(data.data);
          $state.go('usergroup');
        }, function (err) {
          vm.isError = true;
        });
      }

    })
})();
