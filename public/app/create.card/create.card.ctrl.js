(function () {
  angular.module("mainApp").controller("CreateCardController", function (UserFactory, RestApi, $state) {
    var vm = this;

    vm.cardName = null;
    vm.statuses = [
      {name: "Draft"},
      {name: "Ready"},
      {name: "Arhiv"}
    ];
    vm.status = vm.statuses[0].name;

    setTimeout(function() {
      tinymce.init({ selector:'textarea' });
    }, 0);

    vm.addInputIntest = function () {
      tinyMCE.execCommand('mceInsertContent',false,'<input>');
    };

    vm.createNewCard = function() {
      RestApi.createNewCard(UserFactory.getUser().id, {title: vm.cardName, status: vm.status,
        content: tinyMCE.activeEditor.getContent({format : 'raw'})}).then(function(data) {
          $state.go("user.cardlist");
      });
    };

  })
})();
