//

let koa=require("koa");
let app=new koa();
let bodyParser =require("koa-bodyparser");
// function bodyParse(ctx,next){
//     return new Promise((resolve,reject)=>{
//         let ary=[];
//         ctx.req.on("data",(data)=>{
//             ary.push(data);
//         })
//         ctx.req.on("end",()=>{
//            let result= Buffer.concat(ary).toString();
//            resolve(result);
//         })
//     })
    
// }
app.use(bodyParser());
app.use(async(ctx,next)=>{
   if(ctx.path=="/form"&&ctx.method.toLocaleLowerCase()=="get"){
    ctx.set("Content-Type","text/html; charset=UTF-8");
      ctx.body=` <form action="/form" method="post" enctype="application/x-www-form-urlencoded">
      <input  type="text" name="name"/>
      <input type="password" name="password" />
     
      <input type="submit"/>
  </form>
      `
   }
  await next();
})

app.use(async(ctx,next)=>{
    if(ctx.path=="/form" &&ctx.method.toLocaleLowerCase()=="post"){
       ctx.body=ctx.request.body;
    }
    await next();
})

app.listen(3000)