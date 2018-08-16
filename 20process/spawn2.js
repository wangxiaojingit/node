/**
 * 在一中我们用了stdio:[process.stdin,process.stdout,process.stderr],主进程和子进程公用了一个打印,在子进程中用log也可以在主进程中打印,但是
 * 不能通信.这里我们改用pipe
 * 
 * 
 */

let {spawn}=require("child_process");
let path=require("path");
let child=spawn("node",["sub2.js","a"],{
    cwd:path.join(__dirname,'text'),
    stdio:["pipe","pipe","pipe"]
})

//pipe 可写流,可以监听

child.stdout.on("data",(data)=>{
   console.log(data.toString())
})

// child.stdin.on("data",(data)=>{
//     console.log(data.toString())
// })
// child.stderr.on("data",(data)=>{
//     console.log(data.toString())
// })