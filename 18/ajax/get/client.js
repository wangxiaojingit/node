



// ajax 

// 提交的格式有哪些?
// form格式 a=b&c=d&q=f 实现 通过这种方式传递数据
// application/x-www-form-urlencoded

// 字符串
// JSON 格式 '{"name":"zfpx"}'
// applcation/json
// text
// text/plain;

// 二进制 FormData 上传文件

// 服务端返回
// JSON  application/json


/***
 * 需求:客户端向服务器端发送ajax请求,服务器一般返回给客户端都是json格式
 * 
 * 
 * 
 * 
 */
//application/x-www-form-urlencoded
 let http=require("http");
 let fs=require("fs") ;
 let config={
     host:'localhost',
     port:3000,
     path:'/?a=1&b=1',
     method:"get",
     headers:{
         "Content-Type":"application/x-www-form-urlencoded"
         
     }
 }
 //get 方法不能发送请求体
 http.get(config,(res)=>{
     
    let ary=[];
    res.on("data",(data)=>{
         ary.push(data)
    })
    res.on("end",()=>{
      let result=  Buffer.concat(ary);
      console.log(result.toString());
    })
 })

 

