//范围请求206

//curl -v --header "Range:bytes=0-5" https://s3.pstatp.com/toutiao/static/img/logo.201f80d.png

//curl -v --header "Range:bytes=0-5" https://www.baidu.com
//mz  实现promisify  
//想要搜索哪个框架 www.npmjs.com/package/mz


        // let fs=require("fs");
        // let path=require("path");

        // let stat=require("util").promisify(stat);
        // let readFile=require("util").promisify(readFile);

        // let p=path.join(__dirname,"./1.txt");
        // console.log(p);
        // fs.stat(p,(error,stats)=>{
        //      console.log(stats,size)
        // })


 //---------------需求范围,当客户端去请求服务器的时候,如果是范围请求,就返回范围内的数据,如果不是就返回全部
 
/**
 * 1\打开cmd 的时候当输入命令:curl -v localhost:3008
 * 打印出来的header:*/
//   { host: 'localhost:3008',
//   'user-agent': 'curl/7.61.0',
//   accept: '*/*' }

/**
 * 2\打开cmd的时候,当输入命令:curl -v --header "Range:bytes=0-5" localhost:3008
 */

// { host: 'localhost:3008',
//   'user-agent': 'curl/7.61.0',
//   accept: '*/*',
//   range: 'bytes=0-5' }


 //let fs=require("mz/fs");

 let  http=require("http");
 let path=require("path");
 let p=path.join(__dirname,"./1.txt");
 let util=require("util");

 let fs=require('mz/fs');
 async function listen(req,res){
     //判断返请求的headers 有没有范围限制
     let range=req.headers["range"];
     console.log(range+"----");
     if(range){

        let statObj=  await fs.stat(p);
        let total=statObj.size;
        //如果有范围限制,截取start end
        let [a,start,end]=range.match(/(\d*)-(\d*)/);

        start=start?Number(start):0;
        end=end?Number(end):total-1;
        console.log(start);
        console.log(end);
        res.statusCode=206;
        res.setHeader("Accept-Ranges","bytes");
        res.setHeader("Content-Range",`bytes ${start}-${end}/${total}`)

       
       
        fs.createReadStream(p,{start,end}).pipe(res);
     }else{
        //没有范围限制
        console.log(2)
        fs.createReadStream(p).pipe(res);
     }

 }


 
 http.createServer(listen).listen(3008);
 