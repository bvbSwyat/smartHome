(function () {
  angular.module("mainApp").controller("UserGroupController", function (RestApi, UserFactory, $uibModal) {
    var vm = this;

    vm.groupName = null;
    vm.groups = null;
    vm.users = null;

    var getGroups = function () {
      RestApi.getAllGroups(UserFactory.getUser().id).then(function (data) {
        vm.groups = data.data;
      });
    };
    getGroups();

    var getUsers = function () {
      RestApi.getUsersList().then(function (data) {
        vm.users = data.data;
      });
    };
    getUsers();

    vm.create = function() {
      var selectedArr = [];
      angular.forEach(vm.users, function (user) {
        if(user.isAdded) selectedArr.push(user.id);
      });
      RestApi.createNewGroup(UserFactory.getUser().id, {user_ids: selectedArr, name: vm.groupName}).then(function () {
        vm.groupName = null;
        getGroups();
      });
    };

    vm.editGroup = function (group) {
      var modalInstance = $uibModal.open({
        templateUrl: 'dist/templates/user.group/edit.group.html',
        controller: 'EditGroupCtrl',
        controllerAs: '$ctrl',
        size: "lg",
        resolve: {
          group: function () {
            return group;
          },
          allUsers: function () {
            return vm.users;
          }
        }
      });

      modalInstance.result.then(function () {
      }, function () {
      });
    }

  })
})();
