//cnpm install koa koa-views koa-router koa-static ejs

//koa-views 插件原理模拟

let fs=require("fs");
let path=require("path");
let koa=require("koa");
//let views=require("koa-views");
let obj={"name":"wxj","age":16,list:[1,2,3]}
//模拟koa-views 原理
function render(result){
    let head = "let templ; \r\n";
    head += "with (renderObj) { \r\n templ =`";
    let content = result.replace(/<%=([\s\S]*?)%>/g,function(){
        return '${'+arguments[1]+"}";
    })
    content = content.replace(/<%([\s\S]*?)%>/g,function(){
        return "` \r\n " + arguments[1] + "\r\n templ+=`" ;
    });
    let tail = '`} \r\n return templ'
    return head + content + tail;
}
function views(dir,{extension}){
   return async(ctx,next)=>{
     
            ctx.render=async function(filename,renderObj){
                let result=await fs.readFileSync(path.join(dir,filename+"."+extension),"utf8");
                 let ejs=require(extension);
                let fn=new Function("renderObj",render(result));
                ctx.set("Content-Type","text/html;charset=utf8");
                ctx.body= fn(renderObj);
            }
            await next();
       
     
   }
}


let app=new koa();
app.use(views(__dirname,{
    extension:"ejs"  //用ejs模板渲染页面,默认会自动require("ejs")
}))

app.use(async(ctx,next)=>{
    await ctx.render("index2",obj)
})
app.listen(3000)