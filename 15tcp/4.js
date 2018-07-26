/**
 * 当客户端请求服务器的时候,服务器就告诉客户端当前连接数,以及总共的连接数
 * 
 * 当客户端输入内容的时候,做一些操作
 * socket.end() //告诉客户端,挂了吧,通信结束
 * server.close() //不让新的客户端再连接服务器,等连接中的客户端都关闭之后,服务器端也会关闭.
 * 
 * server.unref();//不会触发close,新客户端还可以继续连接,当进来的所有用户都关闭之后,服务器就关闭.
 * 
 * 
 */

let net=require("net");
let server=net.createServer();
server.on("connection",(socket)=>{
    server.getConnections((error,count)=>{
        socket.write(`连接数${count},总共可连接${server.maxConnections}`);
    })
    socket.on("data",(data)=>{
       //socket.end() //关闭客户端
       //server.close();
       server.unref();

    })
      
})

server.maxConnections=3;
server.listen(3000);