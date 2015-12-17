
// load modules into app
angular.module('fashionGlobalApp', [
	'ngRoute',
	'fashionControllers', 
	'itemsService',
	'infinite-scroll'
	])

// routes
.config(function ($routeProvider, $locationProvider) {
	$routeProvider

	.when('/', {
		templateUrl: 'templates/view1.html', 
		controller: 'FirstCtrl'
	})

	.otherwise({
		redirectoTo: '/'
	});

	$locationProvider.html5Mode({
		enabled: true, 
		requireBase: false
	});
});