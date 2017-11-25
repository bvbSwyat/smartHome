(function () {
    angular.module("mainApp", ['ui.router', 'ui.bootstrap', 'ngCookies', 'angular-bind-html-compile'])

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

                .state('home', {
                  abstract: true,
                  controller: 'MenuController',
                  controllerAs: '$menu',
                  templateUrl: 'dist/templates/menu/menu.html'
                })

                  .state('home.usergroup', {
                      url: '/user/group',
                      controller: 'UserGroupController',
                      controllerAs: '$userGroup',
                      templateUrl: 'dist/templates/user.group/user.group.html'
                  })

                  .state('home.groupslist', {
                      url: '/groups/list',
                      controller: 'GroupsListController',
                      controllerAs: '$groupsList',
                      templateUrl: 'dist/templates/groups.list/groups.list.html'
                  })

                  .state('home.dashboard', {
                      url: '/dashboard',
                      controller: 'DashboardController',
                      controllerAs: '$dashboard',
                      templateUrl: 'dist/templates/dashboard/dashboard.html'
                  })

                  .state('home.cardlist', {
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
    vm.statuses = [
      {name: "Draft"},
      {name: "Ready"},
      {name: "Arhiv"}
    ];
    vm.status = vm.statuses[0].name;


    var getCardList = function () {
      RestApi.getUserCardList(UserFactory.getUser().id).then(function (data) {
        vm.cardList = data.data;
      });
    };
    getCardList();

    var getCards = function () {
      RestApi.getCards(UserFactory.getUser().id).then(function (data) {
        vm.cards = data.data;
      });
    };
    getCards();

    vm.createCardList = function () {
      var selectedArr = [];
      angular.forEach(vm.cards, function (card) {
        if(card.isAdded) selectedArr.push(card.id);
      });
      RestApi.createNewList(UserFactory.getUser().id, {name: vm.listName, status: vm.status, card_ids: selectedArr}).then(function () {
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

    vm.editCardList = function (cardSet) {
      var modalInstance = $uibModal.open({
        templateUrl: 'dist/templates/card.list/edit.card.html',
        controller: 'EditCardCtrl',
        controllerAs: '$ctrl',
        resolve: {
          cardSet: function () {
            return cardSet;
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
        size: "lg",
        resolve: {
          card: function () {
            return card;
          }
        }
      });

      modalInstance.result.then(function () {
        getCards();
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
  angular.module("mainApp").controller("CardShowCtrl", function (UserFactory, RestApi, card, $uibModalInstance) {
    var vm = this;
    vm.card = card;

    vm.save = function () {
      RestApi.updateCard(UserFactory.getUser().id, vm.card.id, {name: vm.card.name, content: document.getElementById("card-content").innerHTML}).then(function () {
        $uibModalInstance.close();
      });
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  })
})();

(function () {
  angular.module("mainApp").controller("EditCardCtrl", function (RestApi, cardSet, $uibModalInstance) {
    var vm = this;

    vm.cardSet = cardSet;
    vm.statuses = [
      {name: "Draft"},
      {name: "Ready"},
      {name: "Arhiv"}
    ];
    vm.cardSet.status = vm.cardSet.status || vm.statuses[0].name;

    vm.save = function () {
      RestApi.changeCardSet(vm.cardSet.id, cardSet).then(function () {
        $uibModalInstance.close();
      }, function () {

      });
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  })
})();

(function () {
  'use strict';


  angular.module("mainApp")
    .factory("RestApi", function($http, UrlsPath){

      return {

        getHomeData: function (user_id) {
          return $http.get(UrlsPath.api + "home");
        },

        setHomeData: function (params) {
          return $http.post(UrlsPath.api + "home", params);
        },

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
    .constant("UrlsPath", {api: "http://stok.if.ua/"}); //http://stok.if.ua/  http://localhost:1337/


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
  angular.module("mainApp").controller("DashboardController", function (UserFactory, RestApi, $state) {
    var vm = this;

    vm.homeData = {
      status: false,
      temperature: null,
      hSystem: {
        status: false
      },
      kSystem: {
        status: false
      }
    };
    setInterval(function() {
      RestApi.getHomeData().then(function(data) {
        this.homeData = data;
      });
    }, 3000);


    vm.toggleSystem = function(systemName) {
      this.homeData[systemName].status = !this.homeData[systemName].status;

      RestApi.setHomeData(this.homeData).then(function(data) {
         this.homeData = data;
      });
    };

  })
})();

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

(function () {
  angular.module("mainApp").controller("GroupsListController", function (RestApi, UserFactory, $uibModal) {
    var vm = this;

    vm.groups = null;
    vm.selectedGroup = null;

    var getGroups = function () {
      RestApi.getAllGroups(UserFactory.getUser().id).then(function (data) {
        vm.groups = data.data;


        vm.groups[0].cardList = [
          {
            "name": "new set",
            "owner": 8,
            "cards": [
              {
                "name": "New card",
                "owner": "8",
                "content": "<p>New card<br></p><p><input></p><p>New card<br data-mce-bogus=\"1\"></p><p><br data-mce-bogus=\"1\"></p><p>New card<br data-mce-bogus=\"1\"></p><p><br data-mce-bogus=\"1\"></p><p>New card<br data-mce-bogus=\"1\"></p><p>New card<br data-mce-bogus=\"1\"></p><p><br data-mce-bogus=\"1\"></p><p>New card <input><input><input><br data-mce-bogus=\"1\"></p>",
                "createdAt": "2016-12-11T12:38:34.243Z",
                "updatedAt": "2016-12-11T12:38:34.243Z",
                "id": 1
              }
            ],
            "createdAt": "2016-12-11T12:38:52.083Z",
            "updatedAt": "2016-12-11T13:30:57.581Z",
            "id": 1,
            "status": "Arhiv"
          }
        ];

      });
    };
    getGroups();

    vm.showMaterial = function (group) {
      vm.selectedGroup = group;



    };

    vm.openCard = function (card) {
      var modalInstance = $uibModal.open({
        templateUrl: 'dist/templates/card.list/card.show.html',
        controller: 'CardShowCtrl',
        controllerAs: '$ctrl',
        size: "lg",
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
    angular.module("mainApp").controller("LoginController", function (RestApi, UserFactory, $state, $cookieStore, $rootScope) {
      var vm = this;

      // remove it and newer use  -it must be session in next release
      if ($cookieStore.get('isAuth')) {
        if ($rootScope.$previousState && $rootScope.$previousState.abstract) {
          $state.go('home.dashboard');
        }
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
          $state.go('home.dashboard');
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
           data.is_manager ? $state.go('home.dashboard') : $state.go('user.cardlist');
        }, function(error) {
            alert('You sent bad credentials!');
        });
      }
    })
})();

(function () {
  angular.module("mainApp").controller("EditGroupCtrl", function (RestApi, group, $uibModalInstance, allUsers) {
    var vm = this;
    console.log(group);
    vm.group = group;
    vm.allUsers = angular.copy(allUsers);

    vm.save = function () {
      var selectedArr = angular.copy(vm.group.user_ids);
      angular.forEach(vm.allUsers, function (user) {
        if(user.isAdded) selectedArr.push(user.id);
      });
      RestApi.changeGroup(vm.group.id, {user_ids: selectedArr}).then(function () {
        $uibModalInstance.close();
      }, function () {

      });
    };

    vm.isUsersInGroup = function (userId) {
      var isUserInGroup = false;
      angular.forEach(vm.group.user_ids, function (user_id) {
        if(userId == user_id) {
          isUserInGroup = true;
        }
      });
      return !isUserInGroup;
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  })
})();

(function () {
  angular.module("mainApp").controller("UserGroupController", function (RestApi, UserFactory, $uibModal) {
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

    vm.editGroup = function (group) {
      var modalInstance = $uibModal.open({
        templateUrl: 'dist/templates/user.group/edit.group.html',
        controller: 'EditGroupCtrl',
        controllerAs: '$ctrl',
        size: "lg",
        resolve: {
          group: function () {
            return group;
          },
          allUsers: function () {
            return vm.users;
          }
        }
      });

      modalInstance.result.then(function () {
        getGroups();
      }, function () {
      });
    }

  })
})();
