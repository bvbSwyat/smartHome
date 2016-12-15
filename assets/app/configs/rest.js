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

        getAllGroups: function (user_id) {
          return $http.get(UrlsPath.api + "user/" + user_id + "/group/list");
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

        getOneCardList: function (card_list_id) {
          return $http.get(UrlsPath.api + "cardList/" + card_list_id);
        },

        createNewCard: function (user_id, params) {
          return $http.post(UrlsPath.api + "user/" + user_id + "/card", params)
        },

        updateCard: function (user_id, card_id, params) {
          return $http.put(UrlsPath.api + "user/" + user_id + "/card/" + card_id, params)
        },

        changeCardSet: function (list_id, cardSet) {
          return $http.put(UrlsPath.api + "cardList/" + list_id, cardSet);
        },

        changeGroup: function (group_id, params) {
          return $http.put(UrlsPath.api + "group/" + group_id, params);
        }

      }

    })

})();
