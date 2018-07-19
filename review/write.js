let fs=require("fs");
let path=require("path");
//let WriteStream=require("./writeStream.js");
let WriteStream=require("./write2.js");
let p=path.join(__dirname,'./2.txt');
console.log(p)
let wx=new WriteStream(p,{
    flags:"w",
    encoding:"utf8",
    autoClose:true,
    start:0,
    highWaterMark:2
})
let i=0;
function write(){
    let flag=true;
    while(flag&&i<5){
      flag=  wx.write(i+"");
      i++
      console.log(flag);
    }
}


wx.on("drain",()=>{
    console.log("干了!");
    write()
})
write();
//wx.end();