//总是用butty 也不是很方便,我们也可以自己用js 写一个客户端,然后用node去运行

let net=require("net");
let client=net.createConnection({
    port:3000
})
//这里的client 就是socket;
client.setEncoding("utf8");
client.write("客户端1,我来了");
client.on("data",(data)=>{
   console.log("服务端:"+data);
})