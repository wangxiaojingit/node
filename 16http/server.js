//用代码去模拟服务端去请求客户端 (不用curl 命令,用client.js node启动))

let http=require("http");
let server=http.createServer((req,res)=>{
    console.log(req.method);
    console.log(req.headers);
    res.end("hello");
}).listen(3000)