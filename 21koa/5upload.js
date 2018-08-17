/**
 * 写一个简单的测试用例,当我们在浏览器中访问localhost:3000/form 的时候就走到第一个路由中,把表单返回到页面中
 * 当我们提交表单的时候,就走到第二个路由中,把提交的参数返回的页面中.
 * 
 * koa 有个特点: 所有的next() 都要加await  所有的中间件中的函数需要加上async
 * 
 * 所有的异步操作,都需要提取出来封装一个promise
 * 
 * 
 * 这里我们自己封装了一个bodyParser,在6updata.js 中我们将用一个现成的插件:koa-bodyparser
 * 
 * 
 * 
 * 
 * 
 * 
 */


let koa=require("koa");
let app=new koa();


function bodyParser(ctx){
    return new Promise((resolve,reject)=>{
        let ary=[];
        ctx.req.on("data",(data)=>{
            ary.push(data);
        }) 
        ctx.req.on("end",()=>{
            let result=Buffer.concat(ary);
            resolve(result.toString());
        })
    })
    
}
app.use(async(ctx,next)=>{
   if(ctx.path=="/form"&&ctx.method.toLowerCase()=="get"){
       ctx.body=` <form action="/form" method="post" enctype="application/x-www-form-urlencoded">
       姓名:   <input type="text" name="name" />
       年龄:   <input type="text" name="age" />
       <input type="submit" />
       </form>`
   }
   await next()
})

app.use(async(ctx,next)=>{
    console.log("ctx.path:"+ctx.path);
    if(ctx.path=="/form"&&ctx.method.toLowerCase()=="post"){
     ctx.body= await bodyParser(ctx);
        
    }
    await next();
})


app.listen(3000)