(function () {
  angular.module("mainApp").controller("CreateCardController", function (UserFactory, RestApi, $state) {
    var vm = this;
    var index = 0;
    vm.cardName = null;

    setTimeout(function() {
      tinymce.init({
        selector:'textarea',
        height: 200,
        plugins: "image",
        image_caption: true
      });
    }, 0);

    vm.addInputIntest = function () {
      tinyMCE.execCommand('InsertHTML',false,"<input ca-value ng-model='model" + ++index + "'>");
    };

    vm.createNewCard = function() {
      RestApi.createNewCard(UserFactory.getUser().id, {name: vm.cardName,
        content: tinyMCE.activeEditor.getContent({format : 'raw'})}).then(function(data) {
          $state.go("user.cardlist");
      });
    };

  })
})();
