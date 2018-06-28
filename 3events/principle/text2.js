let eventEmitter=require("./text.js");
//let eventEmitter=require("events");

let util=require("util")
function Girl(){

}
util.inherits(Girl,eventEmitter);
let girl=new Girl();

let cry=function(data){
    console.log("cry");
   
}
girl.once("失恋",cry);
girl.on("shooping",cry)
//girl.once("失恋",cry);
//girl.removeListener("失恋",cry)
//girl.emit("失恋");
//girl.emit("失恋");
console.log(eventEmitter.defaultMaxListeners)
//获取所有的事件名字,返回的是数组
console.log(girl.eventNames())
girl.setMaxListeners(3);
console.log(girl.getMaxListeners())
