//当别人访问我的网站的时候,我就让去请求第三方网站,拿到第三方网站的数据,然后再返回给访问我的人
let http=require("http");
http.createServer(function(req,rs){
   let client=http.request({
       host:"news.baidu.com",
       method:"get",
       port:80
   },(res)=>{
        let arr=[];
        res.on("data",(data)=>{
           arr.push(data);
        })
        res.on("end",()=>{
            let result=Buffer.concat(arr);
            rs.setHeader('Content-Type','text/html;charset=utf8');
            rs.end(result);
        })
   });
   client.end();



}).listen(3000)