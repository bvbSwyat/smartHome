(function () {
    angular.module("mainApp").controller("RegistrationController", function (RestApi) {

      var vm = this;

      vm.signUp = function () {
        RestApi.signUp(vm.user).then(function () {
          $state.go('user.group');
        });
      }
    })
})();
