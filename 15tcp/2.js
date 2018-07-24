//下载butty,让butty 当客户端(每次我们在浏览器上访问的时候,我们用socked.write 的时候需要设置头,而且当写的是中文的时候,浏览器还会乱码,用butty 只用设置
// 主机名:localhost  端口号:3000   链接类型:raw  然后打开即可,就会有一个客户端的窗口)

let net=require("net");
let server=net.createServer(function(socked){
      socked.on("data",(data)=>{
           console.log(data);
      })
      console.log("欢迎"); //服务端
     // socked.setEncoding("utf8");
      socked.write('欢迎');
})

server.listen(3000)