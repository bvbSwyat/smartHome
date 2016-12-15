(function () {
  angular.module("mainApp").controller("CardShowCtrl", function (UserFactory, RestApi, card, $uibModalInstance) {
    var vm = this;
    vm.card = card;

    vm.save = function () {
      RestApi.updateCard(UserFactory.getUser().id, vm.card.id, {name: vm.card.name, content: document.getElementById("card-content").innerHTML}).then(function () {
        $uibModalInstance.close();
      });
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  })
})();
