/**
 * events 模块 
 * 发布订阅
 * 
 * 去读1.txt，读完之后就触发一个事件
 */
let fs=require("fs");
let path=require("path")
let eventEmitter=require("events");
let event=new eventEmitter();
let ary=[]
//事件触发器实例订阅了一个事件“getData”，
event.on("getData",function(data){
   ary.push(data);
   if(ary.length==2){
       console.log(ary)
   }
})
let pathname=path.join(__dirname,"./1.txt");

fs.readFile(pathname,'utf8',function(err,data){
   event.emit("getData",data)   
       
})
fs.readFile(path.join(__dirname,"./2.txt"),"utf8",function(err,data){
   event.emit("getData",data)
})
