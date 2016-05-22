var DOMAIN = 'http://06d59733.ngrok.io';

angular.module('project', ['ngRoute'])

.service('Users', function($http) {
  var self = this;
  
  self.list = function () {
    return $http({
      method: 'GET',
      url: DOMAIN + '/user'
    }).then(function (response) {
      return response.data;
    });
  };
  
  self.get = function (userId) {
    return $http({
      method: 'GET',
      url: DOMAIN + '/user/' + userId
    }).then(function (response) {
      return response.data;
    });
  };
})

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

.config(function($routeProvider) {
  var resolveUsers = {
    users: function (Users) {
      return Users.list();
    }
  };
  
  var resolveUser = {
    user: function (Users, $route) {
      return Users.get($route.current.params.userId)
    }
  }
  
  var resolveTodoList = {
    todoList: function (TodoList, $route) {
      return TodoList.fetch($route.current.params.userId, $route.current.params.listId);
    },
    userId: function ($route) {
      return $route.current.params.userId
    }
  }
  
 
  $routeProvider
    .when('/', {
      controller:'UsersController as usersController',
      templateUrl:'users.html',
      resolve: resolveUsers
    })
    .when('/user/:userId', {
      controller:'UserController as userController',
      templateUrl:'user.html',
      resolve: resolveUser
    })
    .when('/user/:userId/list/:listId', {
      controller:'ListController as todoListController',
      templateUrl:'list.html',
      resolve: resolveTodoList
    })
    .otherwise({
      redirectTo:'/'
    });
})

.controller('UsersController', function(users) {
  var self = this;
  self.users = users;
})

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
})

.controller('ListController', function(userId, todoList, TodoList) {
  var self = this;
  self.todoList = todoList;
  self.userId = userId;
  
  self.delete = function (task) {
    var index = self.todoList.tasks.indexOf(task);
    if( index > -1 ) {
      self.todoList.tasks.splice(index, 1);
    }

    TodoList.remove(self.userId, self.todoList.id, task).catch(function () {
      alert("You can't remove this item");
      self.todoList.tasks.splice(index, 0, task);
    });
  };
  
  self.newTask = function () {
    var task = self.task;
    self.task = "";

    self.todoList.tasks.push(task);
    TodoList.add(self.userId, self.todoList.id, task).catch(function () {
      alert("Something went wrong");
      self.todoList.tasks.pop();
    })
  };
});
