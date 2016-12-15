(function () {
  angular.module("mainApp").controller("CardShowCtrl", function (UserFactory, RestApi, card, $uibModalInstance) {
    var vm = this;
    vm.card = card;


    function Iterator(cont, iter) {
      var content = cont;
      var iterVal = iter;

      this.next = function(insertValue) {
        var newIndex = content.indexOf(iterVal);
        if(newIndex != -1) {
          content = content.replace("<input>", insertValue);
          return newIndex;
        } else {
          return -1;
        }
      }

    }

    var insertValueForInput = function () {
      var inputArr = document.getElementsByTagName("input");
      var cont = vm.card.content;
      var iter1 = new Iterator(vm.card.content, "<input");

      for(var index = 0; index < inputArr.length; index++) {
        var position = iter1.next('-------value="' + inputArr[index].value + '"-');
        cont = cont.substring(0, position + 6) + ' value="' + inputArr[index].value + '"' + cont.substring(position + 6, cont.length);
      }

      return cont;
    };

    vm.save = function () {
      var content = insertValueForInput();
      RestApi.updateCard(UserFactory.getUser().id, vm.card.id, {name: vm.card.name, content: content}).then(function () {
        $uibModalInstance.close();
      });
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  })
})();
