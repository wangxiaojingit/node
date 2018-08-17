/**
 * koa-bodyparse 插件可以直接拿到发送的数据,在这里我们模拟一下koa-bodyparse的方法
 * 
 * 
 */

 let koa=require("koa");
 let app=new koa();
 //let bodyParser = require('koa-bodyparser');

  
function bodyParser() {
    return async (ctx, next) => {
        await new Promise((resolve, reject) => {
            let arr = []
            ctx.req.on('data', function (data) {
                arr.push(data);
            });
            ctx.req.on('end', function () {
                let body = Buffer.concat(arr).toString();
                ctx.request.body = body;
                resolve();
            })
        });
        await next();
    }
}




 app.use(bodyParser());
 app.use(async(ctx,next)=>{
    if(ctx.path=="/form"&&ctx.method.toLowerCase()=="get"){
        ctx.body=`<form action="/form" method="post" enctype="application/x-www-form-urlencoded">
            姓名:   <input type="text" name="name">
            年龄:   <input type="text" name="age">
            <input type="submit">
            </form>`
    }
    await next();
 })

 app.use(async(ctx,next)=>{
     if(ctx.path=="/form"&&ctx.method.toLowerCase()=="post"){
         let result=await ctx.request.body;
       console.log(ctx.request.body);
       
       ctx.body= ctx.request.body;
     }

     await next()
 })


 app.listen(3000)