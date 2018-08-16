/**
 * 主进程关闭,子进程依然还能运行
 * 
 * 
 */

 let {spawn}=require("child_process");
 let path=require("path")
 let child=spawn("node",["5.js"],{
     cwd:path.join(__dirname,'text'),
     stdio:'ignore',
     detached:true //独立运行
 })

 child.unref();