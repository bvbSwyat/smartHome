(function () {
  angular.module("mainApp").controller("CardListGroupCtrl", function (RestApi, UserFactory, $uibModalInstance, cardListId) {
    var vm = this;

    vm.selectedId;
    vm.groups = [];
    vm.isManager = UserFactory.getUser().is_manager;

    RestApi.getAllGroups(UserFactory.getUser().id).then(function (data) {
      vm.groups = data.data;
    });

    vm.setSelected = function (id) {
      vm.selectedId = id;
    };

    vm.ok = function () {
      $uibModalInstance.close();
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  })
})();
