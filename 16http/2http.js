//curl -v --data "a=1" http://localhost:3000

//curl -v --data "a=6&b=8" http://localhost:3000


let http=require("http");
let server=http.createServer();
server.on("connection",function(socket){
    console.log("链接成功!")
})
server.on("request",(req,res)=>{
    console.log("req.method"+req.method);
    console.log("req.url"+req.url);
    console.log(req.httpVersion); 
    console.log(req.headers);
    let arr=[];
    req.on("data",function(data){
        
        console.log("data:"+data)
        arr.push(data);
    })
    req.on("end",function(){
        console.log(Buffer.concat(arr).toString())
    })
    //响应
   // res.writeHead(200,{'Content-Type':'text','a':'1'});这种写法只能写一次头,如果有多个就不行了,我们一般用下面的
    
    res.setHeader('Content-Type',"text");
    res.setHeader("a","1");
    res.write("hello");
    res.sendData=false;//不发送默认的日期.
    res.end();
   
   
})

server.listen(3000)



//   req.methodPOST
// req.url/
// 1.1
// { host: 'localhost:3000',
//   'user-agent': 'curl/7.44.0',
//   accept: '*/*',
//   'content-length': '7',
//   'content-type': 'application/x-www-form-urlencoded' }
//   a=3&b=4
//   a=3&b=4
 
 