let http=require("http");
let fs=require("fs");
let url=require("url");
let querystring=require("querystring");
let str="name=qqq&password=qqq";

http.createServer(function(req,res){
   let {pathname,query}=url.parse(req.url,true);
   if(pathname=="/form"){
      if(req.method.toLowerCase()=="get"){
        res.end(JSON.stringify(query))
      }else {
          //如果是post请求
          let ary=[];
          req.on("data",(data)=>{
            ary.push(data)
          })
          req.on("end",()=>{
             let result= Buffer.concat(ary).toString();
             console.log(result);
             let obj=querystring.parse(result);
             res.end(JSON.stringify(obj))
          })
      }
   }
}).listen(3000)
