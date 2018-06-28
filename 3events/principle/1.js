let eventEmitter=require("./events");
let util=require("util");

function Girl(){
  //eventEmitter.call(this); 继承eventEmitter上的所有私有属性,相当于 this._events={};
 //但是源码并没有这样做而是在events 类上面进行了处理
}
Girl.prototype={}
util.inherits(Girl,eventEmitter);
let girl=new Girl();
let drink=function(){
    console.log("drink")
}
let cry=function(data){
    debugger;
   console.log("cry") 
}
girl.on("newListener",function(eventName,callback){
   console.log(eventName);
   callback()
})
girl.once("失恋",cry)
//girl.once("失恋",drink);

//girl.removeListener("失恋",cry)
//girl.emit("失恋","3")
