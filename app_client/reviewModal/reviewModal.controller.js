(function() {

    reviewModalCtrl.$inject = ['$uibModalInstance', 'loc8rData', 'locationData'];
    function reviewModalCtrl($uibModalInstance, loc8rData, locationData) {
        var vm = this;
        vm.locationData = locationData;
        vm.modal = {
            close : function (result) {
                $uibModalInstance.close(result);
            },
            cancel: function() {
                $uibModalInstance.dismiss('cancel');
            }
        }

        vm.onSubmit = function () {
            vm.formError = "";
            if(!vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                vm.doAddReview(vm.locationData.locationid, vm.formData);
            }
        };

        vm.doAddReview = function(locationid, formData) {
            loc8rData.addReviewById(locationid, {
                    author: formData.name, 
                    rating: formData.rating, 
                    reviewText: formData.reviewText
                })
                .then(function(result){
                    vm.modal.close(result);
                }, function(e){
                    vm.formError = "Your review has not been saved, try again";
                });
            return false;
        };
    }

    angular
        .module('loc8rApp')
        .controller('reviewModalCtrl', reviewModalCtrl);
})();