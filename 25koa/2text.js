let koa=require("./koa/application.js");

let app=new koa();
//1------
// app.use((ctx,next)=>{
//     console.log(ctx.req.url);
  
//     console.log(ctx.request.req.url);
//     console.log(ctx.request.url);
// })

//-------2
app.use((ctx,next)=>{
    console.log(ctx.req.path);
  
    console.log(ctx.request.req.path);
    console.log(ctx.request.path);
})


app.listen(3000);

