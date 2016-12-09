(function () {
    angular.module("mainApp").controller("RegistrationController", function (RestApi, $state) {

      var vm = this;

      vm.signUp = function () {
        RestApi.signUp(vm.user).then(function (data) {
           data.is_manager ? $state.go('user.usergroup') : $state.go('user.cardlist');
        }, function(error) {
            alert('You sent bad credentials!');
        });
      }
    })
})();
