window.onload=function(){
  function Task(name,status,start,limit,end){
      this.name=name;
      this.status=status;
      this.start=start;
      this.limit=limit;
      this.end=end;
    this.view=function(){
      console.log(this);
    };
    this._proto_.addTask=function(name,arg){
      this._proto_.children=new Task(name);
    };
  }

function test(){

    var now=new Date();
    var tmr=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1);
    var task1=new Task('task1','done',now,tmr,tmr);

    task1.view();
    task1.addTask('test','child');

}
  test();

};
