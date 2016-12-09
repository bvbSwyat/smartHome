(function () {
  angular.module("mainApp").controller("UserGroupController", function (RestApi, UserFactory) {
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
      var selectedArr = [];
      angular.forEach(vm.users, function (user) {
        if(user.isAdded) selectedArr.push(user.id);
      });
      RestApi.createNewGroup(UserFactory.getUser().id, {user_ids: vm.users, name: vm.groupName}).then(function () {
        vm.groupName = null;
        getGroups();
      });
    };

  })
})();
