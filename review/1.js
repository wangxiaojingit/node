let path=require("path");
let fs=require("fs");
let p=path.join(__dirname,'./2.js');
let CreateReadStream=require("./createReadStream.js");

let rx= new CreateReadStream(p,{
     flags:'r',
     autoClose:true,
     start:0,
     end:4,
     highWaterMark:2,
     encoding:'utf8'
 })
 let arr=[];
 var timer;
 rx.on("data",function(data){
     
    console.log(data);
    rx.pause();
    arr.push(data);
    
    console.log(arr);
   
    timer= setTimeout(function(){
        rx.resume();
     },1000)
   
 })
 
 rx.on("end",function(){
     clearInterval(timer);
     console.log("end");
     let bf=Buffer.concat(arr);
     console.log(bf);
   
 })



 