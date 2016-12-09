(function () {
  angular.module("mainApp").controller("MenuController", function ($state) {
    var vm = this;

    vm.logout = function () {
      $state.go("login");
    }

  })
})();
