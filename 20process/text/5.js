let fs=require("fs");
let path=require("path");

setInterval(function(){
   fs.appendFileSync(path.join(__dirname,"2.txt"),process.argv)
},1000)

// let fs = require('fs');
// let path=require("path");
// setInterval(function(){
//     fs.appendFileSync(path.join(__dirname,"2.txt"),'hello')
// },1000)