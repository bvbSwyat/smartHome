(function () {
  angular.module("mainApp").controller("UserGroupController", function (RestApi) {
    var vm = this;

    vm.groupName = null;
    vm.groups = null;
    vm.users = null;

    var getGroups = function () {
      RestApi.getAllGroups().then(function (data) {
        vm.groups = data.response;
      });
    };
    getGroups();

    var getUsers = function () {
      RestApi.getUsersList().then(function (data) {
        vm.users = data.response;
      });
    };
    getUsers();

    vm.create = function() {
      RestApi.createNewGroup().then(function () {
        getGroups();
      });
    }

  })
})();
