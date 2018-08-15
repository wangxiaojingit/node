let http=require("http");
let fs=require("fs");
let path=require("path");
let  str=path.join(__dirname,'./review.js');
console.log(str)
try{
    let statObj=fs.statSync(str);
    console.log("有")
}catch(e){
    console.log("无")
}

