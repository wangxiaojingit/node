/**
 * 可读流
 *   fs.read
 * 
 * 可写流
 * 
 *   fs.write
 */


 let fs=require("fs");
 let path=require("path");
 let p=path.resolve(__dirname,'./text.js');
 let rs=fs.createReadStream(p,{
     flags:"r", //可读
     encoding:null,//null的时候默认编码buffer
     autoClose:true, //读完之后关闭文件
     start:0,
     end:4,   //包后
     highWaterMark:2, //最高水位线
    })


//默认不会有什么行为

 rs.on("data",function(data){
    console.log(data.toString());
 })
 rs.on("end",function(){
     console.log("end")
 })



    