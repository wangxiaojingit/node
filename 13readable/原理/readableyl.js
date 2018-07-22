let fs=require("fs");
let path=require("path");
let readable=require("./readable.js");


let rx=new readable(path.join(__dirname,"./1.txt"),{
    highWaterMark:3,
    encoding:"utf8",
    end:3
})

rx.on("readable",()=>{
    let s=rx.read(1);
    console.log(s);
     s= rx.read(1);
     console.log(s);
    setTimeout(function(){
        console.log(rx.len);
    },2000)
    
   
})