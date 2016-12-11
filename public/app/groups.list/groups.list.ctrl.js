(function () {
  angular.module("mainApp").controller("GroupsListController", function (RestApi, UserFactory, $uibModal) {
    var vm = this;

    vm.groups = null;
    vm.selectedGroup = null;

    var getGroups = function () {
      RestApi.getAllGroups(UserFactory.getUser().id).then(function (data) {
        vm.groups = data.data;


        vm.groups[0].cardList = [
          {
            "name": "new set",
            "owner": 8,
            "cards": [
              {
                "name": "New card",
                "owner": "8",
                "content": "<p>New card<br></p><p><input></p><p>New card<br data-mce-bogus=\"1\"></p><p><br data-mce-bogus=\"1\"></p><p>New card<br data-mce-bogus=\"1\"></p><p><br data-mce-bogus=\"1\"></p><p>New card<br data-mce-bogus=\"1\"></p><p>New card<br data-mce-bogus=\"1\"></p><p><br data-mce-bogus=\"1\"></p><p>New card <input><input><input><br data-mce-bogus=\"1\"></p>",
                "createdAt": "2016-12-11T12:38:34.243Z",
                "updatedAt": "2016-12-11T12:38:34.243Z",
                "id": 1
              }
            ],
            "createdAt": "2016-12-11T12:38:52.083Z",
            "updatedAt": "2016-12-11T13:30:57.581Z",
            "id": 1,
            "status": "Arhiv"
          }
        ];

      });
    };
    getGroups();

    vm.showMaterial = function (group) {
      vm.selectedGroup = group;
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
