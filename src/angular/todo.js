/* global angular,$scope,$filter */
angular.module('App',[])
.controller('MainController',['$scope','$filter',function($scope,$filter){
  $scope.todoList=[];
  $scope.addTodo=function(){
    $scope.todoList.push({
      summary:$scope.newSummary,
      done:false
    });
  };
  $scope.newSummary='';
  $scope.filter={
    done:{done:true},
    remaining:{done:false}
  };
  $scope.currentFilter=null;
  $scope.changeFilter=function(filter){
    $scope.currentFilter=filter;
  };
  var where=$filter('filter');
  $scope.$watch('todoList',function(todoList){
    var length=todoList.length;
    $scope.allCount=length;
    $scope.doneCount=where(todoList,$scope.filter.done).length;
    $scope.remainingCount=length-$scope.doneCount;
  },true);
  
  var originalSummary;
  $scope.editing=null;
  $scope.editTodo=function(todo){
    originalSummary=todo.summary;
    $scope.editing=todo;
  };
  $scope.doneEdit=function(todoForm){
    if(todoForm.$invalid){
      $scope.editing.title=originalSummary;
    }
    $scope.editing=originalSummary=null;
  };
  $scope.checkAll=function(){
    var state=!!$scope.remainingCount;
    angular.forEach($scope.todoList,function(todo){
      todo.done=state;
    });
  };
  $scope.removeDoneTodo=function(){
    $scope.todoList=where($scope.todoList,$scope.filter.remaining);
  };
  $scope.removeTodo=function(currentTodo){
    $scope.todoList=where($scope.todoList,function(todo){
      return currentTodo!==todo;
    });
  };
}])
.directive('mySelect',[function(){
  return function(scope,$el,attrs){
    scope.$watch(attrs.mySelect,function(val){
      if(val){
        $el[0].select();
      }
    });
  };
}]);

