let http=require("http");
let fs=require("fs");
let url=require("url");
let util=require("util");
let debug=require("debug");
let stat=util.promisify(fs.stat);
let mime=require("mime");
let path=require("path");
let config=require("./config.js");
let ejs=require("ejs");
let zlib=require("zlib");

//一开始就去读取模板
//let templateStr=fs.readFileSync(path.join(__dirname,'./index.html'),'utf8')
let templateStr = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
console.log(templateStr);
class Server{
    constructor(options){
       this.config=options;
       this.templateStr=templateStr;
    }
   async reqHandle(req,res){
        //开启服务的回调函数
        let {pathname}=url.parse(req.url);
        let pubdir=this.config.dir;
        let relpath=path.join(__dirname,pubdir,pathname);//真实路径
        console.log("relpath:"+relpath);
        try{
            
            let statObj=fs.statSync(relpath);//同步看文件的路径
            //console.log("存在");
            //如果存在就把文件的内容读取出来
            this.senFile(req,res,relpath,statObj,pathname);
        }catch(e){
            //如果不存在,
            console.log("不存在")
            this.sendError(req,res)
            
        }
        

    }
    cache(req,res,relpath,statObj,pathname){
      let ctime=statObj.ctime.toUTCString();
      let size=statObj.size;
      let etag=ctime+size; 
      let lastModified=ctime;
      //强制缓存
      res.setHeader("Etag",etag);
    
      res.setHeader("Expires",new Date(Date.now+5000).toUTCString());
      res.setHeader("Cache-Control",'max-age=5');
      res.setHeader("Last-Modified",ctime);
      let ifModifiedSince=req.headers["if-modified-since"]; //对应last-modified-since;
      let ifNoneMatch=req.headers["if-none-match"]; //对应etag
      if(etag!=ifNoneMatch){
        return false;
      }
      if(lastModified!=ifModifiedSince){
         return false;
      }
      return true;

    }
    compress(req,res,relpath,statObj,pathname){
        accept-encoding
        let encoding=req.headers["accept-encoding"];
        if(encoding){
            if(encoding.match(/\bgzip\b/ig)){
                res.setHeader("Accept-Encoding","gzip")
              return  zlib.createGzip()
            }else if(encoding.match(/\bdeflate\b/ig)){
              res.setHeader("Accept","deflate");
              return zlib.createDeflate();
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
    range(req, res, statObj, realPath){
        let range=req.headers["range"];
        if(range){
           let [,start,end]=range.match(/(\d*)-(\d*)/gi);
           start = start ? Number(start) : 0;
           end = end ? Number(end) : statObj.size - 1;
           res.setHeader('Accept-Ranges',"bytes");
          
           res.setHeader('Content-Range',`bytes ${start}-${end}/${statObj.size}`);
           fs.createReadStream(realPath,{start,end}).pipe(res);
           
        }
        return false;
    }
    senFile(req,res,relpath,statObj,pathname){
        //文件或者文件夹存在就会走到这个逻辑
        //先判断有没有缓存

        if(this.cache(req,res,relpath,statObj,pathname)){
         //如果true 就走缓存
          req.statusCode=304;
          req.end();
          return;

        }
        //判断是不是压缩流,如果支持压缩流,我们就返回压缩流
        let zip=compress(req,res,relpath,statObj,pathname)
        if(zip){
          return  fs.createReadStream(relpath).pipe(zip).pipe(res);

        }
        //判断是不是范围请求
        if(this.range(req, res, statObj, realPath)){
          return
        }

        if(statObj.isFile()){
            //是文件
            let type=mime.getType(relpath);
            res.setHeader("Content-Type",type+";charset=utf8");
            fs.createReadStream(relpath).pipe(res);
    
        }else{
           //是目录
           let dirs=fs.readdirSync(relpath);
           dirs=dirs.map((item)=>{
               let t=path.join(pathname,item)
               return {name:item,path:t};
           });
           let str = ejs.render(this.templateStr, { dirs });
           res.setHeader('Content-Type', 'text/html;charset=utf-8');
           res.end(str);
        }
        
    }
    sendError(req,res){
        res.statusCode=404;
       res.end("404 not found")
    }
    start(){
        //开启一个服务
       let server= http.createServer(this.reqHandle.bind(this));
       let {host,port,dir}=this.config;
       server.listen(port,host,function(){
         console.log(`server start http://${host}:${port}`)
       })

    }
    

}

let server1=new Server(config);
server1.start();