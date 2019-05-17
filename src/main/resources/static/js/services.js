angular.module('mainService', []).factory('mainService', ["$http", "$q", function ($http, $q) {
    return ({
    	getPCBADataDtls: _getPCBADataDtls    	
    });
    
    
    function _getPCBADataDtls() {
        try {
            return $http({
                url: "http://localhost:8080/pcba/getPCBAAnalyticsData",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },

            });
        } catch (error) {
            console.error(error);
        }
    };
    
}]);    