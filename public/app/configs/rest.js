(function () {
  'use strict';


  angular.module("mainApp")
    .factory("RestApi", function($http, UrlsPath){

      return {

        createNewGroup: function (params) {
          // $http.post("")
        },

        getUsersList: function () {
          $http.get(UrlsPath.api + "user/list");
        },

        getAllGroups: function () {
          $http.get(UrlsPath.api + "group/list");
        },

      }

    })

})();
