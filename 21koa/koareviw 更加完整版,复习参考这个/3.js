//koa-better-body 这个插件比bodyParse 那个插件更好点,前者可以上传文件,后者不能

let koa=require("koa");
let app=new koa();

let betterBody = require('koa-better-body'); // v1插件 
let convert = require('koa-convert'); // 将1.0的中间件 转化成2.0中间件
app.use(convert(betterBody({
    uploadDir: __dirname
})))

//app.use(betterBody());
app.use(async(ctx,next)=>{
   if(ctx.path=="/form"&&ctx.method.toLocaleLowerCase()=="get"){
    ctx.set("Content-Type","text/html; charset=UTF-8");
      ctx.body=` <form action="/form" method="post" enctype="multipart/form-data">
      <input  type="text" name="name"/>
      <input type="password" name="password" />
      <input type="file" name="avtor" />
      <input type="submit"/>
  </form>
      `
   }
  await next();
})

app.use(async(ctx,next)=>{
    if(ctx.path=="/form" &&ctx.method.toLocaleLowerCase()=="post"){
        console.log(ctx.request.fields);
       ctx.body=ctx.request.fields;;
       //ctx.body="ok";
    }
    await next();
})

app.listen(3000)