let http=require("http");
let fs=require("fs");
let path=require("path");
let static=path.join(__dirname,"./public");
console.log("static:"+static)
let p=path.join(static,'./1.html');
let url=require("url");
let whitelist=["zf2.cn","zf1.cn"]
http.createServer(function(req,res){
   let refer=req.headers['referer']||req.headers['referered'];
   let pathname=url.parse(req.url).pathname;
   console.log("pathname:"+pathname);
   let furl=path.join(static,pathname);
   console.log("furl:"+furl);
   let flag=fs.existsSync(furl);
   if(flag){
    if(refer){
        //如果存在refer,我们就去判断是否是同源
         let hostname=req.headers["host"].split(":")[0];
         let refername=url.parse(refer).host.split(":")[0];
         console.log("refername:"+refername);
         console.log("hostname:"+hostname);
         if(hostname==refername||whitelist.includes(refername)){
           //如果相等说明来源于源网站,我们就让第一张图片出现
           fs.createReadStream(path.join(static,'./1.jpg')).pipe(res);
         }else{
             fs.createReadStream(path.join(static,'./2.jpg')).pipe(res);
         }
   
      }else{
        //如果没有,我们就直接返回
         fs.createReadStream(p).pipe(res);
      }
   }else{
       res.end("not fount 404")
   }

   
   
}).listen(3000)