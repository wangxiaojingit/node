let path=require("path");
let fs=require("fs");

let result=fs.readFileSync(path.join(__dirname,"./2.txt"));

console.log(result) //ef bb bf e5 91 b5 e5 91 b5
function strBom(content){
   if(Buffer.isBuffer(content)){
      if(content[0]==0xEF&&content[1]==0xBB&&content[2]==0xBF){
          return content.slice(3)
      }
      
   }else{
       if(content.charCodeAt(0)==0xFEFF){
           return content.slice(1)

       }
   }
   return content
}

/**
 * iconv-lite
 * npm i iconv-lite  //把不是utf8的buffer转化为utf8
 * 
 * 
 */

 let iconv=require("iconv-lite");
 let path=require("path");
 let fs=require("fs");
 
 let result=fs.readFileSync(path.join(__dirname,"./3.txt"));
 console.log(result)//<Buffer ce d2 ba dc ba c3>
 console.log(result.toString())
 console.log(iconv.decode(result,'gbk'))
 //iconv.decode(result)