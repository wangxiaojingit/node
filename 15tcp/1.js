/**
 * 
 * 1\首先需要打开电脑的控制面板,找到程序和功能,然后找到---打开或者关闭window 功能,然后勾选 Telnet服务端----Telnet 客户端
 * 2\run code 起一个node服务
 * 3\在浏览器中输入:localhost:3000
 * 此时回到这里,可以看到这个输出了"ok" 证明已经连接了.
 * 
 * 4 在连接的时候,我们想要在浏览器中输出"hello",如果单纯写socked.write("hello"),是不会有反应的,需要去遵守http协议才行.
 * 
 * 5 22-25 行的格式开头不能空格,内容前(hello)必须空一行
 */

//http socked 都是基于tcp
let net=require("net");
let server=net.createServer()

server.on("connection",(socked)=>{
    console.log("连接"); //当在浏览器中输入:localhost:3000
    socked.setEncoding("utf8");
    socked.on("data",(data)=>{
       console.log(data)
    })
    socked.write(`
HTTP/1.1 200 ok
Content-Length:5

hello
     `);
})

server.listen(3000);