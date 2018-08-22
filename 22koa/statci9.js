//多级路由的使用方法 koa-router

//当访问/user的时候出现/user
//当访问/user/list 的时候出现 /user/list

let koa=require("koa");
let app=new koa();
let router=require("koa-router");

let router1=new router();
let router2=new router();

router1.get("/user",(ctx,next)=>{
    ctx.body="user"
})

router2.get("/list",(ctx,next)=>{//二级路由
   ctx.body="/user/list"       
})

router1.use("/user",router2.routes())

app.use(router1.routes())

app.listen(3000)