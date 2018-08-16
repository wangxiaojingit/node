let fs=require("fs");
let path=require("path");

setInterval(function(){
    fs.appendFileSync(path.join(__dirname,'6.txt'),"hello")
},1000)
