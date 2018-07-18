let fs=require("fs");
let path=require("path");
let file1=path.join(__dirname,"./1.txt");
let file2=path.join(__dirname,"./2.txt");

let rx=fs.createReadStream(file1,{highWaterMark:3});
let wx=fs.createWriteStream(file2,{highWaterMark:3});

rx.on("data",function(data){
    console.log(data);
  let flag= wx.write(data);
  if(!flag){
     rx.pause();
  }

})

wx.on("drain",function(){
    console.log("gan")
    rx.resume()
})