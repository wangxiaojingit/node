//koa-static 静态服务插件:当打开浏览器的时候,首先会出现index.html 当在网址上输入后static1.js 就会出现它的内容

//1-----原插件的用法

// let koa=require("koa");
// let static=require("koa-static");

// let app=new koa();

// app.use(static(__dirname))



// app.listen(4000)

//2-----------插件封装
let fs=require("fs");
let {promisify}=require("util");
let readdir=promisify(fs.readdir);
let stat=promisify(fs.stat);
let koa=require("koa");
let app=new koa();
let path=require("path");

function static(dir){
  return async (ctx,next)=>{
     if(ctx.path=="/"){
       let result=await readdir(dir);
      
       if(result.indexOf("index.html")>-1){
         //说明有index.html
           ctx.set("Content-Type","text/html;charset=utf8")
           ctx.body=await fs.createReadStream(path.join(dir,"index.html"))
       }else{
           ctx.body="404"
       }
     }else{
         let rel=path.join(dir,ctx.path);
         try{
            let statObj=await stat(rel);
            ctx.set("Content-Type","text/html;charset=utf8");
            ctx.body=await fs.createReadStream(rel);
         }catch(e){
            //说明没有
            ctx.statusCode="404";
            ctx.body="404"
         }
         

     }

     await next();
  }
   //首先要看dir文件下面有没有index.html文件
 // await next();
}

app.use(static(__dirname))

// app.use(async (ctx,next)=>{

// })

app.listen(4000)