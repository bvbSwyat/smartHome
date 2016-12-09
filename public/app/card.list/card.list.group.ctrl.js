(function () {
  angular.module("mainApp").controller("CardListGroupCtrl", function (RestApi, UserFactory, $uibModalInstance, cardList) {
    var vm = this;

    vm.selectedId;
    vm.groups = [
      {name: "nazar", id: 1},
      {name: "nazar1", id: 2},
      {name: "nazar2", id: 3},
      {name: "nazar3", id: 4}
      ];

    RestApi.getGroupsForUser(UserFactory.getUser().id).then(function (data) {
      vm.groups = data.data;
    });

    vm.setSelected = function (id) {
      console.log(id);
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
