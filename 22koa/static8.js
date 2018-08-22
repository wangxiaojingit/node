let Koa = require('koa');
let app = new Koa();
let Router=require("koa-router");

let router=new Router();
app.use(router.routes());



router.get('/',(ctx,next)=>{
   ctx.body="home"
})

router.get('/user/:id/:name',(ctx,next)=>{
    console.log(ctx.params)
  ctx.body=ctx.params;
})

router.get(/\/zfpx/,(ctx,next)=>{  //koa-router 还可以匹配正则
    ctx.body = 'hello'
});
app.listen(3000)
