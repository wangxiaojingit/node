let express=require("express");
var app=express();
app.get("/",(req,res)=>{
     res.setHeader("Content-Type","text/html;charset=utf8");
     res.end("欢迎来到index首页")
})
app.get("/about",(req,res)=>{
    res.setHeader("Content-Type","text/html;charset=utf8");
    console.log("req.host:"+req.host);//不带端口号域名
    console.log("req.path:"+req.path); //访问路径
    console.log("req.query:"+req.query);//参数,对象的形式
    res.end("欢迎来到about")
})



app.get("/:id/:name",(req,res)=>{
   console.log(req.params.id)
   console.log(req.params.name);
   res.send(req.params.id+":"+req.params.name)
})


app.get("/user",(req,res)=>{
    console.log(1111)
   // res.send({"name":"wxj","age":"123"}) //express中的send方法,如果里面是对象,自动转为json 
   // res.send("ok")如果是中文,自动转换为utf8
   res.send(505);//如果是数字自动转换为状态码 200 就是ok 505就是HTTP Version Not Supported
 })
 app.all("*",(req,res)=>{
    res.end("404 not fount")
 })
app.listen(3000);