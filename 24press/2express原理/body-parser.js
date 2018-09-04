let querystring=require("querystring");
let qs=require("qs");

module.exports.urlencoded=function({extended}){
   return function(req,res,next){
       if(req.headers["content-type"]=="application/x-www-form-urlencoded"){
             //如果是表单提交,就走这个路由
             let ary=[];
             req.on("data",(data)=>{
                ary.push(data);
             })
             req.on("end",()=>{
                let result= Buffer.concat(ary).toString();
                req.body=extended?qs.parse(result):querystring.parse(result);
                next();
             })
             req.on("error",(err)=>{
                 next(err);
             })
      
       }else{
           next()
       }
   }
}

module.exports.json=function(){
    return function(req,res,next){
        if(req.headers["content-type"]=="application/json"){
              //如果是表单提交,就走这个路由
              let ary=[];
              req.on("data",(data)=>{
                 ary.push(data);
              })
              req.on("end",()=>{
                 let result= Buffer.concat(ary).toString();
                 req.body=JSON.parse(result);
                 next();
              })
              req.on("error",(err)=>{
                  next(err);
              })
       
        }else{
            next()
        }
    }
}