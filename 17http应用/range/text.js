let fs=require("fs");
let path=require("path");
let p=path.join(__dirname,'./1.txt');

let wx=fs.createWriteStream(p);
wx.write("1");
wx.write("2");
wx.write("3");
wx.write("3");
wx.write("3");
wx.write("3");
wx.write("3");
wx.write("3");
