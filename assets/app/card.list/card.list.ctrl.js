(function () {
  angular.module("mainApp").controller("CardListController", function (RestApi, UserFactory, $uibModal) {
    var vm = this;

    vm.cards = [];
    vm.listName = null;
    vm.statuses = [
      {name: "Draft"},
      {name: "Ready"},
      {name: "Arhiv"}
    ];
    vm.status = vm.statuses[0].name;


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
      RestApi.createNewList(UserFactory.getUser().id, {name: vm.listName, status: vm.status, card_ids: selectedArr}).then(function () {
        vm.listName = null;
        getCardList();
      })
    };

    vm.sendInGroup = function (id) {
      var modalInstance = $uibModal.open({
        templateUrl: 'dist/templates/card.list/card.list.group.html',
        controller: 'CardListGroupCtrl',
        controllerAs: '$ctrl',
        resolve: {
          cardListId: function () {
            return id;
          }
        }
      });

      modalInstance.result.then(function () {
      }, function () {
      });
    };

    vm.editCardList = function (cardSet) {
      var modalInstance = $uibModal.open({
        templateUrl: 'dist/templates/card.list/edit.card.html',
        controller: 'EditCardCtrl',
        controllerAs: '$ctrl',
        resolve: {
          cardSet: function () {
            return cardSet;
          }
        }
      });

      modalInstance.result.then(function () {
      }, function () {
      });
    };

    vm.openCard = function (card) {
      var modalInstance = $uibModal.open({
        templateUrl: 'dist/templates/card.list/card.show.html',
        controller: 'CardShowCtrl',
        controllerAs: '$ctrl',
        resolve: {
          card: function () {
            return card;
          }
        }
      });

      modalInstance.result.then(function () {
      }, function () {
      });
    };

  })
})();
