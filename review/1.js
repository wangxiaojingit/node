let path=require("path");
let fs=require("fs");
let p=path.join(__dirname,'./1.txt');
let rx= fs.createReadStream(p,{
     flags:'r',
     autoClose:true,
     start:0,
     end:4,
     highWaterMark:2
 })
 let arr=[];
 rx.on("data",function(data){
    console.log(data);
    arr.push(data);
    rx.pause();
    setTimeout(function(){
      rx.resume();
    },1000)
 })

 rx.on("end",function(){
     let bf=Buffer.concat(arr);
     console.log(bf.toString());
 })



 