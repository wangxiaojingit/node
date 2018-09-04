let koa=require("koa");

let app=new koa();

app.use((ctx,next)=>{
      console.log(ctx.request.req.url); //原生的方法,和第二个相同
      console.log(ctx.req.url);//这个是原生的方法
      console.log(ctx.request.url);//request 是自己封装的方法,
      console.log(ctx.url); //是ctx.request.url的简写
     
})
app.listen(3000)

//--------------------------2
//ctx 原生上没有path方法,express 自己在ctx.request上自己封装了path方法

let koa=require("koa");

let app=new koa();

app.use((ctx,next)=>{
      console.log(ctx.request.req.path); //原生的方法,和第二个相同  //"undefined"
      console.log(ctx.req.path);//这个是原生的方法                 //"undefined" 
      console.log(ctx.request.path);//request 是自己封装的方法,    // /name2
      console.log(ctx.path); //是ctx.request.url的简写            // /name2 
})
app.listen(3000)