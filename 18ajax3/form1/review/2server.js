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
         
      }
   }
}).listen(3000)

// let contentType=req.headers["Content-Type"];
// if(contentType=="application/x-www-formencoded"){
//     //单个表单提交
//     //如果是post请求
//     let ary=[];
//     req.on("data",(data)=>{
//       ary.push(data)
//     })
//     req.on("end",()=>{
//        let result= Buffer.concat(ary).toString();
//        console.log(result);
//        let obj=querystring.parse(result);
//        res.end(JSON.stringify(obj))
//     })
// }else{
//   //多表单提交
// }