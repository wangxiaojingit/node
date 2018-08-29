/**
 * koa 中可以app.keys 去提高安全性,在设置cookie 的时候可以生成cookie签名
 * 
 * 
 */

let koa=require("koa");
let koaRouter=require("koa-router");
let router=new koaRouter();
let app=new koa();

app.keys=["zfpx"]



router.get("/vist",(ctx,next)=>{
    let count=ctx.cookies.get("vist",{signed:true});
    count=count?Number(count)+1:1
    ctx.cookies.set("vist",count,{signed:true});
    ctx.body=`你访问第${count}次`
})



app.use(router.routes())
app.listen(3000)