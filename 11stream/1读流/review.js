/**
 * 读流,并把读出的数据打印出来
 * 
 */

 let fs=require("fs");
 let path=require("path");
 function filePath(filename){
    return path.join(__dirname,filename);
 }
 let p=filePath("./text.js")
 let rs=fs.createReadStream(p,{
     flags:'r',
     encoding:null,
     autoClose:true,
     start:0,
     end:4,
     highWaterMark:2
 })
 let ary=[];
 rs.on("data",function(data){
     console.log(data);
     ary.push(data);
     console.log(ary);
     rs.pause();
     setTimeout(function(){
         rs.resume();
     },1000)
 })

 rs.on("end",function(){
    let buf= Buffer.concat(ary);
    console.log(buf);
 })
