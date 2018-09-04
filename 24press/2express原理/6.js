/**
 * post 方法,根据请求路径来处理客户端
 */


 var express=require("express");
 var bodyParse=require("./body-parser");


 var app=express();

 

 app.use(bodyParse.urlencoded({extended:true}));
 app.use(bodyParse.json());
 app.post("/name",(req,res,next)=>{
    let result= req.body;
    console.log(result);
    res.send(result);
    res.end();
 })

 app.listen(3000)