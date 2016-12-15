(function () {
  angular.module("mainApp").directive("caValue", function () {
    return {
      link: function(scope, element, attrs) {
        scope[attrs.ngModel] = attrs.value || "";
        scope.$watch(attrs.ngModel, function (val) {
          element.attr("value", val);
        });
      }
    }
  });
}());
