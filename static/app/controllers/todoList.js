angular.module('project')
.controller('TodoListController', function(userId, todoList, TodoList) {
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
