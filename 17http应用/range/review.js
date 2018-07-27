/**
 * 
 * 需求:一个客户端请求服务器,如果是范围限制,就返回限制内容,如果header 不是范围限制,我们就返回全部内容
 * Range:betys=0-5
 */


 //-------------服务器的headers
//   Connected to localhost (::
//  GET / HTTP/1.1
//  Host: localhost:3000
//  User-Agent: curl/7.61.0
//  Accept: */*
//  Range:bytes=0-5


//------------服务器返回给客户端的headers

// < HTTP/1.1 206 Partial Content
// < Accept-Ranges: bytes
// < Content-Range: bytes 0-5/undefined
// < Date: Fri, 27 Jul 2018 03:22:19 GMT
// < Connection: keep-alive
// < Transfer-Encoding: chunked



 let http=require("http");
 let fs=require("mz/fs");
 let path=require("path");
 let p=path.join(__dirname,'./1.txt')
 http.createServer(listen).listen(3000);
 async function listen(req,res){
     let Range=req.headers["range"];
     if(Range){
         //说明有范围限制
         let statObj=await fs.stat(p);
         let total=statObj.size;
         let [all,start,end]=Range.split("=")[1].match(/(\d*)-(\d*)/);
         start=start?Number(start):0;
         end=end?Number(end):total;
         res.statusCode = 206;
         res.setHeader('Accept-Ranges','bytes')
         res.setHeader('Content-Range',`bytes ${start}-${end}/${total}`);
         
         fs.createReadStream(p,{start,end}).pipe(res)
      

     }else{
         //没范围限制
         fs.createReadStream(p).pipe(res);
     }

 }
 