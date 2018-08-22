//cnpm install koa koa-views koa-router koa-static ejs
//用koa-views 插件 去渲染页面
let fs=require("fs");
let path=require("path");


let koa=require("koa");
let views=require("koa-views");
let app=new koa();

let obj={"name":"wxj","age":16,list:[1,2,3]}

app.use(views(__dirname,{
    extension:"ejs"  //用ejs模板渲染页面,默认会自动require("ejs")
}))

app.use(async(ctx,next)=>{
    await ctx.render("index2",obj)
})
app.listen(3000)