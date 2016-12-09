(function () {
  'use strict';


  angular.module("mainApp")
    .factory("UserFactory", function($cookieStore){

      var user = {};

      return {

        getUser: function () {
        // remove it and newer use
          user.id = $cookieStore.get('id');
          user.is_manager = $cookieStore.get('is_manager');
        //
          return user;
        },

        setUser: function (u) {
            
        // remove it and newer use
          $cookieStore.put('id', u.id);
          $cookieStore.put('is_manager', u.is_manager);
          $cookieStore.put('isAuth', true);
        //
          user = u;
        }

      }

    })

})();
