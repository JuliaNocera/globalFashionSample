'use strict';

angular.module('fashionGlobalApp', [
	'ngRoute',
	'fashionGlobalApp.controllers'
	])

.config(function ($routeProvider, $locationProvider) {
	$routeProvider

	.when('/', {
		templateUrl: 'templates/view1.html', 
		controller: 'FirstCtrl'
	})

	.otherwise({
		redirectoTo: '/view1'
	});

	$locationProvider.html5Mode({
		enabled: true, 
		requireBase: false
	});
});