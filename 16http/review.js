// let http=require("http");
// let server=http.createServer();
// let arr=[];
// server.on("request",(req,res)=>{
//     req.on("data",(data)=>{
//       arr.push(data);
//     })
//     req.on("end",function(){
//       let c=  Buffer.concat(arr);
//       console.log(c);
//     })

//     res.setHeader("Content-Type","text");
//     res.setHeader("a",1);
//     res.end("hello");
// })
// server.listent(3000);


//

let http=require("http");
http.createServer(function(req,r){
    let arr=[];
  let client= http.request({
      host:"news.baidu.com",
      method:"get",
      port:80
   },(res)=>{
      res.on("data",(data)=>{
         arr.push(data);
      }) 
      res.on("end",()=>{
          let result=Buffer.concat(arr);
          r.setHeader('Content-Type','text/html;charset=utf8');
          r.write(result);
      })
     
   })
   client.end();
}).listen(3001)