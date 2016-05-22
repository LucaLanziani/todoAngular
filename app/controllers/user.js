angular.module('project')
.controller('UserController', function(user, TodoList) {
  var self = this;
  self.user = user;
  self.newList = function () {
    var listTitle = self.listTitle;
    self.listTitle = '';
    
    TodoList.new(self.user.id, listTitle).then(function (response) {
      self.user.lists.push(response.data);
    }).catch(function (response) {
      alert('Something went wrong');
    });
  };
});
