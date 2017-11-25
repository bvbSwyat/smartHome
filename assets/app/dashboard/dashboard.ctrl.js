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
      var self = this;
      RestApi.getHomeData().then(function(response) {
        self.homeData = response.data;
      });
    }, 3000);


    vm.toggleSystem = function(systemName) {
      this.homeData[systemName].status = !this.homeData[systemName].status;
      var self = this;
      RestApi.setHomeData(this.homeData).then(function(response) {
         self.homeData = response.data;
      });
    };

  })
})();
