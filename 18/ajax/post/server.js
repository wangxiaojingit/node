let http=require("http");
http.createServer(function(req,res){
    let ary=[];
    req.on("data",(data)=>{
       ary.push(data)
    })
    req.on("end",()=>{
       let result= Buffer.concat(ary);
       let type=req.headers["content-type"];
       res.setHeader("Content-Type","application/json");         
       if(type==="application/x-www-form-urlencoded"){
          let obj= require("querystring").parse(result.toString());
          res.end(JSON.stringify(obj));
       }else if(type="application/json"){
          res.end(result);
       }else if(type="text/plain"){
          res.setHeader("Content-Type","text/plain")
          res.end(result.toString())
       }
      
       
    })
}).listen(3000)

// let querystring=require("querystring");
//querystring.parse()方法可以把a=b&c=2&d=1 这样的字符串拼接成对象,参数一就是字符串,参数二是参数中间的分隔符,参数三是key,value 直接的连接符.
// let obj=querystring.parse("a=1!&b=2!&c=3","!&","="); 
// console.log(obj)