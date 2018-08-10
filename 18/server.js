//
let http=require("http");
let fs=require("fs");
let url=require("url");
let path=require("path");
let public=path.join(__dirname,"./public");
let whitelist=["zf1.cn","zf2.cn"];

/* 
Host: zf1.cn:3000
Referer: http://localhost:3000/1.html
*/

let server=http.createServer((req,res)=>{
     let {pathname}= url.parse(req.url);
     let p=path.join(public,"./"+pathname);
     let flag= fs.existsSync(p);
     if(flag){
          let refer =req.headers['referer']||req.headers['referered'];
          let host=req.headers["host"];
          if(refer){
             let referername=url.parse(refer).hostname;//Referer 中的域名 
             let hostname=host.split(":")[0];//host 中的域名
             console.log("refer:"+refer);
             console.log(whitelist.includes(refer))
             if(referername==hostname||whitelist.includes(referername)){
                //如果两者相同,说明来自一个,我们就返回笑的图片
                fs.createReadStream(path.join(public,'./1.jpg')).pipe(res);
             }else{
                //如果不相同,我们就返回哭的图片
                fs.createReadStream(path.join(public,'./2.jpg')).pipe(res);
             }
          }else{
            fs.createReadStream(p).pipe(res);
          }
     }else{
        res.statusCode=404;
        res.end();
     }
     
     
     
})

server.listen(3000);