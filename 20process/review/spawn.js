/**
 * 在主进程中开一个子进程,并让子进程中的输出在主进程输出出来
 * 
 * 
 */
 let path=require("path");
 let {spawn}=require("child_process");
 let child=spawn('node',["1.js","a"],{
     cwd:path.join(__dirname,"text"),
     //stdio:[process.stdin,process.stdout,process.stderr]
     stdio:["pipe"]
 })

 child.stdout.on("data",(data)=>{ //通过监听来在主线程打印
    console.log(data.toString())
 })