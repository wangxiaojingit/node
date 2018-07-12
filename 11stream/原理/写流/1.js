let path=require("path");
let fs=require("fs");
let wx=fs.createWriteStream(path.join(__dirname,"./1txt"),{
    flags:'w',
    encoding:"utf8",
    autoClose:true,
    start:0,
    highWaterMark:3
})

let i=0;

function write(){
    let flag=true;
    while (i<9&&flag){
        flag=  wx.write(i++ +"");
        console.log(flag)
      }
      
}

write();
wx.on("drain",function(){
    //已经写入了,并且缓存已经清空了
    console.log("抽干了!");
    write()
})