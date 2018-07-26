let net=require("net");
let server=net.createServer((socket)=>{
    socket.setEncoding("utf8");
    socket.on("data",(data)=>{
       console.log(data);
       socket.write("知道了")
    })
})

server.listen(3000);