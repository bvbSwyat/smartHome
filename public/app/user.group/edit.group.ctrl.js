(function () {
  angular.module("mainApp").controller("EditGroupCtrl", function (RestApi, group, $uibModalInstance, allUsers) {
    var vm = this;
    console.log(group);
    vm.group = group;
    vm.allUsers = angular.copy(allUsers);

    vm.save = function () {
      var selectedArr = angular.copy(vm.group.user_ids);
      angular.forEach(vm.allUsers, function (user) {
        if(user.isAdded) selectedArr.push(user.id);
      });
      RestApi.changeGroup(vm.group.id, {user_ids: selectedArr}).then(function () {
        $uibModalInstance.close();
      }, function () {

      });
    };

    vm.isUsersInGroup = function (userId) {
      var isUserInGroup = false;
      angular.forEach(vm.group.user_ids, function (user_id) {
        if(userId == user_id) {
          isUserInGroup = true;
        }
      });
      return !isUserInGroup;
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  })
})();
