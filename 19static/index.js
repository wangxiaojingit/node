let fs=require("fs");
let http=require("http");
let url=require("url");
let path=require("path");
let util=require("util");
let zlib=require("zlib");
let mime=require("mime");//内容类型
let debug=require("debug")("hello:a");//会根据当前的环境变量控制输出
//let debug2=require("debug")("hello:b");
let chalk=require('chalk'); //粉笔
let ejs=require("ejs"); //underscore handlebar ejs jade....
//写到这里,我们需要进入git bashere :npm  init  //初始化项目
// cnpm install mime debug chalk ejs //把第三方的模块下载下来
//console.log(chalk.red("hello"));//git bashhere: node index.js 可以看到控制台打印出来的hello 变成了红色.
//debug1("hello:a");//node index.js的时候没有任何反应,当我们在cmd 中输入:set DEBUG='hello' 再: node index.js  就出现了hello
//debug2("hello:b"); //set DEBUG='hello:*'
//let util=require("util");
let stat=util.promisify(fs.stat);
let readdir=util.promisify(fs.readdir);

let config=require("./config");//把配置文件导进来

class Server {
    constructor(options){
       this.config=config;
    }
   async handleRequest(req,res){
        //如果请求的地址不存在,就返回not found 如果存在,再判断是不是文件还是文件夹
        let stats=this.config.dir;
        let p=url.parse(req.url).pathname;
        let realPath=path.join(__dirname,stats,p);
        
        try{
            let statObj= await stat(realPath);
            //如果文件存在
            this.sendFile(req,res,statObj,realPath);
        }catch(e){
            //如果文件不存在
            this.sendError(req, res, e);
        }
    }
    sendError(req,res,e){
      
       res.statusCode="404";
       res.end("not found 404")
    }
    sendFile(req,res,statObj,realPath){
        //判断是文件还是文件夹
        console.log("realPath:"+realPath)
        if(statObj.isFile(realPath)){
            //如果是文件的的时候
            res.setHeader('Content-Type', mime.getType(realPath) + ';charset=utf-8');
            fs.createReadStream(realPath).pipe(res);
        }else{

        }
    }
    start(){
       let {host,port,dir} =this.config;
       
       //开启一个服务
       let server= http.createServer(this.handleRequest.bind(this));
       server.listen(port,host,function(){
           //console.log(1);
         debug(`server start http://${host}:chalk.green(${port})`);
       })
    }
}

let server=new Server();
server.start();
// let mime=require("mime");
// let realPath="e:\mynodeclass\node\19static\public\1.html"
// let c=mime.getType(realPath);
// console.log(c)
// let realPath="e:\mynodeclass\node\19static\public\1.html"
// let mime=require("mime");
// console.log(mime.getType("e:\mynodeclass\node\19static\public\1.html"));