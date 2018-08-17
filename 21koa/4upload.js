/**
 * 写一个简单的测试用例,当我们在浏览器中访问localhost:3000/form 的时候就走到第一个路由中,把表单返回到页面中
 * 当我们提交表单的时候,就走到第二个路由中,把提交的参数返回的页面中.
 * 
 * 我们测试下下面的代码第一个路由完好,第二个返回的not fount ,那是因为里面的ctx.req.on("data") 和ctx.req.on("end")
 * 都是异步代码,不等异步走完就直接走完了.返回的undefined.
 * 
 * 看5.upload.js 的实现
 * 
 * 
 * 
 */


let koa=require("koa");
let app=new koa();

app.use((ctx,next)=>{
   if(ctx.path=="/form"&&ctx.method.toLowerCase()=="get"){
       ctx.body=` <form action="/form" method="post" enctype="application/x-www-form-urlencoded">
       姓名:   <input type="text" name="name" />
       年龄:   <input type="text" name="age" />
       <input type="submit" />
       </form>`
   }
    next()
})

app.use((ctx,next)=>{
    console.log("ctx.path:"+ctx.path);
    if(ctx.path=="/form"&&ctx.method.toLowerCase()=="post"){
        let ary=[];
        ctx.req.on("data",(data)=>{
            ary.push(data)
        }) 
        ctx.req.on("end",()=>{
            let result=Buffer.concat(ary);
            ctx.body=result;
        })

       // ctx.body="ok";
        
    }
})


app.listen(3000)