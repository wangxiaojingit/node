let http=require("http");
let url=require("url");
let path=require("path");
let fs=require("fs");
let querystring=require("querystring");


http.createServer(function(req,res){
    let {pathname,query}=url.parse(req.url,true)
   if(pathname=="/login"){
      if(req.method.toLowerCase()=="get"){
         res.end(JSON.stringify(query));
      }else{
          //如果是post请求
          let ary=[];
          req.on("data",(data)=>{
            ary.push(data)
          })
          req.on("end",function(){
             let result= Buffer.concat(ary).toString();
             res.end(JSON.stringify(querystring.parse(result)))
          })
      }
      return;
   }else if(pathname="/"){
     //就让返回1.html
     return fs.createReadStream(path.join(__dirname,'./1.html')).pipe(res)
   }else {
       let p=path.join(__dirname,pathname);
       try{
        let statObj=fs.statSync(p);
        return fs.createReadStream(p).pipe(res);
       }catch(e){
         //如果出错,说明不存在,
         res.statusCode="404";
         res.end("404")
       }
      
   }
}).listen(3000)