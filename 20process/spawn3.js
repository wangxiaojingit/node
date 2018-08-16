/**
 * 一个主进程开两个子进程,让子进程1的参数可以传递到主进程,再传递给子进程2
 * 
 * 
 */
 let path=require("path");
 let {spawn}=require("child_process");
 let child1=spawn('node',["1.js","a","b"],{
     cwd:path.join(__dirname,'text'),
     stdio:["pipe"]
 })

 let child2=spawn("node",["2.js"],{
     cwd:path.join(__dirname,'text'),
     stdio:["pipe"]
 })
 
 
 child1.stdout.on("data",(data)=>{
     child2.stdout.write(data);
     
 })