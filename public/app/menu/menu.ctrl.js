(function () {
  angular.module("mainApp").controller("MenuController", function ($state, $cookieStore) {
    var vm = this;

    vm.logout = function () {
      $cookieStore.remove('isAuth');
      $cookieStore.remove('id');
      $state.go("login");
    }

  })
})();
