//1:fork
// let path=require("path");
// let {fork}=require("child_process");
// let child=fork('fork.js',["a"],{
//     cwd:path.join(__dirname,'text'),
//     silent:false//默认为false,会输出,true 的时候不会输出
// })

// child.send("hello")



//2:fork 是基于spawn的,我们用spawn封装实现fork
let path=require("path");
let {spawn}=require("child_process");

function fork(modulePath,args,options){
    let stdio = options.silent?['ignore','ignore','ignore','ipc']:[0,1,2,'ipc']
    return spawn('node',[modulePath,...args],{
        ...options,
        stdio:stdio
    });
}

let child=fork('fork.js',["a"],{
    cwd:path.join(__dirname,'text'),
    silent:false//默认为false,会输出,true 的时候不会输出
})
