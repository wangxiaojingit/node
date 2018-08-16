

let {fork}=require("child_process");
let path=require("path");
let child=fork("4.js",["a"],{
    cwd:path.join(__dirname,"text"),
    silent:false//是否沉默
})

child.send("123");