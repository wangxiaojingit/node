/**
 * 当客户端请求服务器的时候,服务器就告诉客户端当前连接数,以及总共的连接数
 * 
 * 简单实现,当一个客户端发消息的时候,除了自己让其它连接的客户端都看到.
 * 
 * 
 */

let net=require("net");
let server=net.createServer();
let client=[];
server.on("connection",(socket)=>{
    server.getConnections((error,count)=>{
        socket.write(`连接数${count},总共可连接${server.maxConnections}`);
    })
    client.push(socket);
    socket.on("data",(data)=>{
       client.forEach((item)=>{
           if(item!=socket){
              item.write(data+"\r\n");
           }
       })

    })
      
})

server.maxConnections=3;
server.listen(3000);