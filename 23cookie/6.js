let koa=require("koa");
let app=new koa();
let session=require("koa-session");
let koaRoute=require("koa-router");
let router=new koaRoute();


app.keys=["zfpx"];
app.use(session({
    key: 'zfpx'
},app))

router.get("/wash",(ctx,next)=>{
    
     let c=ctx.session.user;
     if(c){
        //如果user存在,不是第一次
        ctx.session.user.count--;
        ctx.body=`卡剩下次数${ctx.session.user.count}`
     }else{
       //如果user不存在,
       ctx.session.user={count:5};
       ctx.body="当前办卡了,可用次数5"
     }
})
app.use(router.routes());
app.listen(3000)


