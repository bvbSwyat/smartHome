(function () {
    angular.module("mainApp", ['ui.router', 'ui.bootstrap', 'ngCookies'])
    
    .run( [ '$rootScope', function ($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
            $rootScope.$previousState = from;
        });
      }]);
})();

(function () {
    'use strict';


    angular.module("mainApp")
        .config(function($stateProvider, $urlRouterProvider, $locationProvider){

            $stateProvider

                .state('login', {
                    url: '/sign_in',
                    controller: 'LoginController',
                    controllerAs: '$login',
                    templateUrl: 'dist/templates/login/login.html'
                })

                .state('registration', {
                    url: '/sign_up',
                    controller: 'RegistrationController',
                    controllerAs: '$registration',
                    templateUrl: 'dist/templates/registration/registration.html'
                })

                .state('user', {
                  abstract: true,
                  controller: 'MenuController',
                  controllerAs: '$menu',
                  templateUrl: 'dist/templates/menu/menu.html'
                })

                  .state('user.usergroup', {
                      url: '/user/group',
                      controller: 'UserGroupController',
                      controllerAs: '$userGroup',
                      templateUrl: 'dist/templates/user.group/user.group.html'
                  })

                  .state('user.createcard', {
                      url: '/card/create',
                      controller: 'CreateCardController',
                      controllerAs: '$createCard',
                      templateUrl: 'dist/templates/create.card/create.card.html'
                  })

                  .state('user.cardlist', {
                      url: '/card/list',
                      controller: 'CardListController',
                      controllerAs: '$cardList',
                      templateUrl: 'dist/templates/card.list/card.list.html'
                  });

            $urlRouterProvider.otherwise('/sign_in');
        })
})();

(function () {
  angular.module("mainApp").controller("CardListController", function (RestApi, UserFactory, $uibModal) {
    var vm = this;

    vm.cards = [];
    vm.listName = null;

    var getCardList = function () {
      RestApi.getUserCardList(UserFactory.getUser().id).then(function (data) {
        vm.cardList = data.data;
      });
    };
    getCardList();

    var getCards = function () {
      RestApi.getCards(UserFactory.getUser().id).then(function (data) {
        console.log(data);
        vm.cards = data.data;
      });
    };
    getCards();

    vm.createCardList = function () {
      var selectedArr = [];
      angular.forEach(vm.cards, function (card) {
        if(card.isAdded) selectedArr.push(card.id);
      });
      RestApi.createNewList(UserFactory.getUser().id, {name: vm.listName, card_ids: selectedArr}).then(function () {
        vm.listName = null;
        getCardList();
      })
    };

    vm.sendInGroup = function (id) {
      var modalInstance = $uibModal.open({
        templateUrl: 'dist/templates/card.list/card.list.group.html',
        controller: 'CardListGroupCtrl',
        controllerAs: '$ctrl',
        resolve: {
          cardListId: function () {
            return id;
          }
        }
      });

      modalInstance.result.then(function () {
      }, function () {
      });
    };

    vm.openCard = function (card) {
      var modalInstance = $uibModal.open({
        templateUrl: 'dist/templates/card.list/card.show.html',
        controller: 'CardShowCtrl',
        controllerAs: '$ctrl',
        resolve: {
          card: function () {
            return card;
          }
        }
      });

      modalInstance.result.then(function () {
      }, function () {
      });
    };

  })
})();

(function () {
  angular.module("mainApp").controller("CardListGroupCtrl", function (RestApi, UserFactory, $uibModalInstance, cardListId) {
    var vm = this;

    vm.selectedId;
    vm.groups = [];
    vm.isManager = UserFactory.getUser().is_manager;

    RestApi.getAllGroups(UserFactory.getUser().id).then(function (data) {
      vm.groups = data.data;
    });

    vm.setSelected = function (id) {
      vm.selectedId = id;
    };

    vm.ok = function () {
      $uibModalInstance.close();
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  })
})();

(function () {
  angular.module("mainApp").controller("CardShowCtrl", function (card, $uibModalInstance) {
    var vm = this;

    vm.card = card;

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  })
})();

(function () {
  angular.module("mainApp").controller("CreateCardController", function (UserFactory, RestApi, $state) {
    var vm = this;

    vm.cardName = null;
    vm.statuses = [
      {name: "Draft"},
      {name: "Ready"},
      {name: "Arhiv"}
    ];
    vm.status = vm.statuses[0].name;

    setTimeout(function() {
      tinymce.init({ selector:'textarea' });
    }, 0);

    vm.addInputIntest = function () {
      tinyMCE.execCommand('mceInsertContent',false,'<input>');
    };

    vm.createNewCard = function() {
      RestApi.createNewCard(UserFactory.getUser().id, {name: vm.cardName, status: vm.status,
        content: tinyMCE.activeEditor.getContent({format : 'raw'})}).then(function(data) {
          $state.go("user.cardlist");
      });
    };

  })
})();

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

        getOneCardList: function (user_id, card_list_id) {
          return $http.get(UrlsPath.api + "user/" + user_id + "/cardList/" + card_list_id);
        },

        createNewCard: function (user_id, params) {
          return $http.post(UrlsPath.api + "user/" + user_id + "/card", params)
        },

      }

    })

})();


(function () {
  angular.module("mainApp").filter("trust", ['$sce', function($sce) {
    return function (htmlCode) {
      return $sce.trustAsHtml(htmlCode);
    }
  }]);
})();

(function () {
  'use strict';


  angular.module("mainApp")
    .constant("UrlsPath", {api: "http://localhost:1337/"});


})();

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

(function () {
    angular.module("mainApp").controller("LoginController", function (RestApi, UserFactory, $state, $cookieStore, $rootScope) {
      var vm = this;

      // remove it and newer use  -it must be session in next release
      if ($cookieStore.get('isAuth')) {
        $state.go($rootScope.$previousState);
      }

      vm.user = {
        email: null,
        password: null  
      };
      vm.isError = false;

      vm.login = function () {
        RestApi.signIn(vm.user).then(function (data) {
          UserFactory.setUser(data.data);
          $state.go('user.usergroup');
        }, function (err) {
          vm.isError = true;
        });
      }

    })
})();

(function () {
  angular.module("mainApp").controller("MenuController", function ($state, $cookieStore, UserFactory) {
    var vm = this;

    vm.isManager = UserFactory.getUser().is_manager;

    vm.logout = function () {
      $cookieStore.remove('isAuth');
      $cookieStore.remove('id');
      $state.go("login");
    }

  })
})();

(function () {
    angular.module("mainApp").controller("RegistrationController", function (RestApi, $state, UserFactory, $cookieStore, $rootScope) {

      var vm = this;

        // remove it and newer use  -it must be session in next release
      if ($cookieStore.get('isAuth')) {
        $state.go($rootScope.$previousState);
      }

      vm.signUp = function () {
        RestApi.signUp(vm.user).then(function (data) {
           UserFactory.setUser(data.data);
           data.is_manager ? $state.go('user.usergroup') : $state.go('user.cardlist');
        }, function(error) {
            alert('You sent bad credentials!');
        });
      }
    })
})();

(function () {
  angular.module("mainApp").controller("UserGroupController", function (RestApi, UserFactory) {
    var vm = this;

    vm.groupName = null;
    vm.groups = null;
    vm.users = null;

    var getGroups = function () {
      RestApi.getAllGroups(UserFactory.getUser().id).then(function (data) {
        vm.groups = data.data;
      });
    };
    getGroups();

    var getUsers = function () {
      RestApi.getUsersList().then(function (data) {
        vm.users = data.data;
      });
    };
    getUsers();

    vm.create = function() {
      var selectedArr = [];
      angular.forEach(vm.users, function (user) {
        if(user.isAdded) selectedArr.push(user.id);
      });
      RestApi.createNewGroup(UserFactory.getUser().id, {user_ids: selectedArr, name: vm.groupName}).then(function () {
        vm.groupName = null;
        getGroups();
      });
    };

  })
})();
