angular.module('fashionControllers', ['ngRoute', 'ngResource', 'infinite-scroll'])

.controller('FirstCtrl', ['$scope', '$http', 'Item', '$location', '$anchorScroll', function ($scope, $http, Item, $location, $anchorScroll) {

	// scroll to top from anywhere on page
	$scope.gotoTop = function() {
		//set location.hash to id of element to scroll to
		var old = $location.hash();
		$location.hash('top');
		$anchorScroll();
		//reset to old to keep any additional routing logic from kicking in
		$location.hash(old);
	};

	// gets array from $resource request (factory sevice)
	$scope.items = Item.query();

	// initial page load set to 20
	$scope.limit = 20;

	// infinite scroll
	// increase limit filter when scrolling near bottom of the page 
	$scope.loadMore = function() {
		$scope.limit = $scope.limit + 20;
  };

}]);