/**
 * session 是基于cookie的,相对于cookie是安全的,因为session是写在服务端内存中的,但是只要服务器重启就会清空
 * 
 * 
 * 
 * 下面写一个小demo 就是一个人去洗澡,如果没卡,就让帮张卡,如果有卡就去消费,让次数减少(cookie 和session 结合用,后面我们不会用session写到服务器内存,而是会写都数据库
 * 这样就不会丢失)
 */


 let koa=require("koa");
 let koaRouter=require("koa-router") ;
 let router=new koaRouter();
 let app=new koa();
 let uuidv1=require("uuid/v1");
 let session={};
//  let c=uuidv1()
//  console.log(c)
 const CARDNAME="carId"
 router.get("/wash",(ctx,next)=>{
     let cardId= ctx.cookies.get(CARDNAME);
     if(cardId){
        //如果卡存在
        //如果带着卡来的,我们需要验证下这个卡是不是正确的
        if(session[cardId]){
           //如果卡正确,去消费
           session[cardId].count-=1;
           ctx.body=`您的卡号${cardId},剩下的消费次数${session[cardId].count}`
      
        }else{
            let id=uuidv1();
            ctx.cookies.set(CARDNAME,id) //用uuidv1() 生成一个不会重名的卡号
            session[id]={count:5};
            
            ctx.body=`您的卡号${id},剩下的消费次数${session[id].count}`
        }

     }else{
        //如果ka 不存在就去办卡
        let id=uuidv1();
        ctx.cookies.set(CARDNAME,id) //用uuidv1() 生成一个不会重名的卡号
        session[id]={count:5}
     }
 })

 


 app.use(router.routes());
 app.listen(3000)