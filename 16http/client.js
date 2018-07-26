let http=require("http");
let config={
    host:"localhost",
    port:3000,
    method:'get',
    headers:{
        "a":1
    }

}
let client=http.request(config,(res)=>{
   res.on("data",(data)=>{
      console.log(data.toString());
   })
})

client.end();  //发送请求

