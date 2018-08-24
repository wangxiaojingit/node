/**
 * 实现params 的实现
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
        req.query=querystring.parse(query);
        //console.log(req.query);
        //实现req.params.id
        
        routes.forEach((item)=>{
            if((item.method==req.method.toLowerCase()||item.method=="all")&&(item.path==req.path||item.path=="*")){
                //增加res.params的逻辑
                if(item.params){
                   //说明这层路由上是带参数的.
                   
                   let result=req.path.match(item.RegExp);
                   console.log(result);
                //    req.params = layer.paramNames.reduce((memo, key, index) => (memo[key] = result[index + 1], memo), {});
                //      return layer.handler(req, res);

                }
                
                
                
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

            let reg=/:(\w)+/g
            if(reg.test(path)){
           //如果符合 /:id/:name 这样的参数路由
           let params=[];
           let Regstr=path.replace(reg,function(match,atr){
               params.push(atr);
               return "(\\w+)";
           })
           Regstr=new RegExp(Regstr);
           layer.params=params;
           layer.RegExp=Regstr;
           

           
        }
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