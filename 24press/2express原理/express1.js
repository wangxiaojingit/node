/**
 * 主要实现了路由以及请求参数的实现
 * 
 * 
 */

let http=require("http");
let methods=require("methods");//所有的请求方法get,put,post,delete....
let querystring=require("./querystring");
//console.log(methods)
function express(){
    let routes=[];//存放路由的数组
    function app(req,res){ //监听函数
        let [path,query]=req.url.split("?");
        req.path=path;
        req.host=req.headers["host"].split(":")[0];
        console.log(req.host);
        req.query=querystring.parse(query);
        //console.log(req.query);
        routes.forEach((item)=>{
            if((item.method==req.method.toLowerCase()||item.method=="all")&&(item.path==req.path||item.path=="*")){
                return item.fn(req,res);
                
            }
            //在这里需要加入判断,如果上面的方法都没有匹配到,我们就要匹配all 方法
            // if(item.method=="all"&&(req.path==item.path||item.path=="*")){
            //        item.fn(req,res)
            // }
        })
        //如果循环完了,还没找到,就说明不存在
        res.end("404")
    }
    //调用get 方法的时候,就把存到routes
    methods.forEach(method=>{
        app[method]=function(path,fn){
            let layer={path,fn,method};
            routes.push(layer);
          }
    })
    //单独写一个all方法
    app.all=function(path,fn){
        let layer={path,fn,method:"all"};
        routes.push(layer);
    }
    
    app.listen=function(){
        http.createServer(app).listen(...arguments)
    } 
    return app

}

module.exports=express;