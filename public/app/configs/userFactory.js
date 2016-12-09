(function () {
  'use strict';


  angular.module("mainApp")
    .factory("UserFactory", function($cookieStore){

      var user = {};

      return {

        getUser: function () {
          user.id = $cookieStore.get('id');
          return user;
        },

        setUser: function (u) {
          $cookieStore.put('id', u.id);
          $cookieStore.put('isAuth', true);
          user = u;
        }

      }

    })

})();
