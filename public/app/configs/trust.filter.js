
(function () {
  angular.module("mainApp").filter("trust", ['$sce', function($sce) {
    return function (htmlCode) {
      return $sce.trustAsHtml(htmlCode);
    }
  }]);
})();
