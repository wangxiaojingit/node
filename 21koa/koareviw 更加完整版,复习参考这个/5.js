let koa=require("koa");

let app=new koa();
let bettBody=require("koa-better-body");
let convert=require("koa-convert")
app.use(convert(bettBody({
    upload:__dirname
})))
app.use(async(ctx,next)=>{
     if(ctx.path=="/form"&&ctx.method.toLowerCase()=="get"){
        ctx.body=`<form action="/form" method="post" enctype="multipart/form-data">
        姓名:   <input type="text" name="name">
        年龄:   <input type="text" name="age">
        <input type="submit">
   </form>
        
        
        `
     }

     await next();
})

app.use(async(ctx,next)=>{
    if(ctx.path=="/form"&&ctx.method.toLowerCase()=="post"){
          ctx.body=ctx.request.fields; 
    }
    await next()
})
app.listen(3000)