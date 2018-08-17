let koa=require("koa");
let app=new koa();

app.use( (ctx,next)=>{
   ctx.body={"name":'zf'} //不会立即返回,相当于是res.end()
   throw new Error("出错了!")
   next();
})

app.use((ctx,next)=>{
   ctx.body={"name":"xj"} //如果对象格式,会自动返回客户端为json格式
})

app.on("error",(err)=>{ //监听错误捕获
  console.log(err)
})
app.listen(3000);

//结果是页面上出现的{"name":"xj"}
//调用next(),会执行下个中间件ctx.body可以设置多次,以最后的为主,等待中间件全部执行完,才会将ctx.body返回给客户端.
