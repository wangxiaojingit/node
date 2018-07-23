let fs=require("fs");
let path=require("path");
let readable=require("./readable.js");

/**
 * 1\ 只要缓存区的内容为空的时候,就会触发readable事件
 * 2\ 只要缓存区的长度<this.highWaterMark的时候,就会再往缓存中添加this.highWaterMark 个
 * 
 */

let rx=new readable(path.join(__dirname,"./1.txt"),{
    highWaterMark:3,
    start:0,
    encoding:"utf8"
   
})

rx.on("readable",()=>{
    
    
    let s=rx.read(4);
    console.log(s+"---1");
    
     
   
    //  s= rx.read(1);
    //  console.log(s);
    setTimeout(function(){
        console.log(rx.len+"-------------");
    },2000)
    
   
})