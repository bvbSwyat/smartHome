(function () {
  angular.module("mainApp").controller("CardShowCtrl", function (card, $uibModalInstance) {
    var vm = this;

    vm.card = card;

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  })
})();
