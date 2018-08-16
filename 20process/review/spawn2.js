/**
 * 一个主进程开了两个子线程,让子线程1的参数让主线程拿到后,再给子线程2
 * 
 */

 let{spawn}=require("child_process");
 let path=require("path");
 let child1=spawn("node",["2.js","a","b"],{
     cwd:path.join(__dirname,'text'),
     stdio:["pipe"]
 })

 let child2=spawn("node",["3.js"],{
     cwd:path.join(__dirname,'text'),
     stdio:["pipe"]
 })

 child1.stdout.on("data",(data)=>{
    console.log(data.toString());
    child2.stdout.write(data.toString())
 })

 
 