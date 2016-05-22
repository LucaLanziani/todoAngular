angular.module('UsersService', [])
.service('Users', function($http) {
  var self = this;

  self.list = function () {
    return $http({
      method: 'GET',
      url: '/user'
    }).then(function (response) {
      return response.data;
    });
  };

  self.get = function (userId) {
    return $http({
      method: 'GET',
      url: '/user/' + userId
    }).then(function (response) {
      return response.data;
    });
  };
});
