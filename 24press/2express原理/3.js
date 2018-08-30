/**
 * next()里面有不为空的参数,就会跳过正常路由,找到错误路由,执行错误路由
 * 
 * 
 */

let express=require("./express_2.js");

let app=express();

app.use(function(req,res,next){
   res.setHeader("Content-Type","text/html;charset=utf8");
   next("err");
})
app.get("/age",function(req,res){
    console.log(1);
    res.end("年龄");
})
app.get("/name",function(req,res){
    console.log(2);
    res.end("名字");
})

app.use(function(err,req,res,next){
     console.log("err1");
     next("err1");
})
app.use(function(err,req,res,next){
     console.log("err2");
     res.end("err2");
})
app.listen(3000)