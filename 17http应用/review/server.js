//客户端请求服务端的时候,我们需要判定下是不是206范围请求

let http=require("http");


function listen(req,res){
    // let range=req.headers["range"];
    // console.log(range);
    res.end("hello");
}

http.createServer(listen).listen(3000);
