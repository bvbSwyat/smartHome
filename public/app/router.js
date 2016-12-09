(function () {
    'use strict';


    angular.module("mainApp")
        .config(function($stateProvider, $locationProvider){


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

                .state('usergroup', {
                    url: '/user/group',
                    controller: 'UserGroupController',
                    controllerAs: '$userGroup',
                    templateUrl: 'dist/templates/user.group/user.group.html'
                })

                .state('createcard', {
                    url: '/card/create',
                    controller: 'CreateCardController',
                    controllerAs: '$createCard',
                    templateUrl: 'dist/templates/create.card/create.card.html'
                })

                .state('cardlist', {
                    url: '/card/list',
                    controller: 'CardListController',
                    controllerAs: '$cardList',
                    templateUrl: 'dist/templates/card.list/card.list.html'
                })

        })
})();
