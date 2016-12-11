(function () {
  angular.module("mainApp").controller("EditCardCtrl", function (RestApi, cardSet, $uibModalInstance) {
    var vm = this;

    vm.cardSet = cardSet;
    vm.statuses = [
      {name: "Draft"},
      {name: "Ready"},
      {name: "Arhiv"}
    ];
    vm.cardSet.status = vm.cardSet.status || vm.statuses[0].name;

    vm.save = function () {
      RestApi.changeCardSet(vm.cardSet.id, cardSet).then(function () {
        $uibModalInstance.close();
      }, function () {

      });
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  })
})();
