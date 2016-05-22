var DOMAIN = 'http://06d59733.ngrok.io';

angular.module('project', ['ngRoute', 'UsersService', 'TodoListService'])

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
      templateUrl:'app/templates/users.html',
      resolve: resolveUsers
    })
    .when('/user/:userId', {
      controller:'UserController as userController',
      templateUrl:'app/templates/user.html',
      resolve: resolveUser
    })
    .when('/user/:userId/list/:listId', {
      controller:'TodoListController as todoListController',
      templateUrl:'app/templates/list.html',
      resolve: resolveTodoList
    })
    .otherwise({
      redirectTo:'/'
    });
});
