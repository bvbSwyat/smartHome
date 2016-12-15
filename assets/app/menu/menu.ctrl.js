(function () {
  angular.module("mainApp").controller("MenuController", function ($state, $cookieStore, UserFactory) {
    var vm = this;

    vm.isManager = UserFactory.getUser().is_manager;

    vm.logout = function () {
      $cookieStore.remove('isAuth');
      $cookieStore.remove('id');
      $state.go("login");
    }

  })
})();
