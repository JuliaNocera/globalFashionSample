'use strict';

angular.module('fashionControllers', ['ngRoute', 'ngResource'])

.controller('FirstCtrl', ['$scope', '$http', 'Item', function ($scope, $http, Item) {
	$scope.hello = "hello world";

	$scope.items = Item.query();

}]);