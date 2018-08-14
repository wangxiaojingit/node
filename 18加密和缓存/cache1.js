/**
 * 强制缓存
 * 
 * 第一次当客户端去访问服务器的时候,服务器会给一个标签Etag
 * 当第二次再去请求服务器的时候,浏览器会带一个头:if-none-match
 * 
 * 当二次再去请求的时候,可以去读文件的内容然后跟这个if-none-match 对比,如果相同走缓存,如果不相同就再去读
 * 
 * 
 */


 let http=require("http");
 let fs=require("fs");
 let path=require("path");
 let url=require("url");
 let crypto=require("crypto");
 let mime=require("mime");
 console.log(mime.getType("1.html"));

 http.createServer(function(req,res){
     console.log("1----");
    let {pathname}=url.parse(req.url);
    let relpath=path.join(__dirname,pathname);
    console.log("relpath:"+relpath);
     fs.stat(relpath,function(err,statObj){
        if(!err){
            console.log(2)
            let d = new Date(Date.now()+5000).toUTCString();
            res.setHeader('Expires', d); // http1.0
            let rx=fs.createReadStream(relpath);
            let md5=crypto.createHash("md5");
            rx.on("data",(data)=>{
                md5.update(data);
            })
            rx.on("end",()=>{
               let result= md5.digest("hex");//加密之后的读到文件的加密内容
              
               let header=req.headers["if-none-match"];
               
               if(header==result){
                  res.statusCode=304;
                  res.end();
               }else{
                  //----
                  //设置mime类型
                  res.setHeader('Cache-Control', 'max-age=5') // 5秒内不要再访问我
                  res.setHeader("Content-Type",mime.getType(result)+";charset=utf8");
                  res.setHeader("Etag",result);
                  fs.createReadStream(relpath).pipe(res);

               }
               
            })
        }else{
            console.log(3)
            res.end("error")
        }
     });
    


}).listen(3000)