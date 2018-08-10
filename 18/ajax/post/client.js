let http=require("http");
let url=require("url");
let config={
    host:"localhost",
    port:3000,
    method:"post",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded"
    }
}
let client=http.request(config,(res)=>{
     let ary=[];
     res.on("data",(data)=>{
       ary.push(data)
     })
     res.on("end",()=>{
        let result= Buffer.concat(ary);
        console.log(result.toString()+"---");
     })
})
client.end("a=1&b=2");


