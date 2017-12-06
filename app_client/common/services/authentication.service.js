(function(){
    angular
        .module('loc8rApp')
        .service('authentication', authentication);

    authentication.$inject = ['$window', '$q', '$http'];
    function authentication($window, $q, $http) {
        var saveToken = function(token) {
            $window.localStorage['loc8r-token'] = token;
        };

        var getToken = function(){
            return $window.localStorage['loc8r-token'];
        };

        var register = function(user) {
            var deferred = $q.defer();
            
            $http.post('/api/register', user)
                    .then(function(result){
                        saveToken(result.data.token);
                        deferred.resolve();
                    }, function(e){
                        console.log(e);
                        deferred.reject();
                    });

            return deferred.promise;        
        };

        var login = function(user) {
            var deferred = $q.defer();
             $http.post('/api/login', user)
                    .then(function(result){
                        saveToken(result.data.token);
                        deferred.resolve();
                    }, function(e){
                        console.log(e);
                        deferred.reject();
                    });
            
            return deferred.promise;
        };

        var logout = function() {
            $window.localStorage.removeItem('loc8r-token');
        }

        var isLoggedIn = function() {
            var token = getToken();
            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        var currentUser = function() {
            if (isLoggedIn()) {
                var token = getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return {
                    email: payload.email,
                    name: payload.name
                };
            }
        };

        return {
            saveToken: saveToken,
            getToken: getToken,
            register: register,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            currentUser: currentUser
        };
    }
})();