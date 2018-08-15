
/***
 * 强制缓存:当客户端第一次去访问服务器的时候,服务器会给客户端一个头Etag,还会给客户端另一个头Cache-Contrl', 'max-age=5'
 * Etag 的值,可以放成是读取文件的加密内容,当二次访问服务器的时候,客户端会带回一个头 if-none-match(对应etag);
 * 如果此时if-none-match 的头的值和读取的文件内容一致,那就直接返回客户端缓存.
 * 
 * 
 * 
 */

let http=require("http");
let fs=require("fs");
let url=require("url");
let path=require("path");
let crypto=require("crypto");
let mime=require("mime");
http.createServer(function(req,res){
   let {pathname} = url.parse(req.url);
   console.log("pathname:"+pathname);
   
   let p=path.join(__dirname,pathname);//真实的路径
   console.log("p:"+p);
   fs.stat(p,function(err,stats){
       if(!err){
           let md5=crypto.createHash("md5");
           let rx=fs.createReadStream(p);
           rx.on("data",function(data){
              md5.update(data)
           })
           rx.on("end",function(){
               let result=md5.digest('hex');
               let ifNoneMatch=req.headers["if-none-match"];
               console.log("ifNoneMatch:"+ifNoneMatch);
               console.log("result:"+result);
               if(ifNoneMatch==result){
                  //说明内容一致,走缓存
                  console.log(4)
                  res.statusCode=304;
                  res.end();

               }else{
                   console.log(3)
                   //如果不相等,就返回真实内容,并做强制缓存
                   let type=mime.getType(p);
                   res.setHeader("Cache-Control","max-age=5")//在5秒内不要再访问我
                   let d=new Date(Date.now()+5000).toUTCString()
                   res.setHeader("Expires",d);  //和Cache-Control 一样都是过期后才能访问,只是兼容低版本,两者都要写上.
                   res.setHeader("Etag",result);
                   res.setHeader("Content-Type",type+';charset=utf8');
                   fs.createReadStream(p).pipe(res);
                   
               }
           })

       }else{
           //如果访问路径不存在
           res.end("not found!")
       }
   })

 /***
  * 总结:强制缓存主要就是设置几个头,现在回忆下,做个小结
  * 
  * 第一次客户端访问服务器
  * res.setHeader("Etag",value)//value 为文件的内容
  * res.setHeader("Cache-Control","max-age=5");5秒内不要再访问我
  * res.setHeader("Expires",new Date(Date.now()+5000))) 同上,低版本兼容
  * 
  * 经过第一次之后设置了Etag 客户端再请求服务器的时候就会自己带一个头
  * req.setHeader("if-none-match")//对应Etag,值相同.
  * 
  * 
  * 还需要注意一点,我们这里直接用node启动的服务,页面中的img 的路径只能用/ 不能用./ ../,服务器的路径不能那么写
  * 
  * 
  * 
  * 
  * 
  */

}).listen(3000)