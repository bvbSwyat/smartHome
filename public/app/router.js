(function () {
    'use strict';


    angular.module("mainApp")
        .config(function($stateProvider){


            $stateProvider

                .state('login', {
                    url: '/login',
                    controller: 'LoginController',
                    controllerAs: '$login',
                    templateUrl: 'dist/templates/login/login.html'
                })

                .state('registration', {
                    url: '/registration',
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



        })
})();
