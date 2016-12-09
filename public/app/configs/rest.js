(function () {
  'use strict';


  angular.module("mainApp")
    .factory("RestApi", function($http, UrlsPath){

      return {

        createNewGroup: function (user_id, params) {
          return $http.post(UrlsPath.api + "user/" + user_id + "/group", params)
        },

        getUsersList: function () {
          return $http.get(UrlsPath.api + "users");
        },

        getCards: function (user_id) {
          return $http.get(UrlsPath.api + "user/" + user_id + "/card/list");
        },

        getAllGroups: function () {
          return $http.get(UrlsPath.api + "group/list");
        },

        getGroupsForUser: function (user_id) {
          return $http.get(UrlsPath.api + "group/list");
        },

        signIn: function (params) {
          return $http.post(UrlsPath.api + "auth/sign_in", params);
        },

        signUp: function (params) {
          return $http.post(UrlsPath.api + "auth/sign_up", params);
        },

        createNewList: function (user_id, params) {
          return $http.post(UrlsPath.api + "user/" + user_id + "/cardList", params)
        },

        getUserCardList: function (user_id) {
          return $http.get(UrlsPath.api + "user/" + user_id + "/cardList/list");
        },

        getOneCardList: function (user_id, card_list_id) {
          return $http.get(UrlsPath.api + "user/" + user_id + "/cardList/" + card_list_id);
        },

        createNewCard: function (user_id, params) {
          return $http.post(UrlsPath.api + "user/" + user_id + "/card", params)
        },

      }

    })

})();
