//-------------服务器的headers
//   Connected to localhost (::
//  GET / HTTP/1.1
//  Host: localhost:3000
//  User-Agent: curl/7.61.0
//  Accept: */*
//  Range:bytes=0-5


//------------服务器返回给客户端的headers

// < HTTP/1.1 206 Partial Content
// < Accept-Ranges: bytes
// < Content-Range: bytes 0-5/14
// < Date: Fri, 27 Jul 2018 03:22:19 GMT
// < Connection: keep-alive
// < Transfer-Encoding: chunked

/**
 * 需求:当客户端去请求服务器的时候,进行范围请求,请求到的就放到2.txt.
 * 
 */

 let http=require("http");
 let path=require("path");
 let fs=require("fs");
 let p=path.join(__dirname,'./2.txt');
 let config={
     host:'localhost',
     port:3008
 }
 const NUM=2;//常量,规定每次请求5个.
 let start=0;
 let end=start+NUM;
 
 let wx=fs.createWriteStream(p);
 //客户端发送的请求的时候Range是首字母大写,服务器那端收到的是range是小写,服务端返回给客户端之后是Content-Range
 let timer=null;

 function downText(){
    let ary=[];
    config.headers={
        "Range":`bytes=${start}-${end}`
    } 
    start=start+NUM+1;
    end=start+NUM;
   
    
    console.log(start+"****");
    console.log(end+"****");
    let client=http.request(config,(res)=>{
        //Content-Range: bytes 0-5/14
        let total=res.headers["content-range"].split("/")[1];
        
        console.log(total+"total:")
        res.on("data",(data)=>{
            ary.push(data);
        })
     
        res.on("end",()=>{
            let result=Buffer.concat(ary);
            //需要把结果写进去2.txt
            wx.write(result);
           
            timer=setTimeout(function(){
                if(start<total){
                    downText();
                }
               
            },1000)
        })
     
      })
     
      client.end()//请求结束
 }
 downText();