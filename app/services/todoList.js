angular.module('TodoListService', [])
.service('TodoList', function($http) {
  var self = this;
  
  self.new = function (userId, listName) {
    return $http({
      method: 'POST',
      url: DOMAIN + '/user/' + userId + '/list',
      data: {
        title: listName
      }
    });
  };

  self.fetch = function (userId, listId) {
    return $http({
      method: 'GET',
      url: DOMAIN + '/user/' + userId + '/list/' + listId
    }).then(function (response) {
      return response.data;
    });;
  };
  
  self.add = function (userId, listId, todoText) {
    return $http({
      method: 'POST',
      url: DOMAIN + '/user/' + userId + '/list/' + listId,
      data: {
        text: todoText
      }
    });
  };
  
  self.remove = function (userId, listId, todoText) {
    return $http({
      method: 'DELETE',
      url: DOMAIN + '/user/' + userId + '/list/' + listId + '/' + todoText
    });
  };
})
