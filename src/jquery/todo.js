$(function(){
  var $binding=$('[data-bind]');
  function initialize(){
    $binding.each(function(e){
      if($binding[e].dataset){
        $binding[this.dataset.bind]=$(this);
        delete $binding[e];
      }
    });
  }//initialize
  initialize();
  var todoArray={};
  $($binding.summary).on('keyup',function(){
    buttondisabled();
  });
  $($binding.addTodo).on('click',function(e){
    e.preventDefault();
    var todo={};
    todo.summary=$binding.summary.val();
    todo.done=false;
    todoArray[Object.keys(todoArray).length]=todo;
    test();
  });//add

  function buttondisabled(){
    if($($binding.summary).val().length>0){
      $binding.addTodo.removeAttr('disabled');
    }else{
      $binding.addTodo.attr('disabled','disabled');
    }
  }//buttondisabled
  function test(){
    console.log(todoArray);
  }
});