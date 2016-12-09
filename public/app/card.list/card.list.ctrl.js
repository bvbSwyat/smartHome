(function () {
  angular.module("mainApp").controller("CardListController", function (RestApi, UserFactory, $uibModal) {
    var vm = this;

    vm.cards = null;
    vm.listName = null;

    var getCardList = function () {
      RestApi.getUserCardList(UserFactory.getUser().id).then(function (data) {
        vm.cardList = data.data;
      });
    };
    getCardList();

    var getCards = function () {
      RestApi.getCards(UserFactory.getUser().id).then(function (data) {
        vm.cards = data.data;
      });
    };
    getCards();

    vm.createCardList = function () {
      var selectedArr = [];
      angular.forEach(vm.cards, function (card) {
        if(card.isAdded) selectedArr.push(card.id);
      });
      RestApi.createCardList(UserFactory.getUser().id, {listName: vm.listName, card_ids: selectedArr}).then(function () {
        vm.listName = null;
        getCardList();
      })
    };

    vm.sendInGroup = function (index) {
      var modalInstance = $uibModal.open({
        templateUrl: 'dist/templates/card.list/card.list.group.html',
        controller: 'CardListGroupCtrl',
        controllerAs: '$ctrl',
        resolve: {
          cardList: function () {
            return vm.cards[index];
          }
        }
      });

      modalInstance.result.then(function () {
      }, function () {
      });
    };

  })
})();
