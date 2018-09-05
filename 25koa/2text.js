let koa=require("./koa/application.js");

let app=new koa();
//1------
// app.use((ctx,next)=>{
//     console.log(ctx.req.url);
  
//     console.log(ctx.request.req.url);
//     console.log(ctx.request.url);
// })

//-------2
// app.use((ctx,next)=>{
//     console.log(ctx.req.path);
//     console.log(ctx.request.req.path);
//     console.log(ctx.request.path);
//     console.log("query:"+JSON.stringify(ctx.request.query));
// })
//-----3
app.use((ctx,next)=>{
   //给ctx.response.body设置值的时候,通过设置代理可以从ctx.body上获取
   ctx.response.body="hello";
   console.log(ctx.body);
   //如果给ctx.body 设置值的时候,
   ctx.body="word"
   console.log(ctx.response.body)
    
})


app.listen(3000);

