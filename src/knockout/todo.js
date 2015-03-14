/*global ko*/
$(function(){
  function Todo(summary,done){
    this.summary=summary;
    this.done=ko.observable(done);
  }
  Todo.prototype.toPlainObject=function(){
    return{
      summary:this.summary,
      done:this.done()
    };
  };

  function Model(localStorage){
    var self=this;
    self.todoList=ko.observableArray([new Todo('新しいTODOを追加してください。',false)]);
    self.addTodo=function(summary,done){
      self.todoList.push(new Todo(summary,done));
    };
    self.deleteTodo=function(todo){
      self.todoList.remove(todo);
    };
    self.archive=function(){
      self.todoList.remove(function(todo){
        return todo.done();
      });
    };
    self.save=function(){
      if(localStorage){
        var list=ko.utils.arrayMap(self.todoList(),function(todo){
          return todo.toPlainObject();
        });
        var data=ko.utils.stringifyJson(list);
        localStorage.setItem('todoList',data);
      }
    };
    self.load=function(){
      if(localStorage){
        var data=localStorage.getItem('todoList');
        if(data){
          self.todoList.removeAll();
          var list=ko.utils.parseJson(data);
          ko.utils.arrayForEach(list,function(todo){
            self.addTodo(todo.summary,todo.done);
          });
        }
      }
    };
  }//Model

  function ViewModel(model){
    var self=this;
    self.todoList=model.todoList;
    self.deleteTodo=model.deleteTodo;
    self.archive=model.archive;
    self.save=model.save;
    self.todoSummary=ko.observable('');
    self.addTodo=function(){
      if(self.canAddTodo()){
        model.addTodo(self.todoSummary(),false);
        self.todoSummary('');
      }
    };
    self.canAddTodo=ko.computed(function(){
      return self.todoSummary().length>0;
    });
    self.showTodo=function(e){
      if(e.nodeType===1){
        $(e).hide().slideDown();
      }
    };
    self.hideTodo=function(e){
      if(e.nodeType===1){
        $(e).slideUp(function(){
          $(e).remove();
        });
      }
    };
  }//ViewModel
  var model=new Model(window.localStorage);
  if(window.localStorage){
    model.load();
    $(window).on('beforeunload',model.save);
  }
  ko.applyBindings(new ViewModel(model));
});