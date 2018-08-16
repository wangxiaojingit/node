let fs=require("fs");
let path=require("path");
process.stdout.on('data',function(data){
      
   fs.appendFileSync(path.join(__dirname,'1.txt'),data);
})

// let fs = require('fs');
// let path=require("path");
// process.stdout.on('data',function(data){
//     // let flag = false;
//     // if(data.toString().includes('end')){
//     //     flag = true;
//     // }
//     // data = data.toString().replace(/end/,'');
//     fs.appendFileSync(path.join(__dirname,'xxx.txt'),data);
//     // if(flag){
//     //     process.exit(); // 进程的退出
//     // }
// });