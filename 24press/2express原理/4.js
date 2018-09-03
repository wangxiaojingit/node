/**
 * express 的模板引擎
 * 
 * 
 */

let express=require("./express_2.js");
//let express=require("express");
let path=require("path");
let app=express();

// app.set("view engine","ejs");
// app.set("views",path.join(__dirname,"views"));
// app.get("/name",(res,req)=>{
//     res.render("index",{name:"wxj"})  //这里的index
// })

app.set("view engine","html");//指定渲染的模板引擎
app.set("views",path.join(__dirname,"views"))//指定渲染文件的目录
                                
app.engine(".html",require("ejs").__express);//指出文件的后缀名为.html,渲染的模板引擎用ejs
app.get("/name",function(req,res){
    res.render("index",{name:"wxj"});
})
app.listen(3000)