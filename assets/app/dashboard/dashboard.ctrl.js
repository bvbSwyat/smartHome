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
