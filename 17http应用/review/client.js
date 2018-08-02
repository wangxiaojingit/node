//模拟客户端
let http=require("http");
let config={
        port:3001,
        host:"localhost"
}
config.headers={
    "Range":"bytes=0-5"
} 
let ary=[];
let client=http.request(config,(res)=>{
   res.on("data",(data)=>{
       ary.push(data);
   })

   res.on("end",()=>{
      let result= Buffer.concat(ary);
      console.log(result);
   })
})

client.end();