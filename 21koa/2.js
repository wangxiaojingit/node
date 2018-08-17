let koa=require("koa");
let app=new koa();

app.use((ctx,next)=>{
   console.log(ctx.req.url);//原生的方法
   console.log(ctx.request.req.url)//koa自己封装了一个request的方法
   console.log(ctx.request.url)
   console.log(ctx.url); //koa 自己封装了request的方法,这里ctx 做了request的代理
   console.log(ctx.response.req.url);//response 也会挂着req

   ctx.body={"name":"zf"}
   //以上四个结果相同
})


app.listen(3000)