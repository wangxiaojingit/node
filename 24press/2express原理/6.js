/**
 * post 方法,根据请求路径来处理客户端
 */


 var express=require("express");
 var bodyParse=require("body-parser");


 var app=express();

 app.post("/name",(req,res,next)=>{
    let result= req.body;
    res.end(result);
 })

 app.listen(3000)