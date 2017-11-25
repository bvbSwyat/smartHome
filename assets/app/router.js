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
