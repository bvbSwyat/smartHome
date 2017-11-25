(function () {
    angular.module("mainApp").controller("RegistrationController", function (RestApi, $state, UserFactory, $cookieStore, $rootScope) {

      var vm = this;

        // remove it and newer use  -it must be session in next release
      if ($cookieStore.get('isAuth')) {
        $state.go($rootScope.$previousState);
      }

      vm.signUp = function () {
        RestApi.signUp(vm.user).then(function (data) {
           UserFactory.setUser(data.data);
           data.is_manager ? $state.go('home.dashboard') : $state.go('user.cardlist');
        }, function(error) {
            alert('You sent bad credentials!');
        });
      }
    })
})();
