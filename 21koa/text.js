let koa=require("koa");
let app=new koa();
 function bodyParse(ctx,next){
    return new Promise((resolve,reject)=>{
        let ary=[];
        ctx.req.on("data",(data)=>{
            ary.push(data)
        })
        ctx.req.on("end",()=>{
            let result=Buffer.concat(ary).toString();
            resolve(result);
        })
    })
        
}
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
        ctx.body=await bodyParse(ctx,next);
    }
    await next();
})

app.listen(3000)