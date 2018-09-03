/**
 * 封装express功能点:
 * 封装中间件
 * 
 * 
 */

 /**
  * 在此遇到一个问题：就是代码调试的问题，想检测此文件中路由的逻辑，在此文件中打了一个断点，怎么进来？ 
  * 首先要停到2.js 中的node服务， 在此文件中打好断点，然后在2.js文件中，点击调试，然后在浏览器中访问localhost：3000/name
  * 就会到我们的断点出。 但是目前没想明白，为啥都已经断开服务了，在浏览器访问的时候还能进来?是因为本地调试的时候也会起一个服务
  * 
  * 
  * 渲染模板引擎
  * 
  * 
  * 重定向核心代码:
  * 
  * res.statusCode=statusCode; //设置重定向
    res.setHeader("Location",url);//设置重定向
  */




let http=require("http");
let fs=require("fs");
let methods=require("methods");//所有的方法数组
let url=require("url");
let _http_server=require("_http_server");//获取状态码的类
let util=require("util");
let path=require("path");
let mime=require("mime")

// let str="e:\mynodeclass\node\24press\2express原理\public\a.css";
//         "e:\mynodeclass\node\24press\2express原理\public\a.css" 
//        //e:\mynodeclass\node\24press\2express原理
//        let fs=require("fs");
//        let path=require("path");
//        let str=path.join(__dirname,"public","./a.css");
//        console.log("str:"+str);
//        fs.access(str,(err)=>{
//            if(err){
//               console.log(err)
//            }else{
//                console.log(2)
//            }
           
//        })
//let express=require("express");
//console.log(path.extname("1.html"))
function Express () {
    let routes=[];
    function app(req,res){
     let {pathname,query} = url.parse(req.url,true)
     req.path=pathname;//请求的路径(不包含参数)
     req.query=query;//路径上带的参数
     req.host=req.headers.host.split(":")[0];//不含端口号
     //渲染模板
     res.render=function(filename,dataObj){
        //渲染文件的绝对路径
        let filePath=path.resolve(app.settings["views"],filename);
        let extname=path.extname(filePath);
        if(!extname){
           extname="."+app.settings["view engine"];
           filePath=filePath+extname;
        }
        let renderfn=app.engines[extname];
        renderfn(filePath,dataObj,(err,data)=>{
            console.log("filePath:"+filePath);
            console.log("dataObj:"+dataObj);
            console.log("err:"+err);
            console.log("data:"+data);
            res.send(data);
        })
        

     }
     //res.send 方法 :如果是对象,返回json 如果是number 返回状态情况
     res.send=function(params){
        res.setHeader('Content-Type', 'text/html;charset=utf8');
         switch (typeof params){
             case "object":
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
     //重定向
     res.redirecto=function(statusCode,url){
         if(typeof statusCode=="string"){
             //如果statusCode 是字符串,说明就是url,statusCode参数的默认值为304;
             url=statusCode;
             statusCode=304;
         }
         res.statusCode=statusCode; //设置重定向
         res.setHeader("Location",url);//设置重定向
         res.end();
     }
     let index=0;
     function next(err){
        let layer=routes[index++];
        if(layer){
            if(err){
              //如果next 里面有不为null 的参数,
              if(layer.method=="middle"&&(req.path.startsWith(layer.routePath)||layer.routePath=="/")&&layer.handle.length
            ==4){
                   layer.handle(err,req,res,next);
              }else{
                   //如果没有匹配到错误路由,我们就继续
                   next(err)
              }
            }else{
               //如果next函数里面没有参数
               if(layer.method=="middle"){
                //如果是中间件的时候如果是中间件的时候
                 if((req.path.startsWith(layer.routePath)||layer.routePath=="/")){
                    layer.handle(req,res,next);
                 }else{
                     next();
                 }
                  
                  
                }else if(layer.reg){
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
                    }else{
                        next()//继续走下一个区匹配
                    }
                }else{
                    //正常路由
                        if((layer.method==req.method.toLowerCase()||layer.method=="all")&&(layer.routePath==req.path||layer.routePath=="*")){
                            return layer.handle(req,res);
                        }else{
                            next();//继续走下一个路由
                        }
                }

            } 
     
        }else{
            //路由不存在,就是走完了,都没匹配上
            res.end(`${req.path }/${req.method}--not fount`)
        }
     }
     next();
     //找对应路由,执行相应方法
    //  for(var i=0;i<routes.length;i++){
    //      let layer=routes[i];
    //      let index=i;
    //      if(layer.reg){
    //         let result= req.path.match(layer.reg);
    //         if(result){
    //             //如果匹配上了
    //              let obj=layer.params.reduce((pre,next,index)=>{
    //                  pre[next]=result[index+1];
    //                  return pre;
    //              },{})
    //              req.params=obj;
    //              if((layer.method==req.method.toLowerCase()||layer.method=="all")&&result){
    //                       return   layer.handle(req,res)
    //              }
    //         }
    //       }else{
    //           //正常路由
    //          if((layer.method==req.method.toLowerCase()||layer.method=="all")&&(layer.routePath==req.path||layer.routePath=="*")){
    //              return layer.handle(req,res);
    //          }
    //       }
    //  }
    //  //说明循环完了还没找到
    //  res.end(`${req.path }/${req.method}--not fount`)
     
     
     

      
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
    //模板引擎的相关方法
    app.settings={};
    app.set=function(key,value){
       app.settings[key]=value;
    }
    app.engines={};
    app.engine=function(key,value){
       app.engines[key]=value;
    }

    app.all=function(routePath,handle){
        let layer={
            routePath,
            handle,
            method:"all"
        }
        routes.push(layer);  
    }
    //中间件 
    app.use=function(routePath,handle){
        if(typeof handle!="function"){
           //说明只传了一个参数,
           handle=routePath;
           routePath="/";
        }
        let layer={
            routePath,
            handle,
            method:"middle"
        }
        routes.push(layer);  
    }


    app.listen=function(){
        http.createServer(app).listen(...arguments)
    }
    
    return app
}

module.exports=Express;
//静态服务的封装方法,pathRoot 是静态文件的目录,绝对路径
Express.static=function(pathRoot){
   return function(req,res,next){//返回一个中间键
        let filename=path.join(pathRoot,req.path);
        console.log("filename:"+filename);
        fs.access(filename,fs.constants.F_OK,(err)=>{
            if(err){
                //文件不存在,
                console.log("12");
                        
                next();
            }else{
                //文件存在
            let type=mime.getType(filename);
            res.setHeader("Content-Type",type);
            fs.createReadStream(filename).pipe(res);
           // fs.end();
            }
        })
        
        
       
   }
}

























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