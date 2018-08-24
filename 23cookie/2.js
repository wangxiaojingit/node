/**
 * 上一版我们用了原生cookie,这版我们结合koa,自己写一个cookie
 * 
 * 模拟koa-cookie 的用法
 * 
 * [ 'name=%E7%8E%8B%E5%B0%8F%E9%87%91;HttpOnly=true;MaxAge=5000;Domain=zf1.cn','age=18' ]
 */
 
 let koa=require("koa");
 let router=require("koa-router");
 let querystring=require("querystring");
 let app=new koa();
 router=new router();

//  let str="name=%E7%8E%8B%E5%B0%8F%E9%87%91;age=18";
//  let obj=querystring.parse(str,";","=");
//  console.log(obj){ name: '王小金', ' age': '18' }

 app.use(async(ctx,next)=>{
      let allCookie=[];
      ctx.setCookie=function(key,value,options={}){
          let line=[];
          line.push(`${key}=${encodeURIComponent(value)}`);
          if(options.httpOnly){
            line.push(`HttpOnly=true`);
          }
          if(options.maxAge){
             line.push(`MaxAge=${options.maxAge}`)
          }
          if(options.domain){
             line.push(`Domain=${options.domain}`)
          }

          line=line.join(";");
          allCookie.push(line);
          
          ctx.set("Set-Cookie",allCookie);
      }
      ctx.getCookie=function(key){
         let value= ctx.get("Cookie")||"";
         let obj=querystring.parse(value,"; "); //取到Cookie 值的时候,会默认的是name=18; age=19; 分隔符会默认一个空格.
         return obj[key];
      }

      await next();
 })
 
 router.get("/write",async(ctx,next)=>{
     //当访问/write 的时候我们设置cookie
     ctx.setCookie("name","王小金",{
         httpOnly:true,
         maxAge:5000,
         domain:'zf1.cn'
     })
     ctx.setCookie("age","18");
     ctx.body="write";

     await next();

 })

 router.get("/read",(ctx,next)=>{
     let name=  ctx.getCookie("name")||"name";
     let age=   ctx.getCookie("age");
     ctx.body=`${name}-${age}`;
 })



 app.use(router.routes())
 app.listen(3000)




