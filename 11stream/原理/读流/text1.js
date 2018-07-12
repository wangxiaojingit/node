let fs=require("fs");
let path=require("path");
let CreateReadStream=require("./text.js")
let rx=new CreateReadStream(path.join(__dirname,"1.txt"),{
    flags:'r',
    encoding:null,
    autoClose:true,
    start:0,
    end:6,
    highWaterMark:2
})

rx.on("open",function(){
    console.log("open");
})
rx.on("data",function(data){
    console.log(data)
})
rx.on("error",function(err){
   console.log(err)
})
rx.on("close",function(){
    console.log("close")
})

