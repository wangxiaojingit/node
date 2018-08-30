/**
 * express 的模板引擎
 * 
 * 
 */

//let express=require("./express_2.js");
let express=require("express");
let path=require("path");
let app=express();


app.set("view engine","ejs");//指定渲染的模板引擎
app.set("views",path.join(__dirname,"views"))//指定渲染文件的目录
app.get("/name",function(err,req,res,next){
     console.log("err2");
     res.end("err2");
})
app.listen(3000)