/**
 *fs的遍历 
 * 
 * 
 */
let fs=require("fs");
/**
 * //在当前根文件夹下面创建文件夹,但是不能一次创建,必须上级目录存在,才能在下级创建
 * 
 */

function mkdirp(filename){
   let pathAry=filename.split("/");
   for(var i=1;i<=pathAry.length;i++){
      let path=pathAry.slice(0,i).join("/")
      try{  
          //判断目录是否可读   
         fs.access(path,fs.constants.F_OK)
      }catch(e){
         fs.mkdirSync(path)
      }
   }
}
mkdirp("a/b/c")


   
