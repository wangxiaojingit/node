/**
 * 
 * 静态文件服务
 * 
 * 重定向
 * 
 * body-parse
 * 
 */

let path=require("path");
//let express=require("express");
let express=require("./express_2.js");
let app=new express();


let pathfile=path.resolve(__dirname, './public');
app.use(express.static(pathfile));

app.get("/name",(req,res)=>{
    res.end("name")
})
app.get("/b",(req,res)=>{
   // res.redirect("/name");  //在网址中访问 /b 的时候,我们返回/name路由的指定方法
   res.redirecto("304","/name") //为了区分原生的,改了方法名字,第一个参数statusCode 可以省略,默认为304
})
app.listen(3000);