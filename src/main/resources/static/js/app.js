var app = angular.module("app", ["ngRoute","ui.grid", "ui.grid.treeView","ui.grid.expandable",
    "ui.grid.expandable",
    "ui.grid.pinning",
    "ui.grid.selection",
    "ui.grid.pagination",
    "ui.grid.edit",
    "ui.grid.rowEdit",
    "ui.grid.grouping",
    "ui.grid.exporter",
    "ui.grid.autoResize",
    "ui.grid.cellNav",
    "mainService"
]);

app.config(function($locationProvider) {

	$locationProvider.hashPrefix('');
	$locationProvider.html5Mode({
	    enabled: false,
	    requireBase: true
	  });
	});

app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

app.config(function ($routeProvider) {
    $routeProvider
		   
            .when('/pcba/home', {
                controller: 'mainController',
                templateUrl: '/views/index.html'
            })
	        .when('/users',{
	            templateUrl: '/views/users.html',
	            controller: 'usersController'
	        })
	        .when('/pcbaData',{
	            templateUrl: '/views/pcbaGrid.html',
	            controller: 'gridController'
	        }) 
	        .otherwise(
	                { redirectTo: '/'}
	        );
            
});