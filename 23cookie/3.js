/**
 * koa 中自带的有cookie
 * 设置cookie ctx.cookies.set(key,value,options)写多次,就设置多个,
 * 取cookie: ctx.cookies.get(key)
 * 
 * 
 */

let koa=require("koa");
let koaRouter=require("koa-router");
let router=new koaRouter();

router.get("/write",async(ctx,next)=>{
    //当访问/write 的时候我们设置cookie
    ctx.cookies.set("name",`${encodeURIComponent("王小金")}`,{
        httpOnly:true,
       // maxAge:5000,
        domain:'zf1.cn'
    })
    ctx.cookies.set("age",18)
    ctx.body="write";

    await next();

})

router.get("/read",(ctx,next)=>{
    let name=  ctx.cookies.get("name")||"name";
    let age=   ctx.cookies.get("age");
    ctx.body=`${name}-${age}`;
})


let app=new koa();
app.use(router.routes())
app.listen(3000)