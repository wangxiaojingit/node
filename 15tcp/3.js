/**
 * 每次链接的时候,我们需要告诉客户端当前链接的人数,已经总共可以连接的总数
 * 
 */

let net=require("net");
let server=net.createServer();
server.on("connection",(socket)=>{
   server.getConnections(function(err,count){
       //socket.write(`当前连接数为${count},总共可以容纳${server.getMaxListeners}`)
       socket.write(`当前连接数为${count},总共可以容纳${server.maxConnections}`)
   })
   
})
server.maxConnections=3;//服务器设置最大连接人数为3; 
//如果端口号占用就让端口号自动加1
// server.on("error",function(error){
//   if(error.code=="EADDRINUSE"){
//       server.listen(error.port+1,function(){
//           console.log(error.port+1)
//       })
//   };
// })
server.listen(3000,function(){
    console.log(3000)
})