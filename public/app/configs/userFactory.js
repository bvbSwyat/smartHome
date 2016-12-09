(function () {
  'use strict';


  angular.module("mainApp")
    .factory("UserFactory", function(){

      var user = {};

      return {

        getUser: function () {
          return user;
        },

        setUser: function (u) {
          user = u;
        }

      }

    })

})();
