/**
 * 在主进程中开一个子进程,用node运行spawn.js 这个文件的时候,开一个子进程,运行sub1.js
 * 
 * 基本代码入下,当我们在sub1.js 中用console.log("1")的时候,如果stdio 不写,用默认的pipe是不会打印出来的.
 * 
 * 因为现在运行的是主进程,子进程的打印,要想出现在主进程中,我们可以用stdio:[process.stdin,process.stdout,process.stderr],这代表的意思是
 * 标准的输入和标准的输出,标准的输出错误,主进程和子进程用的是一个. 但是此时随然在主进程中打印了子进程的数据,但仅仅是打印,并不能通信.要想实现通信
 * 请看下面的spawn2.js,还需要用到pipe
 * 
 * 
 * 
 */



let {spawn}=require("child_process");
let path=require("path");
let child=spawn("node",["sub1.js","a"],{
    cwd:path.join(__dirname,'text'),
    stdio:[process.stdin,process.stdout,process.stderr]
})




/**
 * spawn 参数一:代表执行的环境
 * args:参数二是一个数组,代表的是子进程的参数
 * options 参数三:
 * {
 *  cwd:子进程的目录文件夹名字
 *  stdio:[process.stdin,process.stdout,process.stderr] //代表子进程和主进程可以用一个输入 输出 输出错误
 * }
 * 
 */

 child.on("error",function(err){
     console.log("err");
 })

 child.on("exit",function(){
     console.log("exit");
 })

 child.on("close",function(){
     console.log("close")
 })