$(function(){
  var $binding={};
  $binding.addTodo=$('[data-bind="addTodo"]');
  $binding.summary=$('[data-bind="summary"]');
  $binding.todoList=$('[data-bind="todoList"]');
  function buttondisabled(){
    if($binding.summary.val().length>0){
      $binding.addTodo.removeAttr('disabled');
    }else{
      $binding.addTodo.attr('disabled','disabled');
    }
  }//buttondisabled
  buttondisabled();

  var todoArray={};
  //view
  function printTodo(){
    var dom='';
    for(var i=0,n=Object.keys(todoArray).length;i<n;i++){
      dom+='<li class="todoItem">';
      dom+='<input type="checkbox"/>';
      dom+='<span class="summary">'+todoArray[i].summary+'</span>';
      dom+='<span class="delete redLink">delete</span>';
      dom+='</li>';
    }
    $binding.todoList.html(dom);
  }
  $binding.summary.on('keyup',function(){
    buttondisabled();
  });//button
  $binding.addTodo.on('click',function(e){
    if($binding.summary.val().length>0){
      e.preventDefault();
      var todo={};
      todo.summary=$binding.summary.val();
      todo.done=false;
      todoArray[Object.keys(todoArray).length]=todo;
      $binding.summary.val('');
      buttondisabled();
      printTodo();
      test();
    }
  });//add

  function test(){
    // console.log(todoArray);
  }
});