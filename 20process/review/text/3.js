let fs=require("fs");
let path=require("path");
process.stdout.on("data",(data)=>{
   fs.appendFileSync(path.join(__dirname,"a.txt"),data);
  
})