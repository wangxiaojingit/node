let fs=require("fs");
let path=require("path");

function rmdir(dir){
  let files=fs.readdirSync(dir);
  files=files.map(item=>path.join(dir,files));
  

} 

rmdir("b")