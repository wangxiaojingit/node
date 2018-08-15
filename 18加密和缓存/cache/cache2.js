/**
 * 对比缓存
 * 就是客户端每次请求服务器的时候,读取到那个路径下的文件,读它的最后修改时间,然后给他设置一个头
 * res.setHeader("Last-Modified",value);value 就是读取文件的最后修改时间
 * 
 * 当客户端再去访问服务器就会自带一个头
 *              
 * req.headers("if-modified-since")  和读取文件的最后修改时间做对比,如果不变,就读缓存,如果变了,就返回文件
 * 
 * //stat.ctime.toUTCString()  文件最后的修改时间,toUTCString() 变成标准时间去掉了
 * 
 * 
 * 
 */


 let fs=require("fs");
 let http=require("http");
 let url=require("url");
 let path=require("path"); 
 http.createServer(function(req,res){
     let {pathname}=url.parse(req.url);
     let p=path.join(__dirname,pathname);//真实路径
     fs.stat(p,(err,stats)=>{
        if(!err){
           //如果存在
           let lastCtime=stats.ctime.toUTCString();
           let headTime=req.headers["if-modified-since"];

           if(lastCtime==headTime){
              //时间相同,我们就走缓存
              res.statusCode=304;
              res.end();
           }else{
              res.setHeader("Last-Modified",lastCtime);
              res.setHeader("Cache-Control","no-cache");
              fs.createReadStream(p).pipe(res);
           }
        }else{
           //如果不存在
           res.end("not fount")
        }
     })
 }).listen(3000)


