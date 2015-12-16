var itemsService = angular.module('itemsService', ['ngResource']);


itemsService.factory('Item', ['$resource', function($resource){
    return $resource('api/fashion', {}, {
      query: {method:'GET', isArray:true}
    })
  }]);
