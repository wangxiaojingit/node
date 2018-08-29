/**
 * 用原生的cookie 写一个需求:当客户端去访问服务器,访问路径是/write的时候,设置一个cookie,
 * 当客户端去访问路径/read 的时候我们就去读取它的cookie
 * 
 * 
 * 
 */

 let http=require("http");
 let url=require("url")
 http.createServer((req,res)=>{
      let {pathname}=url.parse(req.url);
      console.log(pathname)
      if(pathname=="/read"){
          res.end(req.headers["cookie"])
      }else if(pathname=="/write"){
           res.setHeader("Set-Cookie",["name=wangxiaojin;Domain=zf1.cn;path=/write;httpOnly=true",
           `age=18;Expires=${new Date(Date.now()+1000*10).toGMTString()}`,
           `address=${encodeURIComponent('回龙观')}`
        ])

        res.end("write")
      }else{
          res.end("not found")
      }
 }).listen(3000)

 /**
  * 
  * res.setHeader("Set-Cookie","name=wxj") //单个的写法
  * 
  * res.setHeader("Set-Cookie",[])//多个的话就可以写成数组
  * 
  * 参数:Domain: 设置的域名,比如设置zf1.cn  就是在zf1.cn 下才会设置cookie
  * path: /write ;在访问/write的路径时才会设置cookie
  * httpOnly  读取不出(不允许修改后台的设置的cookie)
  * Expires: 过期的时间
  * 在设置cookie的时候,如果包含了中文,需要转义下
  * 
  * 
  */