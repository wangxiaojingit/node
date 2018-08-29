/**
 * 封装express功能点:
 * 1\ req.path:请求的路由路径
 * 2\ req.query:路径上带的参数,对象形式
 * 3\ req.host: 域名,不含端口号
 * 4\ res.send() 如果是对象返回json 如果是数组,返回状态响应
 * 
 * 5\ 封装路由:正常路由,多级路由例如: /:id/:name
 * 6\ req.params 封装多级路由上面的参数,req.params.id
 * 
 * 7\res.sendFile()//发送文件
 * 
 */


 /**
  * 遇到的一个小坑,自己在写路由循环的时候用了 ary.forEach ,虽然达到条件,return 了,但是照样继续走了所有的循环,这就是和for循环的区别,
  * 所以这里应该用for循环,达到特定条件的时候可以跳出去.
  * 
  * 
  */


let http=require("http");
let fs=require("fs");
let methods=require("methods");//所有的方法数组
let url=require("url");
let _http_server=require("_http_server");//获取状态码的类
let util=require("util");
// let obj={"name":"wxj"}
// console.log(util.inspect(obj))
function Express () {
    let routes=[];
    function app(req,res){
     let {pathname,query} = url.parse(req.url,true)
     req.path=pathname;//请求的路径(不包含参数)
     req.query=query;//路径上带的参数
     req.host=req.headers.host.split(":")[0];//不含端口号
     //res.send 方法 :如果是对象,返回json 如果是number 返回状态情况
     res.send=function(params){
        res.setHeader('Content-Type', 'text/html;charset=utf8');
         switch (typeof params){
             case "object":
               console.log(1);
               params=util.inspect(params);
             break;
             case "number":
               params=_http_server.STATUS_CODES[params];
              break;
              default:
              break;

         }
          res.end(params)
     }
     //返回一个文件,filePath 是一个绝对路径
     res.sendFile=function(filePath){
         fs.createReadStream(filePath).pipe(res);
     }
     //找对应路由,执行相应方法
     for(var i=0;i<routes.length;i++){
         let layer=routes[i];
         let index=i;
         if(layer.reg){
            let result= req.path.match(layer.reg);
            if(result){
                //如果匹配上了
                 let obj=layer.params.reduce((pre,next,index)=>{
                     pre[next]=result[index+1];
                     return pre;
                 },{})
                 req.params=obj;
                 if((layer.method==req.method.toLowerCase()||layer.method=="all")&&result){
                          return   layer.handle(req,res)
                 }
            }
          }else{
              //正常路由
             if((layer.method==req.method.toLowerCase()||layer.method=="all")&&(layer.routePath==req.path||layer.routePath=="*")){
                 return layer.handle(req,res);
             }
          }
     }
     //说明循环完了还没找到
     res.end(`${req.path }/${req.method}--not fount`)
     
     
     

      
    }
    //遍历路由,封装各种get,post 等方法
    methods.forEach(method=>{
        app[method]=function(routePath,handle){
            let layer={
                routePath,
                handle,
                method:method
            }
            //多级路由
            if(routePath.indexOf(":")>-1){
                //说明是多级路由
                let params=[];
                let strReg=routePath.replace(/:(\w+)/g,function(){
                    params.push(arguments[1]);
                    return "(\\w+)"
                });
                layer.params=params;
                layer.reg=new RegExp(strReg);
            }

            routes.push(layer);  
        }
    })
    
    app.all=function(routePath,handle){
        let layer={
            routePath,
            handle,
            method:"all"
        }
        routes.push(layer);  
    }



    app.listen=function(){
        http.createServer(app).listen(...arguments)
    }
    
    return app
}

module.exports=Express;

























// let http = require('http');

// const fs = require('fs');
// http.createServer((req,res)=>{
//   req.method
// }).listen(300)



// let str="/:id/:name";

// let c=str.replace(/:(\w+)/g,function(a,args){
//     console.log("args:"+args);
//     return "(\\w+)";
    
// })
// console.log(str)

// let str="/(\w+)/(\w+)";
// let c=new RegExp(str);
// console.log(c)

// let str="/id/18"

// console.log(str.match(c))



// /**
//  * 需求: 
//  * /:id/:name 把这样的路由
//  * /123/wxj
//  * 变成{id:123,name:wxj}
//  * 
//  * 
//  */

//  let str="/:id/:name";
//  let str2="/1/2";
//  let params=[];
//  let result=str.replace(/:(\w+)/g,function(){
//      params.push(arguments[1]);
//      return "(\\w+)"
//  })
//  let resultReg=new RegExp(result);
//  console.log("params:"+params);
//  console.log("result:"+result);
//  console.log("resultReg:"+resultReg)
// let aa=str2.match(resultReg);
// console.log(aa);
// let obj={}
// console.log(params.length+"---")
// params.forEach(item,index=>{
//    obj[item]=aa[index+1];
// })
// console.log(obj)