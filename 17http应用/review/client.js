//模拟客户端
let http=require("http");
let fs=require("fs");
let path=require("path");
let p=path.join(__dirname,'./2.txt');
//新增需求，当在客户端输入p的时候就让停止下载，当输入r的时候就恢复下载
let pause=false;
process.stdin.on("data",(data)=>{
   if(data.toString().includes("p")){
      pause=true;
   }else if(data.toString().includes("r")){
       pause=false;
       download();
   }
})

let config={
        port:3001,
        host:"localhost"
}
let wx=fs.createWriteStream(p);
let start=0;
let num=4;//每次累加四个
let end=start+num; //0-4
function download(){
    config.headers={
        "Range":`bytes=${start}-${end}`
    } 
    let ary=[];
    start=end+1;
    end=start+num;
    let client=http.request(config,(res)=>{
         let range=res.headers["content-range"];
         //range:bytes 0-4/11
         let total=range.split("/")[1];
         console.log("total"+total)
         console.log("range:"+range);
        
        
       res.on("data",(data)=>{
           ary.push(data);
       })
    
       res.on("end",()=>{
          let result= Buffer.concat(ary);
          wx.write(result);
          setTimeout(function(){
              if(!pause&&start<total){
                download();
              }
             
          },1000)
       })
    })
    
    client.end();
}
download()