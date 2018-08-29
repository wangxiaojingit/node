/**
 * 封装express功能点:
 * 封装中间件
 * 
 * 
 */




let http=require("http");
let fs=require("fs");
let methods=require("methods");//所有的方法数组
let url=require("url");
let _http_server=require("_http_server");//获取状态码的类
let util=require("util");

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
     let index=0;
     function next(){
        let layer=routes[index++];
        if(layer){
            if(layer.method=="middle"&&(req.path.startsWith(layer.routePath)||layer.routePath=="/")){
                 //如果是中间件的时候
                 return layer.handle(req,res,next)
            }else{
                 //如果路由不匹配
                return next();
            }
            //如果路由存在
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