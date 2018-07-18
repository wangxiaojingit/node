let fs=require("fs");
let path=require("path");
function file(filename){
  return path.join(__dirname,filename);
}
let p=file("./2.txt");
let ws=fs.createWriteStream(p,{
    flags:'w',
    autoClose:true,
    start:0,
    highWaterMark:3
})

let flag=ws.write("1");
console.log(flag);
flag=ws.write("1");
console.log(flag);
flag=ws.write("1");
console.log(flag);
flag=ws.write("1");
console.log(flag);

ws.on("drain",function(){
    console.log("抽干了")
})
ws.end("结束");
//ws.write("2");
 