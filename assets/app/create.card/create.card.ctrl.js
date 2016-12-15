(function () {
  angular.module("mainApp").controller("CreateCardController", function (UserFactory, RestApi, $state) {
    var vm = this;

    vm.cardName = null;

    setTimeout(function() {
      tinymce.init({ selector:'textarea' });
    }, 0);

    vm.addInputIntest = function () {
      tinyMCE.execCommand('mceInsertContent',false,'<input>');
    };

    vm.createNewCard = function() {
      RestApi.createNewCard(UserFactory.getUser().id, {name: vm.cardName,
        content: tinyMCE.activeEditor.getContent({format : 'raw'})}).then(function(data) {
          $state.go("user.cardlist");
      });
    };

  })
})();
