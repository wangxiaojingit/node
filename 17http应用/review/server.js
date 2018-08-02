//客户端请求服务端的时候,我们需要判定下是不是206范围请求

let http=require("http");
let fs=require("mz/fs");
let path=require("path");

let p=path.join(__dirname,"./1.txt");


async function listen(req,res){
     let statObj=await fs.stat(p);
     let total=statObj.size;
     let range=req.headers["range"];
     if(range){
        //如果是范围请求 
        let start= range.split("=")[1].split("-")[0];
        let end=range.split("=")[1].split("-")[1];
        start=start?Number(start):0;
        end=end?Number(end):total;
        res.statuscode=206;
        res.setHeader('Accept-Ranges','bytes')
        res.setHeader('Content-Range',`bytes ${start}-${end}/${total}`); //注意此处是大写
         
        fs.createReadStream(p,{start,end}).pipe(res);
     }else{
       //如果不是范围请求
       fs.createReadStream(p).pipe(res);
     }
     

   
}

http.createServer(listen).listen(3001);






