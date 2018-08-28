let http=require("http");
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
               console.log(2)
               params=_http_server.STATUS_CODES[params];
              break;
              default:
              break;

         }
          res.end(params)
     }
     //找对应路由,执行相应方法
     routes.forEach((layer,index)=>{
         //如果是多级路由,我们就走多级路由的逻辑
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
                            layer.handle(req,res)
                }
           }
           
         }else{
           
             //正常路由
            if((layer.method==req.method.toLowerCase()||layer.method=="all")&&(layer.routePath==req.path||layer.routePath=="*")){
                return layer.handle(req,res);
             }
         }
         

     })
     
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