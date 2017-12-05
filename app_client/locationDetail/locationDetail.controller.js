(function() {
    angular
        .module('loc8rApp')
        .controller('locationDetailCtrl', locationDetailCtrl);

    locationDetailCtrl.$inject = ['$routeParams', '$uibModal', 'loc8rData'];
    function locationDetailCtrl($routeParams, $uibModal, loc8rData) {
        var vm = this;
        vm.locationid = $routeParams.locationid;                

        loc8rData.locationById(vm.locationid)
            .then(function(result) {
                vm.data = { location: result.data };
                vm.pageHeader = {
                    title: vm.data.location.name
                };
            },function (e) {
                vm.message = "Sorry, something's gone wrong ";
                console.log(e);
            });

        vm.popupReviewForm = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/reviewModal/reviewModal.view.html',
                controller: 'reviewModalCtrl as vm',
                resolve: {
                    locationData: function () {
                        return {
                            locationid: vm.locationid,
                            locationName: vm.data.location.name
                        };
                    }
                }
            });

            modalInstance.result.then(function (result) {
                vm.data.location.reviews.push(result.data);
            });
        };
    }
})();