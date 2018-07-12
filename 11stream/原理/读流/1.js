let readStream=require("./readStream.js");
let fs=require("fs");
let path=require("path");
let rs=new readStream(path.join(__dirname,"./1.txt"),{
    flags:'r',
    encoding:null,
    autoClose:true,
    start:0,
    end:6,
    highWaterMark:2
})

rs.on("open",function(){
    console.log("open")
})
rs.on("close",function(){
    console.log("close")
})
rs.on("error",function(err){
    console.log(err)
})
rs.on("data",function(data){
    console.log(data.toString())
})
rs.on("end",function(){
    console.log("end")
})
